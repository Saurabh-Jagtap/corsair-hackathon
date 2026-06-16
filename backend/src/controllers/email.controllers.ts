import { type Request, type Response } from "express";
import { getThreads } from "../services/email.services.js";

export const getThreadsController = async (req: Request, res: Response) => {
    try {
        // const userId = req.user.id;
        const threads = await getThreads("dev")

        return res.status(200).json({ success: true, data: threads })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch threads",
        });
    }
}