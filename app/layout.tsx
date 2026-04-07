import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { LangProvider } from '@/context/LangContext'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Stayly — Аренда недвижимости в Москве и коммерческие объекты',
  description:
    'Премиальный сервис аренды недвижимости: жилая аренда по реальным ЖК Москвы и отдельная страница для коммерческих помещений.',
  keywords: [
    'аренда недвижимости москва',
    'жк москвы аренда',
    'коммерческая недвижимость аренда',
    'снять квартиру',
    'снять офис',
    'Stayly',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Stayly — Аренда недвижимости в Москве и коммерческие объекты',
    description: 'Отдельные понятные сценарии для жилой и коммерческой аренды.',
    siteName: 'Stayly',
    locale: 'ru_RU',
    type: 'website',
    url: 'http://localhost:3000',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stayly — Аренда недвижимости в Москве и коммерческие объекты',
    description: 'Поиск жилья по реальным ЖК и отдельная страница под коммерческую аренду.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f6f0e8',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
