import type { Metadata } from 'next'
import { Inter, Playfair_Display,Noto_Sans_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { RTLProvider } from '@/components/providers/rtl-provider'
import { MobileNav } from '@/components/layout/mobile-nav'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import './globals.css'
// يمنع الـ cache ويجبر قراءة الـ cookie في كل request
export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'The Waiting Room – For Migrants in Belgium',
  description: 'A civic advocacy platform for migrants holding Greek or Bulgarian protection status while living in Belgium.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
  openGraph: {
    title: 'The Waiting Room',
    description: 'A civic advocacy platform for migrants in Belgium.',
    url: 'https://waitroom.be',
    siteName: 'The Waiting Room',
    images: [{ url: '/logo.png' }],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning className="bg-background">
      <body className={`${inter.variable} ${playfair.variable} ${notoArabic.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <RTLProvider />
            {children}
            <MobileNav />
          </ThemeProvider>
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}