import type { Metadata } from 'next'
import PropertyLanding from '@/components/PropertyLanding'
import { commercialContent } from '@/lib/landingData'

export const metadata: Metadata = {
  title: commercialContent.pageTitle,
  description: commercialContent.pageDescription,
  openGraph: {
    title: commercialContent.pageTitle,
    description: commercialContent.pageDescription,
    url: 'http://localhost:3000/commercial',
    type: 'website',
    locale: 'ru_RU',
    siteName: commercialContent.siteTitle,
  },
}

export default function CommercialPage() {
  return <PropertyLanding content={commercialContent} />
}
