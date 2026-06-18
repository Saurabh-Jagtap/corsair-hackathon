import { type Request, type Response } from "express";
import { EmailService, getThreadsService } from "../services/email.services.js";

export const getThreads = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const threads = await getThreadsService(userId)

        return res.status(200).json({ success: true, data: threads })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch threads",
        });
    }
}

export const sendEmail = async (
    req: Request,
    res: Response
) => {
    try {
        const { to, subject, body } = req.body;

        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        await EmailService.sendEmail({
            tenantId: req.user.id,
            to,
            subject,
            body,
        });

        return res.json({
            success: true,
            message: "Email sent successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to send email",
        });
    }
};