import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        if (req.method == 'POST') {

            const data = req.body;

            const { username, password } = data;

            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username.trim());

            const isMobile = /^\+?[0-9]{10,15}$/.test(username.trim());

            if (!isEmail && !isMobile) {
                return res.status(422).json({
                    success: false,
                    message: "Please enter a valid email or mobile number.",
                    errors: {
                        email: ["Enter a valid email or mobile number."]
                    }
                });
            }

            const user = await User.where(
                isEmail ? "email" : "mobile",
                username.trim()
            );

            if (user.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email/mobile or password."
                });
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user[0].password
            );

            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email/mobile or password."
                });
            }

            const token = await generateToken({
                id: user.id,
                username: data.username
            });

            const cookieOptions = [
                `token=${encodeURIComponent(token)}`,
                "HttpOnly",
                "SameSite=Lax",
                "Path=/",
                `Max-Age=${60 * 60 * 24 * 7}`,
            ];

            if (process.env.NODE_ENV === "production") {
                cookieOptions.push("Secure");
            }

            res.setHeader("Set-Cookie", cookieOptions.join("; "));

            return res.status(200).json({
                success: true,
                message: "Login successful.",
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile
                }
            });
        }

        return res.status(405).json({
            message: "Method not allowed"
        });
    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message || "Something went wrong."
        });
    }
}