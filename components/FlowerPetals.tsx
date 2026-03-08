'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

interface Petal {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  rotate: number
  color: string
  drift: number
}

const PETAL_COLORS = ['#fda4af', '#f9a8d4', '#fbcfe8', '#d8b4fe', '#f0abfc']

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 16 + 8,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 12,
    rotate: Math.random() * 360,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    drift: (Math.random() - 0.5) * 120,
  }))
}

const PETALS = generatePetals(22)

export function FlowerPetals() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10" aria-hidden="true">
      {PETALS.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-0"
          style={{ left: `${petal.x}%` }}
          initial={{ y: -40, opacity: 0, rotate: petal.rotate }}
          animate={{
            y: ['0%', '110vh'],
            x: [0, petal.drift],
            opacity: [0, 0.7, 0.7, 0],
            rotate: [petal.rotate, petal.rotate + 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Ellipse petal shape */}
          <div
            style={{
              width: petal.size,
              height: petal.size * 1.6,
              borderRadius: '50% 50% 50% 0',
              background: `radial-gradient(ellipse at 40% 40%, ${petal.color}ff, ${petal.color}88)`,
              filter: `drop-shadow(0 0 3px ${petal.color}60)`,
              transform: 'rotate(45deg)',
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
