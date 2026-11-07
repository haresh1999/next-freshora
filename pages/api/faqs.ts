import { NextApiRequest, NextApiResponse } from "next";
import Faq from "../../models/Faq";
import { errorResponse } from "@/lib/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        if (req.method === "POST") {

            const data = req.body;

            if (!data || !data.question || !data.answer) {

                return res.status(400).json({
                    success: false,
                    message: "Faq question, answer are required."
                });
            }

            await Faq.create({
                'question': data.question,
                'answer': data.answer,
                'status': data.status,
            });

            return res.status(200).json({
                success: true,
                message: "Faq created successfully",
            });
        }

        const faqs = await Faq.all();

        return res.status(200).json({
            success: true,
            data: faqs,
            message: "Faqs fetched successfully."
        });

    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "Something went wrong.";

        return errorResponse(res, message);
    }
}