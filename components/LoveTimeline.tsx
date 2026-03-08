'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TIMELINE_ITEMS = [
  {
    title: 'Ấn tượng đầu tiên',
    text: `Không phải một tiếng sét ái tình ồn ào.
Chỉ là một ánh mắt giao nhau đủ lâu để nhận ra có điều gì đó đặc biệt đang nảy nở. Một sự khởi đầu nhẹ nhàng nhưng lại gieo mầm cho cả một vườn hoa sau này.`,
  },
  {
    title: 'Sự đồng điệu',
    text: `Rồi có một lúc nào đó, chúng ta nhận ra giữa hai đứa có một sự kết nối rất đặc biệt.
Không cần cố gắng giải thích điều gì, mọi thứ cứ tự nhiên xảy ra.
Ở bên nhau, ngay cả những khoảnh khắc im lặng cũng trở nên thật dễ chịu.
Giống như hai người đang bước cùng một nhịp,
một nhịp điệu mà chỉ chúng ta mới cảm nhận được.`,
  },
  {
    title: 'Nhường nhịn và thấu hiểu',
    text: `Không có tình yêu nào mượt mà mãi mãi.
Có những hờn dỗi, có những lúc chưa hiểu nhau. Nhưng sau tất cả, chúng ta học được cách hạ cái tôi xuống, ôm lấy nhau chặt hơn và nhận ra người kia quan trọng đến nhường nào.`,
  },
  {
    title: 'Sự bình yên',
    text: `Bây giờ, tình yêu không chỉ là những lúc cuồng nhiệt.
Nó ẩn hình trong ly nước ấm lúc ốm đau, trong cái nắm tay thật chặt khi đi qua ngã tư đông người, và trong ánh mắt luôn hướng về nhau dù ở bất kỳ đâu.`,
  },
  {
    title: 'Hướng về tương lai',
    text: `Nhìn lại chặng đường đã qua, anh thấy mình thật sự trưởng thành hơn khi có em đồng hành.
Và nếu có được một đặc ân, anh mong mình có sức khỏe, có bản lĩnh để che chở cho em trong suốt quãng đường dài phía trước.`,
  },
]

function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: typeof TIMELINE_ITEMS[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative flex items-center md:justify-center">
      {/* Vertical line (desktop center) */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hidden md:block absolute top-20 left-1/2 -translate-x-1/2 w-0.5 h-28 origin-top"
          style={{ background: 'linear-gradient(180deg, #f9a8d4, #d8b4fe)' }}
        />
      )}

      {/* Content (alternating sides on desktop) */}
      <div className="flex items-start gap-4 w-full md:w-1/2 md:pr-12" style={{ marginLeft: isLeft ? 0 : 'auto', paddingRight: isLeft ? undefined : 0, paddingLeft: isLeft ? undefined : '3rem' }}>
        {/* Mobile: left vertical line */}
        <div className="flex flex-col items-center md:hidden flex-shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15, type: 'spring', stiffness: 200 }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 relative z-10"
            style={{
              background: 'linear-gradient(135deg, #f9a8d4, #d8b4fe)',
              boxShadow: '0 0 20px rgba(249, 168, 212, 0.6)',
            }}
          >
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#fff' }}>
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.403 3.752 1 6.5 1c1.699 0 3.197.785 4.5 2.099C12.303 1.785 13.8 1 15.5 1 18.248 1 21 3.403 21 7.191c0 4.105-5.37 8.863-11 14.402Z" />
              </svg>
            </motion.div>
          </motion.div>
          {!isLast && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-0.5 flex-1 mt-2 origin-top"
              style={{ background: 'linear-gradient(180deg, #f9a8d4, #d8b4fe)', minHeight: 80 }}
            />
          )}
        </div>

        {/* Text card */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
          className="flex-1 rounded-2xl p-5 md:p-6 mb-8"
          style={{
            background: 'linear-gradient(135deg, rgba(249,168,212,0.08), rgba(216,180,254,0.06))',
            border: '1px solid rgba(249, 168, 212, 0.2)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {/* Desktop icon */}
          <div className="hidden md:flex items-center gap-3 mb-3">
            <motion.div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f9a8d4, #d8b4fe)', boxShadow: '0 0 16px rgba(249,168,212,0.5)' }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.403 3.752 1 6.5 1c1.699 0 3.197.785 4.5 2.099C12.303 1.785 13.8 1 15.5 1 18.248 1 21 3.403 21 7.191c0 4.105-5.37 8.863-11 14.402Z" />
              </svg>
            </motion.div>
          </div>
          <h3 className="font-serif text-lg md:text-xl font-semibold mb-3" style={{ color: '#fda4af' }}>
            {item.title}
          </h3>
          <p className="font-sans text-sm md:text-base leading-relaxed whitespace-pre-line" style={{ color: '#fce4ec' }}>
            {item.text}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export function LoveTimeline() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a0d2e 0%, #2d1040 50%, #1a0a2a 100%)' }}
      aria-label="Love story timeline section"
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #d8b4fe50, transparent)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #d8b4fe50, transparent)' }} />
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-sans text-sm tracking-widest uppercase mb-3"
            style={{ color: '#d8b4fe80' }}
          >
            Hành trình của chúng ta
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif text-3xl md:text-5xl font-bold text-balance"
            style={{ color: '#d8b4fe', textShadow: '0 0 30px #d8b4fe40' }}
          >
            Câu chuyện của chúng ta
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-4 w-20 h-0.5 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #d8b4fe, transparent)' }}
          />
        </div>

        {/* Timeline items */}
        <div className="flex flex-col gap-2">
          {TIMELINE_ITEMS.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} isLast={i === TIMELINE_ITEMS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
