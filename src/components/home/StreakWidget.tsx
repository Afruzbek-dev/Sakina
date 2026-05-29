import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { useAppContext } from '../../contexts/AppContext'

// Ember particle component
function EmberParticle({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 4,
        height: 4,
        left: `${x}%`,
        bottom: '20%',
        background: 'radial-gradient(circle, #F4C95D, #F59E0B)',
      }}
      animate={{
        y: [0, -25, -35],
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: 'easeOut',
      }}
    />
  )
}

export default function StreakWidget() {
  const { streak } = useAppContext()

  // Simulated 7-day data (last 7 days)
  const weekDays = [true, true, true, streak.current >= 4, streak.current >= 5, streak.current >= 6, streak.current >= 7]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="rounded-3xl p-5 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      style={{ minHeight: '140px' }}
    >
      <div className="flex items-center gap-4">
        {/* Flame icon with ember particles */}
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center relative overflow-visible"
          >
            <Flame size={28} className="text-gold" />
            {/* Ember particles */}
            <EmberParticle delay={0} x={30} />
            <EmberParticle delay={0.4} x={50} />
            <EmberParticle delay={0.8} x={70} />
            <EmberParticle delay={1.2} x={40} />
            <EmberParticle delay={1.6} x={60} />
          </motion.div>
        </div>

        {/* Streak info */}
        <div className="flex-1">
          <p className="text-xs text-white/50 uppercase tracking-wider">Current Streak</p>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-4xl font-bold text-gold">{streak.current}</span>
            <span className="text-sm text-white/60">days</span>
          </div>
        </div>

        {/* Consistency score */}
        <div className="text-right">
          <p className="text-sm font-medium text-white/80">{streak.consistencyScore}%</p>
          <p className="text-xs text-white/50 mb-1.5">Consistency</p>
          <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gold"
              initial={{ width: 0 }}
              animate={{ width: `${streak.consistencyScore}%` }}
              transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* 7-day mini calendar */}
      <div className="flex items-center justify-between mt-4 px-1">
        {weekDays.map((completed, i) => (
          <div
            key={i}
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              completed
                ? 'bg-primary'
                : 'border border-white/20'
            }`}
          >
            {completed && (
              <div className="w-2 h-2 rounded-full bg-white/80" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
