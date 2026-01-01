import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";

declare global {
    namespace Express {
        interface Request {
        userId?: string;
        username?: string;
        }
    }
}


const jwt_secret = process.env.JWT_SECRET!;


export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.cookies.token

        if (!token) {
        res.status(401).json({ message: "Unauthorized" })
        return
        }

        const decoded = jwt.verify(token, jwt_secret) as JwtPayload

        if (!decoded?.id) {
        res.status(403).json({ message: "Invalid token" })
        return
        }

        const user = await User.findById(decoded.id).select(
        "_id username email avatar authProvider"
        )

        if (!user) {
            res.status(401).json({ message: "User not found" })
            return
        }

        req.user = user
        next()
    } catch {
        res.status(403).json({ message: "Invalid token" })
    }
}
