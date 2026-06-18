import type { Request, Response } from "express";
import { run } from "@openai/agents";

import { assistantAgent } from "../agents/assistant.agent.js";

export const assistantChat = async (
    req: Request,
    res: Response
) => {
    try {
        const userMessage = req.body.message;

        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const result = await run(
            assistantAgent,
            `
TENANT_ID=${req.user.id}

${userMessage}
`,
            { maxTurns: 10 }
        );

        console.log(result)
        return res.json({
            success: true,
            answer: result.finalOutput,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Agent failed",
        });
    }
};