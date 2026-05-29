import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, BookOpen } from 'lucide-react'
import { useAppContext } from '../contexts/AppContext'
import ProgressRing from '../components/home/ProgressRing'
import NextActionCard from '../components/home/NextActionCard'
import StreakWidget from '../components/home/StreakWidget'
import DailyReflection from '../components/home/DailyReflection'
import SpiritualInsight from '../components/home/SpiritualInsight'
import { HomeSkeleton } from '../components/shared/Skeleton'
import Celebration from '../components/shared/Celebration'

function getFormattedDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export default function Home() {
  const navigate = useNavigate()
  const { user, progress } = useAppContext()
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

  // User initial for avatar
  const userInitial = (user.name || 'S').charAt(0).toUpperCase()

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
            className="relative pb-24 px-5 space-y-6"
          >
            {/* Header - 72px height area */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex items-center justify-between pt-4"
              style={{ minHeight: '72px' }}
            >
              <div>
                <h1 className="font-bold text-white" style={{ fontSize: '24px' }}>
                  Assalamu Alaikum, {user.name || 'friend'}
                </h1>
                <p className="text-sm text-white/50 mt-1">{dateStr}</p>
              </div>

              {/* Avatar circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #2DD4BF, #8B5CF6)',
                }}
              >
                {userInitial}
              </div>
            </motion.div>

            {/* Progress Ring - hero element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative z-10 flex flex-col items-center py-2"
            >
              <button
                onClick={() => navigate('/prayer')}
                className="flex flex-col items-center cursor-pointer"
                aria-label="View prayers"
              >
                <ProgressRing />
                <p className="text-xs text-white/50 mt-2">Tap to view prayers</p>
              </button>
            </motion.div>

            {/* Next Action Card */}
            <div className="relative z-10">
              <NextActionCard />
            </div>

            {/* Streak Widget */}
            <div className="relative z-10">
              <StreakWidget />
            </div>

            {/* Daily Hadith Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative z-10 rounded-2xl p-5 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={14} className="text-primary" />
                <span className="text-xs font-medium text-primary/80 uppercase tracking-wider">Daily Hadith</span>
              </div>
              <p className="text-white/40 text-sm mb-2" style={{ fontFamily: "'Amiri', serif" }}>
                إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ
              </p>
              <p className="text-base text-white/80 leading-relaxed">
                Actions are judged by intentions, and every person will get what they intended.
              </p>
              <p className="text-xs text-white/40 mt-2">Sahih al-Bukhari</p>
            </motion.div>

            {/* Daily Reflection */}
            <div className="relative z-10">
              <DailyReflection />
            </div>

            {/* Spiritual Insight */}
            <div className="relative z-10">
              <SpiritualInsight />
            </div>

            {/* Tomorrow Preview - retention teaser */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="relative z-10 rounded-2xl p-5 bg-white/5 backdrop-blur-xl border border-gold/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Lock size={18} className="text-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gold/80 uppercase tracking-wider font-medium mb-1">Tomorrow Preview</p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Tomorrow: Surah Al-Kahf reading challenge - unlock with consistency
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
