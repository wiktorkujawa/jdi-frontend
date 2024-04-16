// import CFooter from '@/components/organisms/CFooter'
// import CHeader from '@/components/organisms/CHeader'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { Figtree } from 'next/font/google';
import 'theme/css/globals.css'

const figtree = Figtree({ subsets: ['latin']});

export default function MyApp({ Component, pageProps }: AppProps) {
  return <div className={figtree.className}>
    {/* <CHeader/> */}
    <Script src="/script.js" defer />
    <Component {...pageProps} />
    {/* <CFooter/> */}
  </div>
}