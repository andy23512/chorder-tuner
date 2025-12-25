import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {
  CC1_DEFAULT_DEVICE_LAYOUT,
  M4G_DEFAULT_DEVICE_LAYOUT,
} from '../data/default-device-layouts.const';
import { Serial } from './serial';

@Injectable({
  providedIn: 'root',
})
export class LayoutLoader {
  private readonly serial = inject(Serial);

  public async loadFromDevice(disconnect = true): Promise<void> {
    await this.serial.connect();
    const layout = await lastValueFrom(this.serial.loadLayout());
    if (disconnect) {
      await this.serial.disconnect();
    }
    console.log('Loaded layout from device:', layout);
  }

  public async loadFromFile(file: File): Promise<void> {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!data) {
      return;
    }
    let layoutItem = null;
    if (data.history) {
      layoutItem = data.history[0].find(
        (item: any) =>
          item.type === 'layout' &&
          ['One', 'ONE', 'TWO', 'M4G'].includes(item.device),
      );
    } else {
      layoutItem = data;
    }
    if (!layoutItem) {
      return;
    }
    console.log(layoutItem.layout);
  }

  public loadFromDefault(device: 'cc1' | 'm4g') {
    if (device === 'cc1') {
      console.log(CC1_DEFAULT_DEVICE_LAYOUT);
    } else if (device === 'm4g') {
      console.log(M4G_DEFAULT_DEVICE_LAYOUT);
    } else {
      throw new Error(`Unsupported device: ${device}`);
    }
  }
}
