import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const categories = [
    {
        name: "Fruits & Vegetables",
        slug: "fruits-vegetables",
        description: "Fresh fruits and farm-picked vegetables.",
        image:
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
        color: "bg-green-50",
        count: "Fresh & Natural",
    },
    {
        name: "Dairy & Eggs",
        slug: "dairy-eggs",
        description: "Milk, butter, cheese, yogurt and eggs.",
        image:
            "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80",
        color: "bg-blue-50",
        count: "Daily Essentials",
    },
    {
        name: "Grocery & Staples",
        slug: "grocery-staples",
        description: "Rice, flour, pulses, oils and spices.",
        image:
            "https://images.unsplash.com/photo-1601593768790-7f9b8b7d9c31?auto=format&fit=crop&w=600&q=80",
        color: "bg-amber-50",
        count: "Kitchen Essentials",
    },
    {
        name: "Snacks & Beverages",
        slug: "snacks-beverages",
        description: "Chips, biscuits, juices and refreshments.",
        image:
            "https://images.unsplash.com/photo-1621939514649-280e2aa9f1a7?auto=format&fit=crop&w=600&q=80",
        color: "bg-orange-50",
        count: "Tasty Treats",
    },
    {
        name: "Bakery",
        slug: "bakery",
        description: "Bread, buns, cookies and baked treats.",
        image:
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
        color: "bg-yellow-50",
        count: "Freshly Baked",
    },
    {
        name: "Personal Care",
        slug: "personal-care",
        description: "Everyday hygiene and personal care products.",
        image:
            "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
        color: "bg-pink-50",
        count: "Self Care",
    },
    {
        name: "Household",
        slug: "household",
        description: "Cleaning supplies and home essentials.",
        image:
            "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80",
        color: "bg-purple-50",
        count: "Home Essentials",
    },
    {
        name: "Baby Care",
        slug: "baby-care",
        description: "Baby care essentials for little ones.",
        image:
            "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80",
        color: "bg-sky-50",
        count: "For Your Little One",
    },
];

export default function CategoriesPage() {
    return (
        <>
            <Head>
                <title>Explore Categories | Freshora</title>
                <meta
                    name="description"
                    content="Explore Freshora grocery categories, including fresh produce, dairy, pantry staples, snacks, bakery and household essentials."
                />
            </Head>

            <main className="min-h-screen bg-slate-50">
                {/* Hero */}
                <section className="relative overflow-hidden bg-linear-to-br from-emerald-800 via-emerald-700 to-green-600">
                    <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-lime-300/10 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                        <nav className="mb-6 text-sm text-emerald-100">
                            <Link href="/" className="transition hover:text-white">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="font-semibold text-white">Categories</span>
                        </nav>

                        <div className="max-w-2xl">
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-50">
                                Your everyday grocery destination
                            </span>

                            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Explore All
                                <span className="block text-lime-300">Categories</span>
                            </h1>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-emerald-50 sm:text-base">
                                Find everything you need in one place, from fresh fruits and
                                vegetables to everyday pantry and household essentials.
                            </p>

                            <div className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white ring-1 ring-white/15">
                                <span aria-hidden="true">🛒</span>
                                Browse all 8 categories
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category grid */}
                <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                    <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
                                Shop your favourites
                            </p>
                            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                                Browse by Category
                            </h2>
                        </div>

                        <p className="text-sm text-slate-500">
                            Choose a category to start shopping.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                        {categories.map((category) => (

                            <Link
                                key={category.slug}
                                href={`/categories/${category.slug}`}
                                className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
                            >
                                <div className={`relative aspect-4/3 overflow-hidden ${category.color}`}>
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        width={600}
                                        height={450}
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                    />

                                    <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-sm">
                                        {category.count}
                                    </span>
                                </div>

                                <div className="p-3 sm:p-5">
                                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 sm:text-lg">
                                        {category.name}
                                    </h3>

                                    <p className="mt-2 hidden text-sm leading-6 text-slate-500 sm:block">
                                        {category.description}
                                    </p>

                                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-emerald-700 sm:text-sm">
                                        Explore Category →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-10 overflow-hidden rounded-3xl bg-emerald-50 p-6 sm:mt-14 sm:p-10">
                        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                                    Your daily essentials are waiting
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Discover products for your kitchen, home and family.
                                </p>
                            </div>

                            <Link
                                href="/product"
                                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
                            >
                                Shop All Products <span className="ml-2">→</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}