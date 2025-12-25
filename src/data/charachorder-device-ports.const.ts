// Reference: https://github.com/CharaChorder/DeviceManager/blob/45682f0d1adddb0d689285e284d309123028f22d/src/lib/serial/device.ts#L14-L24
export const CHARACHORDER_DEVICE_PORTS = new Map<string, SerialPortFilter>([
  ['ONE M0', { usbProductId: 32783, usbVendorId: 9114 }],
  ['TWO S3 (pre-production)', { usbProductId: 0x8252, usbVendorId: 0x303a }],
  ['TWO S3', { usbProductId: 0x8253, usbVendorId: 0x303a }],
  ['LITE S2', { usbProductId: 0x812e, usbVendorId: 0x303a }],
  ['LITE M0', { usbProductId: 32796, usbVendorId: 9114 }],
  ['X', { usbProductId: 0x818b, usbVendorId: 0x303a }],
  ['M4G S3 (pre-production)', { usbProductId: 0x1001, usbVendorId: 0x303a }],
  ['M4G S3', { usbProductId: 0x829a, usbVendorId: 0x303a }],
  ['T4G S2', { usbProductId: 0x82f2, usbVendorId: 0x303a }],
]);
