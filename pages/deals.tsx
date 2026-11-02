
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";

type DealProduct = {
    id: number;
    name: string;
    slug: string;
    category: string;
    price: number;
    oldPrice: number;
    image: string;
    unit: string;
    badge: string;
};

const dealProducts: DealProduct[] = [
    {
        id: 101,
        name: "Fresh Red Apples",
        slug: "fresh-red-apples",
        category: "Fruits",
        price: 149,
        oldPrice: 199,
        image:
            "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=85",
        unit: "1 kg",
        badge: "BEST DEAL",
    },
    {
        id: 102,
        name: "Fresh Organic Milk",
        slug: "fresh-organic-milk",
        category: "Dairy",
        price: 55,
        oldPrice: 70,
        image:
            "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=85",
        unit: "1 Litre",
        badge: "POPULAR",
    },
    {
        id: 103,
        name: "Fresh Broccoli",
        slug: "fresh-broccoli",
        category: "Vegetables",
        price: 79,
        oldPrice: 110,
        image:
            "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=700&q=85",
        unit: "500 g",
        badge: "HOT DEAL",
    },
    {
        id: 104,
        name: "Brown Bread",
        slug: "brown-bread",
        category: "Bakery",
        price: 40,
        oldPrice: 55,
        image:
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85",
        unit: "400 g",
        badge: "SALE",
    },
    {
        id: 105,
        name: "Fresh Bananas",
        slug: "fresh-bananas",
        category: "Fruits",
        price: 39,
        oldPrice: 55,
        image:
            "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=85",
        unit: "1 dozen",
        badge: "BEST DEAL",
    },
    {
        id: 106,
        name: "Fresh Orange Juice",
        slug: "fresh-orange-juice",
        category: "Beverages",
        price: 89,
        oldPrice: 120,
        image:
            "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=85",
        unit: "1 Litre",
        badge: "POPULAR",
    },
    {
        id: 107,
        name: "Fresh Strawberries",
        slug: "fresh-strawberries",
        category: "Fruits",
        price: 99,
        oldPrice: 149,
        image:
            "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=700&q=85",
        unit: "250 g",
        badge: "HOT DEAL",
    },
    {
        id: 108,
        name: "Fresh Tomatoes",
        slug: "fresh-tomatoes",
        category: "Vegetables",
        price: 29,
        oldPrice: 45,
        image:
            "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=85",
        unit: "500 g",
        badge: "SALE",
    },
];

const categories = [
    "All Deals",
    "Fruits",
    "Vegetables",
    "Dairy",
    "Bakery",
    "Beverages",
];

