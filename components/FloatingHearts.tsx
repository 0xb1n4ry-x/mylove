'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface FloatingHeart {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  opacity: number
  color: string
}

const HEART_COLORS = ['#f9a8d4', '#fda4af', '#fb7185', '#d8b4fe', '#f472b6']

function generateHearts(count: number): FloatingHeart[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 20 + 10,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.5 + 0.2,
    color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
  }))
}

export function FloatingHearts({ count = 18 }: { count?: number }) {
  const hearts = useRef<FloatingHeart[]>(generateHearts(count))

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10" aria-hidden="true">
      {hearts.current.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0"
          style={{ left: `${heart.x}%` }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, heart.opacity, heart.opacity, 0],
            rotate: [0, 15, -15, 10, -10, 0],
            x: [0, 20, -20, 15, -10, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
            style={{ filter: `drop-shadow(0 0 4px ${heart.color}88)` }}
          >
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.403 3.752 1 6.5 1c1.699 0 3.197.785 4.5 2.099C12.303 1.785 13.8 1 15.5 1 18.248 1 21 3.403 21 7.191c0 4.105-5.37 8.863-11 14.402Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
