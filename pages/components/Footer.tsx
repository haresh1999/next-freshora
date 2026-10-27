import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
            {/* Newsletter */}
            <div className="border-b border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 lg:py-14">
                    <div className="max-w-lg">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
                            Stay in the loop
                        </span>
                        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Get 10% off your first order.
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Subscribe to receive new arrivals, exclusive offers and shopping inspiration.
                        </p>
                    </div>

                    <form
                        action="/newsletter"
                        method="POST"
                        className="flex w-full max-w-md gap-2"
                    >
                        <label htmlFor="newsletter-email" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="newsletter-email"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            required
                            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        />
                        <button
                            type="submit"
                            className="shrink-0 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 sm:px-6"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">

                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-2 lg:pr-10">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <Image
                                src="/logo.png"
                                alt="Freshora Grocery"
                                width={200}
                                height={60}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                            Discover products you'll love. Shop your favorites with a
                            seamless shopping experience, great value and reliable service.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex items-center gap-3">
                            <Link
                                href="https://instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 transition hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="1.7" className="h-5 w-5" aria-hidden="true">
                                    <rect x="3" y="3" width="18" height="18" rx="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                                </svg>
                            </Link>

                            <Link
                                href="https://facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 transition hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor"
                                    className="h-5 w-5" aria-hidden="true">
                                    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
                                </svg>
                            </Link>

                            <Link
                                href="https://youtube.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="YouTube"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 transition hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor"
                                    className="h-5 w-5" aria-hidden="true">
                                    <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.4V8.6l5.9 3.4-5.9 3.4Z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-sm font-bold text-white">Shop</h3>
                        <ul className="mt-5 space-y-3 text-sm">
                            <li><Link href="/shop" className="transition hover:text-emerald-400">All Products</Link></li>
                            <li><Link href="/categories" className="transition hover:text-emerald-400">Categories</Link></li>
                            <li><Link href="/new-arrivals" className="transition hover:text-emerald-400">New Arrivals</Link></li>
                            <li><Link href="/bestsellers" className="transition hover:text-emerald-400">Best Sellers</Link></li>
                            <li><Link href="/deals" className="transition hover:text-emerald-400">Special Offers</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-sm font-bold text-white">Customer Service</h3>
                        <ul className="mt-5 space-y-3 text-sm">
                            <li><Link href="/contact" className="transition hover:text-emerald-400">Contact Us</Link></li>
                            <li><Link href="/account/orders" className="transition hover:text-emerald-400">Track Your Order</Link></li>
                            <li><Link href="/shipping" className="transition hover:text-emerald-400">Shipping Information</Link></li>
                            <li><Link href="/returns" className="transition hover:text-emerald-400">Returns & Refunds</Link></li>
                            <li><Link href="/faq" className="transition hover:text-emerald-400">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-bold text-white">Company</h3>
                        <ul className="mt-5 space-y-3 text-sm">
                            <li><Link href="/about" className="transition hover:text-emerald-400">About Us</Link></li>
                            <li><Link href="/privacy-policy" className="transition hover:text-emerald-400">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="transition hover:text-emerald-400">Terms & Conditions</Link></li>
                            <li><Link href="/shipping-policy" className="transition hover:text-emerald-400">Shipping Policy</Link></li>
                            <li><Link href="/return-policy" className="transition hover:text-emerald-400">Return Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Contact & Trust */}
                <div className="mt-12 grid grid-cols-1 gap-5 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-start gap-3">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="1.6" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M4 6h16v12H4z M4 7l8 6 8-6" />
                        </svg>
                        <div>
                            <p className="text-sm font-semibold text-white">Email Support</p>
                            <Link href="mailto:support@example.com"
                                className="mt-1 block text-sm text-slate-400 transition hover:text-emerald-400">
                                support@example.com
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="1.6" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.2 4.2 2 2 0 0 1 4.2 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2Z" />
                        </svg>
                        <div>
                            <p className="text-sm font-semibold text-white">Customer Care</p>
                            <Link href="tel:+910000000000"
                                className="mt-1 block text-sm text-slate-400 transition hover:text-emerald-400">
                                +91 00000 00000
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="1.6" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="m9 12 2 2 4-4" />
                        </svg>
                        <div>
                            <p className="text-sm font-semibold text-white">Secure Shopping</p>
                            <p className="mt-1 text-sm text-slate-400">
                                Your privacy matters to us.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        Secure payment options
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                        {["UPI", "VISA", "Mastercard", "RuPay", "COD"].map((method) => (
                            <span
                                key={method}
                                className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-300"
                            >
                                {method}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-6 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
                    <p>
                        © {new Date().getFullYear()} Shopora. All rights reserved.
                    </p>
                    <p>Made for a better shopping experience.</p>
                </div>
            </div>
        </footer>
    );
}
