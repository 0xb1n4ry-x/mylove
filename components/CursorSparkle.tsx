'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  color: string
}

const SPARKLE_COLORS = [
  '#f9a8d4', // pink-300
  '#fda4af', // rose-300
  '#d8b4fe', // violet-300
  '#fde68a', // amber-200
  '#ffffff',
]

export function CursorSparkle() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const counterRef = useRef(0)
  const lastSparkleTime = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastSparkleTime.current < 40) return
      lastSparkleTime.current = now

      const id = counterRef.current++
      const size = Math.random() * 12 + 6
      const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)]

      setSparkles((prev) => [
        ...prev.slice(-20),
        {
          id,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          size,
          color,
        },
      ])

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id))
      }, 700)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 1, scale: 0, x: sparkle.x - sparkle.size / 2, y: sparkle.y - sparkle.size / 2 }}
            animate={{ opacity: 0, scale: 1, x: sparkle.x - sparkle.size / 2, y: sparkle.y - sparkle.size / 2 - 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute"
            style={{ width: sparkle.size, height: sparkle.size }}
          >
            <svg viewBox="0 0 24 24" fill={sparkle.color} style={{ width: '100%', height: '100%' }}>
              <path d="M12 2 L13.5 9 L20 9 L14.5 13.5 L16.5 21 L12 16.5 L7.5 21 L9.5 13.5 L4 9 L10.5 9 Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
