import Image from "next/image"
import Script from "next/script"
import Link from "next/link"

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-18 items-center justify-between gap-4">

                    <button
                        id="menuButton"
                        type="button"
                        aria-label="Open navigation menu"
                        aria-controls="mobileMenu"
                        aria-expanded="false"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 lg:hidden"
                    >

                        <svg
                            id="menuIcon"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    {/* Freshora Logo */}
                    <Link href="/" className="flex shrink-0 items-center gap-2.5" />
                    <Image
                        src="/logo.png"
                        alt="Freshora Grocery"
                        width={200}
                        height={60}
                        className="h-10 w-auto object-contain"
                    />

                    <nav className="hidden items-center gap-7 lg:flex">
                        <nav className="hidden items-center gap-7 lg:flex">
                            <Link
                                href="/"
                                className="text-sm font-semibold text-brand-700"
                            >
                                Home
                            </Link>

                            <Link
                                href="/shop"
                                className="text-sm font-medium text-slate-600 transition hover:text-brand-600"
                            >
                                Shop
                            </Link>

                            <Link
                                href="/categories"
                                className="text-sm font-medium text-slate-600 transition hover:text-brand-600"
                            >
                                Categories
                            </Link>

                            <Link
                                href="/deals"
                                className="text-sm font-medium text-slate-600 transition hover:text-brand-600"
                            >
                                Deals
                            </Link>

                            <Link
                                href="/about"
                                className="text-sm font-medium text-slate-600 transition hover:text-brand-600"
                            >
                                About
                            </Link>
                        </nav>
                    </nav>
                    <form action="/search" method="GET"
                        className="hidden min-w-0 max-w-sm flex-1 lg:flex">
                        <div className="flex w-full items-center rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-brand-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-500/10">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 shrink-0 text-slate-400"
                                fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="1.8">
                                <circle cx="11" cy="11" r="7" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16 16 4 4" />
                            </svg>
                            <input
                                type="search"
                                name="q"
                                placeholder="Search products..."
                                className="w-full border-0 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400 focus:ring-0"
                            />
                            <button type="submit"
                                className="text-xs font-semibold text-brand-700 hover:text-brand-900">
                                Search
                            </button>
                        </div>
                    </form>
                    <div className="flex shrink-0 items-center gap-1 sm:gap-3">

                        <Link href="/Link"
                            className="hidden items-center gap-2 rounded-xl p-2 transition hover:bg-slate-100 sm:flex">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-slate-700" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7">
                                <circle cx="12" cy="8" r="3.5" />
                                <path stroke-linecap="round"
                                    d="M5 20v-1.5a7 7 0 0114 0V20z" />
                            </svg>
                            <span className="hidden text-sm font-medium xl:block">Account</span>
                        </Link>

                        <Link href="/wishlist" aria-label="Link"
                            className="relative flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-slate-100">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-slate-700" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 00-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 00-.1-7.8z" />
                            </svg>
                        </Link>

                        <Link href="/cart" aria-label="Shopping Link"
                            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 transition hover:bg-brand-100">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-brand-700" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3 4h2l2.4 11.1a2 2 0 002 1.6h8.8a2 2 0 002-1.6L22 8H6" />
                                <circle cx="10" cy="20" r="1" />
                                <circle cx="18" cy="20" r="1" />
                            </svg>
                            <span id="cartCount"
                                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                                2
                            </span>
                        </Link>

                    </div>
                </div>

                <form action="/search" method="GET" className="pb-3 lg:hidden">
                    <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/10">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 shrink-0 text-slate-400"
                            fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="1.8">
                            <circle cx="11" cy="11" r="7" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16 16 4 4" />
                        </svg>
                        <input type="search" name="q"
                            placeholder="Search products, brands..."
                            className="w-full border-0 bg-transparent px-3 py-2.5 text-sm outline-none focus:ring-0" />
                        <button type="submit" aria-label="Search">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-slate-500" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                                <circle cx="11" cy="11" r="7" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16 16 4 4" />
                            </svg>
                        </button>
                    </div>
                </form>

                <nav id="mobileMenu"
                    className="hidden border-t border-slate-100 py-3 lg:hidden">
                    <div className="flex flex-col gap-1">
                        <Link href="/" className="rounded-lg bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700">Home</Link>
                        <Link href="/shop" className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">Shop All Products</Link>
                        <Link href="/categories" className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">Categories</Link>
                        <Link href="/deals" className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">Today's Deals</Link>
                        <Link href="/wishlist" className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">My Wishlist</Link>
                        <Link href="/account" className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">My Account / Login</Link>
                        <Link href="/about" className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">About Us</Link>
                    </div>
                </nav>

            </div>
            <Script src="/js/main.js" />
        </header>
    )
}