import axios from "axios";
export class upload {
    static async uploadFile(bufferData) {
        return await axios.post(`${process.env.Utils_service}/upload`, { buffer: bufferData.content });
    }
}
