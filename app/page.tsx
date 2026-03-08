'use client'

import dynamic from 'next/dynamic'
import { HeroIntro } from '@/components/HeroIntro'
import { LoveLetter } from '@/components/LoveLetter'
import { LoveTimeline } from '@/components/LoveTimeline'
import { LoveStoryAnimation } from '@/components/LoveStoryAnimation'
import { WhyILoveYou } from '@/components/WhyILoveYou'
import { SpecialMessage } from '@/components/SpecialMessage'
import { SurpriseButton } from '@/components/SurpriseButton'
import { FlowerPetals } from '@/components/FlowerPetals'
import { WelcomeDialog } from '@/components/WelcomeDialog'

// Dynamic import for client-only effects
const FloatingHearts = dynamic(
  () => import('@/components/FloatingHearts').then((m) => m.FloatingHearts),
  { ssr: false }
)
const CursorSparkle = dynamic(
  () => import('@/components/CursorSparkle').then((m) => m.CursorSparkle),
  { ssr: false }
)

export default function Page() {
  return (
    <main className="relative overflow-x-hidden" style={{ background: '#0d0a1a' }}>
      {/* Welcome Dialog */}
      <WelcomeDialog />

      {/* Global ambient effects */}
      <FloatingHearts count={20} />
      <FlowerPetals />
      <CursorSparkle />

      {/* Section 1 — Dream Intro */}
      <HeroIntro />

      {/* Section 2 — Love Letter */}
      <LoveLetter />

      {/* Section 3 — Love Story Animation */}
      <LoveStoryAnimation />

      {/* Section 4 — Our Story (Timeline) */}
      <LoveTimeline />

      {/* Section 5 — Why I Love You */}
      <WhyILoveYou />

      {/* Section 6 — Special Message for 8/3 */}
      <SpecialMessage />

      {/* Section 7 — Interactive Surprise */}
      {/* <SurpriseButton /> */}

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center"
        style={{ background: '#0d0a1a', borderTop: '1px solid rgba(249, 168, 212, 0.1)' }}
      >
        <p className="font-serif italic text-sm" style={{ color: '#f9a8d450' }}>
          Made with ❤️ — Happy Women&apos;s Day 8/3
        </p>
      </footer>
    </main>
  )
}
