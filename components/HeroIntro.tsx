'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 70,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.8 + 0.2,
    duration: Math.random() * 3 + 2,
  }))
}

const TYPING_TEXT = 'Trong hàng tỷ người trên thế giới,\nanh thật may mắn khi gặp được em.'

export function HeroIntro() {
  const [typedText, setTypedText] = useState('')
  const [showTitle, setShowTitle] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showTyping, setShowTyping] = useState(false)
  const [stars] = useState<Star[]>(() => generateStars(120))

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 400)
    const t2 = setTimeout(() => setShowSubtitle(true), 1200)
    const t3 = setTimeout(() => setShowTyping(true), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  useEffect(() => {
    if (!showTyping) return
    let i = 0
    const interval = setInterval(() => {
      setTypedText(TYPING_TEXT.slice(0, i + 1))
      i++
      if (i >= TYPING_TEXT.length) clearInterval(interval)
    }, 50)
    return () => clearInterval(interval)
  }, [showTyping])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0d0a1a 0%, #1a0d2e 30%, #2d0a22 60%, #1a0d1a 100%)',
      }}
      aria-label="Welcome section"
    >
      {/* Starry sky */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{ opacity: [star.opacity, star.opacity * 0.3, star.opacity] }}
            transition={{ duration: star.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Soft glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #f9a8d4 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #d8b4fe 0%, transparent 70%)' }} aria-hidden="true" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center gap-6 px-6 text-center max-w-3xl">
        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={showTitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight"
            style={{
              color: '#fda4af',
              textShadow: '0 0 40px #f9a8d480, 0 0 80px #fb718540',
            }}
          >
            Happy Women&apos;s Day
            <span className="block text-5xl md:text-7xl lg:text-8xl mt-2" style={{ color: '#f472b6', textShadow: '0 0 60px #f472b680' }}>
              8/3 ❤️
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={showSubtitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-serif italic text-lg md:text-2xl text-balance"
          style={{ color: '#f9d8e8' }}
        >
          Gửi đến cô gái tuyệt vời nhất trong cuộc đời anh
        </motion.p>

        {/* Divider */}
        {showSubtitle && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-32 h-0.5 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #f9a8d4, transparent)' }}
          />
        )}

        {/* Typing text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showTyping ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="min-h-16"
        >
          <p
            className="font-sans text-base md:text-xl leading-relaxed whitespace-pre-line"
            style={{ color: '#fce4ec' }}
          >
            {typedText}
            {typedText.length < TYPING_TEXT.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-5 bg-pink-300 ml-0.5 align-middle"
              />
            )}
          </p>
        </motion.div>

        {/* Scroll hint */}
        {typedText.length >= TYPING_TEXT.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 flex flex-col items-center gap-2"
            style={{ color: '#f9a8d4' }}
          >
            <span className="text-sm font-sans tracking-widest uppercase opacity-70">Cuộn xuống</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
