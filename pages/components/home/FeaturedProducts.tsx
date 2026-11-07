import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function FeaturedProducts({ products = [], categories = [] }) {

    const cats_slug = Object.fromEntries(
        categories.map((item) => [item.id, item.slug])
    );
    const cats_name = Object.fromEntries(
        categories.map((item) => [item.id, item.name])
    );

    const { addToCart } = useCart();

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
                                <Link href={`/product/${product.name
                                    .trim()
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}>
                                    <Image
                                        width={284}
                                        height={284}
                                        src={product.img}
                                        alt={product.name || "Product image"}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </Link>

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
                                <Link href={`/categories/${cats_slug[product.category_id]}`}>
                                    <p className="text-xs font-medium text-slate-400">
                                        {cats_name[product.category_id]}
                                    </p>
                                </Link>
                                <Link href={`/product/${product.name
                                    .trim()
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}>
                                    <h3 className="mt-1 truncate text-sm font-bold text-slate-800 sm:text-base">
                                        {product.name}
                                    </h3>
                                </Link>

                                <p className="mt-1 text-xs text-slate-500">
                                    {product.unit}
                                </p>

                                <div className="mt-3 flex items-center justify-between gap-2">
                                    <div className="flex flex-wrap items-baseline gap-1.5">
                                        <span className="text-base font-extrabold text-slate-900 sm:text-lg">
                                            ₹{product.price}
                                        </span>
                                        <span className="text-xs text-slate-400 line-through">
                                            ₹{product.mrp}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            addToCart({
                                                id: product.id,
                                                name: product.name,
                                                slug: product.name
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-"),
                                                price: product.price,
                                                image: product.img,
                                                unit: product.unit,
                                            })
                                        }}
                                        // disabled={product.stock === 0}
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
