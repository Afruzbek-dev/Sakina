import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../contexts/AppContext'
import ProgressRing from '../components/home/ProgressRing'
import NextActionCard from '../components/home/NextActionCard'
import StreakWidget from '../components/home/StreakWidget'
import DailyReflection from '../components/home/DailyReflection'
import SpiritualInsight from '../components/home/SpiritualInsight'
import { HomeSkeleton } from '../components/shared/Skeleton'
import Celebration from '../components/shared/Celebration'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export default function Home() {
  const { user, progress } = useAppContext()
  const greeting = getGreeting()
  const dateStr = getFormattedDate()
  const [loading, setLoading] = useState(true)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // Check if daily progress is at 100%
  const totalTarget = progress.salah.total + progress.quran.target + 1
  const totalDone = progress.salah.completed + progress.quran.versesRead + (progress.reflection.done ? 1 : 0)
  const isComplete = totalDone >= totalTarget

  useEffect(() => {
    if (isComplete && !loading) {
      setShowCelebration(true)
    }
  }, [isComplete, loading])

  return (
    <>
      <Celebration
        show={showCelebration}
        message="MashAllah!"
        onComplete={() => setShowCelebration(false)}
      />

      <AnimatePresence mode="wait">
        {loading ? (
          <HomeSkeleton key="skeleton" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="pb-24 pt-12 px-5 space-y-6"
          >
            {/* Pull-down indicator (decorative) */}
            <div className="flex justify-center -mt-4 mb-2">
              <div className="w-8 h-1 rounded-full bg-white/20" />
            </div>

            {/* Greeting header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-cream-warm">
                {greeting}, {user.name || 'friend'}
              </h1>
              <p className="text-sm text-white/50 mt-1">{dateStr}</p>
            </motion.div>

            {/* Progress Ring - hero element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center py-2"
            >
              <ProgressRing />
            </motion.div>

            {/* Next Action Card */}
            <NextActionCard />

            {/* Streak Widget */}
            <StreakWidget />

            {/* Daily Reflection */}
            <DailyReflection />

            {/* Spiritual Insight */}
            <SpiritualInsight />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
