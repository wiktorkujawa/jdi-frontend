import CHeader from './components/organisms/CHeader'
import 'theme/css/globals.css'
import CFooter from './components/organisms/CFooter'
import { Mulish } from '@next/font/google'

const mulish = Mulish({ subsets: ['latin'] })
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={mulish.className}>
        {/* @ts-expect-error Async Server Component */}
        <CHeader />
        {children}
        {/* @ts-expect-error Async Server Component */}
        <CFooter />
      </body>
    </html>
  )
}
