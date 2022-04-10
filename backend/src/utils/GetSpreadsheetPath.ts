import path from "path";
import fs from "fs";

export async function getSpreadsheetPath() {
    const osPath = path.resolve(__dirname, '..', 'uploads');
    const fsPromise = fs.promises;

    try {
        const file = await fsPromise.readdir(osPath);
            
        console.log("Spreadsheet to be added:", osPath + "\\" + file[0]);
        return osPath + "/" + file[0];    // returns the only file in the /uploads directory
    } catch(error) {
        console.error(error);
    }
}