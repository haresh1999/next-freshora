import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed."
        });
    }

    res.setHeader("Set-Cookie", [
        "token=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0"
        + (process.env.NODE_ENV === "production" ? "; Secure" : "")
    ]);

    return res.status(200).json({
        success: true,
        message: "Logout successful."
    });
}