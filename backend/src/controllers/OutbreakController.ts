import { Request, Response } from "express";
import { OutbreakService } from "../services/OutbreakService";

class OutbreakController { 
    async handle(request: Request, response: Response) {
        const outbreakId = request.params.outbreakId;
        const authToken = request.headers.authorization.split(' ')[1];

        const outbreakService = new OutbreakService();
        const outbreak = await outbreakService.execute(outbreakId, authToken);

        return response.json(outbreak);
    }
}

export { OutbreakController };
