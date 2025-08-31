import { HeroSection } from '@/components/Home/HeroSection'
import { FeaturedProperties } from '@/components/Home/FeaturedProperties'
import { SearchSection } from '@/components/Home/SearchSection'
import { FeaturesSection } from '@/components/Home/FeaturesSection'
import { StatsSection } from '@/components/Home/StatsSection'
import { TestimonialsSection } from '@/components/Home/TestimonialsSection'
import { CTASection } from '@/components/Home/CTASection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SearchSection />
      <FeaturedProperties />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
