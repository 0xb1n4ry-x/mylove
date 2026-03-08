'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function WelcomeDialog() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show dialog on mount
    setIsOpen(true)
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(6px)' }}
          onClick={() => setIsOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Dialog Box */}
          <motion.div
            className="relative w-full sm:max-w-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 max-h-[90vh] overflow-y-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(13, 10, 26, 0.98), rgba(45, 10, 34, 0.98))',
              border: '1px solid rgba(249, 168, 212, 0.4)',
              boxShadow: '0 0 60px rgba(249, 168, 212, 0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
              style={{ background: 'rgba(249, 168, 212, 0.2)' }}
              aria-label="Close welcome dialog"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f9a8d4" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Vietnamese & English Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Title */}
              <div className="text-center space-y-2">
                <h2
                  className="font-serif text-xl sm:text-2xl md:text-3xl font-bold"
                  style={{ color: '#f9a8d4' }}
                >
                  Xin Chào / Hello
                </h2>
                <div
                  className="w-12 h-0.5 rounded-full mx-auto"
                  style={{ background: 'linear-gradient(90deg, transparent, #f9a8d4, transparent)' }}
                />
              </div>

              {/* Vietnamese Version */}
              <div className="space-y-2 text-center">
                <p className="font-sans text-xs sm:text-sm leading-relaxed" style={{ color: '#fce4ec' }}>
                  Xin chào mọi người, tôi là{' '}
                  <span className="font-semibold" style={{ color: '#f9a8d4' }}>
                    cou.jan_11 or 0xdev
                  </span>{' '}
                  (Anh Nguyen).
                </p>
                <p className="font-sans text-xs sm:text-sm leading-relaxed" style={{ color: '#fce4ec' }}>
                  Tôi làm ra website và dành tình cảm này chỉ gửi một và chỉ một người duy nhất, đó là{' '}
                  <span className="font-semibold" style={{ color: '#f9a8d4' }}>
                    thuyylie
                  </span>{' '}
                  (Lê Thuỷ), nhân dịp ngày 8.3.2026. hehe :3
                </p>
                <p className="font-sans text-xs sm:text-sm leading-relaxed italic" style={{ color: '#f9a8d480' }}>
                  Nếu có traffic đổ về đây, mong mọi người thông cảm! Thân ái.
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-opacity-20" style={{ borderColor: '#f9a8d4' }} />

              {/* English Version */}
              <div className="space-y-2 text-center">
                <p className="font-sans text-xs sm:text-sm leading-relaxed" style={{ color: '#fce4ec' }}>
                  Hello everyone, I&apos;m{' '}
                  <span className="font-semibold" style={{ color: '#f9a8d4' }}>
                    cou.jan_11 or 0xdev
                  </span>{' '}
                  (Anh Nguyen).
                </p>
                <p className="font-sans text-xs sm:text-sm leading-relaxed" style={{ color: '#fce4ec' }}>
                  I created this website and dedicated this feeling to only one person, and that is {' '}
                  <span className="font-semibold" style={{ color: '#f9a8d4' }}>
                    thuyylie
                  </span>{' '}
                  (Lê Thuỷ) — for Women&apos;s Day 8.3.2026. hehe :3
                </p>
                <p className="font-sans text-xs sm:text-sm leading-relaxed italic" style={{ color: '#f9a8d480' }}>
                  If traffic comes to this site, I hope everyone understands. Cheers!
                </p>
              </div>

              {/* Close Button */}
              <motion.button
                onClick={() => setIsOpen(false)}
                className="w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-serif text-xs sm:text-sm tracking-widest uppercase transition-all"
                style={{
                  background: 'linear-gradient(135deg, #f9a8d4, #d8b4fe)',
                  color: '#fff',
                  boxShadow: '0 0 20px rgba(249, 168, 212, 0.4)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tiếp tục / Continue
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
