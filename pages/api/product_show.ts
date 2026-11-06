import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../models/Product";
import { errorResponse } from "@/lib/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

        const { slug } = req.query;

        const product = await Product.where({ slug: slug });

        if (!product.length) {

            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: product[0],
            message: "Product fetched successfully."
        });

    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "Something went wrong.";

        return errorResponse(res, message);
    }
}