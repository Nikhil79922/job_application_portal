import { UserAgentParser } from "../utils/reqUserAgent.entity.js";
import { DeviceService } from "../../domain/services/device.service.js";
const deviceService = new DeviceService();
export const deviceMiddleware = (req, _res, next) => {
    const userAgentString = req.headers["user-agent"] || "unknown";
    const parser = new UserAgentParser();
    const ua = parser.parse(userAgentString);
    const deviceInfo = deviceService.parse(ua, userAgentString);
    req.deviceInfo = deviceInfo;
    req.userAgentString = userAgentString;
    next();
};
