import { Request, Response } from "express";
import { VersionService } from "../services/VersionService";


class VersionController {
    async handle(request: Request, response: Response) {
        const versionService = new VersionService();

        try {
            const version = await versionService.execute();
            return response.json(version);
        } catch(error) {
            console.log(error);
        }
    }
}

export { VersionController }
