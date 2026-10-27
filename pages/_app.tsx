import type { AppProps } from 'next/app'
import '@/public/styles/globals.css'

import Announcement from './components/Announcement'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App({ Component, pageProps }: AppProps) {
    return (<>
        <Announcement />
        <Header />
        <main>
            <Component {...pageProps} />
        </main>
        <Footer />
    </>)
}