import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST"],
        optionsSuccessStatus: 200
    })
);
    
app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({
            error: err.message
        });
    }
    
    // Unhandled errors
    return response.status(500).json({
        status: "error",
        message: "Erro interno no servidor."
    });
});

app.listen(3333, () => console.log("Server is running on port 3333"));