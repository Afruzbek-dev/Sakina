import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Clock, X } from 'lucide-react'
import { useAppContext } from '../contexts/AppContext'
import { container, item } from '../lib/motion-variants'

interface PrayerData {
  name: string
  arabic: string
  time: string
  completed: boolean
  focusRating: number | null
}

const focusEmojis = ['😵', '😟', '😐', '🙂', '🧘']
const focusLabels = ['Very Distracted', 'Distracted', 'Neutral', 'Focused', 'Deeply Focused']

export default function PrayerPage() {
  const { updateProgress } = useAppContext()
  const [prayers, setPrayers] = useState<PrayerData[]>([
    { name: 'Fajr', arabic: 'الفجر', time: '5:30 AM', completed: true, focusRating: 4 },
    { name: 'Dhuhr', arabic: 'الظهر', time: '12:15 PM', completed: true, focusRating: 3 },
    { name: 'Asr', arabic: 'العصر', time: '3:45 PM', completed: false, focusRating: null },
    { name: 'Maghrib', arabic: 'المغرب', time: '6:30 PM', completed: false, focusRating: null },
    { name: 'Isha', arabic: 'العشاء', time: '8:00 PM', completed: false, focusRating: null },
  ])
  const [ratingPrayer, setRatingPrayer] = useState<number | null>(null)

  const currentIdx = prayers.findIndex((p) => !p.completed)
  const currentPrayer = currentIdx >= 0 ? prayers[currentIdx] : prayers[prayers.length - 1]

  const weeklyFocus = [3, 4, 5, 4, 3, 5, 4]
  const avgFocus = (weeklyFocus.reduce((a, b) => a + b, 0) / weeklyFocus.length).toFixed(1)

  function markComplete(idx: number) {
    if (prayers[idx].completed) return
    setRatingPrayer(idx)
  }

  function submitRating(idx: number, rating: number) {
    setPrayers((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, completed: true, focusRating: rating } : p))
    )
    const completedCount = prayers.filter((p) => p.completed).length + 1
    updateProgress('salah', { completed: completedCount })
    setRatingPrayer(null)
  }

  function dismissRating() {
    setRatingPrayer(null)
  }

  return (
    <motion.div
      className="pb-24 pt-12 px-5 space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Current Prayer Hero */}
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-2xl p-6 text-center gradient-emerald"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <p className="text-white/60 text-sm mb-1" lang="ar">{currentPrayer.arabic}</p>
          <h1 className="text-4xl font-bold text-white">{currentPrayer.name}</h1>
          <div className="flex items-center justify-center gap-2 mt-3 text-white/80">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {currentIdx >= 0 ? 'Coming up' : 'All done'} &middot; {currentPrayer.time}
            </span>
          </div>
          {currentIdx >= 0 && (
            <p className="text-emerald-glow text-xs mt-2 font-medium">in 2h 15m</p>
          )}
        </div>
      </motion.div>

      {/* Prayer Timeline */}
      <motion.div variants={item} className="space-y-1">
        <h2 className="text-lg font-semibold text-cream-warm mb-3">Today&apos;s Prayers</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[18px] top-4 bottom-4 w-0.5 bg-white/10" />

          <div className="space-y-1">
            {prayers.map((prayer, idx) => {
              const isCurrent = idx === currentIdx
              const isUpcoming = idx > currentIdx && currentIdx >= 0

              return (
                <motion.button
                  key={prayer.name}
                  onClick={() => markComplete(idx)}
                  className="w-full flex items-center gap-4 p-3 rounded-xl transition-colors hover:bg-white/5 relative"
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Status indicator */}
                  <div className="relative z-10">
                    {prayer.completed ? (
                      <div className="w-9 h-9 rounded-full bg-emerald-glow/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-emerald-glow" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-9 h-9 rounded-full bg-emerald-glow/20 flex items-center justify-center">
                        <motion.div
                          className="w-3 h-3 rounded-full bg-emerald-glow"
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white/30" />
                      </div>
                    )}
                  </div>

                  {/* Prayer info */}
                  <div className="flex-1 text-left">
                    <p
                      className={`font-medium ${
                        prayer.completed
                          ? 'text-white/60'
                          : isCurrent
                          ? 'text-cream-warm'
                          : 'text-white/40'
                      }`}
                    >
                      {prayer.name}
                    </p>
                    <p className="text-xs text-white/40">{prayer.time}</p>
                  </div>

                  {/* Status badge */}
                  <div>
                    {prayer.completed && prayer.focusRating && (
                      <span className="text-xs text-white/40">
                        {focusEmojis[prayer.focusRating - 1]}
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="text-xs text-white/30">Upcoming</span>
                    )}
                    {isCurrent && (
                      <span className="text-xs text-emerald-glow font-medium">Mark done</span>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Focus Rating Modal */}
      <AnimatePresence>
        {ratingPrayer !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-8 bg-black/60"
            onClick={dismissRating}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-charcoal-light border border-white/10 rounded-2xl p-6 w-full max-w-sm relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={dismissRating}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white/80"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-semibold text-cream-warm text-center mb-2">
                How focused were you?
              </h3>
              <p className="text-sm text-white/50 text-center mb-6">
                {prayers[ratingPrayer].name} prayer
              </p>
              <div className="flex justify-between px-2 mb-4">
                {focusEmojis.map((emoji, i) => (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => submitRating(ratingPrayer, i + 1)}
                    className="flex flex-col items-center gap-1"
                    aria-label={focusLabels[i]}
                  >
                    <span className="text-3xl">{emoji}</span>
                    <span className="text-[10px] text-white/40">{focusLabels[i]}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quality Tracking */}
      <motion.div
        variants={item}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-cream-warm">This Week</h3>
          <span className="text-emerald-glow font-semibold text-lg">{avgFocus} avg</span>
        </div>
        <div className="flex items-end gap-1.5 h-16">
          {weeklyFocus.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full rounded-sm bg-emerald-glow/60"
                initial={{ height: 0 }}
                animate={{ height: `${(val / 5) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              />
              <span className="text-[9px] text-white/30">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
