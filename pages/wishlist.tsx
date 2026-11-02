
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

type WishlistProduct = {
    id: number;
    name: string;
    slug: string;
    category: string;
    price: number;
    oldPrice: number;
    unit: string;
    image: string;
};

const initialProducts: WishlistProduct[] = [
    {
        id: 1,
        name: "Fresh Red Apples",
        slug: "fresh-red-apples",
        category: "Fruits",
        price: 149,
        oldPrice: 199,
        unit: "1 kg",
        image:
            "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=85",
    },
    {
        id: 2,
        name: "Fresh Organic Milk",
        slug: "fresh-organic-milk",
        category: "Dairy",
        price: 55,
        oldPrice: 70,
        unit: "1 Litre",
        image:
            "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=85",
    },
    {
        id: 3,
        name: "Fresh Strawberries",
        slug: "fresh-strawberries",
        category: "Fruits",
        price: 99,
        oldPrice: 149,
        unit: "250 g",
        image:
            "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=700&q=85",
    },
];

export default function Wishlist() {

    const { addToCart } = useCart();

    const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [addedProduct, setAddedProduct] = useState<number | null>(null);

    // Load wishlist from browser storage
    useEffect(() => {
        try {
            const savedWishlist = localStorage.getItem("freshora-wishlist");

            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist));
            } else {
                setWishlist(initialProducts);
            }
        } catch {
            setWishlist(initialProducts);
        }

        setLoaded(true);
    }, []);

    // Save wishlist whenever it changes
    useEffect(() => {
        if (loaded) {
            localStorage.setItem("freshora-wishlist", JSON.stringify(wishlist));
        }
    }, [wishlist, loaded]);

    function removeProduct(id: number) {
        setWishlist((previous) =>
            previous.filter((product) => product.id !== id)
        );
    }

    function addProductToCart(product: WishlistProduct) {
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

    function addAllToCart() {
        wishlist.forEach((product) => {
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
        });
    }

    const totalValue = wishlist.reduce(
        (total, product) => total + product.price,
        0
    );

    if (!loaded) {
        return <div className="min-h-[50vh] bg-slate-50" />;
    }

    return (
        <>
            <Head>
                <title>My Wishlist | Freshora</title>
                <meta
                    name="description"
                    content="View your favourite Freshora grocery products and add them to your cart."
                />
            </Head>

            <main className="min-h-screen bg-slate-50 pb-16">
                {/* Hero */}
                <section className="bg-gradient-to-br from-emerald-950 via-emerald-800 to-green-700">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                            <div>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-lime-200">
                                    <span>♡</span> Your favourite collection
                                </div>

                                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                                    My Wishlist
                                </h1>

                                <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-100 sm:text-base">
                                    Keep all your favourite products together and shop them
                                    whenever you like.
                                </p>
                            </div>

                            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-5xl text-lime-300">
                                ♡
                            </div>
                        </div>
                    </div>
                </section>

                {/* Breadcrumb */}
                <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="hover:text-emerald-700">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="font-semibold text-slate-800">Wishlist</span>
                    </div>
                </div>

                <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                    {/* Wishlist heading */}
                    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-2xl font-extrabold text-slate-900">
                                Saved Products
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {wishlist.length} {wishlist.length === 1 ? "product" : "products"} saved in your wishlist
                            </p>
                        </div>

                        {wishlist.length > 0 && (
                            <button
                                type="button"
                                onClick={addAllToCart}
                                className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800"
                            >
                                Add All to Cart →
                            </button>
                        )}
                    </div>

                    {wishlist.length > 0 ? (
                        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[1fr_300px]">
                            {/* Products */}
                            <div className="space-y-4">
                                {wishlist.map((product) => (
                                    <article
                                        key={product.id}
                                        className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-200 sm:flex-row sm:items-center"
                                    >
                                        {/* Product image */}
                                        <Link
                                            href={`/product/${product.slug}`}
                                            className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-32 sm:w-32"
                                        >
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 640px) 100vw, 128px"
                                                className="object-cover transition duration-300 hover:scale-105"
                                            />
                                        </Link>

                                        {/* Product details */}
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                                                {product.category}
                                            </p>

                                            <Link href={`/product/${product.slug}`}>
                                                <h3 className="mt-1 text-lg font-bold text-slate-900 hover:text-emerald-700">
                                                    {product.name}
                                                </h3>
                                            </Link>

                                            <p className="mt-1 text-sm text-slate-400">
                                                {product.unit}
                                            </p>

                                            <div className="mt-3 flex items-center gap-2">
                                                <span className="text-xl font-extrabold text-slate-900">
                                                    ₹{product.price}
                                                </span>
                                                <span className="text-sm text-slate-400 line-through">
                                                    ₹{product.oldPrice}
                                                </span>
                                                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                                                    {Math.round(
                                                        ((product.oldPrice - product.price) /
                                                            product.oldPrice) *
                                                        100
                                                    )}
                                                    % OFF
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 sm:w-40 sm:shrink-0 sm:flex-col">
                                            <button
                                                type="button"
                                                onClick={() => addProductToCart(product)}
                                                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition ${addedProduct === product.id
                                                    ? "bg-emerald-100 text-emerald-800"
                                                    : "bg-emerald-700 text-white hover:bg-emerald-800"
                                                    }`}
                                            >
                                                {addedProduct === product.id
                                                    ? "✓ Added"
                                                    : "＋ Add to Cart"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => removeProduct(product.id)}
                                                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                                            >
                                                <span>♡</span>
                                                <span className="sm:inline">Remove</span>
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Summary */}
                            <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
                                <h3 className="text-lg font-extrabold text-slate-900">
                                    Wishlist Summary
                                </h3>

                                <div className="mt-5 space-y-4">
                                    <div className="flex justify-between text-sm text-slate-500">
                                        <span>Total Products</span>
                                        <span className="font-bold text-slate-900">
                                            {wishlist.length}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm text-slate-500">
                                        <span>Total Value</span>
                                        <span className="font-bold text-slate-900">
                                            ₹{totalValue}
                                        </span>
                                    </div>

                                    <div className="border-t border-slate-100 pt-4">
                                        <p className="text-xs leading-5 text-slate-400">
                                            Prices shown are sample prices. Final product prices
                                            and availability are confirmed at checkout.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={addAllToCart}
                                    className="mt-6 w-full rounded-xl bg-emerald-700 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-800"
                                >
                                    Add All to Cart →
                                </button>

                                <Link
                                    href="/shop"
                                    className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-bold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700"
                                >
                                    Continue Shopping
                                </Link>
                            </aside>
                        </div>
                    ) : (
                        /* Empty Wishlist */
                        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm">
                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl text-emerald-700">
                                ♡
                            </div>

                            <h2 className="mt-6 text-2xl font-extrabold text-slate-900">
                                Your wishlist is empty!
                            </h2>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                                You haven't saved any products yet. Explore our fresh
                                collection and add your favourite products here.
                            </p>

                            <Link
                                href="/shop"
                                className="mt-7 inline-flex items-center justify-center rounded-xl bg-emerald-700 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-800"
                            >
                                Explore Products →
                            </Link>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}
