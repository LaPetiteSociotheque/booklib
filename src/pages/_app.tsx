import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Merriweather } from 'next/font/google'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
})


export default function App({ Component, pageProps }) {
  return (
    <div className={merriweather.className}>
      <Component {...pageProps} />
    </div>
  )
}

