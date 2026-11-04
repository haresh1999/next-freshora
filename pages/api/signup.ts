import { NextApiRequest, NextApiResponse } from "next";
import User from '../../models/User';
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

        if (req.method == 'POST') {

            const data = req.body;

            if (!data || !data.name || !data.email || !data.mobile || !data.password || !data.password_confirmation) {
                return res.status(400).json({
                    success: false,
                    message: "Name, email, mobile and password are required."
                });
            }

            // confirm password
            if (data.password !== data.password_confirmation) {
                return res.status(400).json({
                    success: false,
                    message: "Passwords do not match."
                });
            }

            const user = await User.where("email", data.email);

            if (user.length > 0) {
                return res.status(422).json({
                    success: false,
                    message: "Email already exists.",
                    errors: {
                        email: ["Email already exists."]
                    }
                });
            }

            const mobile = await User.where("mobile", data.mobile);

            if (mobile.length > 0) {
                return res.status(422).json({
                    success: false,
                    message: "Mobile number already exists.",
                    errors: {
                        mobile: ["Mobile number already exists."]
                    }
                });
            }

            const hashedPassword = await bcrypt.hash(data.password, 12);

            User.create({
                name: data.name,
                email: data.email,
                mobile: data.mobile,
                password: hashedPassword,
                status: 1
            });

            return res.status(200).json({
                success: true,
                message: "User created successfully",
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