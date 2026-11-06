import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthUser } from "@/lib/auth";
import { errorResponse, unknownMethod } from "@/lib/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") {
        return unknownMethod(res);
    }

    try {
        const token = req.cookies.token;

        const user = await getAuthUser(token);

        if (!user) {
            return res.status(401).json({
                success: false,
                authenticated: false,
                message: "Unauthenticated. Please login."
            });
        }

        return res.status(200).json({
            success: true,
            authenticated: true,
            user: {
                id: Number(user.sub),
                username: user.email
            }
        });

    } catch (error: unknown) {

        const message =
            error instanceof Error
                ? error.message
                : "Something went wrong.";

        return errorResponse(res, message);
    }
}