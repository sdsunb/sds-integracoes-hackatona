import { Request, Response } from "express";
import { LocationService } from "../services/LocationService";

class LocationController {
    async handle(request: Request, response: Response) {
        const authToken = request.headers.authorization.split(' ')[1];

        const locationService = new LocationService();
        const allUbs = await locationService.getAllUbs(authToken);
        return response.json(allUbs);
    }
}

export { LocationController };
