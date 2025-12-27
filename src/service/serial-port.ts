import { inject, Injectable } from '@angular/core';
import { CHARACHORDER_DEVICE_PORTS } from '../data/charachorder-device-ports.const';
import { GeneralSettingStore } from '../store/general-setting.store';

@Injectable({
  providedIn: 'root',
})
export class SerialPortService {
  private readonly generalSettingStore = inject(GeneralSettingStore);

  public async getPort(): Promise<SerialPort> {
    if (this.generalSettingStore.autoConnectToDevice()) {
      const viablePorts = await this.getViablePorts();
      if (viablePorts.length === 1) {
        return viablePorts[0];
      }
    }
    return this.requestPort();
  }

  private async requestPort(): Promise<SerialPort> {
    return navigator.serial.requestPort({
      filters: [...CHARACHORDER_DEVICE_PORTS.values()],
    });
  }

  private async getViablePorts(): Promise<SerialPort[]> {
    return navigator.serial.getPorts().then((ports) =>
      ports.filter((port) => {
        const { usbProductId, usbVendorId } = port.getInfo();
        for (const filter of CHARACHORDER_DEVICE_PORTS.values()) {
          if (
            filter.usbProductId === usbProductId &&
            filter.usbVendorId === usbVendorId
          ) {
            return true;
          }
        }
        return false;
      }),
    );
  }
}
