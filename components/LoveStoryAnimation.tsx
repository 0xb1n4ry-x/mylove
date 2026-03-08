'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const SCENES = [
  {
    id: 1,
    title: 'Định mệnh gặp gỡ',
    text: `Hai thế giới song song
Cho đến khi quỹ đạo vô tình chạm nhau.

Một khoảnh khắc tươm tất,
Mở ra cả một câu chuyện dài.`,
    icon: 'meet',
  },
  {
    id: 2,
    title: 'Những dòng tin đầu tiên',
    text: `Những đoạn hội thoại ngập ngừng, xáo trộn
Lại dần trở thành thói quen mỗi sáng mai.

Những câu hỏi han vụng về,
Lại là thứ ta mong chờ nhất mỗi ngày.`,
    icon: 'chat',
  },
  {
    id: 3,
    title: 'Khi trái tim lên tiếng',
    text: `Không ồn ào.
Không phô trương.

Chỉ là một ngày nọ, 
Chợt nhận ra hình bóng một người đã ở sâu trong tâm trí.`,
    icon: 'heart',
  },
  {
    id: 4,
    title: 'Từng ngày có nhau',
    text: `Lặng lẽ thu thập từng mảnh vụn của niềm vui.
Góp nhặt những câu chuyện không tên.

Và biến những ngày bình thường
Thành phiên bản lấp lánh nhất của thanh xuân.`,
    icon: 'together',
  },
  {
    id: 5,
    title: 'Ngày hôm nay',
    text: `Hôm nay là mùng 8 tháng 3.

Anh chẳng gom được muôn vì tinh tú,
Nhưng anh cất giữ cả bầu trời bình yên
Mong dành tặng riêng em.`,
    icon: 'finale',
  },
  {
    id: 6,
    title: 'Lời hứa',
    text: `Tương lai là câu hỏi chưa có lời giải.

Nhưng hiện tại này,
Anh mong đôi tay ta vẫn đan lồng vào nhau,
Cùng bước qua những mùa yêu.`,
    icon: 'promise',
  },
]

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: '#ffffff',
            boxShadow: '0 0 4px #ffffff80',
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

