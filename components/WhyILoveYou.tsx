'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const REASONS = [
  {
    icon: '😊',
    text: 'Anh yêu nụ cười của em, đặc biệt khi em không biết anh đang nhìn.',
  },
  {
    icon: '👂',
    text: 'Anh thích cách em lắng nghe, như mọi chuyện của anh đều quan trọng.',
  },
  {
    icon: '🤗',
    text: 'Anh yêu sự ấm áp của em, ngay cả trong những lúc anh im lặng.',
  },
  {
    icon: '✨',
    text: 'Anh thích tự do khi ở bên em, không cần phải giả vờ gì cả.',
  },
  {
    icon: '💙',
    text: 'Anh yêu em vì em chỉ là em, không cần phải là ai khác.',
  },
  {
    icon: '🌙',
    text: 'Anh yêu những khoảnh khắc tầm thường cùng em.',
  },
]

function ReasonCard({ reason, index }: { reason: typeof REASONS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative group rounded-2xl p-6 md:p-8 text-center cursor-default"
      style={{
        background: 'linear-gradient(135deg, rgba(249,168,212,0.1), rgba(216,180,254,0.08))',
        border: '1px solid rgba(249, 168, 212, 0.2)',
        backdropFilter: 'blur(6px)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: '0 0 40px rgba(249, 168, 212, 0.2), inset 0 0 30px rgba(249, 168, 212, 0.05)' }}
        aria-hidden="true"
      />

      {/* Icon */}
      <motion.div
        className="text-4xl mb-4"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        {reason.icon}
      </motion.div>

      {/* Number */}
      <div
        className="absolute top-4 right-4 font-serif text-xs opacity-30"
        style={{ color: '#f9a8d4' }}
        aria-hidden="true"
      >
        #{String(index + 1).padStart(2, '0')}
      </div>

      {/* Text */}
      <p className="font-serif italic text-base md:text-lg leading-relaxed relative z-10" style={{ color: '#fce4ec' }}>
        {reason.text}
      </p>
    </motion.div>
  )
}

export function WhyILoveYou() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a0a2a 0%, #2d0a22 50%, #1a0d2e 100%)' }}
      aria-label="Why I love you section"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #d8b4fe 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-sans text-sm tracking-widest uppercase mb-3"
            style={{ color: '#f9a8d480' }}
          >
            Những điều anh yêu ở em
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif text-3xl md:text-5xl font-bold text-balance"
            style={{ color: '#fda4af', textShadow: '0 0 30px #fda4af40' }}
          >
            Anh yêu em vì...
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-4 w-20 h-0.5 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #f9a8d4, transparent)' }}
          />
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, i) => (
            <ReasonCard key={i} reason={reason} index={i} />
          ))}
        </div>

        {/* Extra romantic quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-16 text-center"
        >
          <p className="font-serif italic text-base md:text-xl leading-relaxed" style={{ color: '#fce4ec' }}>
            &ldquo;Nhưng nếu phải chọn một lý do,<br />
            thì anh sẽ nói: vì em là em.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  )
}
