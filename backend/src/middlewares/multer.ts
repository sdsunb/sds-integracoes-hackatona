import { Request } from "express";
import multer from "multer";
import path from "path";

const excelFilter = (request: Request, file: any, callback: Function) => {
    if(file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml")) {
        callback(null, true);
    }
    else {
        callback("Por favor, envie arquivos no formato de .xlsx!", false);
    }
}

var storage = multer.diskStorage({
    destination: (request: Request, file: any, callback: Function) => {
        callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename: (request: Request, file: any, callback: Function) => {
        // cb(null, `${Date.now()}-${file.originalname}`);
        callback(null, file.originalname);
    }
});

var uploadFile = multer({ storage, 
    fileFilter: excelFilter 
});

export { uploadFile };
