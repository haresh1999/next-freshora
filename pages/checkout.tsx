import Head from "next/head";
import Link from "next/link";
import { useState, type SubmitEvent } from "react";
import { useCart } from "@/context/CartContext";

type AddressType = "home" | "office";

type CheckoutForm = {
    name: string;
    email: string;
    mobile: string;
    address: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    addressType: AddressType;
};

export default function Checkout() {

    const { items, subtotal } = useCart();

    const [form, setForm] = useState<CheckoutForm>({
        name: "",
        email: "",
        mobile: "",
        address: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        addressType: "home",
    });

    const [notice, setNotice] = useState("");

    // Demo delivery charge. Replace with your actual delivery rules.
    const deliveryFee = 0;
    const total = subtotal + deliveryFee;

    function handleChange(
        field: keyof CheckoutForm,
        value: string
    ) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (items.length === 0) {
            setNotice("Your cart is empty. Please add products first.");
            return;
        }

        // Demo only: connect your Next.js order API here.
        console.log("Customer details:", form);
        console.log("Cart items:", items);
        console.log("Order total:", total);

        setNotice(
            "Your details are ready. Connect your order API to complete checkout."
        );
    }

    const inputClass = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";
    const labelClass = "text-sm font-semibold text-slate-700";

    return (
        <>
            <Head>
                <title>Checkout | Freshora</title>
                <meta
                    name="description"
                    content="Complete your Freshora grocery order."
                />
            </Head>

            <main className="min-h-screen bg-slate-50">

                {/* Page Header */}
                <section className="border-b border-slate-100 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <Link
                                    href="/"
                                    className="text-2xl font-extrabold tracking-tight text-emerald-700"
                                >
                                    Freshora
                                </Link>

                                <h1 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                                    Secure Checkout
                                </h1>

                                <p className="mt-1 text-sm text-slate-500">
                                    Complete your delivery details to continue.
                                </p>
                            </div>

                            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                                <span>🔒</span>
                                Secure Checkout
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

                    {/* Breadcrumb */}
                    <div className="mb-7 flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="hover:text-emerald-700">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/product" className="hover:text-emerald-700">
                            Shopping
                        </Link>
                        <span>/</span>
                        <span className="font-semibold text-slate-800">
                            Checkout
                        </span>
                    </div>

                    {items.length === 0 ? (
                        <div className="rounded-3xl border border-slate-100 bg-white px-5 py-16 text-center shadow-sm">
                            <div className="text-6xl">🛒</div>

                            <h2 className="mt-5 text-2xl font-bold text-slate-900">
                                Your cart is empty
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Add some fresh products before proceeding to checkout.
                            </p>

                            <Link
                                href="/product"
                                className="mt-6 inline-flex rounded-xl bg-emerald-600 px-7 py-3 font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12 lg:gap-8">

                                {/* LEFT: Customer Information */}
                                <div className="space-y-6 lg:col-span-7">

                                    {/* Customer Details */}
                                    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">

                                        <div className="mb-6 flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                                                👤
                                            </div>

                                            <div>
                                                <h2 className="text-lg font-bold text-slate-900">
                                                    Customer Information
                                                </h2>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    Enter your contact details.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                            <div className="sm:col-span-2">
                                                <label htmlFor="name" className={labelClass}>
                                                    Full Name *
                                                </label>

                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    autoComplete="name"
                                                    placeholder="Enter your full name"
                                                    value={form.name}
                                                    onChange={(e) =>
                                                        handleChange("name", e.target.value)
                                                    }
                                                    className={inputClass}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="email" className={labelClass}>
                                                    Email Address *
                                                </label>

                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    autoComplete="email"
                                                    placeholder="example@email.com"
                                                    value={form.email}
                                                    onChange={(e) =>
                                                        handleChange("email", e.target.value)
                                                    }
                                                    className={inputClass}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="mobile" className={labelClass}>
                                                    Mobile Number *
                                                </label>

                                                <div className="mt-2 flex overflow-hidden rounded-xl border border-slate-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                                                    <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600">
                                                        +91
                                                    </span>

                                                    <input
                                                        id="mobile"
                                                        name="mobile"
                                                        type="tel"
                                                        required
                                                        autoComplete="tel-national"
                                                        inputMode="numeric"
                                                        pattern="[0-9]{10}"
                                                        maxLength={10}
                                                        placeholder="10 digit mobile"
                                                        value={form.mobile}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                "mobile",
                                                                e.target.value.replace(/\D/g, "").slice(0, 10)
                                                            )
                                                        }
                                                        className="w-full min-w-0 bg-white px-3 py-3 text-sm outline-none"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </section>

                                    {/* Delivery Address */}
                                    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">

                                        <div className="mb-6 flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                                                📍
                                            </div>

                                            <div>
                                                <h2 className="text-lg font-bold text-slate-900">
                                                    Delivery Address
                                                </h2>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    Where should we deliver your order?
                                                </p>
                                            </div>
                                        </div>

                                        {/* Address Type */}
                                        <div className="mb-6">
                                            <label className={labelClass}>
                                                Address Type *
                                            </label>

                                            <div className="mt-3 grid grid-cols-2 gap-3">

                                                <label
                                                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${form.addressType === "home"
                                                        ? "border-emerald-500 bg-emerald-50"
                                                        : "border-slate-200 hover:border-emerald-300"
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="addressType"
                                                        value="home"
                                                        checked={form.addressType === "home"}
                                                        onChange={() =>
                                                            handleChange("addressType", "home")
                                                        }
                                                        className="h-4 w-4 accent-emerald-600"
                                                    />

                                                    <span className="text-xl">🏠</span>

                                                    <span>
                                                        <span className="block text-sm font-bold text-slate-800">
                                                            Home
                                                        </span>
                                                        <span className="text-xs text-slate-500">
                                                            Home address
                                                        </span>
                                                    </span>
                                                </label>

                                                <label
                                                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${form.addressType === "office"
                                                        ? "border-emerald-500 bg-emerald-50"
                                                        : "border-slate-200 hover:border-emerald-300"
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="addressType"
                                                        value="office"
                                                        checked={form.addressType === "office"}
                                                        onChange={() =>
                                                            handleChange("addressType", "office")
                                                        }
                                                        className="h-4 w-4 accent-emerald-600"
                                                    />

                                                    <span className="text-xl">🏢</span>

                                                    <span>
                                                        <span className="block text-sm font-bold text-slate-800">
                                                            Office
                                                        </span>
                                                        <span className="text-xs text-slate-500">
                                                            Work address
                                                        </span>
                                                    </span>
                                                </label>

                                            </div>
                                        </div>

                                        <div className="space-y-5">

                                            <div>
                                                <label htmlFor="address" className={labelClass}>
                                                    Full Address *
                                                </label>

                                                <textarea
                                                    id="address"
                                                    name="address"
                                                    required
                                                    rows={3}
                                                    autoComplete="street-address"
                                                    placeholder="House / Flat number, building, street and area"
                                                    value={form.address}
                                                    onChange={(e) =>
                                                        handleChange("address", e.target.value)
                                                    }
                                                    className={`${inputClass} resize-none`}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="landmark" className={labelClass}>
                                                    Nearby Landmark
                                                </label>

                                                <input
                                                    id="landmark"
                                                    name="landmark"
                                                    type="text"
                                                    placeholder="Near school, temple, etc."
                                                    value={form.landmark}
                                                    onChange={(e) =>
                                                        handleChange("landmark", e.target.value)
                                                    }
                                                    className={inputClass}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                                <div>
                                                    <label htmlFor="city" className={labelClass}>
                                                        City *
                                                    </label>

                                                    <input
                                                        id="city"
                                                        name="city"
                                                        type="text"
                                                        required
                                                        autoComplete="address-level2"
                                                        placeholder="Enter city"
                                                        value={form.city}
                                                        onChange={(e) =>
                                                            handleChange("city", e.target.value)
                                                        }
                                                        className={inputClass}
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="state" className={labelClass}>
                                                        State *
                                                    </label>

                                                    <input
                                                        id="state"
                                                        name="state"
                                                        type="text"
                                                        required
                                                        autoComplete="address-level1"
                                                        placeholder="Enter state"
                                                        value={form.state}
                                                        onChange={(e) =>
                                                            handleChange("state", e.target.value)
                                                        }
                                                        className={inputClass}
                                                    />
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="pincode" className={labelClass}>
                                                        PIN Code *
                                                    </label>

                                                    <input
                                                        id="pincode"
                                                        name="pincode"
                                                        type="text"
                                                        required
                                                        inputMode="numeric"
                                                        pattern="[0-9]{6}"
                                                        maxLength={6}
                                                        autoComplete="postal-code"
                                                        placeholder="Enter 6 digit PIN code"
                                                        value={form.pincode}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                "pincode",
                                                                e.target.value.replace(/\D/g, "").slice(0, 6)
                                                            )
                                                        }
                                                        className={inputClass}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </section>

                                    {/* Notice */}
                                    {notice && (
                                        <div
                                            role="status"
                                            className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                                        >
                                            {notice}
                                        </div>
                                    )}

                                    {/* Mobile Place Order */}
                                    <button
                                        type="submit"
                                        className="w-full rounded-xl bg-emerald-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 lg:hidden"
                                    >
                                        Continue to Payment · ₹{total.toFixed(2)}
                                    </button>

                                </div>

                                {/* RIGHT: Order Summary */}
                                <aside className="lg:col-span-5">
                                    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-24">

                                        <div className="mb-6 flex items-center justify-between">
                                            <div>
                                                <h2 className="text-lg font-bold text-slate-900">
                                                    Your Order
                                                </h2>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    {items.length} different product(s)
                                                </p>
                                            </div>

                                            <Link
                                                href="/product"
                                                className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                                            >
                                                + Add More
                                            </Link>
                                        </div>

                                        {/* Cart Products */}
                                        <div className="max-h-105 space-y-4 overflow-y-auto pr-1">

                                            {items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex gap-3 border-b border-slate-100 pb-4 last:border-0"
                                                >
                                                    <Link
                                                        href={`/product/${item.slug}`}
                                                        className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50"
                                                    >
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </Link>

                                                    <div className="min-w-0 flex-1">
                                                        <Link
                                                            href={`/product/${item.slug}`}
                                                            className="line-clamp-2 text-sm font-bold text-slate-800 hover:text-emerald-700"
                                                        >
                                                            {item.name}
                                                        </Link>

                                                        <p className="mt-1 text-xs text-slate-500">
                                                            {item.unit}
                                                        </p>

                                                        <div className="mt-3 flex items-center justify-between gap-2">
                                                            <span className="text-xs text-slate-500">
                                                                Qty: {item.quantity}
                                                            </span>

                                                            <span className="text-sm font-bold text-slate-900">
                                                                ₹{(item.price * item.quantity).toFixed(2)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>

                                        {/* Price Details */}
                                        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">

                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">
                                                    Subtotal
                                                </span>
                                                <span className="font-semibold text-slate-800">
                                                    ₹{subtotal.toFixed(2)}
                                                </span>
                                            </div>

                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">
                                                    Delivery Charge
                                                </span>

                                                <span className="font-semibold text-emerald-700">
                                                    {deliveryFee === 0
                                                        ? "FREE"
                                                        : `₹${deliveryFee}`}
                                                </span>
                                            </div>

                                            <div className="flex justify-between border-t border-dashed border-slate-200 pt-4">
                                                <span className="font-bold text-slate-900">
                                                    Total Amount
                                                </span>

                                                <span className="text-xl font-extrabold text-emerald-700">
                                                    ₹{total.toFixed(2)}
                                                </span>
                                            </div>

                                        </div>

                                        {/* Payment Button */}
                                        <button
                                            type="submit"
                                            className="mt-6 hidden w-full rounded-xl bg-emerald-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 lg:block"
                                        >
                                            Continue to Payment →
                                        </button>

                                        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
                                            <span>🔒</span>
                                            Your information is kept secure.
                                        </div>

                                        <Link
                                            href="/product"
                                            className="mt-4 block text-center text-sm font-medium text-slate-500 transition hover:text-emerald-700"
                                        >
                                            ← Continue Shopping
                                        </Link>

                                    </div>
                                </aside>

                            </div>
                        </form>
                    )}

                </div>
            </main>
        </>
    );
}
