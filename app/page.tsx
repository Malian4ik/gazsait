import PropertyLanding from '@/components/PropertyLanding'
import { residentialContent } from '@/lib/landingData'

export default function Home() {
  return <PropertyLanding content={residentialContent} />
}
