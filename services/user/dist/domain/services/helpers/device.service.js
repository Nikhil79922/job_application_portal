export class DeviceService {
    parse(ua, userAgent) {
        const browser = ua?.browser?.name || "Unknown Browser";
        const os = ua?.os?.name || "Unknown OS";
        const deviceType = ua?.device?.type || "desktop";
        const device = userAgent.includes("Postman")
            ? "Postman Client"
            : `${deviceType} - ${browser} on ${os}`;
        const platform = os.toLowerCase();
        let normalizedType;
        if (platform.includes("ios"))
            normalizedType = "ios";
        else if (platform.includes("android"))
            normalizedType = "android";
        else if (userAgent.includes("Postman"))
            normalizedType = "postman";
        else
            normalizedType = "web";
        return {
            device,
            deviceType: normalizedType,
        };
    }
}
