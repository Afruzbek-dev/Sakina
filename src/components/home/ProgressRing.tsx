import { motion } from 'framer-motion'
import { useAppContext } from '../../contexts/AppContext'
import { useTheme } from '../../contexts/ThemeContext'

export default function ProgressRing() {
  const { progress } = useAppContext()
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const salahTotal = progress.salah.total || 1
  const quranTarget = progress.quran.target || 1

  const salahPercent = Math.min(1, Math.max(0, progress.salah.completed / salahTotal))
  const quranPercent = Math.min(1, Math.max(0, progress.quran.versesRead / quranTarget))
  const reflectionPercent = progress.reflection.done ? 1 : 0

  const overallPercent = Math.round(
    ((salahPercent + quranPercent + reflectionPercent) / 3) * 100
  )

  const size = 120
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  // Each segment takes a third of the ring
  const segmentLength = circumference / 3
  const gap = 6

  const salahDash = salahPercent * (segmentLength - gap)
  const quranDash = quranPercent * (segmentLength - gap)
  const reflectionDash = reflectionPercent * (segmentLength - gap)

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Daily Progress label */}
      <span className={`text-xs font-medium uppercase tracking-wider ${isLight ? 'text-gray-400' : 'text-white/60'}`}>Daily Progress</span>

      {/* Ring with glow */}
      <div className="relative" style={isLight ? undefined : { boxShadow: '0 0 40px rgba(45, 212, 191, 0.2), 0 0 80px rgba(45, 212, 191, 0.1)', borderRadius: '50%' }}>
        <svg width={size} height={size} className="relative -rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}
            strokeWidth={strokeWidth}
          />

          {/* Salah segment - primary #2DD4BF */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#2DD4BF"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${salahDash} ${circumference - salahDash}`}
            strokeDashoffset={0}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${salahDash} ${circumference - salahDash}` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          />

          {/* Quran segment - gold #F4C95D */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#F4C95D"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${quranDash} ${circumference - quranDash}`}
            strokeDashoffset={-(segmentLength)}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${quranDash} ${circumference - quranDash}` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
          />

          {/* Reflection segment - secondary #8B5CF6 */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${reflectionDash} ${circumference - reflectionDash}`}
            strokeDashoffset={-(segmentLength * 2)}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${reflectionDash} ${circumference - reflectionDash}` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
          />
        </svg>

        {/* Center percentage with pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className={`text-3xl font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: [1, 1.05, 1] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.8 },
              scale: { duration: 2, delay: 1.4, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            {overallPercent}%
          </motion.span>
        </div>
      </div>

      {/* Individual progress labels */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className={isLight ? 'text-gray-600' : 'text-white/70'}>{progress.salah.completed}/{progress.salah.total} Salah</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gold" />
          <span className={isLight ? 'text-gray-600' : 'text-white/70'}>{progress.quran.versesRead}/{progress.quran.target} Verses</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-secondary" />
          <span className={isLight ? 'text-gray-600' : 'text-white/70'}>{progress.reflection.done ? 'Done' : 'Pending'}</span>
        </div>
      </div>
    </div>
  )
}
