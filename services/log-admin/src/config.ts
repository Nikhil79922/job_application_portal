import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 9000;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Nikkssy.dev";

export const LOG_DIRS: Record<string, string> = {
  "api-gateway": path.resolve(__dirname, "../../../api-gateway/logs"),
  auth: path.resolve(__dirname, "../../../services/auth/logs"),
  user: path.resolve(__dirname, "../../../services/user/logs"),
  job: path.resolve(__dirname, "../../../services/job/logs"),
  payment: path.resolve(__dirname, "../../../services/payment/logs"),
  utils: path.resolve(__dirname, "../../../services/utils/logs"),
};
