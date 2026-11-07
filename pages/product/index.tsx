import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { apiRequest } from "@/lib/client";
import type { GetServerSideProps } from "next";

type Product = {
    id: number;
    name: string;
    slug: string;
    category_id: number;
    price: number;
    mrp: number;
    unit: string;
    description: string;
    img: string;
    badge: string;
    rating: number;
    reviews: number;
    stock: number;
};

type Category = {
    id: number;
    name: string;
    slug: string;
    image: string;
    color: string;
    description: string;
};

type PageProps = {
    products: Product[];
    categories: Category[];
    pro_cats: Record<number, string>; // Maps category ID -> category Name
};

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
    try {
        const [productRes, categoryRes] = await Promise.all([
            apiRequest("products"),
            apiRequest("categories"),
        ]);

        const pros: Product[] = productRes?.data || [];
        const cats: Category[] = categoryRes?.data || [];

        return {
            props: {
                products: pros,
                categories: cats,
                pro_cats: Object.fromEntries(
                    cats.map((item) => [item.id, item.name])
                ),
            },
        };
    } catch (error) {
        console.error("Fetching error in getServerSideProps:", error);
        return {
            props: {
                products: [],
                categories: [],
                pro_cats: {},
            },
        };
    }
};

export default function Product({
    products = [],
    categories = [],
    pro_cats = {},
}: PageProps) {
    const { addToCart } = useCart();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Products");
    const [sort, setSort] = useState("default");

    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(search.toLowerCase().trim());

            const matchesCategory =
                category === "All Products" ||
                pro_cats[product.category_id] === category;

            return matchesSearch && matchesCategory;
        });

        if (sort === "low-high") {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sort === "high-low") {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (sort === "name") {
            result = [...result].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }

        return result;
    }, [products, search, category, sort, pro_cats]);

    return (
        <>
            <Head>
                <title>Shop Fresh Groceries Online | Freshora</title>
                <meta
                    name="description"
                    content="Shop fresh fruits, vegetables, dairy, bakery and everyday groceries at Freshora."
                />
            </Head>

            <div className="min-h-screen bg-slate-50">
                {/* Page Hero */}
                <section className="bg-emerald-700 px-4 py-14 text-white sm:py-20">
                    <div className="mx-auto max-w-7xl">
                        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">
                            Freshora Online Store
                        </p>

                        <h1 className="mt-3 text-3xl font-bold sm:text-5xl">
                            Fresh Products for Every Day
                        </h1>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50 sm:text-base">
                            Discover fresh fruits, vegetables, dairy and everyday essentials.
                            Everything you need in one place.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-5 text-sm font-medium">
                            <span>✓ Quality Products</span>
                            <span>✓ Easy Shopping</span>
                            <span>✓ Convenient Delivery</span>
                        </div>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="mb-7 flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="hover:text-emerald-700">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="font-semibold text-slate-800">Products</span>
                    </div>

                    {/* Search and Filter */}
                    <div className="mb-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            {/* Search input */}
                            <div className="relative w-full lg:max-w-md">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                                    ⌕
                                </span>

                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>

                            {/* Category dropdown & Sorting */}
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
                                >
                                    <option value="All Products">All Products</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
                                >
                                    <option value="default">Sort: Default</option>
                                    <option value="low-high">Price: Low to High</option>
                                    <option value="high-low">Price: High to Low</option>
                                    <option value="name">Name: A to Z</option>
                                </select>
                            </div>
                        </div>

                        {/* Category chips */}
                        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                            <button
                                type="button"
                                onClick={() => setCategory("All Products")}
                                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${category === "All Products"
                                    ? "bg-emerald-600 text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                                    }`}
                            >
                                All Products
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setCategory(cat.name)}
                                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${category === cat.name
                                        ? "bg-emerald-600 text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Heading */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Shop All Products
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {filteredProducts.length} products found
                            </p>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredProducts.map((product) => {
                                const discount =
                                    product.mrp > product.price
                                        ? Math.round(
                                            ((product.mrp - product.price) / product.mrp) * 100
                                        )
                                        : 0;

                                return (
                                    <div
                                        key={product.id}
                                        className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        {/* Product Image */}
                                        <div className="relative aspect-square overflow-hidden bg-slate-50">
                                            <Link href={`/product/${product.slug}`}>
                                                <Image
                                                    width={287}
                                                    height={287}
                                                    src={product.img}
                                                    alt={product.name}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            </Link>

                                            {discount > 0 && (
                                                <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white">
                                                    {discount}% OFF
                                                </span>
                                            )}

                                            <Link
                                                href={`/product/${product.slug}`}
                                                aria-label={`View ${product.name}`}
                                                className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg text-slate-700 shadow-md transition hover:bg-emerald-600 hover:text-white"
                                            >
                                                ↗
                                            </Link>
                                        </div>

                                        {/* Product Information */}
                                        <div className="p-3 sm:p-4">
                                            <p className="text-xs font-medium text-emerald-700">
                                                {pro_cats[product.category_id] || "General"}
                                            </p>

                                            <Link href={`/product/${product.slug}`}>
                                                <h3 className="mt-2 min-h-10 text-sm font-bold text-slate-900 transition hover:text-emerald-700 sm:text-base">
                                                    {product.name}
                                                </h3>
                                            </Link>

                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-xs text-slate-500">
                                                    {product.unit}
                                                </span>
                                                <span className="text-xs text-amber-500">
                                                    ★ {product.rating}
                                                </span>
                                            </div>

                                            {/* Price */}
                                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                                <span className="text-lg font-bold text-slate-900">
                                                    ₹{product.price}
                                                </span>
                                                {product.mrp > product.price && (
                                                    <span className="text-xs text-slate-400 line-through">
                                                        ₹{product.mrp}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Add to Cart */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    addToCart({
                                                        id: product.id,
                                                        name: product.name,
                                                        slug: product.slug,
                                                        price: product.price,
                                                        image: product.img,
                                                        unit: product.unit,
                                                    })
                                                }
                                                disabled={product.stock === 0}
                                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {product.stock === 0 ? (
                                                    "Out of Stock"
                                                ) : (
                                                    <>
                                                        <span>+</span> Add to Cart
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-slate-100 bg-white px-4 py-16 text-center">
                            <div className="text-5xl">🔍</div>

                            <h3 className="mt-4 text-xl font-bold text-slate-900">
                                No products found
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Try another search or select a different category.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setCategory("All Products");
                                    setSort("default");
                                }}
                                className="mt-5 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}