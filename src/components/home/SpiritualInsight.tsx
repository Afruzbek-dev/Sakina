import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const insights = [
  'You are most consistent when you sleep before 11 PM.',
  'Your Quran reading improves on weekends.',
  'Try pairing Fajr with your morning routine.',
  'Consistency beats intensity. Keep showing up.',
  'Your evening reflections boost next-day motivation.',
]

export default function SpiritualInsight() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
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
      className={`rounded-2xl p-5 ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-card backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'}`}
      style={{ minHeight: '120px' }}
    >
      {/* Daily Wisdom label */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${isLight ? 'bg-amber-50' : 'bg-gold/10'}`}>
          <Sparkles size={14} className="text-gold" />
        </div>
        <span className="text-xs font-medium text-gold/80 uppercase tracking-wider">Daily Wisdom</span>
      </div>

      {/* Decorative Bismillah */}
      <p className={`font-arabic text-xs mb-2 ${isLight ? 'text-gray-300' : 'text-white/40'}`} style={{ fontFamily: "'Amiri', serif" }}>
        {'\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u0650'}
      </p>

      {/* Typewriter text */}
      <p className={`text-base leading-relaxed min-h-[2.5rem] ${isLight ? 'text-gray-700' : 'text-white/80'}`}>
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
