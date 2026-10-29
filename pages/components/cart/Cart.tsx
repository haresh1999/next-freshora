import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function CartSidebar() {
    const {
        items,
        isCartOpen,
        closeCart,
        updateQuantity,
        removeFromCart,
        subtotal,
    } = useCart();

    useEffect(() => {
        if (!isCartOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") closeCart();
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isCartOpen, closeCart]);

    return (
        <>
            <div
                onClick={closeCart}
                aria-hidden="true"
                className={`fixed inset-0 z-50 bg-slate-950/50 transition-opacity duration-300 ${isCartOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                    }`}
            />

            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Shopping cart"
                aria-hidden={!isCartOpen}
                className={`fixed right-0 top-0 z-[51] flex h-dvh w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${isCartOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            Your Cart
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            {items.length} product type(s)
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={closeCart}
                        aria-label="Close cart"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-600 hover:bg-slate-200"
                    >
                        ×
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                        <span className="text-6xl">🛒</span>
                        <h3 className="mt-5 text-xl font-bold text-slate-900">
                            Your cart is empty
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                            Discover fresh groceries and add your favourites.
                        </p>
                        <Link
                            href="/product"
                            onClick={closeCart}
                            className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 space-y-5 overflow-y-auto p-5">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="96px"
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h3 className="font-semibold text-slate-900">
                                                    {item.name}
                                                </h3>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    {item.unit}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id)}
                                                aria-label={`Remove ${item.name}`}
                                                className="text-sm text-slate-400 hover:text-red-600"
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between gap-2">
                                            <div className="flex items-center rounded-lg border border-slate-200">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity - 1)
                                                    }
                                                    aria-label={`Decrease ${item.name} quantity`}
                                                    className="px-3 py-1.5 hover:bg-slate-50"
                                                >
                                                    −
                                                </button>
                                                <span className="min-w-8 text-center text-sm font-semibold">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                    aria-label={`Increase ${item.name} quantity`}
                                                    className="px-3 py-1.5 hover:bg-slate-50"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <p className="font-bold text-slate-900">
                                                ₹{(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-slate-100 bg-white p-5">
                            <div className="flex items-center justify-between text-sm text-slate-500">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>

                            <p className="mt-2 text-xs text-slate-500">
                                Delivery fees and discounts are calculated at checkout.
                            </p>

                            <Link
                                href="/checkout"
                                onClick={closeCart}
                                className="mt-5 flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-4 font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Proceed to Checkout →
                            </Link>

                            <button
                                type="button"
                                onClick={closeCart}
                                className="mt-3 w-full py-2 text-sm font-semibold text-slate-600 hover:text-emerald-700"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
}
