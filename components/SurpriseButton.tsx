'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FireworkParticle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  isHeart: boolean
}

const COLORS = ['#f9a8d4', '#fda4af', '#fb7185', '#d8b4fe', '#f472b6', '#fde68a', '#ffffff']

function generateParticles(originX: number, originY: number, count: number): FireworkParticle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
    const speed = Math.random() * 200 + 80
    return {
      id: i,
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 10 + 6,
      isHeart: Math.random() > 0.4,
    }
  })
}

function HeartSvg({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.403 3.752 1 6.5 1c1.699 0 3.197.785 4.5 2.099C12.303 1.785 13.8 1 15.5 1 18.248 1 21 3.403 21 7.191c0 4.105-5.37 8.863-11 14.402Z" />
    </svg>
  )
}

export function SurpriseButton() {
  const [fireworks, setFireworks] = useState<{ id: number; particles: FireworkParticle[] }[]>([])
  const [showModal, setShowModal] = useState(false)
  const [hasFired, setHasFired] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const counterRef = useRef(0)

  const triggerFireworks = () => {
    if (typeof window === 'undefined') return
    const rect = buttonRef.current?.getBoundingClientRect()
    const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2

    const origins = [
      { x: cx, y: cy },
      { x: cx - 120, y: cy - 80 },
      { x: cx + 120, y: cy - 80 },
      { x: cx - 60, y: cy - 160 },
      { x: cx + 60, y: cy - 160 },
    ]

    origins.forEach((origin, i) => {
      setTimeout(() => {
        const id = counterRef.current++
        const particles = generateParticles(origin.x, origin.y, 28)
        setFireworks((prev) => [...prev, { id, particles }])
        setTimeout(() => {
          setFireworks((prev) => prev.filter((f) => f.id !== id))
        }, 1400)
      }, i * 160)
    })
  }

  const handleClick = () => {
    triggerFireworks()
    setHasFired(true)
    setTimeout(() => setShowModal(true), 400)
  }

  return (
    <>
      {/* Fireworks layer */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
        <AnimatePresence>
          {fireworks.map((fw) =>
            fw.particles.map((p) => (
              <motion.div
                key={`${fw.id}-${p.id}`}
                initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
                animate={{
                  x: p.x + p.vx * 0.8,
                  y: p.y + p.vy * 0.8 + 60,
                  opacity: 0,
                  scale: 0.2,
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute"
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                {p.isHeart ? (
                  <HeartSvg color={p.color} size={p.size} />
                ) : (
                  <div
                    className="rounded-full"
                    style={{ width: p.size / 2, height: p.size / 2, background: p.color, boxShadow: `0 0 6px ${p.color}` }}
                  />
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Button section */}
      <section
        className="relative py-24 px-6 flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #1a0d2e 0%, #2d0a22 100%)' }}
        aria-label="Surprise button section"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #f9a8d4 0%, transparent 70%)' }} />
        </div>

        <div className="relative text-center flex flex-col items-center gap-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-lg md:text-xl"
            style={{ color: '#fce4ec' }}
          >
            Có một điều bí mật nhỏ dành cho em...
          </motion.p>

          <motion.button
            ref={buttonRef}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 150 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="relative px-10 py-5 rounded-full font-serif text-lg md:text-xl font-semibold cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #f9a8d4, #fb7185)',
              color: '#fff',
              boxShadow: '0 0 30px rgba(249, 168, 212, 0.5), 0 4px 20px rgba(251, 113, 133, 0.4)',
              border: 'none',
            }}
            aria-label="Click for a surprise"
          >
            <motion.span
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.403 3.752 1 6.5 1c1.699 0 3.197.785 4.5 2.099C12.303 1.785 13.8 1 15.5 1 18.248 1 21 3.403 21 7.191c0 4.105-5.37 8.863-11 14.402Z" />
              </svg>
              Bấm vào đây
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.403 3.752 1 6.5 1c1.699 0 3.197.785 4.5 2.099C12.303 1.785 13.8 1 15.5 1 18.248 1 21 3.403 21 7.191c0 4.105-5.37 8.863-11 14.402Z" />
              </svg>
            </motion.span>
          </motion.button>

          {hasFired && !showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-sans"
              style={{ color: '#f9a8d480' }}
            >
              Đợi một chút...
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(13, 8, 26, 0.85)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowModal(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Surprise love message"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative max-w-md w-full rounded-3xl p-8 md:p-12 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255,240,248,0.12), rgba(216,180,254,0.08))',
                border: '1px solid rgba(249, 168, 212, 0.4)',
                boxShadow: '0 0 60px rgba(249, 168, 212, 0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Pulsing heart */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex justify-center mb-6"
                aria-hidden="true"
              >
                <svg width="64" height="64" viewBox="0 0 24 24" fill="#f9a8d4" style={{ filter: 'drop-shadow(0 0 20px #f9a8d4)' }}>
                  <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.403 3.752 1 6.5 1c1.699 0 3.197.785 4.5 2.099C12.303 1.785 13.8 1 15.5 1 18.248 1 21 3.403 21 7.191c0 4.105-5.37 8.863-11 14.402Z" />
                </svg>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-3xl md:text-4xl font-bold mb-4"
                style={{ color: '#f9a8d4', textShadow: '0 0 30px #f9a8d460' }}
              >
                Anh yêu em ❤️
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <p className="font-serif italic text-base md:text-lg" style={{ color: '#fce4ec' }}>
                  Cảm ơn em vì đã đến bên anh.
                </p>
                <p className="font-serif italic text-base md:text-lg" style={{ color: '#fce4ec' }}>
                  Chúc em một ngày 8/3 thật hạnh phúc.
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => setShowModal(false)}
                className="mt-8 px-6 py-2 rounded-full text-sm font-sans cursor-pointer"
                style={{
                  background: 'rgba(249, 168, 212, 0.2)',
                  border: '1px solid rgba(249, 168, 212, 0.4)',
                  color: '#f9a8d4',
                }}
                aria-label="Close modal"
              >
                Đóng lại
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
