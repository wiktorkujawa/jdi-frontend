import CHeader from './components/organisms/CHeader'
import 'theme/css/globals.css'
import CFooter from './components/organisms/CFooter'
import { Mulish } from '@next/font/google'
import { Metadata } from "next";

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

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  icons: [
    {
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
      url: "/favicon-16x16.png",
    },
    { rel: "manifest", url: "/site.webmanifest" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
  ],
}
