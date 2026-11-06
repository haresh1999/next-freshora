import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../models/Product";
import Category from "../../models/Category";
import { errorResponse } from "@/lib/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { category } = req.query;

        if (typeof category !== "string" || !category.trim()) {
            return errorResponse(res, "Category ID or slug is required.", 400);
        }

        const isId = /^\d+$/.test(category);

        const cat = await Category.where({
            [isId ? "id" : "slug"]: isId ? Number(category) : category,
        });

        if (!cat.length) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        const products = await Product.whereLimit({
            category_id: cat[0].id,
        }, 4, true);

        return res.status(200).json({
            success: true,
            data: products,
            message: "Products fetched successfully.",
        });

    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "Something went wrong.";

        return errorResponse(res, message, 500);
    }
}