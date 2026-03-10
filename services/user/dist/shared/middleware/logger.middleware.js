import crypto from "crypto";
const sanitizeQuery = (query) => {
    const blockedKeys = ["password", "token", "otp", "secret"];
    const safeQuery = {};
    for (const key in query) {
        if (!blockedKeys.includes(key.toLowerCase())) {
            safeQuery[key] = query[key];
        }
    }
    return safeQuery;
};
const formatQuery = (query) => {
    if (!query || Object.keys(query).length === 0)
        return "";
    return colors.gray(`?${new URLSearchParams(query).toString()}`);
};
const colors = {
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    cyan: (text) => `\x1b[36m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    gray: (text) => `\x1b[90m${text}\x1b[0m`,
};
const colorStatus = (status) => {
    if (status >= 500)
        return colors.red(status.toString());
    if (status >= 400)
        return colors.yellow(status.toString());
    if (status >= 300)
        return colors.cyan(status.toString());
    return colors.green(status.toString());
};
const logger = (req, res, next) => {
    const startTime = Date.now();
    const requestId = crypto.randomUUID();
    req.requestId = requestId;
    res.setHeader("X-Request-Id", requestId);
    res.on("finish", () => {
        const durationMs = Date.now() - startTime;
        const log = {
            timestamp: new Date().toISOString(),
            requestId,
            method: req.method,
            path: req.originalUrl.split("?")[0],
            query: sanitizeQuery(req.query),
            statusCode: res.statusCode,
            durationMs,
            ip: req.ip,
            userAgent: req.headers["user-agent"],
        };
        if (process.env.NODE_ENV === "production") {
            console.log(JSON.stringify(log));
            return;
        }
        console.log(`${colors.gray(log.timestamp)} ` +
            `${log.method} ${log.path}${formatQuery(log.query)} ` +
            `${colorStatus(log.statusCode)} ` +
            `${colors.gray(`${log.durationMs}ms`)}`);
    });
    next();
};
export default logger;
