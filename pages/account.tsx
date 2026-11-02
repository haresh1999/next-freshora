
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

type Tab =
    | "overview"
    | "profile"
    | "orders"
    | "addresses"
    | "settings";

const customer = {
    name: "Haresh Chauhan",
    email: "haresh@example.com",
    mobile: "+91 98765 43210",
    joined: "November 2026",
};

const orders = [
    {
        id: "FRS-10245",
        date: "02 Nov 2026",
        items: 4,
        amount: 548,
        status: "Delivered",
    },
    {
        id: "FRS-10231",
        date: "28 Oct 2026",
        items: 3,
        amount: 325,
        status: "Delivered",
    },
    {
        id: "FRS-10198",
        date: "20 Oct 2026",
        items: 5,
        amount: 790,
        status: "Cancelled",
    },
];

const addresses = [
    {
        id: 1,
        type: "Home",
        icon: "🏠",
        name: "Haresh Chauhan",
        mobile: "+91 98765 43210",
        address: "123, Main Road, Near Bus Stand",
        city: "Botad",
        state: "Gujarat",
        pincode: "364710",
        isDefault: true,
    },
    {
        id: 2,
        type: "Office",
        icon: "🏢",
        name: "Haresh Chauhan",
        mobile: "+91 98765 43210",
        address: "Office Address, Business Area",
        city: "Botad",
        state: "Gujarat",
        pincode: "364710",
        isDefault: false,
    },
];

