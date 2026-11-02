
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
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
    badge?: string;
};

const products: Product[] = [
    {
        id: 1,
        name: "Fresh Red Apples",
        slug: "fresh-red-apples",
        category: "Fruits",
        price: 149,
        oldPrice: 199,
        unit: "1 kg",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=85",
        badge: "Bestseller",
    },
    {
        id: 2,
        name: "Fresh Organic Milk",
        slug: "fresh-organic-milk",
        category: "Dairy",
        price: 55,
        oldPrice: 70,
        unit: "1 Litre",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=85",
        badge: "Popular",
    },
    {
        id: 3,
        name: "Fresh Broccoli",
        slug: "fresh-broccoli",
        category: "Vegetables",
        price: 79,
        oldPrice: 110,
        unit: "500 g",
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=700&q=85",
        badge: "Fresh",
    },
    {
        id: 4,
        name: "Brown Bread",
        slug: "brown-bread",
        category: "Bakery",
        price: 40,
        oldPrice: 55,
        unit: "400 g",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85",
    },
    {
        id: 5,
        name: "Fresh Bananas",
        slug: "fresh-bananas",
        category: "Fruits",
        price: 39,
        oldPrice: 55,
        unit: "1 Dozen",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=85",
        badge: "Hot Deal",
    },
    {
        id: 6,
        name: "Fresh Orange Juice",
        slug: "fresh-orange-juice",
        category: "Beverages",
        price: 89,
        oldPrice: 120,
        unit: "1 Litre",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=85",
    },
    {
        id: 7,
        name: "Fresh Strawberries",
        slug: "fresh-strawberries",
        category: "Fruits",
        price: 99,
        oldPrice: 149,
        unit: "250 g",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=700&q=85",
        badge: "Limited Offer",
    },
    {
        id: 8,
        name: "Fresh Tomatoes",
        slug: "fresh-tomatoes",
        category: "Vegetables",
        price: 29,
        oldPrice: 45,
        unit: "500 g",
        image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=85",
    },
    {
        id: 9,
        name: "Fresh Green Grapes",
        slug: "fresh-green-grapes",
        category: "Fruits",
        price: 89,
        oldPrice: 120,
        unit: "500 g",
        image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=700&q=85",
    },
    {
        id: 10,
        name: "Farm Fresh Carrots",
        slug: "farm-fresh-carrots",
        category: "Vegetables",
        price: 35,
        oldPrice: 50,
        unit: "500 g",
        image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=700&q=85",
    },
    {
        id: 11,
        name: "Fresh Cheese",
        slug: "fresh-cheese",
        category: "Dairy",
        price: 110,
        oldPrice: 140,
        unit: "200 g",
        image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=700&q=85",
    },
    {
        id: 12,
        name: "Mixed Dry Fruits",
        slug: "mixed-dry-fruits",
        category: "Grocery",
        price: 199,
        oldPrice: 249,
        unit: "250 g",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",
    },
];

const categories = [
    "All Products",
    "Fruits",
    "Vegetables",
    "Dairy",
    "Bakery",
    "Beverages",
    "Grocery",
];

