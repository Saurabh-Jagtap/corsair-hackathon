import type { Request, Response } from "express";
import { ConnectService } from "../services/connect.services.js";

const REDIRECT_URI =
    `${process.env.APP_URL}/api/auth`;

export const pendingStates = new Set<string>();

export const connectController = async (
    req: Request,
    res: Response
) => {
    try {
        console.log(
            "tenantId =",
            req.user?.id
        );

        const plugin = req.query.plugin as string;

        if (!plugin) {
            return res.status(400).json({
                success: false,
                message: "Plugin required",
            });
        }

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const tenantId = req.user.id;

        const { url, state } =
            await ConnectService.generateConnectionUrl({
                plugin,
                tenantId,
                redirectUri: REDIRECT_URI,
            });

        pendingStates.add(state);

        res.cookie(
            "oauth_state",
            state,
            {
                httpOnly: true,
                sameSite: "lax",
                secure:
                    process.env.NODE_ENV ===
                    "production",
                maxAge: 10 * 60 * 1000,
            }
        );

        return res.redirect(url);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "OAuth connection failed",
        });
    }
};