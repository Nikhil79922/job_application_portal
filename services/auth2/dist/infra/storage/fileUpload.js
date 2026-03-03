import axios from "axios";
import { env } from "../../config/env.js";
export class upload {
    async uploadFile(bufferData) {
        return await axios.post(`${env.Utils_service}/upload`, { buffer: bufferData.content });
    }
}