export default function MyAccount() {

    const [activeTab, setActiveTab] = useState<Tab>("overview");

    const [profile, setProfile] = useState({
        name: customer.name,
        email: customer.email,
        mobile: customer.mobile.replace("+91 ", ""),
    });

    const [editingProfile, setEditingProfile] = useState(false);

    const menuItems: {
        id: Tab;
        label: string;
        icon: string;
    }[] = [
            { id: "overview", label: "Overview", icon: "◫" },
            { id: "profile", label: "Personal Information", icon: "👤" },
            { id: "orders", label: "My Orders", icon: "📦" },
            { id: "addresses", label: "Saved Addresses", icon: "📍" },
            { id: "settings", label: "Account Settings", icon: "⚙️" },
        ];

    const deliveredOrders = orders.filter(
        (order) => order.status === "Delivered"
    ).length;

    function handleProfileSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setEditingProfile(false);
        alert("Profile updated in demo mode.");
    }

    function renderOrders() {
        return (
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5 sm:p-6">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            My Orders
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            View and track your previous orders.
                        </p>
                    </div>

                    <Link
                        href="/product"
                        className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                    >
                        Continue Shopping →
                    </Link>
                </div>

                <div className="divide-y divide-slate-100">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="p-5 transition hover:bg-slate-50 sm:p-6"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="font-bold text-slate-900">
                                        Order #{order.id}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        {order.date} · {order.items} products
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${order.status === "Delivered"
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-red-50 text-red-600"
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                                <div>
                                    <p className="text-xs text-slate-500">
                                        Order Amount
                                    </p>
                                    <p className="mt-1 text-lg font-bold text-slate-900">
                                        ₹{order.amount.toFixed(2)}
                                    </p>
                                </div>

                                <Link
                                    href={`/account/orders/${order.id}`}
                                    className="rounded-xl border border-emerald-600 px-4 py-2.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>My Account | Freshora</title>
                <meta
                    name="description"
                    content="Manage your Freshora profile, orders, saved addresses and account settings."
                />
            </Head>

            <main className="min-h-screen bg-slate-50">

                {/* Page Header */}
                <section className="border-b border-slate-100 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <div className="mb-2 text-sm text-slate-500">
                                    <Link href="/" className="hover:text-emerald-700">
                                        Home
                                    </Link>
                                    <span className="mx-2">/</span>
                                    My Account
                                </div>

                                <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                                    My Account
                                </h1>

                                <p className="mt-2 text-sm text-slate-500">
                                    Manage your profile, orders and preferences.
                                </p>
                            </div>

                            <Link
                                href="/product"
                                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Start Shopping →
                            </Link>
                        </div>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">

                        {/* LEFT SIDEBAR */}
                        <aside className="lg:col-span-3">
                            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

                                {/* Customer Card */}
                                <div className="bg-emerald-700 p-5 text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-bold text-emerald-700">
                                            {profile.name.charAt(0).toUpperCase()}
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="truncate font-bold">
                                                {profile.name}
                                            </h2>
                                            <p className="mt-1 text-xs text-emerald-100">
                                                Freshora Customer
                                            </p>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-xs text-emerald-100">
                                        Member since {customer.joined}
                                    </p>
                                </div>

                                {/* Navigation */}
                                <nav className="p-3">
                                    <p className="px-3 pb-3 pt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Account Menu
                                    </p>

                                    <div className="space-y-1">
                                        {menuItems.map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => setActiveTab(item.id)}
                                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${activeTab === item.id
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-emerald-700"
                                                    }`}
                                            >
                                                <span className="text-lg">
                                                    {item.icon}
                                                </span>

                                                {item.label}

                                                {activeTab === item.id && (
                                                    <span className="ml-auto h-2 w-2 rounded-full bg-emerald-600" />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="my-3 border-t border-slate-100" />

                                    <Link
                                        href="/contact"
                                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700"
                                    >
                                        <span className="text-lg">💬</span>
                                        Help & Support
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            alert("Connect your logout API here.")
                                        }
                                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
                                    >
                                        <span className="text-lg">↪</span>
                                        Logout
                                    </button>
                                </nav>
                            </div>
                        </aside>

                        {/* RIGHT CONTENT */}
                        <div className="min-w-0 lg:col-span-9">

                            {/* OVERVIEW */}
                            {activeTab === "overview" && (
                                <div className="space-y-6">

                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            Hello, {profile.name.split(" ")[0]} 👋
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Welcome back to your Freshora account.
                                        </p>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
                                        {[
                                            {
                                                label: "Total Orders",
                                                value: orders.length,
                                                icon: "📦",
                                            },
                                            {
                                                label: "Delivered",
                                                value: deliveredOrders,
                                                icon: "✅",
                                            },
                                            {
                                                label: "Total Spent",
                                                value: `₹${orders
                                                    .filter((o) => o.status === "Delivered")
                                                    .reduce((sum, o) => sum + o.amount, 0)}`,
                                                icon: "💰",
                                            },
                                        ].map((stat) => (
                                            <div
                                                key={stat.label}
                                                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                                            >
                                                <span className="text-2xl">
                                                    {stat.icon}
                                                </span>
                                                <p className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
                                                    {stat.value}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                                    {stat.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Personal Information */}
                                    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <h3 className="font-bold text-slate-900">
                                                    Personal Information
                                                </h3>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    Your registered contact details.
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveTab("profile");
                                                    setEditingProfile(true);
                                                }}
                                                className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                                            >
                                                Edit Profile
                                            </button>
                                        </div>

                                        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    Full Name
                                                </p>
                                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                                    {profile.name}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    Email Address
                                                </p>
                                                <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                                                    {profile.email}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    Mobile Number
                                                </p>
                                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                                    +91 {profile.mobile}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recent Orders */}
                                    <div>
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-slate-900">
                                                Recent Orders
                                            </h3>

                                            <button
                                                type="button"
                                                onClick={() => setActiveTab("orders")}
                                                className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                                            >
                                                View All →
                                            </button>
                                        </div>

                                        {renderOrders()}
                                    </div>

                                    {/* Quick Links */}
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("addresses")}
                                            className="rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                                        >
                                            <span className="text-2xl">📍</span>
                                            <h3 className="mt-3 font-bold text-slate-900">
                                                Saved Addresses
                                            </h3>
                                            <p className="mt-1 text-xs text-slate-500">
                                                Manage your delivery addresses.
                                            </p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("settings")}
                                            className="rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                                        >
                                            <span className="text-2xl">⚙️</span>
                                            <h3 className="mt-3 font-bold text-slate-900">
                                                Account Settings
                                            </h3>
                                            <p className="mt-1 text-xs text-slate-500">
                                                Manage your account preferences.
                                            </p>
                                        </button>
                                    </div>

                                </div>
                            )}

                            {/* PROFILE */}
                            {activeTab === "profile" && (
                                <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
                                    <div className="mb-7">
                                        <h2 className="text-xl font-bold text-slate-900">
                                            Personal Information
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Update your personal contact information.
                                        </p>
                                    </div>

                                    <form onSubmit={handleProfileSave}>
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                            <div className="sm:col-span-2">
                                                <label className="text-sm font-semibold text-slate-700">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={profile.name}
                                                    onChange={(e) =>
                                                        setProfile({
                                                            ...profile,
                                                            name: e.target.value,
                                                        })
                                                    }
                                                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm font-semibold text-slate-700">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={profile.email}
                                                    onChange={(e) =>
                                                        setProfile({
                                                            ...profile,
                                                            email: e.target.value,
                                                        })
                                                    }
                                                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm font-semibold text-slate-700">
                                                    Mobile Number
                                                </label>
                                                <div className="mt-2 flex rounded-xl border border-slate-200 focus-within:border-emerald-500">
                                                    <span className="border-r border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-500">
                                                        +91
                                                    </span>
                                                    <input
                                                        type="tel"
                                                        required
                                                        pattern="[0-9]{10}"
                                                        maxLength={10}
                                                        value={profile.mobile}
                                                        onChange={(e) =>
                                                            setProfile({
                                                                ...profile,
                                                                mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                                                            })
                                                        }
                                                        className="w-full min-w-0 rounded-r-xl px-3 py-3 text-sm outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-7 flex flex-wrap gap-3">
                                            <button
                                                type="submit"
                                                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                                            >
                                                Save Changes
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setProfile({
                                                        name: customer.name,
                                                        email: customer.email,
                                                        mobile: customer.mobile.replace("+91 ", ""),
                                                    });
                                                    setEditingProfile(false);
                                                }}
                                                className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                                            >
                                                Reset
                                            </button>
                                        </div>
                                    </form>
                                </section>
                            )}

                            {/* ORDERS */}
                            {activeTab === "orders" && (
                                <div>
                                    <div className="mb-5">
                                        <h2 className="text-xl font-bold text-slate-900">
                                            My Orders
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Check your complete order history.
                                        </p>
                                    </div>

                                    {renderOrders()}
                                </div>
                            )}

                            {/* ADDRESSES */}
                            {activeTab === "addresses" && (
                                <section>
                                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-900">
                                                Saved Addresses
                                            </h2>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Manage your delivery locations.
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                alert("Connect your add address form here.")
                                            }
                                            className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                                        >
                                            + Add Address
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {addresses.map((address) => (
                                            <div
                                                key={address.id}
                                                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xl">
                                                            {address.icon}
                                                        </span>
                                                        <h3 className="font-bold text-slate-900">
                                                            {address.type}
                                                        </h3>
                                                    </div>

                                                    {address.isDefault && (
                                                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                                                            Default
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="mt-5 space-y-2 text-sm text-slate-600">
                                                    <p className="font-semibold text-slate-900">
                                                        {address.name}
                                                    </p>
                                                    <p>{address.mobile}</p>
                                                    <p>
                                                        {address.address}, {address.city},{" "}
                                                        {address.state} - {address.pincode}
                                                    </p>
                                                </div>

                                                <div className="mt-5 flex gap-4 border-t border-slate-100 pt-4">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            alert("Connect your edit address form here.")
                                                        }
                                                        className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            alert("Connect your delete address API here.")
                                                        }
                                                        className="text-sm font-semibold text-red-500 hover:text-red-700"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* SETTINGS */}
                            {activeTab === "settings" && (
                                <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
                                    <h2 className="text-xl font-bold text-slate-900">
                                        Account Settings
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Manage your security and account preferences.
                                    </p>

                                    <div className="mt-7 divide-y divide-slate-100">
                                        <div className="flex flex-wrap items-center justify-between gap-4 py-5">
                                            <div>
                                                <h3 className="font-semibold text-slate-900">
                                                    Change Password
                                                </h3>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    Update your account password.
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    alert("Connect your change password page.")
                                                }
                                                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-700"
                                            >
                                                Change
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-4 py-5">
                                            <div>
                                                <h3 className="font-semibold text-slate-900">
                                                    Privacy & Security
                                                </h3>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    Manage your account security.
                                                </p>
                                            </div>

                                            <span className="text-xs font-semibold text-emerald-700">
                                                Protected
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-4 py-5">
                                            <div>
                                                <h3 className="font-semibold text-slate-900">
                                                    Delete Account
                                                </h3>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    Request permanent account deletion.
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    alert("Connect your account deletion process.")
                                                }
                                                className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                                            >
                                                Request Deletion
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            )}

                        </div>
                    </div>

                    {/* Support Banner */}
                    <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl bg-emerald-50 p-5 sm:flex-row sm:items-center sm:p-7">
                        <div>
                            <h3 className="font-bold text-slate-900">
                                Need help with your order?
                            </h3>
                            <p className="mt-1 text-sm text-slate-600">
                                Our support team is here to help you.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="inline-flex justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Contact Support →
                        </Link>
                    </div>

                </div>
            </main>
        </>
    );
}
