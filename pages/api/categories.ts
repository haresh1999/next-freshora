import { NextApiRequest, NextApiResponse } from "next";
import Category from "../../models/Category";
import { errorResponse, unknownMethod } from "@/lib/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        if (req.method === "POST") {
            const data = req.body;

            if (!data || !data.name || !data.slug) {
                return res.status(400).json({
                    success: false,
                    message: "Name and slug are required."
                });
            }

            await Category.create({
                "name": data.name,
                "slug": data.slug,
                "description": data.description,
                "image": data.image,
                "color": data.color,
                "count": data.count
            });

            return res.status(200).json({
                success: true,
                message: 'Category created success.'
            });
        }

        if (req.method === "GET") {

            const cats = await Category.all();

            return res.status(200).json({
                success: true,
                data: cats,
                message: "Categories fetched successfully."
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