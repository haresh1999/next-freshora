import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";

type Product = {
    id: number;
    name: string;
    slug: string;
    category: string;
    price: number;
    oldPrice: number;
    unit: string;
    image: string;
    stock: number;
    rating: number;
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
        image:
            "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=85",
        stock: 20,
        rating: 4.8,
    },
    {
        id: 2,
        name: "Fresh Broccoli",
        slug: "fresh-broccoli",
        category: "Fruits & Vegetables",
        price: 79,
        oldPrice: 99,
        unit: "500 g",
        image:
            "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=85",
        stock: 15,
        rating: 4.6,
    },
    {
        id: 3,
        name: "Fresh Milk",
        slug: "fresh-milk",
        category: "Dairy & Eggs",
        price: 64,
        oldPrice: 72,
        unit: "1 litre",
        image:
            "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=85",
        stock: 30,
        rating: 4.7,
    },
    {
        id: 4,
        name: "Whole Wheat Bread",
        slug: "whole-wheat-bread",
        category: "Bakery",
        price: 45,
        oldPrice: 55,
        unit: "400 g",
        image:
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=85",
        stock: 12,
        rating: 4.5,
    },
    {
        id: 5,
        name: "Fresh Bananas",
        slug: "fresh-bananas",
        category: "Fruits & Vegetables",
        price: 49,
        oldPrice: 60,
        unit: "1 dozen",
        image:
            "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=85",
        stock: 25,
        rating: 4.8,
    },
    {
        id: 6,
        name: "Fresh Orange Juice",
        slug: "fresh-orange-juice",
        category: "Snacks & Beverages",
        price: 99,
        oldPrice: 120,
        unit: "1 litre",
        image:
            "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=85",
        stock: 18,
        rating: 4.6,
    },
    {
        id: 7,
        name: "Organic Carrots",
        slug: "organic-carrots",
        category: "Fruits & Vegetables",
        price: 39,
        oldPrice: 50,
        unit: "500 g",
        image:
            "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=600&q=85",
        stock: 22,
        rating: 4.5,
    },
    {
        id: 8,
        name: "Fresh Strawberries",
        slug: "fresh-strawberries",
        category: "Fruits & Vegetables",
        price: 129,
        oldPrice: 160,
        unit: "250 g",
        image:
            "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=85",
        stock: 10,
        rating: 4.9,
    },
];

const categories = [
    "All Products",
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Bakery",
    "Snacks & Beverages",
];

export default function Product() {

    const { addToCart } = useCart();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Products");
    const [sort, setSort] = useState("default");

    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                category === "All Products" ||
                product.category === category;

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
    }, [search, category, sort]);

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
                            Discover fresh fruits, vegetables, dairy and everyday
                            essentials. Everything you need in one place.
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
                        <span className="font-semibold text-slate-800">
                            Products
                        </span>
                    </div>

                    {/* Search and Filter */}
                    <div className="mb-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                            {/* Search */}
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

                            {/* Category */}
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
                                >
                                    {categories.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>

                                {/* Sorting */}
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
                            {categories.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setCategory(item)}
                                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${category === item
                                        ? "bg-emerald-600 text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                                        }`}
                                >
                                    {item}
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
                                const discount = Math.round(
                                    ((product.oldPrice - product.price) /
                                        product.oldPrice) *
                                    100
                                );

                                return (
                                    <div
                                        key={product.id}
                                        className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        {/* Product Image */}
                                        <div className="relative aspect-square overflow-hidden bg-slate-50">
                                            <Link href={`/product/${product.slug}`}>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            </Link>

                                            <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white">
                                                {discount}% OFF
                                            </span>

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
                                                {product.category}
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
                                                <span className="text-xs text-slate-400 line-through">
                                                    ₹{product.oldPrice}
                                                </span>
                                            </div>

                                            {/* Add to Cart */}
                                            <button
                                                type="button"
                                                onClick={() => addToCart({
                                                    id: product.id,
                                                    name: product.name,
                                                    slug: product.slug,
                                                    price: product.price,
                                                    image: product.image,
                                                    unit: product.unit,
                                                })}
                                                disabled={product.stock === 0}
                                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <span>+</span>
                                                Add to Cart
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