function getDiscount(oldPrice: number, price: number) {
    return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export default function Deals() {

    const { addToCart } = useCart();

    const [activeCategory, setActiveCategory] = useState("All Deals");
    const [addedProduct, setAddedProduct] = useState<number | null>(null);

    const filteredProducts = useMemo(() => {
        if (activeCategory === "All Deals") {
            return dealProducts;
        }

        return dealProducts.filter(
            (product) => product.category === activeCategory
        );
    }, [activeCategory]);

    function handleAddToCart(product: DealProduct) {
        addToCart(
            {
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.image,
                unit: product.unit,
            },
            1
        );

        setAddedProduct(product.id);

        setTimeout(() => {
            setAddedProduct(null);
        }, 1500);
    }

    return (
        <>
            <Head>
                <title>Best Grocery Deals & Offers | Freshora</title>
                <meta
                    name="description"
                    content="Discover amazing grocery discounts, fresh food deals and special offers at Freshora."
                />
            </Head>

            <main className="min-h-screen bg-slate-50">

                {/* HERO BANNER */}
                <section className="relative overflow-hidden bg-emerald-800 px-4 py-14 text-white sm:py-20">
                    <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime-400/20 blur-3xl" />
                    <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

                    <div className="relative mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">

                        <div>
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-lime-200">
                                Freshora Special Offers
                            </span>

                            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                                Fresh Deals.
                                <br />
                                <span className="text-lime-300">
                                    Better Prices.
                                </span>
                            </h1>

                            <p className="mt-5 max-w-lg text-sm leading-7 text-emerald-50 sm:text-base">
                                Discover amazing savings on fresh fruits, vegetables,
                                dairy products and everyday grocery essentials.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href="#best-deals"
                                    className="rounded-xl bg-lime-400 px-7 py-3.5 text-sm font-bold text-emerald-950 transition hover:bg-lime-300"
                                >
                                    Explore Deals →
                                </a>

                                <Link
                                    href="/categories"
                                    className="rounded-xl border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                                >
                                    Browse Categories
                                </Link>
                            </div>

                            <div className="mt-9 flex flex-wrap gap-6 text-sm text-emerald-100">
                                <span>✓ Fresh Quality</span>
                                <span>✓ Great Savings</span>
                                <span>✓ Easy Shopping</span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85"
                                    alt="Fresh fruits and vegetables"
                                    className="h-72 w-full object-cover sm:h-96"
                                />
                            </div>

                            <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white p-4 text-slate-900 shadow-xl sm:-left-7 sm:p-5">
                                <p className="text-xs font-semibold text-slate-500">
                                    Fresh grocery savings
                                </p>
                                <p className="mt-1 text-2xl font-extrabold text-emerald-700">
                                    Up to 30% OFF
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    On selected products
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* PROMOTION BENEFITS */}
                <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">

                    {[
                        {
                            icon: "🥬",
                            title: "Fresh Products",
                            description: "Quality groceries for your family.",
                        },
                        {
                            icon: "💰",
                            title: "Great Savings",
                            description: "Enjoy attractive prices on selected items.",
                        },
                        {
                            icon: "🚚",
                            title: "Easy Delivery",
                            description: "Get your groceries delivered conveniently.",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                                {item.icon}
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900">
                                    {item.title}
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}

                </section>

                {/* BEST DEALS */}
                <section
                    id="best-deals"
                    className="mx-auto max-w-7xl scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
                >

                    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
                                Don't Miss Out
                            </p>

                            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                                Today's Best Deals
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Save more on your everyday grocery shopping.
                            </p>
                        </div>

                        <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                            {filteredProducts.length} Offers Available
                        </span>
                    </div>

                    {/* CATEGORY FILTER */}
                    <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${activeCategory === category
                                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                                    : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-700"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* PRODUCT GRID */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">

                            {filteredProducts.map((product) => {
                                const discount = getDiscount(
                                    product.oldPrice,
                                    product.price
                                );

                                return (
                                    <div
                                        key={product.id}
                                        className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >

                                        {/* PRODUCT IMAGE */}
                                        <div className="relative aspect-square overflow-hidden bg-slate-50">

                                            <Link href={`/product/${product.slug}`}>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                                />
                                            </Link>

                                            <span className="absolute left-3 top-3 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-extrabold text-white shadow">
                                                {discount}% OFF
                                            </span>

                                            <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-slate-700 shadow-sm">
                                                {product.badge}
                                            </span>

                                        </div>

                                        {/* PRODUCT DETAILS */}
                                        <div className="p-3 sm:p-4">

                                            <p className="text-xs font-medium text-emerald-700">
                                                {product.category}
                                            </p>

                                            <Link href={`/product/${product.slug}`}>
                                                <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-bold text-slate-900 transition hover:text-emerald-700 sm:text-base">
                                                    {product.name}
                                                </h3>
                                            </Link>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {product.unit}
                                            </p>

                                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                                <span className="text-lg font-extrabold text-slate-900">
                                                    ₹{product.price}
                                                </span>

                                                <span className="text-xs text-slate-400 line-through">
                                                    ₹{product.oldPrice}
                                                </span>
                                            </div>

                                            <p className="mt-1 text-xs font-semibold text-emerald-700">
                                                You save ₹{product.oldPrice - product.price}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() => handleAddToCart(product)}
                                                className={`mt-4 w-full rounded-xl px-3 py-3 text-xs font-bold transition sm:text-sm ${addedProduct === product.id
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                                                    }`}
                                            >
                                                {addedProduct === product.id
                                                    ? "✓ Added to Cart"
                                                    : "+ Add to Cart"}
                                            </button>

                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    ) : (
                        <div className="rounded-2xl bg-white p-12 text-center">
                            <p className="text-4xl">🛍️</p>
                            <h3 className="mt-4 text-xl font-bold text-slate-900">
                                No deals available
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                Check another category for more offers.
                            </p>
                        </div>
                    )}

                </section>

                {/* PROMO BANNER */}
                <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl bg-lime-100 px-6 py-10 sm:px-10 sm:py-14">
                        <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-lime-300/50 blur-3xl" />

                        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                                    Freshora Everyday Essentials
                                </span>

                                <h2 className="mt-3 max-w-xl text-2xl font-extrabold text-slate-900 sm:text-3xl">
                                    Fill Your Basket.
                                    <br />
                                    Save More Every Day.
                                </h2>

                                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">
                                    Explore our complete grocery collection and
                                    discover products for every household need.
                                </p>
                            </div>

                            <Link
                                href="/categories"
                                className="shrink-0 rounded-xl bg-emerald-700 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-800"
                            >
                                Shop All Categories →
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
}
