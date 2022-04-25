import { Request, Response } from "express";
import { SpreadsheetService } from "../services/SpreadsheetService";
import path from "path";

class ValidateSpreadsheetController {
    async handle(request: Request, response: Response) {
        try {

            const origin = request.params.origin;

            if(!request.file) {
                return response.status(400).send("Envie um arquivo no formato .xlsx!");
            }

            const fileName = request.file.filename;

            const spreadsheetService = new SpreadsheetService();

            const data = await spreadsheetService.execute(origin, fileName);

            return response.json(data);

        } catch(error) {
            console.log(error);
            response.status(500).send({
                message: "Não foi possível realizar o upload do arquivo " + request.file.originalname
            });
        }
    }
}

export { ValidateSpreadsheetController };
