'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LETTER_LINES = [
  'Babie yêu dấu,',
  '',
  'Lúc ngồi gõ những dòng chữ này, anh cứ nghĩ mãi xem thế nào mới có thể gói gọn được tất cả những gì anh muốn nói với em. Ngôn từ thì có hạn, mà tình cảm trong anh lại nhiều hơn những gì anh có thể diễn đạt.',
  '',
  'Anh nhận ra rằng từ ngày có em bước vào đời, thế giới của anh bỗng trở nên rực rỡ và dịu dàng hơn rất nhiều. Em mang đến một loại bình yên mà anh chưa từng trải qua, và dường như cũng chưa từng mường tượng mình sẽ cần đến vậy.',
  '',
  'Có đôi lúc, khi ngồi tĩnh lặng nhìn lại cuộc sống của chính mình, anh thấy thật biết ơn. Cảm ơn sự xuất hiện của em. Không phải vì em mang đến những điều gì đó quá hào nhoáng hay lung linh, mà vì ở cạnh em, anh được là một phiên bản thoải mái nhất, tự do nhất.',
  '',
  'Anh thương sự trong trẻo ở em. Yêu nụ cười, yêu cả cái cách em suy nghĩ về mọi thứ xung quanh. Đôi khi, chỉ cần nhìn thấy em cười, hay nghe một giọng nói quen thuộc vang lên bên tai, mọi phiền muộn ngoài kia dường như đều dừng lại đằng sau cánh cửa.',
  '',
  'Hôm nay là ngày kỷ niệm dành cho một nửa thế giới. Giữa vô vàn những người phụ nữ tuyệt vời ngoài kia, anh tự hào nói rằng cô gái của anh cũng là một mảnh ghép thật đặc biệt. Em ở đây, sáng bừng theo cách của riêng em.',
  '',
  'Mong em của anh sẽ luôn giữ mãi sự rạng rỡ, trong sáng. Dù ngày nắng hay ngày mưa, anh lúc nào cũng sẽ ở đây, lặng lẽ đồng hành cùng em qua những tháng năm.',
  '',
  'Chúc em một ngày 8/3 thật vui và ngập tràn hạnh phúc.',
  'Anh thương em rất nhiều.',
]

const SMALL_HEARTS = [
  { top: '8%', left: '6%', size: 14, delay: 0.5, color: '#f9a8d4' },
  { top: '15%', right: '8%', size: 10, delay: 1.2, color: '#fda4af' },
  { top: '50%', left: '3%', size: 12, delay: 2, color: '#d8b4fe' },
  { bottom: '12%', right: '5%', size: 16, delay: 1.8, color: '#f472b6' },
  { bottom: '25%', left: '7%', size: 8, delay: 0.8, color: '#fb7185' },
]

function FloatingMiniHeart({ style, size, delay, color }: { style: React.CSSProperties; size: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
      transition={{ duration: 3 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color}88)` }}>
        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.403 3.752 1 6.5 1c1.699 0 3.197.785 4.5 2.099C12.303 1.785 13.8 1 15.5 1 18.248 1 21 3.403 21 7.191c0 4.105-5.37 8.863-11 14.402Z" />
      </svg>
    </motion.div>
  )
}

export function LoveLetter() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1a0d2e 0%, #2d1040 30%, #1a0a1a 100%)',
      }}
      aria-label="Love letter section"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #f9a8d450, transparent)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #f9a8d450, transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #f9a8d4 0%, transparent 70%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative max-w-2xl w-full mx-auto rounded-2xl p-8 md:p-12 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,240,248,0.08) 0%, rgba(255,220,240,0.05) 100%)',
          border: '1px solid rgba(249, 168, 212, 0.25)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Envelope top fold decoration */}
        <div className="flex items-center gap-3 mb-8" aria-hidden="true">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #f9a8d460)' }} />
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#f9a8d4" style={{ filter: 'drop-shadow(0 0 6px #f9a8d4)' }}>
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.403 3.752 1 6.5 1c1.699 0 3.197.785 4.5 2.099C12.303 1.785 13.8 1 15.5 1 18.248 1 21 3.403 21 7.191c0 4.105-5.37 8.863-11 14.402Z" />
          </svg>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #f9a8d460, transparent)' }} />
        </div>

        {/* Letter lines */}
        <div className="space-y-3">
          {LETTER_LINES.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
              className={`font-serif leading-relaxed ${i === 0 ? 'text-xl md:text-2xl font-semibold' : 'text-base md:text-lg'
                } ${line === '' ? 'h-3' : ''}`}
              style={{ color: i === 0 ? '#f9a8d4' : '#fce4ec' }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: LETTER_LINES.length * 0.12 + 0.3 }}
          className="mt-8 flex items-center gap-3"
        >
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #f9a8d460)' }} />
          <p className="font-serif italic text-lg" style={{ color: '#f9a8d4' }}>Với tất cả tình yêu ❤️</p>
        </motion.div>

        {/* Floating mini hearts */}
        {SMALL_HEARTS.map((h, i) => (
          <FloatingMiniHeart
            key={i}
            style={{
              ...(h.top ? { top: h.top } : {}),
              ...(h.bottom ? { bottom: h.bottom } : {}),
              ...(h.left ? { left: h.left } : {}),
              ...(h.right ? { right: h.right } : {}),
            }}
            size={h.size}
            delay={h.delay}
            color={h.color}
          />
        ))}
      </motion.div>
    </section>
  )
}
