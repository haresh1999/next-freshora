
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-lime-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">

                    {/* Left Content */}
                    <div className="relative z-10">

                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700 shadow-sm sm:text-sm">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Fresh groceries delivered
                        </div>

                        <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                            Fresh Essentials
                            <span className="mt-1 block text-emerald-600">
                                for a Better Tomorrow.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                            Discover fresh fruits, vegetables, everyday groceries and
                            household essentials, delivered right to your doorstep.
                        </p>

                        {/* Search Bar */}
                        <form
                            action="/search"
                            method="GET"
                            className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-emerald-900/5 transition focus-within:border-emerald-400"
                        >
                            <svg
                                className="ml-2 h-5 w-5 shrink-0 text-slate-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                aria-hidden="true"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16 16 4 4"
                                />
                            </svg>

                            <input
                                type="search"
                                name="q"
                                placeholder="Search fruits, vegetables, groceries..."
                                aria-label="Search groceries"
                                className="min-w-0 flex-1 border-0 bg-transparent px-2 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0 sm:text-base"
                            />

                            <button
                                type="submit"
                                className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:px-6"
                            >
                                Search
                            </button>
                        </form>

                        {/* CTA Buttons */}
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <Link
                                href="/shop"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                            >
                                Shop Now
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 12h14m-6-6 6 6-6 6"
                                    />
                                </svg>
                            </Link>

                            <Link
                                href="/categories"
                                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
                            >
                                Explore Categories
                            </Link>
                        </div>

                        {/* Benefits */}
                        <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-5 sm:flex sm:flex-wrap sm:gap-7">

                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                    <svg viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="1.7"
                                        className="h-5 w-5" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M3 7h11v11H3zM14 11h4l3 4v3h-7z" />
                                        <circle cx="7.5" cy="19" r="2" />
                                        <circle cx="17.5" cy="19" r="2" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Fast Delivery</p>
                                    <p className="mt-1 text-xs text-slate-500">At your doorstep</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                    <svg viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="1.7"
                                        className="h-5 w-5" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 21s8-4 8-11V5l-8-3-8 3v5c0 7 8 11 8 11Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="m9 12 2 2 4-4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Quality First</p>
                                    <p className="mt-1 text-xs text-slate-500">Carefully selected</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">

                        {/* Decorative Background */}
                        <div className="absolute inset-5 rounded-full bg-emerald-100/70 blur-3xl" />

                        <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-2xl shadow-emerald-900/10 sm:p-5">

                            <div className="relative overflow-hidden rounded-[1.5rem] bg-emerald-50">

                                <img
                                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85"
                                    alt="Fresh colorful fruits and vegetables at a grocery market"
                                    className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[470px]"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 via-transparent to-transparent" />

                                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/95 p-4 shadow-xl backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                                                Fresh picks, every day
                                            </p>
                                            <h2 className="mt-1 text-lg font-extrabold text-slate-900 sm:text-2xl">
                                                Goodness in every basket.
                                            </h2>
                                        </div>

                                        <Link
                                            href="/shop"
                                            aria-label="Explore fresh groceries"
                                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2"
                                                className="h-5 w-5" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M5 12h14m-6-6 6 6-6 6" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Delivery Card */}
                        <div className="absolute -left-2 top-5 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white p-3 shadow-xl sm:-left-5 sm:top-10 sm:p-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                                🌿
                            </div>
                            <div>
                                <p className="text-sm font-extrabold text-slate-900">
                                    Fresh & Natural
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Everyday goodness
                                </p>
                            </div>
                        </div>

                        {/* Floating Offer Card */}
                        <div className="absolute -right-1 top-24 rounded-2xl bg-emerald-600 px-4 py-3 text-white shadow-xl sm:-right-4 sm:top-28 sm:px-5 sm:py-4">
                            <p className="text-xs font-medium text-emerald-100">
                                Your first order
                            </p>
                            <p className="mt-1 text-xl font-extrabold sm:text-2xl">
                                10% OFF
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
