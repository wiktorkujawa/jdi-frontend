import { Figtree } from 'next/font/google';
import '@/theme/css/globals.css'
import CHeader from '@/components/organisms/CHeader';
import CFooter from '@/components/organisms/CFooter';
import Script from 'next/script';
import styles from "theme/page.module.css";
import { Metadata } from 'next';

const figtree = Figtree({ subsets: ['latin']});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${figtree.className}`}>
                <CHeader />
                <main className="min-h-screen">
                    {children}
                </main>
                <CFooter />
                <Script src="/script.js" defer />
            </body>
        </html>
    )
}

export const metadata: Metadata = {
    manifest: '/site.webmanifest',
    icons: {
      icon: '/favicon-32x32.png',
      shortcut: '/favicon-32x32.png',
      apple: '/apple-touch-icon.png',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    },
  }