import { DeviceInfo } from "../domain/services/device.service";

declare global {
  namespace Express {
    interface Request {
      deviceInfo?: DeviceInfo;
      userAgentString?: string;
    }
  }
}