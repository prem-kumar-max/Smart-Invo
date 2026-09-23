import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Cormorant_Garamond, Great_Vibes } from 'next/font/google'
import './globals.css'
import { SplashScreen } from '@/components/wedding/splash-screen'
import { MusicPlayer } from '@/components/wedding/music-player'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Prasanna & Kiran',
  applicationName: 'Prasanna & Kiran',
  description:
    'Together with our families, we joyfully invite you to celebrate the Holy Matrimony of Prasanna & Kiran — Friday, 2 October 2026, 10:45 AM IST onwards, Shadikhana Function Hall, Ajit Singh Nagar, Vijayawada.',
  icons: {
    icon: [
      { url: '/app-icons/prasanna-kiran-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/app-icons/prasanna-kiran-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: { url: '/app-icons/prasanna-kiran-180.png', sizes: '180x180', type: 'image/png' },
  },
  appleWebApp: {
    capable: true,
    title: 'Prasanna & Kiran',
    statusBarStyle: 'default',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#5b3e7e',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      // Extensions can inject crxlauncher attributes before React hydrates.
      // Suppress warnings on this element only; descendants remain checked.
      suppressHydrationWarning
      className={`${playfair.variable} ${cormorant.variable} ${greatVibes.variable} bg-background`}
    >
      <body className="antialiased">
        <SplashScreen />
        {children}
        <MusicPlayer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