export default function Shop() {
    const { addToCart } = useCart();

    const [activeCategory, setActiveCategory] = useState("All Products");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("featured");
    const [maxPrice, setMaxPrice] = useState(500);
    const [showFilters, setShowFilters] = useState(false);
    const [addedProduct, setAddedProduct] = useState<number | null>(null);

    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            const matchesCategory =
                activeCategory === "All Products" ||
                product.category === activeCategory;

            const matchesSearch = product.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesPrice = product.price <= maxPrice;

            return matchesCategory && matchesSearch && matchesPrice;
        });

        if (sort === "price-low") {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sort === "price-high") {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (sort === "name") {
            result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }, [activeCategory, search, sort, maxPrice]);

    function handleAddToCart(product: Product) {
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
        window.setTimeout(() => setAddedProduct(null), 1500);
    }

    function discount(price: number, oldPrice: number) {
        return Math.round(((oldPrice - price) / oldPrice) * 100);
    }

    return (
        <>
            <Head>
                <title>Shop Fresh Groceries Online | Freshora</title>
                <meta
                    name="description"
                    content="Shop fresh fruits, vegetables, dairy, bakery and everyday groceries at Freshora."
                />
            </Head>

            <main className="min-h-screen bg-slate-50 pb-16">
                {/* Hero */}
                <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-green-700">
                    <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />
                    <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
                        <div className="max-w-2xl">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-lime-200">
                                <span>✦</span> Freshness starts here
                            </div>

                            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Shop Fresh.
                                <span className="block text-lime-300">Live Better.</span>
                            </h1>

                            <p className="mt-5 max-w-xl text-base leading-7 text-emerald-100 sm:text-lg">
                                Discover fresh fruits, vegetables and everyday essentials
                                picked to make your shopping simple and enjoyable.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-white">
                                <span className="rounded-full bg-white/10 px-4 py-2">✦ Fresh picks</span>
                                <span className="rounded-full bg-white/10 px-4 py-2">✦ Everyday essentials</span>
                                <span className="rounded-full bg-white/10 px-4 py-2">✦ Great value</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Breadcrumb */}
                <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="transition hover:text-emerald-700">Home</Link>
                        <span>/</span>
                        <span className="font-semibold text-slate-800">Shop</span>
                    </div>
                </div>

                {/* Shop content */}
                <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                                Explore our collection
                            </p>
                            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                                All Products
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Find your everyday favourites in one place.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowFilters(!showFilters)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-500 lg:hidden"
                        >
                            <span>☷</span> {showFilters ? "Hide Filters" : "Show Filters"}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[250px_1fr]">
                        {/* Sidebar */}
                        <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
                            <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div>
                                    <h3 className="font-bold text-slate-900">Categories</h3>
                                    <div className="mt-4 space-y-1">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setActiveCategory(category)}
                                                className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition ${activeCategory === category
                                                    ? "bg-emerald-50 font-bold text-emerald-800"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-emerald-700"
                                                    }`}
                                            >
                                                <span>{category}</span>
                                                {activeCategory === category && <span>✓</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-5">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-slate-900">Price Range</h3>
                                        <span className="text-sm font-bold text-emerald-700">
                                            ₹{maxPrice}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="50"
                                        max="500"
                                        step="10"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                                        className="mt-5 w-full accent-emerald-600"
                                    />
                                    <div className="mt-2 flex justify-between text-xs text-slate-400">
                                        <span>₹50</span>
                                        <span>₹500</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setActiveCategory("All Products");
                                        setSearch("");
                                        setMaxPrice(500);
                                        setSort("featured");
                                    }}
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-emerald-500 hover:text-emerald-700"
                                >
                                    Reset Filters
                                </button>
                            </div>

                            <div className="mt-6 overflow-hidden rounded-2xl bg-emerald-900 p-5 text-white">
                                <p className="text-sm font-semibold text-lime-300">FRESHORA PICKS</p>
                                <h3 className="mt-3 text-2xl font-extrabold">
                                    Good food. Good mood.
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-emerald-100">
                                    Bring fresh goodness to your everyday meals.
                                </p>
                                <Link
                                    href="/categories"
                                    className="mt-5 inline-flex rounded-xl bg-lime-300 px-4 py-3 text-sm font-bold text-emerald-950 transition hover:bg-lime-200"
                                >
                                    Explore Categories →
                                </Link>
                            </div>
                        </aside>

                        {/* Products */}
                        <div>
                            {/* Search and sort */}
                            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                                <div className="relative flex-1">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                                        ⌕
                                    </span>
                                    <input
                                        type="search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search fruits, vegetables, groceries..."
                                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                    />
                                </div>

                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500"
                                >
                                    <option value="featured">Sort: Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name">Name: A to Z</option>
                                </select>
                            </div>

                            {/* Active category */}
                            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                                <p className="text-sm text-slate-500">
                                    Showing{" "}
                                    <span className="font-bold text-slate-900">
                                        {filteredProducts.length}
                                    </span>{" "}
                                    products
                                    {activeCategory !== "All Products" && (
                                        <> in <span className="font-semibold text-emerald-700">{activeCategory}</span></>
                                    )}
                                </p>
                            </div>

                            {/* Product grid */}
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                                    {filteredProducts.map((product) => (
                                        <article
                                            key={product.id}
                                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
                                        >
                                            <div className="relative aspect-square overflow-hidden bg-slate-100">
                                                <Link href={`/product/${product.slug}`}>
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 300px"
                                                        className="object-cover transition duration-500 group-hover:scale-105"
                                                    />
                                                </Link>

                                                {product.badge && (
                                                    <span className="absolute left-2 top-2 rounded-full bg-emerald-700 px-2.5 py-1 text-[10px] font-bold text-white sm:left-3 sm:top-3 sm:text-xs">
                                                        {product.badge}
                                                    </span>
                                                )}

                                                <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-rose-600 shadow-sm sm:right-3 sm:top-3 sm:text-xs">
                                                    {discount(product.price, product.oldPrice)}% OFF
                                                </span>
                                            </div>

                                            <div className="p-3 sm:p-4">
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 sm:text-xs">
                                                    {product.category}
                                                </p>

                                                <Link href={`/product/${product.slug}`}>
                                                    <h3 className="mt-1.5 line-clamp-2 min-h-10 text-sm font-bold text-slate-900 transition hover:text-emerald-700 sm:text-base">
                                                        {product.name}
                                                    </h3>
                                                </Link>

                                                <p className="mt-1 text-xs text-slate-400">{product.unit}</p>

                                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                                    <span className="text-base font-extrabold text-slate-900 sm:text-lg">
                                                        ₹{product.price}
                                                    </span>
                                                    <span className="text-xs text-slate-400 line-through">
                                                        ₹{product.oldPrice}
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleAddToCart(product)}
                                                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition sm:text-sm ${addedProduct === product.id
                                                        ? "bg-emerald-100 text-emerald-800"
                                                        : "bg-emerald-700 text-white hover:bg-emerald-800"
                                                        }`}
                                                >
                                                    {addedProduct === product.id ? (
                                                        <>✓ Added to Cart</>
                                                    ) : (
                                                        <>＋ Add to Cart</>
                                                    )}
                                                </button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
                                    <div className="text-5xl">🥬</div>
                                    <h3 className="mt-4 text-xl font-bold text-slate-900">
                                        No products found
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Try another search or change your filters.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearch("");
                                            setActiveCategory("All Products");
                                            setMaxPrice(500);
                                        }}
                                        className="mt-5 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
