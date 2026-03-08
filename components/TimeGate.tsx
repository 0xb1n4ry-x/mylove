'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FlowerPetals } from './FlowerPetals'

// Tọa độ mục tiêu: 8/3/2026 lúc 20:03:00 (hoặc có thể tùy chỉnh ngày tháng nếu cần)
// Để an toàn, chúng ta lấy mốc giờ 20:03 của ngày hiện tại để dễ test, 
// nhưng trong thực tế nên set cứng ngày.
const TARGET_DATE = new Date('2026-03-08T20:03:00+07:00')

export function TimeGate({ children }: { children: React.ReactNode }) {
    const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null)
    const [timeLeft, setTimeLeft] = useState<{
        hours: number
        minutes: number
        seconds: number
    }>({ hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date()
            // Nếu là trước mốc target
            if (now < TARGET_DATE) {
                setIsUnlocked(false)
                const difference = TARGET_DATE.getTime() - now.getTime()
                setTimeLeft({
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                })
            } else {
                setIsUnlocked(true)
            }
        }

        calculateTimeLeft() // Kiểm tra ngay lúc mount
        const timer = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(timer)
    }, [])

    // Trong lúc tính toán client-side chưa xong, render nothing để tránh hýbrid hydration mismatch
    if (isUnlocked === null) {
        return <div className="min-h-screen bg-[#0d0a1a]" />
    }

    // Đã đến lúc, render ứng dụng chính
    if (isUnlocked) {
        return <>{children}</>
    }

    // Format số liệu đếm ngược
    const formatTime = (num: number) => String(num).padStart(2, '0')

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, #1a0d2e 0%, #0d0a1a 100%)',
                }}
                aria-label="Time gate waiting screen"
            >
                <FlowerPetals />

                {/* Glow Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #f9a8d4 0%, transparent 70%)' }} />

                <div className="relative z-10 flex flex-col items-center gap-12 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="space-y-4"
                    >
                        <h1
                            className="font-serif text-3xl md:text-5xl font-bold"
                            style={{ color: '#fda4af', textShadow: '0 0 30px #fda4af60' }}
                        >
                            Chưa tới lúc đâu bé ơi...
                        </h1>
                        <p className="font-sans text-lg md:text-xl" style={{ color: '#fce4ec' }}>
                            Một món quà bí mật đang chờ em ở mốc 20:03.
                        </p>
                    </motion.div>

                    {/* Coundown Timer */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="flex items-center gap-4 md:gap-8"
                    >
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-3xl md:text-5xl font-serif font-bold shadow-2xl backdrop-blur-md" style={{ background: 'rgba(249, 168, 212, 0.1)', border: '1px solid rgba(249, 168, 212, 0.3)', color: '#fca5a5' }}>
                                {formatTime(timeLeft.hours)}
                            </div>
                            <span className="mt-3 text-xs md:text-sm tracking-widest uppercase" style={{ color: '#f9a8d480' }}>Giờ</span>
                        </div>

                        <div className="text-3xl md:text-4xl pb-8" style={{ color: '#f9a8d4' }}>:</div>

                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-3xl md:text-5xl font-serif font-bold shadow-2xl backdrop-blur-md" style={{ background: 'rgba(249, 168, 212, 0.1)', border: '1px solid rgba(249, 168, 212, 0.3)', color: '#fca5a5' }}>
                                {formatTime(timeLeft.minutes)}
                            </div>
                            <span className="mt-3 text-xs md:text-sm tracking-widest uppercase" style={{ color: '#f9a8d480' }}>Phút</span>
                        </div>

                        <div className="text-3xl md:text-4xl pb-8" style={{ color: '#f9a8d4' }}>:</div>

                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-3xl md:text-5xl font-serif font-bold shadow-2xl backdrop-blur-md relative overflow-hidden" style={{ background: 'rgba(249, 168, 212, 0.1)', border: '1px solid rgba(249, 168, 212, 0.3)', color: '#fca5a5' }}>
                                <motion.div
                                    key={timeLeft.seconds}
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="absolute"
                                >
                                    {formatTime(timeLeft.seconds)}
                                </motion.div>
                            </div>
                            <span className="mt-3 text-xs md:text-sm tracking-widest uppercase" style={{ color: '#f9a8d480' }}>Giây</span>
                        </div>
                    </motion.div>

                    {/* Pulsing Heart Decoration */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="mt-8"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="#f9a8d4" style={{ filter: 'drop-shadow(0 0 15px rgba(249, 168, 212, 0.8))' }}>
                                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.403 3.752 1 6.5 1c1.699 0 3.197.785 4.5 2.099C12.303 1.785 13.8 1 15.5 1 18.248 1 21 3.403 21 7.191c0 4.105-5.37 8.863-11 14.402Z" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
