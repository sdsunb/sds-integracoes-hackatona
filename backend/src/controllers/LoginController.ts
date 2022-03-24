import { NextFunction, Request, Response } from "express";
import { LoginService } from "../services/LoginService";

/**
 * Return: JSON with login informations if login with success or JSON with error if login failed
 */
class LoginController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { username, password } = request.body;

        try {
            const loginService = new LoginService();
            const login = await loginService.execute({username, password});
    
            if (login.id) {
                return response.json({
                    login
                });
            } else {
                return response.json({
                    error: login
                });
            }
        } catch(error) {
            next(error);
        }
    }
}

export { LoginController }
