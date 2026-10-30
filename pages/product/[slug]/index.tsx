import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { GetServerSideProps } from "next";
import PincodeChecker from "@/pages/components/products/PincodeChecker";
import { useCart } from "@/context/CartContext";

type Product = {
    id: number;
    name: string;
    slug: string;
    category: string;
    price: number;
    oldPrice: number;
    unit: string;
    description: string;
    image: string;
    images: string[];
    rating: number;
    reviews: number;
    stock: number;
};

const products: Product[] = [
    {
        id: 1,
        name: "Fresh Red Apples",
        slug: "fresh-red-apples",
        category: "Fruits & Vegetables",
        price: 149,
        oldPrice: 180,
        unit: "1 kg",
        description:
            "Enjoy crisp, juicy red apples selected for everyday freshness. Perfect for snacking, fruit salads, breakfast, and healthy recipes.",
        image:
            "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=900&q=85",
        images: [
            "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=900&q=85",
            "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=900&q=85",
        ],
        rating: 4.8,
        reviews: 124,
        stock: 20,
    },
    {
        id: 2,
        name: "Fresh Green Broccoli",
        slug: "fresh-green-broccoli",
        category: "Fruits & Vegetables",
        price: 79,
        oldPrice: 99,
        unit: "500 g",
        description:
            "Fresh green broccoli for salads, stir-fries, soups, and wholesome home-cooked meals.",
        image:
            "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=900&q=85",
        images: [
            "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=900&q=85",
        ],
        rating: 4.6,
        reviews: 86,
        stock: 15,
    },
];

type PageProps = {
    product: Product | null;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params, }) => {
    const slug = params?.slug;
    const product =
        typeof slug === "string"
            ? products.find((item) => item.slug === slug) ?? null
            : null;
    return {
        props: { product },
    };
};

