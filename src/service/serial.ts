import { inject, Injectable } from '@angular/core';
import {
  concatMap,
  filter,
  firstValueFrom,
  from,
  map,
  Observable,
  Subject,
  tap,
  toArray,
} from 'rxjs';
import { DeviceLayout } from 'tangent-cc-lib';
import {
  SerialCommand,
  SerialCommandArgMap,
} from '../data/serial-command.enum';
import { SerialLogItemType } from '../model/serial-log.model';
import { SerialLogStore } from '../store/serial-log.store';
import { SerialPortService } from './serial-port';

// Reference: https://github.com/archocron/ngx-serial/blob/fd1cf846cc5dba2bb2a935f44845d072964b566c/projects/ngx-serial/src/lib/ngx-serial.ts

class LineBreakTransformer {
  container = '';
  private readonly controlCharacter: string;

  constructor(controlCharacter: string) {
    this.controlCharacter = controlCharacter;
  }

  transform(
    chunk: string,
    controller: TransformStreamDefaultController<string>,
  ) {
    this.container += chunk;
    const lines = this.container.split(this.controlCharacter);
    this.container = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller: TransformStreamDefaultController<string>) {
    controller.enqueue(this.container);
  }
}

@Injectable({
  providedIn: 'root',
})
export class Serial {
  private readonly serialPortService = inject(SerialPortService);

  private port: SerialPort | null = null;
  private readonly webSerialDataSubject = new Subject<string>();
  private readonly webSerialData$ = this.webSerialDataSubject.asObservable();
  private writer: WritableStreamDefaultWriter<string> | null = null;
  private reader: ReadableStreamDefaultReader<string> | null = null;
  private readableStreamClosed: Promise<void> | null = null;
  private writableStreamClosed: Promise<void> | null = null;

  private readonly serialLogStore = inject(SerialLogStore);

  public async connect() {
    try {
      this.port = await this.serialPortService.getPort();
      await this.port.open({ baudRate: 115200 });
      const textEncoder = new TextEncoderStream();
      if (!this.port.writable) {
        throw new Error('Port is not writable');
      }
      this.writableStreamClosed = textEncoder.readable.pipeTo(
        this.port.writable,
      );
      this.writer = textEncoder.writable.getWriter();

      this.startReadLoop();

      const version = await this.send(SerialCommand.Version);
      const id = await this.send(SerialCommand.Id);
      return { version, id };
    } catch (e) {
      console.error(e);
    }
  }

  public loadLayout(): Observable<DeviceLayout['layout']> {
    return from([1, 2, 3]).pipe(
      concatMap(
        (layerIndex) =>
          from(Array.from({ length: 90 }, (_, i) => i)).pipe(
            concatMap((keyIndex) =>
              from(
                this.send(
                  SerialCommand.GetKeyMap,
                  `A${layerIndex}`,
                  keyIndex.toString(),
                ),
              ).pipe(map((data) => Number.parseInt(data, 10))),
            ),
            toArray(),
          ) as Observable<DeviceLayout['layout'][0]>,
      ),
      toArray(),
    ) as Observable<DeviceLayout['layout']>;
  }

  public batchSend(
    dataList: string[],
  ): Observable<{ complete: boolean; sent: number; total: number }> {
    const result = {
      complete: false,
      sent: 0,
      total: dataList.length,
    };
    return new Observable((observer) => {
      from(dataList)
        .pipe(
          concatMap((data) => from(this.sendData(data))),
          tap(() => {
            result.sent++;
            observer.next(result);
          }),
          toArray(),
        )
        .subscribe(() => {
          result.complete = true;
          observer.next(result);
          observer.complete();
        });
    });
  }

  public async send<T extends SerialCommand>(
    command: T,
    ...args: SerialCommandArgMap[T]
  ) {
    const data = args ? [command, ...args].join(' ') : command;
    return this.sendData(data);
  }

  private async sendData(data: string) {
    await this.writer.write(data + '\r\n');
    this.serialLogStore.push(SerialLogItemType.Send, data);
    return firstValueFrom(
      this.webSerialData$.pipe(
        filter((d) => d.startsWith(data)),
        tap((d) => {
          this.serialLogStore.push(SerialLogItemType.Receive, d);
        }),
        map((d) => d.substring(data.length + 1).trim()),
      ),
    );
  }

  public async disconnect() {
    this.reader.cancel();
    await this.readableStreamClosed.catch(() => {
      /* empty */
    });
    this.writer.close();
    await this.writableStreamClosed;
    await this.port.close();
  }

  private async startReadLoop() {
    while (this.port.readable) {
      const textDecoder = new TextDecoderStream();
      if (this.port.readable.locked) {
        break;
      }
      this.readableStreamClosed = this.port.readable.pipeTo(
        textDecoder.writable as unknown as WritableStream<
          Uint8Array<ArrayBufferLike>
        >,
      );
      this.reader = textDecoder.readable
        .pipeThrough(new TransformStream(new LineBreakTransformer('\n')))
        .getReader();
      try {
        while (true) {
          const { value, done } = await this.reader.read();
          if (done) {
            this.reader.releaseLock();
            break;
          }
          if (value) {
            this.webSerialDataSubject.next(value.trim());
          }
        }
      } catch {
        console.error(
          'Read Loop error. Have the serial device been disconnected ? ',
        );
      }
    }
  }
}
