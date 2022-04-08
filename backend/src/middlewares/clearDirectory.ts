import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

// I believe this middleware is unnecessary, this function can stay as a function called by SpreadsheetService
export async function clearDirectory(request: Request, response: Response, next: NextFunction) {
    const directory = path.resolve(__dirname, '..', 'uploads');
    fs.readdir(directory, (err, files) => {
        if(err) {
            throw err;
        }

        if(files.length !== 0) {
            for(const file of files) {
                console.log("DELETING FILE:", file);
                fs.unlink(path.join(directory, file), err => {      // Removes the file from the upload directory
                    if(err) {
                        throw err;
                    }
                })
            }
        }

        next();
    });
}
