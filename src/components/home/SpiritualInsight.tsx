import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const insights = [
  'You are most consistent when you sleep before 11 PM.',
  'Your Quran reading improves on weekends.',
  'Try pairing Fajr with your morning routine.',
  'Consistency beats intensity. Keep showing up.',
  'Your evening reflections boost next-day motivation.',
]

export default function SpiritualInsight() {
  const [displayedText, setDisplayedText] = useState('')
  const [insightIndex] = useState(() => Math.floor(Math.random() * insights.length))
  const insight = insights[insightIndex]

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= insight.length) {
        setDisplayedText(insight.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [insight])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="rounded-2xl p-5 bg-card backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      style={{ minHeight: '120px' }}
    >
      {/* Daily Wisdom label */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-lg bg-gold/10 flex items-center justify-center">
          <Sparkles size={14} className="text-gold" />
        </div>
        <span className="text-xs font-medium text-gold/80 uppercase tracking-wider">Daily Wisdom</span>
      </div>

      {/* Decorative Bismillah */}
      <p className="font-arabic text-white/40 text-xs mb-2" style={{ fontFamily: "'Amiri', serif" }}>
        بِسْمِ اللَّهِ
      </p>

      {/* Typewriter text */}
      <p className="text-base text-white/80 leading-relaxed min-h-[2.5rem]">
        {displayedText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-gold/60 ml-0.5 align-middle"
        />
      </p>
    </motion.div>
  )
}
