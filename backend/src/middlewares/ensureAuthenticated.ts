import { Request, Response, NextFunction } from "express";
import axios from "axios";

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    let authToken: string;

    if(request.headers.authorization) {
        authToken = request.headers.authorization.split(' ')[1];  // removing 'Bearer' from token
    }

    if(!authToken) {
        return response.status(401).end();
    }

    const apiAddress = process.env.API_ADDRESS;
    const route = '/outbreaks?access_token=';

    try {
        await axios({
            method: 'get',
            url: apiAddress + route + authToken
        });

        return next();

    } catch (error) {
        return response.status(401).end();
    }

}
