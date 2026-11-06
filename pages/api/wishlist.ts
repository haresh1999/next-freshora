import { errorResponse } from "@/lib/client";
import { NextApiRequest, NextApiResponse } from "next";
import Wishlist from "../../models/Wishlists";
import { getAuthUser } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

        const token = req.cookies.token;

        const authUser = await getAuthUser(token);

        if (!authUser) {
            return errorResponse(res, "Unauthorized.", 401);
        }

        if (req.method === "POST") {

            const { product_id, remove } = req.body;

            if (!product_id) {
                return errorResponse(res, "Product ID is required.", 400);
            }

            if (remove) {

                await Wishlist.delete({
                    user_id: authUser.sub,
                    product_id: product_id,
                });

                const user_id = authUser.sub;

                const data = await getProducts(user_id);

                return res.status(200).json({
                    success: true,
                    message: "Product successful removed form wishlist.",
                    data: data
                });
            }

            const wishlist = await Wishlist.where({
                user_id: authUser.sub,
                product_id: product_id,
            });

            if (!wishlist.length) {

                Wishlist.create({
                    user_id: authUser.sub,
                    product_id: product_id,
                });

                return res.status(200).json({
                    success: true,
                    message: "Product added in wishlist successful.",
                });
            } else {



                return res.status(200).json({
                    success: false,
                    message: "This product already added in wishlist.",
                });
            }
        }

        async function getProducts(user_id: number) {
            const wishlists = await Wishlist.join(
                "products",
                "wishlists.product_id",
                "products.id",
                {
                    "wishlists.user_id": user_id,
                }
            );

            const data = wishlists.map((item) => ({
                id: item.product_id,
                name: item.name,
                slug: item.slug,
                category: item.category_id,
                price: item.price,
                oldPrice: item.mrp,
                unit: item.unit,
                image: item.img,
            }));

            return data;
        }

        const user_id = authUser.sub;
        const data = await getProducts(user_id);

        return res.status(200).json({
            success: true,
            message: "Wishlist products fetched successfully.",
            data: data,
        });

    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "Something went wrong.";

        return errorResponse(res, message);
    }
}