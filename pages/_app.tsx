// import CFooter from '@/components/organisms/CFooter'
// import CHeader from '@/components/organisms/CHeader'
import type { AppProps } from 'next/app'
import 'theme/css/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <>
    {/* <CHeader/> */}
    <Component {...pageProps} />
    {/* <CFooter/> */}
  </>
}