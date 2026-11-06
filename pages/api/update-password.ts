import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { errorResponse, unknownMethod } from "@/lib/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        if (req.method === 'POST') {

            const { password, user_id } = req.body;

            const user = await User.find(user_id);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found."
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const status = await User.update(user_id, { password: hashedPassword });

            if (status) {

                return res.status(200).json({
                    success: true,
                    message: 'OK',
                });
            }

            return res.status(200).json({
                success: false,
                message: 'Something went wrong.',
            });
        }

        return unknownMethod(res);

    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "Something went wrong.";

        return errorResponse(res, message);
    }
}