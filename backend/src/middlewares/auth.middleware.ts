import type { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError.js'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.header("x-user-id")

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    req.user = {
        id: userId
    }
    next()
}