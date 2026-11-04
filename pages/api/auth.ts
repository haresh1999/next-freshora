import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthUser } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed."
        });
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
                id: user.id,
                username: user.username
            }
        });

    } catch (error) {
        console.error("Auth API error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}