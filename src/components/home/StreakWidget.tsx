import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { useAppContext } from '../../contexts/AppContext'

export default function StreakWidget() {
  const { streak } = useAppContext()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="rounded-2xl p-5 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
    >
      <div className="flex items-center gap-4">
        {/* Flame icon with pulse */}
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-12 h-12 rounded-xl bg-gold-soft/10 flex items-center justify-center"
          >
            <Flame size={24} className="text-gold-soft" />
          </motion.div>
        </div>

        {/* Streak number */}
        <div className="flex-1">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gold-soft">{streak.current}</span>
            <span className="text-sm text-white/60">days</span>
          </div>
          <p className="text-xs text-white/50 mt-0.5">
            Longest: {streak.longest} days
          </p>
        </div>

        {/* Consistency score */}
        <div className="text-right">
          <p className="text-sm font-medium text-white/80">{streak.consistencyScore}%</p>
          <p className="text-xs text-white/50 mb-1.5">Consistency</p>
          <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gold-soft"
              initial={{ width: 0 }}
              animate={{ width: `${streak.consistencyScore}%` }}
              transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
