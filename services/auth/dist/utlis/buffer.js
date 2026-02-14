import DataUriParser from "datauri/parser.js";
import path from 'path';
const getBuffer = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
};
export default getBuffer;
