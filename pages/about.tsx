import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const values = [
    {
        icon: "🌿",
        title: "Freshness First",
        description:
            "We aim to help you find fresh produce and everyday essentials for your home.",
    },
    {
        icon: "🤝",
        title: "Customer First",
        description:
            "We want every shopping experience to be simple, convenient and reliable.",
    },
    {
        icon: "🛒",
        title: "Everyday Convenience",
        description:
            "Explore groceries and household essentials in one easy-to-use place.",
    },
    {
        icon: "💚",
        title: "Quality Matters",
        description:
            "We believe choosing everyday products should feel easy and reassuring.",
    },
];

export default function About() {
    return (
        <>
            <Head>
                <title>About Us | Freshora</title>
                <meta name="description" content="Discover Freshora, your convenient destination for grocery shopping, fresh produce and everyday household essentials." />
            </Head>

            <main className="overflow-hidden bg-white">
                {/* Hero section */}
                <section className="relative bg-linear-to-br from-emerald-900 via-emerald-800 to-green-700">
                    <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />
                    <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
                        <div>
                            <nav className="mb-7 text-sm text-emerald-100">
                                <Link href="/" className="hover:text-white">
                                    Home
                                </Link>
                                <span className="mx-2">/</span>
                                <span className="font-semibold text-white">About Us</span>
                            </nav>

                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-50">
                                Get to know Freshora
                            </span>

                            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Good Food.
                                <span className="block text-lime-300">
                                    Better Everyday Living.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-base leading-8 text-emerald-50 sm:text-lg">
                                Freshora brings groceries and everyday essentials together
                                in one convenient place, helping make your daily shopping
                                simpler.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/categories"
                                    className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-emerald-800 transition hover:bg-lime-100"
                                >
                                    Explore Categories <span className="ml-2">→</span>
                                </Link>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                        <div className="relative mx-auto w-full max-w-lg">
                            <div className="absolute -inset-4 rounded-4xl bg-lime-300/20 blur-2xl" />

                            <div className="relative overflow-hidden rounded-4xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">
                                <Image
                                    width={1000}
                                    height={1000}
                                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=85"
                                    alt="Fresh produce displayed in a grocery store"
                                    className="aspect-[ w-full rounded-3xl object-cover"
                                />

                                <div className="flex items-center gap-4 p-4 sm:p-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime-300 text-2xl">
                                        🌱
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">
                                            Your everyday grocery destination
                                        </p>
                                        <p className="mt-1 text-sm text-emerald-100">
                                            Simple shopping, all in one place.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Introduction */}
                <section className="py-16 sm:py-20 lg:py-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
                        <div>
                            <span className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                                Who We Are
                            </span>

                            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                                Making everyday grocery shopping easier
                            </h2>

                            <p className="mt-5 text-base leading-8 text-slate-600">
                                At Freshora, we believe shopping for everyday essentials
                                should be convenient and straightforward. Our goal is to
                                bring a wide range of grocery categories together so you can
                                discover the products you need with less hassle.
                            </p>

                            <p className="mt-4 text-base leading-8 text-slate-600">
                                From fruits and vegetables to pantry staples, dairy,
                                snacks and household essentials, Freshora is designed to
                                make your everyday shopping experience easier to navigate.
                            </p>

                            <Link
                                href="/categories"
                                className="mt-7 inline-flex items-center gap-2 font-bold text-emerald-700 transition hover:text-emerald-900"
                            >
                                Discover our categories <span>→</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="overflow-hidden rounded-3xl bg-emerald-50">
                                <Image
                                    width={280}
                                    height={382}
                                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
                                    alt="Fresh vegetables"
                                    loading="lazy"
                                    className="aspect-4/5 h-full w-full object-cover"
                                />
                            </div>

                            <div className="mt-8 overflow-hidden rounded-3xl bg-amber-50">
                                <Image
                                    width={280}
                                    height={350}
                                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
                                    alt="Freshly baked bread"
                                    loading="lazy"
                                    className="aspect-4/5 h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission and vision */}
                <section className="bg-slate-50 py-16 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto mb-12 max-w-2xl text-center">
                            <span className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                                Our Purpose
                            </span>

                            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                What drives Freshora
                            </h2>

                            <p className="mt-4 leading-7 text-slate-500">
                                Making everyday essentials easier to discover, choose and
                                shop.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm sm:p-10">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                                    🎯
                                </div>

                                <h3 className="mt-6 text-2xl font-extrabold text-slate-900">
                                    Our Mission
                                </h3>

                                <p className="mt-4 leading-8 text-slate-600">
                                    To make everyday grocery shopping more convenient by
                                    providing a simple way to explore groceries and household
                                    essentials, with a focus on freshness, choice and customer
                                    convenience.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-lime-100 bg-white p-7 shadow-sm sm:p-10">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-100 text-2xl">
                                    🌍
                                </div>

                                <h3 className="mt-6 text-2xl font-extrabold text-slate-900">
                                    Our Vision
                                </h3>

                                <p className="mt-4 leading-8 text-slate-600">
                                    To become a trusted everyday shopping destination where
                                    customers can easily discover the products they need for
                                    their kitchens, homes and families.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-16 sm:py-20 lg:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto mb-12 max-w-2xl text-center">
                            <span className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                                What Matters to Us
                            </span>

                            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                The Freshora Difference
                            </h2>

                            <p className="mt-4 leading-7 text-slate-500">
                                The principles that shape the shopping experience we want
                                to deliver.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {values.map((value) => (
                                <div
                                    key={value.title}
                                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl transition group-hover:bg-emerald-100">
                                        {value.icon}
                                    </div>

                                    <h3 className="mt-5 text-lg font-extrabold text-slate-900">
                                        {value.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Closing CTA */}
                <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
                    <div className="mx-auto max-w-7xl overflow-hidden rounded-4xl bg-emerald-800 px-6 py-12 text-center sm:px-12 sm:py-16">
                        <span className="text-3xl">🛒</span>

                        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            Make Freshora part of your everyday routine
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl leading-7 text-emerald-100">
                            Explore our categories and discover groceries and essentials
                            for your home.
                        </p>
                        <Link href="/categories" className="mt-8 inline-flex items-center justify-center rounded-xl bg-lime-300 px-7 py-3.5 text-sm font-extrabold text-emerald-950 transition hover:bg-lime-200">
                            Start Exploring <span className="ml-2">→</span>
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}