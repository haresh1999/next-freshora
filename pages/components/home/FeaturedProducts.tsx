import Link from "next/link";

const products = [
    {
        id: 1,
        name: "Fresh Red Apples",
        category: "Fresh Fruits",
        price: 149,
        oldPrice: 180,
        unit: "1 kg",
        badge: "Bestseller",
        image:
            "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 2,
        name: "Fresh Organic Milk",
        category: "Dairy & Eggs",
        price: 64,
        oldPrice: 72,
        unit: "1 litre",
        badge: "Fresh",
        image:
            "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 3,
        name: "Whole Wheat Bread",
        category: "Bakery",
        price: 45,
        oldPrice: 55,
        unit: "400 g",
        badge: "Popular",
        image:
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 4,
        name: "Fresh Green Broccoli",
        category: "Vegetables",
        price: 79,
        oldPrice: 99,
        unit: "500 g",
        badge: "Healthy",
        image:
            "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80",
    },
];

export default function FeaturedProducts() {
    return (
        <section className="bg-white py-14 sm:py-16 lg:py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section heading */}
                <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
                    <div>
                        <span className="mb-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                            Handpicked for you
                        </span>

                        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                            Featured <span className="text-emerald-600">Products</span>
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                            Everyday essentials, carefully selected for your family.
                        </p>
                    </div>

                    <Link
                        href="/product"
                        className="shrink-0 text-sm font-bold text-emerald-700 transition hover:text-emerald-800"
                    >
                        View all <span aria-hidden="true">→</span>
                    </Link>
                </div>

                {/* Products grid */}
                <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                    {products.map((product) => (
                        <article
                            key={product.id}
                            className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-900/5"
                        >
                            {/* Product image */}
                            <div className="relative aspect-square overflow-hidden bg-slate-50">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />

                                <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white sm:text-xs">
                                    {product.badge}
                                </span>

                                <button
                                    type="button"
                                    aria-label={`Add ${product.name} to wishlist`}
                                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-lg text-slate-500 shadow-sm transition hover:bg-rose-50 hover:text-rose-500"
                                >
                                    ♡
                                </button>
                            </div>

                            {/* Product details */}
                            <div className="p-3 sm:p-4">
                                <p className="text-xs font-medium text-slate-400">
                                    {product.category}
                                </p>

                                <h3 className="mt-1 truncate text-sm font-bold text-slate-800 sm:text-base">
                                    {product.name}
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                    {product.unit}
                                </p>

                                <div className="mt-3 flex items-center justify-between gap-2">
                                    <div className="flex flex-wrap items-baseline gap-1.5">
                                        <span className="text-base font-extrabold text-slate-900 sm:text-lg">
                                            ₹{product.price}
                                        </span>
                                        <span className="text-xs text-slate-400 line-through">
                                            ₹{product.oldPrice}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        aria-label={`Add ${product.name} to cart`}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-xl font-medium text-emerald-700 transition hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bottom banner */}
                <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-emerald-50 p-5 sm:mt-10 sm:flex-row sm:items-center sm:p-7">
                    <div>
                        <h3 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                            Freshness in every basket
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                            Discover more essentials for your everyday needs.
                        </p>
                    </div>

                    <Link
                        href="/product"
                        className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                    >
                        Explore Products <span className="ml-2">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
