import { unknownMethod } from "@/lib/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "POST") {
        return unknownMethod(res);
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