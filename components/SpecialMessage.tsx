'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const MODAL_MESSAGE = [
  'Người ta hay nói tình yêu là một chuyến đi dài.',
  '',
  'Với anh, chuyến đi ấy không cần phải đến một nơi nào đó quá xa xôi hay vĩ đại.',
  'Chỉ cần người đồng hành là em,',
  'thì dẫu ngày mai có ra sao, anh cũng thấy lòng mình neo đậu một bến đỗ an bình.',
  '',
  'Cảm ơn em đã bước vào thế giới của anh.',
  'Cảm ơn em vì đã để anh được là người gánh vác, chở che và yêu thương em.',
  '',
  'Anh không dám hứa những điều quá hoa mỹ hay xa vời.',
  'Nhưng anh tự hứa với lòng mình,',
  'sẽ dành tất cả sự chân thành, kiên nhẫn và bao dung nhất',
  'để nâng niu người con gái đang đọc những dòng chữ này.',
  '',
  'Happy Women\'s Day 8/3 ❤️',
  'Thương em rất nhiều.',
]

const MESSAGE_LINES = [
  { text: 'Hôm nay là ngày của em.', size: 'text-2xl md:text-4xl', delay: 0 },
  { text: '', size: '', delay: 0.3 },
  { text: 'Anh chỉ muốn em biết rằng:', size: 'text-lg md:text-2xl', delay: 0.5 },
  { text: 'Em xứng đáng với tất cả', size: 'text-2xl md:text-4xl font-bold', delay: 0.8 },
  { text: 'sự yêu thương trên thế giới.', size: 'text-2xl md:text-4xl font-bold', delay: 1.1 },
]

const WISHES = [
  'Có một điều bí mật nhỏ dành cho em...',
  'Bấm vào ',
]

export function SpecialMessage() {
  const titleRef = useRef<HTMLDivElement>(null)
  const wishRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: '-80px' })
  const wishInView = useInView(wishRef, { once: true, margin: '-60px' })
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1a0d2e 0%, #3d0a30 40%, #2d0a22 70%, #1a0d2e 100%)',
      }}
      aria-label="Special 8/3 message section"
    >
      {/* Background hearts */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              bottom: '-20px',
              opacity: 0.15,
            }}
            animate={{ y: [0, -(300 + i * 50)], opacity: [0, 0.2, 0] }}
            transition={{
              duration: 6 + i,
              delay: i * 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg width={20 + i * 4} height={20 + i * 4} viewBox="0 0 24 24" fill="#f9a8d4">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.403 3.752 1 6.5 1c1.699 0 3.197.785 4.5 2.099C12.303 1.785 13.8 1 15.5 1 18.248 1 21 3.403 21 7.191c0 4.105-5.37 8.863-11 14.402Z" />
            </svg>
          </motion.div>
        ))}

        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-3xl mx-auto text-center" ref={titleRef}>
        {/* Section tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-10"
          style={{ background: 'rgba(249, 168, 212, 0.15)', border: '1px solid rgba(249,168,212,0.3)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#f9a8d4" aria-hidden="true">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.403 3.752 1 6.5 1c1.699 0 3.197.785 4.5 2.099C12.303 1.785 13.8 1 15.5 1 18.248 1 21 3.403 21 7.191c0 4.105-5.37 8.863-11 14.402Z" />
          </svg>
          <span className="font-sans text-sm tracking-widest uppercase" style={{ color: '#f9a8d4' }}>
            Ngày 8 tháng 3
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#f9a8d4" aria-hidden="true">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.403 3.752 1 6.5 1c1.699 0 3.197.785 4.5 2.099C12.303 1.785 13.8 1 15.5 1 18.248 1 21 3.403 21 7.191c0 4.105-5.37 8.863-11 14.402Z" />
          </svg>
        </motion.div>

        {/* Main message */}
        <div className="space-y-2 mb-12">
          {MESSAGE_LINES.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: line.delay, ease: 'easeOut' }}
              className={`font-serif text-balance leading-snug ${line.size}`}
              style={{ color: i >= 3 ? '#f472b6' : '#fce4ec', textShadow: i >= 3 ? '0 0 30px #f472b660' : undefined }}
            >
              {line.text}
            </motion.p>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="mx-auto mb-12 w-32 h-0.5 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #f9a8d4, transparent)' }}
        />


      </div>
    </section>
  )
}
