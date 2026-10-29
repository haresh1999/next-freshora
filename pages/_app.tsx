import type { AppProps } from 'next/app'
import '@/public/styles/globals.css'

import Announcement from './components/Announcement'
import Header from './components/Header'
import Footer from './components/Footer'

import { CartProvider } from "@/context/CartContext";
import CartSidebar from './components/cart/Cart'

export default function App({ Component, pageProps }: AppProps) {
    return (<>

        <CartProvider>
            <Announcement />
            <Header />
            <Component {...pageProps} />
            <Footer />
            <CartSidebar />
        </CartProvider>
    </>)
}