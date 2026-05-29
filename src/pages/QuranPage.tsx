import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, BookOpen, ChevronRight } from 'lucide-react'
import { useAppContext } from '../contexts/AppContext'
import { useTheme } from '../contexts/ThemeContext'
import { container, item } from '../lib/motion-variants'

const weeklyReading = [8, 12, 5, 10, 7, 15, 6]
const juzCompleted = [
  true, true, true, true, true, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
]

const quickSurahs = ['Al-Fatiha', 'Ya-Sin', 'Al-Mulk', 'Al-Kahf']

export default function QuranPage() {
  const { progress, updateProgress } = useAppContext()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [showCelebration, setShowCelebration] = useState(false)
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null)
  const readingStreak = 12

  const versesToday = progress.quran.versesRead
  const target = progress.quran.target

  function markReading() {
    const newVerses = Math.min(versesToday + 5, target)
    updateProgress('quran', { versesRead: newVerses })
    if (newVerses >= target) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 2500)
    }
  }

  const overallProgress = Math.round((5 / 30) * 100)
  const readingPercent = Math.min(versesToday / target, 1)

  // Progress ring SVG values
  const ringSize = 80
  const ringStroke = 6
  const ringRadius = (ringSize - ringStroke) / 2
  const ringCircumference = 2 * Math.PI * ringRadius
  const ringDash = readingPercent * ringCircumference

  return (
    <motion.div
      className="pb-24 pt-12 px-5 space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>Quran</h1>
          <p className={`text-sm mt-0.5 ${isLight ? 'text-gray-500' : 'text-white/50'}`}>
            {versesToday}/{target} verses today
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-orange-500/10 px-3 py-1.5 rounded-full">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-semibold text-orange-400">{readingStreak}</span>
        </div>
      </motion.div>

      {/* Goal Card - 180px height, 24px radius, 20px padding */}
      <motion.div
        variants={item}
        className={`relative overflow-hidden rounded-[24px] p-5 ${isLight ? 'border border-gray-100 shadow-sm' : ''}`}
        style={{ height: 180, background: isLight ? '#FFFFFF' : 'linear-gradient(135deg, #182230, #121923)' }}
      >
        {!isLight && <div className="absolute inset-0 border border-white/10 rounded-[24px] pointer-events-none" />}
        <div className="relative z-10 flex items-center justify-between h-full">
          <div className="flex-1">
            <p className={`text-xs font-medium uppercase tracking-wider mb-2 ${isLight ? 'text-gray-400' : 'text-white/50'}`}>
              Daily Goal
            </p>
            <p className={`text-xl font-bold ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>{target} Verses</p>
            <p className={`text-sm mt-1 ${isLight ? 'text-gray-500' : 'text-white/50'}`}>
              {versesToday} completed
            </p>
            <div className={`mt-3 h-2 rounded-full overflow-hidden w-40 ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: '#F4C95D' }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((versesToday / target) * 100, 100)}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
          {/* Circular Progress Ring - gold color */}
          <div className="relative flex-shrink-0">
            <svg width={ringSize} height={ringSize} className="-rotate-90">
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={ringRadius}
                fill="none"
                stroke={isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}
                strokeWidth={ringStroke}
              />
              <motion.circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={ringRadius}
                fill="none"
                stroke="#F4C95D"
                strokeWidth={ringStroke}
                strokeLinecap="round"
                strokeDasharray={`${ringDash} ${ringCircumference - ringDash}`}
                initial={{ strokeDasharray: `0 ${ringCircumference}` }}
                animate={{ strokeDasharray: `${ringDash} ${ringCircumference - ringDash}` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-gold-soft">
                {Math.round(readingPercent * 100)}%
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Surah Shortcut Pills */}
      <motion.div variants={item}>
        <h3 className={`text-sm font-medium mb-3 ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>Quick Start</h3>
        <div className="flex flex-wrap gap-2">
          {quickSurahs.map((surah) => (
            <motion.button
              key={surah}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center text-sm font-medium transition-colors ${isLight ? 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50' : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10'}`}
              style={{
                height: 44,
                borderRadius: 22,
                paddingLeft: 18,
                paddingRight: 18,
              }}
            >
              {surah}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Reading Card - Verse card */}
      <motion.div
        variants={item}
        className={`rounded-[28px] p-6 text-center ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'}`}
      >
        {/* Decorative geometric frame around surah name */}
        <div className="inline-block relative mb-4">
          <div className={`relative px-6 py-2 border rounded-lg ${isLight ? 'border-gray-200' : 'border-white/15'}`}>
            {/* Corner decorations */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-gold-soft" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-gold-soft" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-gold-soft" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-gold-soft" />
            <p className={`text-xs ${isLight ? 'text-gray-400' : 'text-white/40'}`}>Surah Al-Fatiha &middot; Verse 1-7</p>
          </div>
        </div>

        {/* Arabic text */}
        <div className="py-4 space-y-1">
          <p
            dir="rtl"
            lang="ar"
            className={isLight ? 'text-gray-900' : 'text-cream-warm'}
            style={{ fontFamily: "'Amiri', serif", fontSize: 42, lineHeight: '90px' }}
          >
            {'\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u0627\u0644\u0631\u0651\u064E\u062D\u0652\u0645\u064E\u0646\u0650 \u0627\u0644\u0631\u0651\u064E\u062D\u0650\u064A\u0645\u0650'}
          </p>
          <p
            dir="rtl"
            lang="ar"
            className={isLight ? 'text-gray-700' : 'text-white/70'}
            style={{ fontFamily: "'Amiri', serif", fontSize: 42, lineHeight: '90px' }}
          >
            {'\u0627\u0644\u0652\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u064E\u0647\u0650 \u0631\u064E\u0628\u0651\u0650 \u0627\u0644\u0652\u0639\u064E\u0627\u0644\u064E\u0645\u0650\u064A\u0646\u064E'}
          </p>
          <p
            dir="rtl"
            lang="ar"
            className={isLight ? 'text-gray-500' : 'text-white/60'}
            style={{ fontFamily: "'Amiri', serif", fontSize: 42, lineHeight: '90px' }}
          >
            {'\u0627\u0644\u0631\u0651\u064E\u062D\u0652\u0645\u064E\u0646\u0650 \u0627\u0644\u0631\u0651\u064E\u062D\u0650\u064A\u0645\u0650'}
          </p>
        </div>

        {/* Translation text */}
        <p
          className={`mt-4 ${isLight ? 'text-gray-500' : 'text-white/50'}`}
          style={{ fontSize: 20, lineHeight: '34px' }}
        >
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>

        <div className="flex items-center justify-center gap-2 mt-4">
          <BookOpen className={`w-3.5 h-3.5 ${isLight ? 'text-gray-300' : 'text-white/30'}`} />
          <span className={`text-xs ${isLight ? 'text-gray-300' : 'text-white/30'}`}>Juz 1 &middot; Page 1</span>
        </div>
      </motion.div>

      {/* Continue Reading - Book cover style */}
      <motion.div
        variants={item}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <div
          className={`relative rounded-2xl p-4 ${isLight ? 'bg-white border border-gray-100 shadow-sm' : 'border border-white/10'}`}
          style={isLight ? undefined : { background: 'linear-gradient(135deg, #121923, #182230)' }}
        >
          {/* Spine (left border) */}
          <div
            className="absolute left-0 top-3 bottom-3 w-1 rounded-full"
            style={{ background: 'linear-gradient(to bottom, #F4C95D, #D4A574)' }}
          />
          {/* Gradient overlay */}
          {!isLight && <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />}

          <button className="w-full flex items-center gap-3 text-left pl-3 relative z-10">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isLight ? 'bg-amber-50' : 'bg-gold-soft/10'}`}>
              <BookOpen className="w-5 h-5 text-gold-soft" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>Continue reading</p>
              <p className={`text-xs truncate ${isLight ? 'text-gray-400' : 'text-white/40'}`}>
                Surah Al-Baqarah, Verse 142
              </p>
            </div>
            <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isLight ? 'text-gray-300' : 'text-white/30'}`} />
          </button>
        </div>
      </motion.div>

      {/* Juz Progress Grid with tooltip */}
      <motion.div variants={item} className="relative">
        <h3 className={`text-sm font-medium mb-3 ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>
          Juz Progress &middot; {overallProgress}%
        </h3>
        <div className="grid grid-cols-10 gap-1.5 relative">
          {juzCompleted.map((done, i) => (
            <div key={i} className="relative">
              <motion.button
                onClick={() => setSelectedJuz(selectedJuz === i ? null : i)}
                className={`aspect-square w-full rounded-sm ${
                  done ? 'bg-emerald-glow/60' : isLight ? 'bg-gray-100' : 'bg-white/5'
                }`}
                whileTap={{ scale: 0.9 }}
                aria-label={`Juz ${i + 1}`}
              />
              {/* Tooltip */}
              <AnimatePresence>
                {selectedJuz === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.9 }}
                    animate={{ opacity: 1, y: -4, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-20 pointer-events-none"
                  >
                    <div className={`rounded-md px-2 py-1 whitespace-nowrap shadow-lg ${isLight ? 'bg-white border border-gray-200' : 'bg-card border border-white/10'}`}>
                      <span className={`text-[10px] font-medium ${isLight ? 'text-gray-700' : 'text-white/80'}`}>Juz {i + 1}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Reading Chart */}
      <motion.div
        variants={item}
        className={`rounded-2xl p-5 ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-white/5 backdrop-blur-xl border border-white/10'}`}
      >
        <h3 className={`text-sm font-medium mb-3 ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>Weekly Reading</h3>
        <div className="flex items-end gap-2 h-20">
          {weeklyReading.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full rounded-sm"
                style={{ background: 'linear-gradient(to top, #B8860B, #F4C95D)' }}
                initial={{ height: 0 }}
                animate={{ height: `${(val / 15) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              />
              <span className={`text-[9px] ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mark Reading Button */}
      <motion.div variants={item}>
        <motion.button
          onClick={markReading}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="w-full py-3.5 rounded-xl font-semibold text-sm gradient-gold text-charcoal"
        >
          Mark Today&apos;s Reading (+5 verses)
        </motion.button>
      </motion.div>

      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`rounded-2xl p-8 text-center pointer-events-none ${isLight ? 'bg-white/90 border border-amber-200 shadow-xl' : 'bg-charcoal-light/90 border border-gold-soft/30'}`}
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl mb-3"
              >
                {'\u{1F389}'}
              </motion.div>
              <p className="text-lg font-bold text-gold-soft">Daily Target Met!</p>
              <p className={`text-sm mt-1 ${isLight ? 'text-gray-500' : 'text-white/50'}`}>MashAllah, keep going!</p>
            </motion.div>
            {/* Rotated square particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2.5 h-2.5"
                style={{
                  backgroundColor: ['#2DD4BF', '#F4C95D', '#8B5CF6', '#22C55E'][i % 4],
                  rotate: '45deg',
                }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i * 30 * Math.PI) / 180) * 120,
                  y: Math.sin((i * 30 * Math.PI) / 180) * 120,
                  opacity: 0,
                  scale: [1, 0.5],
                }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
