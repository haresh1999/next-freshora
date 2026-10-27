import HeroSection from "./components/home/HeroSection"
import CategorySection from "./components/home/CategorySection";
import FeaturedProducts from "./components/home/FeaturedProducts";
import FAQSection from "./components/home/FAQSection";

export default function Home() {
    return (
        <>
            <HeroSection />
            <div className="rounded-3xl bg-linear-to-br from-brand-50 via-white to-emerald-100 px-6 py-16 text-center sm:px-12">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
                    Welcome to Shopora
                </p>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    Shopping made simple.
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                    Discover your favorite products with a smooth, modern shopping experience.
                </p>
                <a href="/shop"
                    className="mt-7 inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-brand-700">
                    Explore Products →
                </a>
            </div>
            <CategorySection />
            <FeaturedProducts />
            <FAQSection />
        </>
    )
}