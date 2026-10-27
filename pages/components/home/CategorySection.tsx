import Link from "next/link";
import Image from "next/image";

const categories = [
    {
        name: "Fruits & Vegetables",
        description: "Fresh from the farm",
        slug: "fruits-vegetables",
        image:
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
        color: "bg-green-50",
    },
    {
        name: "Dairy & Eggs",
        description: "Daily essentials",
        slug: "dairy-eggs",
        image:
            "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80",
        color: "bg-amber-50",
    },
    {
        name: "Grocery & Staples",
        description: "Stock up your pantry",
        slug: "grocery-staples",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80",
        color: "bg-orange-50",
    },
    {
        name: "Snacks & Beverages",
        description: "Treat yourself",
        slug: "snacks-beverages",
        image: "https://images.unsplash.com/photo-1604719312245-6d2c47114758?auto=format&fit=crop&w=500&q=80",
        color: "bg-rose-50",
    },
    {
        name: "Bakery",
        description: "Freshly baked goodness",
        slug: "bakery",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
        color: "bg-yellow-50",
    },
    {
        name: "Personal Care",
        description: "Care for yourself",
        slug: "personal-care",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=500&q=80",
        color: "bg-pink-50",
    },
    {
        name: "Household",
        description: "Essentials for your home",
        slug: "household",
        image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=500&q=80",
        color: "bg-blue-50",
    },
    {
        name: "Baby Care",
        description: "Little things, big care",
        slug: "baby-care",
        image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=500&q=80",
        color: "bg-purple-50",
    },
];

export default function CategorySection() {
    return (
        <section className="bg-white py-14 sm:py-16 lg:py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Explore Freshora
                        </span>

                        <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                            Shop by <span className="text-emerald-600">Category</span>
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                            Everything you need for your home, all in one place.
                            Discover your everyday favorites.
                        </p>
                    </div>

                    <Link
                        href="/categories"
                        className="inline-flex w-fit items-center gap-2 text-sm font-bold text-emerald-700 transition hover:text-emerald-800"
                    >
                        View all categories
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>

                {/* Category Grid */}
                <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/categories/${category.slug}`}
                            className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                        >
                            {/* Category Image */}
                            <div
                                className={`relative aspect-4/3 overflow-hidden ${category.color}`}
                            >
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    width={500}
                                    height={100}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />

                                <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg text-emerald-700 shadow-sm transition group-hover:bg-emerald-600 group-hover:text-white">
                                    <span aria-hidden="true">↗</span>
                                </span>
                            </div>

                            {/* Category Details */}
                            <div className="p-3 sm:p-4">
                                <h3 className="text-sm font-bold leading-5 text-slate-900 transition group-hover:text-emerald-700 sm:text-base">
                                    {category.name}
                                </h3>

                                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                    {category.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom Promo */}
                <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div>
                        <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                            Your daily essentials are waiting!
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                            Explore our grocery collection and find your favorites.
                        </p>
                    </div>

                    <Link
                        href="/shop"
                        className="inline-flex w-fit shrink-0 items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                    >
                        Explore Products →
                    </Link>
                </div>

            </div>
        </section>
    );
}
