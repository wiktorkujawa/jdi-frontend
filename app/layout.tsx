import { Figtree } from 'next/font/google';
import '@/theme/css/globals.css'
import CHeader from '@/components/organisms/CHeader';
import CFooter from '@/components/organisms/CFooter';
import Script from 'next/script';
import { Metadata, Viewport } from 'next';

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
    manifest: 'https://just-dev-it.com/manifest.webmanifest',
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

  export const viewport: Viewport = {
    colorScheme: "dark light",
    themeColor: [
        { media: "(prefers-color-scheme: dark)", color: "#030303" },
        { media: "(prefers-color-scheme: light)", color: "#dae0e6" }
       ],
  }