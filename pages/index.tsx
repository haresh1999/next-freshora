import HeroSection from "./components/home/HeroSection"
import CategorySection from "./components/home/CategorySection";
import FeaturedProducts from "./components/home/FeaturedProducts";
import FAQSection from "./components/home/FAQSection";
import Head from "next/head";
import { apiRequest } from "@/lib/client";
import { GetServerSideProps } from "next";

type Product = {
    id: number;
    name: string;
    slug: string;
    category_id: number;
    price: number;
    mrp: number;
    unit: string;
    description: string;
    img: string;
    badge: string;
    rating: number;
    reviews: number;
    stock: number;
};

type Category = {
    id: number;
    name: string;
    slug: string;
};

type Faq = {
    id: number;
    question: string;
    answer: string;
}

type PageProps = {
    products: Product[];
    categories: Category[];
    faqs: Faq[];
};

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {

    try {

        const [product, category, faq] = await Promise.all([
            apiRequest('/products', { method: 'GET' }),
            apiRequest('/categories', { method: 'GET' }),
            apiRequest('/faqs', { method: 'GET' }),
        ]);

        return {
            props: {
                products: product?.data || [],
                categories: category?.data || [],
                faqs: faq?.data || [],
            },
        };
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return {
            props: {
                products: [],
                categories: [],
                faqs: [],
            },
        };
    }
}

export default function Home({ products, categories, faqs }: PageProps) {
    return (
        <>
            <Head>
                <title>Freshora Home | Your Freshora Home</title>
                <meta name="description" content="Your Freshora Home." />
            </Head>
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
            <CategorySection categories={categories} />
            <FeaturedProducts products={products} categories={categories} />
            <FAQSection faqs={faqs} />
        </>
    )
}