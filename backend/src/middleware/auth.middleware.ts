import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
        userId?: string;
        username?: string;
        }
    }
}


const jwt_secret = process.env.JWT_SECRET!;


export const authenticate = (req:Request,res:Response,next:NextFunction): void => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    jwt.verify(token,jwt_secret, (err: jwt.VerifyErrors | null , decoded: string | JwtPayload | undefined)=>{
        if(err || !decoded){
            return res.status(403).json({ error: "Invalid token" });
        }

        const payload = decoded as jwt.JwtPayload;
        req.userId = payload.id;
        req.username = payload.email;

        next();
    })
}