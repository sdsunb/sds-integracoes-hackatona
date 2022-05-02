import { Request, Response } from "express";
import { AddCasesService } from "../services/AddCasesService";

class AddCasesController {
    async handle(request: Request, response: Response) {
        try {

            // posteriorly, make a simple request to test this outbreakId
            const outbreakId = request.params.outbreakId;
            const authToken = request.headers.authorization.split(' ')[1];
            const origin = request.params.origin;

            const addCasesService = new AddCasesService();

            if(request.params.locationId) {
                // Esus
                const locationId = request.params.locationId;
                const result = await addCasesService.execute(process.env.OUTBREAK_ID, authToken, origin, locationId);
                return response.json(result);
            } else {
                // Cievs
                const result = await addCasesService.execute(process.env.OUTBREAK_ID, authToken, origin);
                return response.json(result);
            }

        } catch(error) {
            console.log(error);
            response.status(500).send({
                message: "Erro interno no servidor."
            });
        }
    }
}

export { AddCasesController };
