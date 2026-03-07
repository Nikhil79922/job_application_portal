import axios from "axios";
import { env } from "../../config/env.js";
import { IUploadFile } from "../../domain/interfaces/uploadFile.interface.js";

export class upload implements IUploadFile {
     async uploadFile(bufferData:any){
    return await axios.post(`${env.Utils_service}/upload`,{buffer:bufferData.content})
    }
}