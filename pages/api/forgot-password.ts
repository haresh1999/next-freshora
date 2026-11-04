import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        if (req.method === 'POST') {
            const { username } = req.body;

            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username.trim());

            const isMobile = /^\+?[0-9]{10,15}$/.test(username.trim());

            const user = await User.where(isEmail ? "email" : "mobile", username);

            if (user.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email/mobile."
                });
            }

            // ON SUCCESS GIVE FIELD TO RESET PASSWORD
        }

        return res.status(405).json({
            success: false,
            message: "Method not allowed."
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message || "Something went wrong."
        });
    }

    return res.status(405).json({
        message: "Method not allowed"
    });
}