export default function ProductDetails({ product }: PageProps) {

    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [added, setAdded] = useState(false);

    const { addToCart } = useCart();

    if (!product) {

        return (
            <div className="mx-auto max-w-7xl px-4 py-24 text-center">
                <h1 className="text-3xl font-bold text-slate-900">
                    Product not found
                </h1>
                <p className="mt-3 text-slate-500">
                    This product may no longer be available.
                </p>
                <Link
                    href="/product"
                    className="mt-6 inline-flex rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    const discount = Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
    );

    return (
        <>
            <Head>
                <title>{product.name} | Freshora</title>
                <meta name="description" content={product.description} />
            </Head>

            <div className="bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="hover:text-emerald-700">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/product" className="hover:text-emerald-700">
                            Products
                        </Link>
                        <span>/</span>
                        <span className="font-medium text-slate-800">
                            {product.name}
                        </span>
                    </nav>

                    <div className="grid gap-8 rounded-3xl bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-2 lg:gap-12 lg:p-10">
                        {/* Product gallery */}
                        <div>
                            <div className="relative aspect-square overflow-hidden rounded-2xl bg-emerald-50">
                                <Image
                                    src={product.images[activeImage] ?? product.image}
                                    alt={product.name}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                />

                                <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white">
                                    {discount}% OFF
                                </span>
                            </div>

                            <div className="mt-4 flex gap-3">
                                {product.images.map((image, index) => (
                                    <button
                                        key={image}
                                        type="button"
                                        onClick={() => setActiveImage(index)}
                                        aria-label={`View product image ${index + 1}`}
                                        className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 ${activeImage === index
                                            ? "border-emerald-600"
                                            : "border-slate-200"
                                            }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${product.name} view ${index + 1}`}
                                            fill
                                            sizes="80px"
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product information */}
                        <div className="flex flex-col">
                            <p className="text-sm font-semibold text-emerald-700">
                                {product.category}
                            </p>

                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                {product.name}
                            </h1>

                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                <span className="text-amber-500">★★★★★</span>
                                <span className="text-sm font-semibold text-slate-700">
                                    {product.rating}/5
                                </span>
                                <span className="text-sm text-slate-500">
                                    ({product.reviews} reviews)
                                </span>
                            </div>

                            <div className="mt-6 flex items-end gap-3">
                                <span className="text-3xl font-bold text-slate-900">
                                    ₹{product.price}
                                </span>
                                <span className="pb-1 text-lg text-slate-400 line-through">
                                    ₹{product.oldPrice}
                                </span>
                                <span className="pb-1 text-sm font-semibold text-emerald-700">
                                    Save ₹{product.oldPrice - product.price}
                                </span>
                            </div>

                            <p className="mt-1 text-sm text-slate-500">
                                Price per {product.unit}
                            </p>

                            <div className="my-6 h-px bg-slate-100" />

                            <p className="text-base leading-7 text-slate-600">
                                {product.description}
                            </p>

                            <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🚚</span>
                                    <div>
                                        <p className="font-semibold text-slate-900">
                                            Convenient home delivery
                                        </p>
                                        <p className="mt-1 text-sm text-slate-600">
                                            Delivery availability depends on your location.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <p className="mb-3 text-sm font-semibold text-slate-800">
                                    Quantity
                                </p>

                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center rounded-xl border border-slate-200">
                                        <button
                                            type="button"
                                            aria-label="Decrease quantity"
                                            onClick={() =>
                                                setQuantity((q) => Math.max(1, q - 1))
                                            }
                                            className="px-4 py-3 text-lg hover:bg-slate-50"
                                        >
                                            −
                                        </button>

                                        <span className="min-w-10 text-center font-semibold">
                                            {quantity}
                                        </span>

                                        <button
                                            type="button"
                                            aria-label="Increase quantity"
                                            onClick={() =>
                                                setQuantity((q) =>
                                                    Math.min(product.stock, q + 1)
                                                )
                                            }
                                            disabled={quantity >= product.stock}
                                            className="px-4 py-3 text-lg hover:bg-slate-50 disabled:opacity-40"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <span className="text-sm text-emerald-700">
                                        {product.stock > 0
                                            ? "Available"
                                            : "Out of stock"}
                                    </span>
                                </div>
                            </div>

                            <PincodeChecker />

                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        addToCart({
                                            id: product.id,
                                            name: product.name,
                                            slug: product.name
                                                .trim()
                                                .toLowerCase()
                                                .replace(/\s+/g, "-"),
                                            price: product.price,
                                            image: product.image,
                                            unit: product.unit,
                                        }, quantity)
                                    }}
                                    disabled={product.stock === 0}
                                    className="rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {added ? "Added to Cart ✓" : "Add to Cart"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setAdded(false)}
                                    className="rounded-xl border border-emerald-600 px-6 py-4 font-semibold text-emerald-700 transition hover:bg-emerald-50"
                                >
                                    {added ? 'Add to Wishlist' : 'Added In Wishlist'}
                                </button>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6 text-center">
                                <div>
                                    <span className="text-xl">🌿</span>
                                    <p className="mt-2 text-xs font-medium text-slate-600">
                                        Quality Produce
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xl">📦</span>
                                    <p className="mt-2 text-xs font-medium text-slate-600">
                                        Careful Packing
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xl">🔒</span>
                                    <p className="mt-2 text-xs font-medium text-slate-600">
                                        Secure Checkout
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product description */}
                    <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Product Details
                        </h2>
                        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                            {product.description}
                        </p>
                        <p className="mt-4 text-sm text-slate-500">
                            Category: {product.category} · Pack size: {product.unit}
                        </p>
                    </section>

                    {/* Related products */}
                    <section className="py-12">
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    You May Also Like
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    More fresh picks for your basket.
                                </p>
                            </div>
                            <Link
                                href="/product"
                                className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                            >
                                View all →
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {products
                                .filter((item) => item.id !== product.id)
                                .map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/product/${item.slug}`}
                                        className="rounded-2xl border border-slate-100 bg-white p-3 transition hover:-translate-y-1 hover:shadow-lg sm:p-4"
                                    >
                                        <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, 25vw"
                                                className="object-cover"
                                            />
                                        </div>
                                        <h3 className="mt-3 font-semibold text-slate-800">
                                            {item.name}
                                        </h3>
                                        <p className="mt-2 font-bold text-emerald-700">
                                            ₹{item.price}
                                            <span className="ml-2 text-xs font-normal text-slate-400 line-through">
                                                ₹{item.oldPrice}
                                            </span>
                                        </p>
                                    </Link>
                                ))}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
