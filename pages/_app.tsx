import type { AppProps } from 'next/app'
import '@/public/styles/globals.css'

import Announcement from './components/Announcement'
import Header from './components/Header'
import Footer from './components/Footer'

import { CartProvider } from "@/context/CartContext";
import CartSidebar from './components/cart/Cart'

// import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {

    // =================================== CART LOGIC START =================================== //

    // const [cart, setCart] = useState();
    // const [subTotal, setSubTotal] = useState(0);

    // const saveCart = (cart) => {
    //     localStorage.setItem('cart', cart);
    //     let subt = 0;
    //     for (let index = 0; index < Object.keys(cart).length; index++) {
    //         subt += cart[index].price * cart[index].qty;
    //     }
    //     setSubTotal(subt);
    // }

    // useEffect(() => {
    //     try {
    //         if (localStorage.getItem('cart')) {
    //             setCart(JSON.parse(localStorage.getItem('cart')));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         localStorage.clear();
    //     }

    // }, []);

    // const addToCart = (itemCode, qty, price, name, size, variant) => {
    //     let newCart = cart;

    //     if (itemCode in cart) {

    //         newCart[itemCode].qty = cart[itemCode].qty + qty;
    //     } else {

    //         newCart[itemCode].qty = {
    //             qty,
    //             price,
    //             name,
    //             size,
    //             variant
    //         }
    //     }
    //     setCart(newCart);
    //     saveCart
    // }

    // const clearCart = () => {
    //     setCart({});
    //     saveCart({});
    // };

    // const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    //     let newCart = cart;
    //     if (itemCode in cart) {
    //         newCart[itemCode].qty = cart[itemCode].qty - qty;
    //     }

    //     if (newCart[itemCode].qty <= 0) {

    //         delete newCart[itemCode];
    //     }

    //     setCart(newCart);
    //     saveCart(newCart)
    // }

    // =================================== CART LOGIC END =================================== //

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