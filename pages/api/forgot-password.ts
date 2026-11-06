import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        if (req.method === 'POST') {
            const { email, mobile } = req.body;

            const user = await User.where('email', email);

            if (user.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email/mobile."
                });
            }

            if (user[0].mobile != mobile) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email/mobile."
                });
            }

            return res.status(201).json({
                success: true,
                message: 'Verified successfully. You can now reset your password.',
                user_id: user[0].id
            });
        }

        return res.status(405).json({
            success: false,
            message: "Method not allowed."
        });

    } catch (error: any) {

        return res.status(400).json({
            success: false,
            message: error.message || "Something went wrong."
        });
    }

    return res.status(405).json({
        message: "Method not allowed"
    });
}