import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, BookOpen, ChevronRight } from 'lucide-react'
import { useAppContext } from '../contexts/AppContext'
import { container, item } from '../lib/motion-variants'

const weeklyReading = [8, 12, 5, 10, 7, 15, 6]
const juzCompleted = [
  true, true, true, true, true, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
]

export default function QuranPage() {
  const { progress, updateProgress } = useAppContext()
  const [showCelebration, setShowCelebration] = useState(false)
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
          <h1 className="text-2xl font-bold text-cream-warm">Quran</h1>
          <p className="text-sm text-white/50 mt-0.5">
            {versesToday}/{target} verses today
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-orange-500/10 px-3 py-1.5 rounded-full">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-semibold text-orange-400">{readingStreak}</span>
        </div>
      </motion.div>

      {/* Daily Progress Bar */}
      <motion.div variants={item}>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold-soft rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((versesToday / target) * 100, 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Reading Mode Card */}
      <motion.div
        variants={item}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      >
        <p className="text-xs text-white/40 mb-2">Surah Al-Fatiha &middot; Verse 1-7</p>
        <div className="py-4 space-y-3">
          <p className="text-2xl leading-relaxed text-cream-warm font-light" dir="rtl" lang="ar">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <p className="text-lg leading-relaxed text-white/70 font-light" dir="rtl" lang="ar">
            الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
          </p>
          <p className="text-lg leading-relaxed text-white/60 font-light" dir="rtl" lang="ar">
            الرَّحْمَنِ الرَّحِيمِ
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <BookOpen className="w-3.5 h-3.5 text-white/30" />
          <span className="text-xs text-white/30">Juz 1 &middot; Page 1</span>
        </div>
      </motion.div>

      {/* Smart Recommendation */}
      <motion.div
        variants={item}
        whileTap={{ scale: 0.98 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
      >
        <button className="w-full flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-gold-soft/10 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-gold-soft" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-cream-warm">Continue reading</p>
            <p className="text-xs text-white/40 truncate">
              Surah Al-Baqarah, Verse 142
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-white/30 flex-shrink-0" />
        </button>
      </motion.div>

      {/* Juz Progress Grid */}
      <motion.div variants={item}>
        <h3 className="text-sm font-medium text-cream-warm mb-3">
          Juz Progress &middot; {overallProgress}%
        </h3>
        <div className="grid grid-cols-10 gap-1.5">
          {juzCompleted.map((done, i) => (
            <div
              key={i}
              className={`aspect-square rounded-sm ${
                done ? 'bg-emerald-glow/60' : 'bg-white/5'
              }`}
              title={`Juz ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Weekly Reading Chart */}
      <motion.div
        variants={item}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
      >
        <h3 className="text-sm font-medium text-cream-warm mb-3">Weekly Reading</h3>
        <div className="flex items-end gap-2 h-20">
          {weeklyReading.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full rounded-sm bg-gold-soft/60"
                initial={{ height: 0 }}
                animate={{ height: `${(val / 15) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              />
              <span className="text-[9px] text-white/30">
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
              className="bg-charcoal-light/90 border border-gold-soft/30 rounded-2xl p-8 text-center pointer-events-none"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl mb-3"
              >
                🎉
              </motion.div>
              <p className="text-lg font-bold text-gold-soft">Daily Target Met!</p>
              <p className="text-sm text-white/50 mt-1">MashAllah, keep going!</p>
            </motion.div>
            {/* Confetti particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#10B981', '#D4A574', '#C8956C', '#FDF8F0'][i % 4],
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