function SceneIcon({ type, isInView }: { type: string; isInView: boolean }) {
  if (type === 'meet') {
    return (
      <div className="flex gap-8 items-center justify-center h-40">
        {/* Character 1 */}
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden shrink-0"
          style={{ border: '2px solid rgba(216, 180, 254, 0.8)' }}
          animate={isInView ? { x: [-80, 0] } : {}}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        >
          <Image src="/anh.jpg" alt="Anh" width={56} height={56} className="w-full h-full object-cover" />
        </motion.div>
        {/* Meeting heart */}
        <motion.div
          className="text-4xl"
          animate={isInView ? { scale: [0, 1, 0.9], opacity: [0, 1] } : {}}
          transition={{ duration: 2, delay: 1.5, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 15px rgba(249, 168, 212, 0.7))' }}
        >
          💕
        </motion.div>
        {/* Character 2 */}
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden shrink-0"
          style={{ border: '2px solid rgba(249, 168, 212, 0.8)' }}
          animate={isInView ? { x: [80, 0] } : {}}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        >
          <Image src="/em.jpg" alt="Em" width={56} height={56} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    )
  }

  if (type === 'chat') {
    return (
      <div className="flex gap-4 items-center justify-center h-40 flex-wrap">
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden shrink-0"
          style={{ border: '2px solid rgba(216, 180, 254, 0.8)' }}
        >
          <Image src="/anh.jpg" alt="Anh" width={48} height={48} className="w-full h-full object-cover" />
        </motion.div>
        <div className="flex flex-col gap-3 max-w-xs">
          <motion.div
            className="px-4 py-2 rounded-xl text-sm"
            style={{ background: 'rgba(253, 252, 253, 0.2)', border: '1px solid rgba(216, 180, 254, 0.3)' }}
            animate={isInView ? { opacity: [0, 1], x: [-20, 0] } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Bbi đi đường cẩn thận nhóoo
          </motion.div>
          <motion.div
            className="px-4 py-2 rounded-xl text-sm ml-auto"
            style={{ background: 'rgba(249, 168, 212, 0.2)', border: '1px solid rgba(249, 168, 212, 0.3)' }}
            animate={isInView ? { opacity: [0, 1], x: [20, 0] } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Anh đã ăn gì chưa?
          </motion.div>
          <motion.div
            className="px-4 py-2 rounded-xl text-sm"
            style={{ background: 'rgba(216, 180, 254, 0.2)', border: '1px solid rgba(216, 180, 254, 0.3)' }}
            animate={isInView ? { opacity: [0, 1], x: [-20, 0] } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Cuccung ngủ ngonnnnn nhớ 💕
          </motion.div>
        </div>
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden shrink-0"
          style={{ border: '2px solid rgba(249, 168, 212, 0.8)' }}
        >
          <Image src="/em.jpg" alt="Em" width={48} height={48} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    )
  }

  if (type === 'heart') {
    return (
      <div className="flex items-center justify-center h-40">
        <motion.div
          className="text-8xl relative"
          animate={isInView ? { scale: [0.5, 1.2, 1], opacity: [0, 1] } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            filter: 'drop-shadow(0 0 30px rgba(249, 168, 212, 0.9))',
          }}
        >
          ❤️
        </motion.div>
        {/* Glow effect */}
        <motion.div
          className="absolute w-48 h-48 rounded-full pointer-events-none"
          animate={isInView ? { opacity: [0.3, 0.6, 0.3] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            background: 'radial-gradient(circle, rgba(249, 168, 212, 0.3), transparent)',
          }}
        />
      </div>
    )
  }

  if (type === 'together') {
    return (
      <div className="flex items-center justify-center h-40">
        <motion.div
          className="flex gap-4 items-center"
          animate={isInView ? { y: [0, -30, 0] } : {}}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-14 h-14 rounded-full overflow-hidden shrink-0" style={{ border: '2px solid rgba(216, 180, 254, 0.8)' }}>
            <Image src="/anh.jpg" alt="Anh" width={56} height={56} className="w-full h-full object-cover" />
          </div>
          <motion.div
            className="text-6xl mx-2"
            animate={isInView ? { opacity: [0.2, 1, 0.2] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))' }}
          >
            ⭐
          </motion.div>
          <div className="w-14 h-14 rounded-full overflow-hidden shrink-0" style={{ border: '2px solid rgba(249, 168, 212, 0.8)' }}>
            <Image src="/em.jpg" alt="Em" width={56} height={56} className="w-full h-full object-cover" />
          </div>
        </motion.div>
        {/* Floating stars around */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            animate={isInView ? { y: [-50, -150], opacity: [1, 0], x: Math.sin(i) * 100 } : {}}
            transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
            style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
          >
            ⭐
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === 'finale') {
    return (
      <div className="flex items-center justify-center h-40 relative">
        <motion.div
          className="text-9xl"
          animate={isInView ? { y: [-40, -120, -40], scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            filter: 'drop-shadow(0 0 40px rgba(249, 168, 212, 1))',
          }}
        >
          ❤️
        </motion.div>
        {/* Surrounding hearts */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            animate={isInView ? {
              y: [-30, -150],
              x: Math.cos(i) * 150,
              opacity: [1, 0]
            } : {}}
            transition={{
              duration: 2.5,
              delay: i * 0.2,
              repeat: Infinity
            }}
            style={{
              filter: 'drop-shadow(0 0 15px rgba(249, 168, 212, 0.7))',
            }}
          >
            💕
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === 'promise') {
    return (
      <div className="flex gap-6 items-center justify-center h-40">
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden shrink-0"
          style={{ border: '2px solid rgba(216, 180, 254, 0.8)' }}
          animate={isInView ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Image src="/anh.jpg" alt="Anh" width={64} height={64} className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          className="w-24 h-24 rounded-full flex items-center justify-center text-6xl"
          animate={isInView ? {
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          } : {}}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            background: 'radial-gradient(circle, rgba(249, 168, 212, 0.3), transparent)',
            filter: 'drop-shadow(0 0 20px rgba(249, 168, 212, 0.6))',
          }}
        >
          ❤️
        </motion.div>
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden shrink-0"
          style={{ border: '2px solid rgba(249, 168, 212, 0.8)' }}
          animate={isInView ? { rotate: [0, -5, 5, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        >
          <Image src="/em.jpg" alt="Em" width={64} height={64} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    )
  }
}

function Scene({ scene }: { scene: (typeof SCENES)[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-40%' })

  return (
    <motion.div
      ref={ref}
      className="relative py-32 px-6 min-h-screen flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Icon animation */}
      <SceneIcon type={scene.icon} isInView={isInView} />

      {/* Text content */}
      <motion.div
        className="max-w-2xl text-center mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
      >
        <h3
          className="font-serif text-2xl md:text-4xl font-semibold mb-8 text-balance"
          style={{ color: '#f9a8d4', textShadow: '0 0 25px rgba(249, 168, 212, 0.5)' }}
        >
          {scene.title}
        </h3>
        <p
          className="font-sans text-base md:text-lg leading-8 whitespace-pre-line"
          style={{ color: '#fce4ec' }}
        >
          {scene.text}
        </p>
      </motion.div>
    </motion.div>
  )
}

export function LoveStoryAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0515 0%, #1a0d2e 50%, #0d0a1a 100%)' }}
      aria-label="Love story animation section"
    >
      {/* Starfield background */}
      <StarField />

      {/* Parallax effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: parallaxY }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(216, 180, 254, 0.1), transparent)',
          }}
        />
      </motion.div>

      {/* Scenes container */}
      <div className="relative z-10">
        <div className="text-center py-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-sm tracking-widest uppercase mb-3"
            style={{ color: '#d8b4fe80' }}
          >
            Hành trình của chúng ta
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif text-3xl md:text-5xl font-bold text-balance"
            style={{ color: '#d8b4fe', textShadow: '0 0 30px #d8b4fe40' }}
          >
            Câu chuyện của chúng ta
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-4 w-20 h-0.5 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #d8b4fe, transparent)' }}
          />
        </div>

        {/* All scenes */}
        {SCENES.map((scene) => (
          <Scene key={scene.id} scene={scene} />
        ))}
      </div>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #d8b4fe50, transparent)' }}
      />
    </section>
  )
}
