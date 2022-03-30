import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
    async handle(request: Request, response: Response) {
        const userId = request.headers.userid.toString();
        const authToken = request.headers.authorization.split(' ')[1];

        // console.log(typeof(userId) === 'string');
        const userService = new UserService();
        const user = await userService.execute(userId, authToken);

        return response.json(user);
    }
}

export { UserController }
