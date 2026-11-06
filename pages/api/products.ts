import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../models/Product";
import Category from "../../models/Category";
import { errorResponse, unknownMethod } from "@/lib/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        if (req.method === "POST") {

            const data = req.body;

            if (!data || !data.name || !data.slug || !data.category || !data.price || !data.mrp || !data.unit || !data.img || !data.stock || !data.rating) {
                return res.status(400).json({
                    success: false,
                    message: "Product name, slug, category, price, mrp, unit, img, stock and rating are required."
                });
            }

            const category = await Category.where({ 'name': data.category })

            if (!category) {
                return res.status(400).json({
                    success: false,
                    message: "Category not found"
                });
            }

            await Product.create({
                'name': data.name,
                'slug': data.slug,
                'category_id': category[0].id,
                'price': data.price,
                'mrp': data.mrp,
                'unit': data.unit,
                'img': data.img,
                'stock': data.stock,
                'rating': data.rating,
            });

            return res.status(200).json({
                success: true,
                message: "Product created successfully",
            });
        }

        if (req.method === "GET") {

            const products = await Product.all();

            return res.status(200).json({
                success: true,
                data: products,
                message: "Products fetched successfully."
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