import axios from "axios";
import { env } from "../../config/env.js";
import { IUploadFile } from "../../domain/interfaces/infraInterfaces/uploadFile.interface.js";

export class upload implements IUploadFile {
     async uploadFile(data:any){
    return await axios.post(`${env.Utils_service}/upload`,data)
    }
}