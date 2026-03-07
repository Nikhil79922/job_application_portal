export interface IDeviceService {
    parse(ua: any, userAgent: string): {
      device: string;
      deviceType: string;
    };
  }