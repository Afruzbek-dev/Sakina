import { motion } from 'framer-motion'
import { useAppContext } from '../../contexts/AppContext'

export default function ProgressRing() {
  const { progress } = useAppContext()

  const salahTotal = progress.salah.total || 1
  const quranTarget = progress.quran.target || 1

  const salahPercent = Math.min(1, Math.max(0, progress.salah.completed / salahTotal))
  const quranPercent = Math.min(1, Math.max(0, progress.quran.versesRead / quranTarget))
  const reflectionPercent = progress.reflection.done ? 1 : 0

  const overallPercent = Math.round(
    ((salahPercent + quranPercent + reflectionPercent) / 3) * 100
  )

  const size = 200
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  // Each segment takes a third of the ring
  const segmentLength = circumference / 3
  const gap = 8

  const salahDash = salahPercent * (segmentLength - gap)
  const quranDash = quranPercent * (segmentLength - gap)
  const reflectionDash = reflectionPercent * (segmentLength - gap)

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Glow effect */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-emerald-glow/10 blur-2xl scale-110" />

        <svg width={size} height={size} className="relative -rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />

          {/* Salah segment - emerald */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#10B981"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${salahDash} ${circumference - salahDash}`}
            strokeDashoffset={0}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${salahDash} ${circumference - salahDash}` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          />

          {/* Quran segment - gold */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#D4A574"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${quranDash} ${circumference - quranDash}`}
            strokeDashoffset={-(segmentLength)}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${quranDash} ${circumference - quranDash}` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
          />

          {/* Reflection segment - cream */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#FDF8F0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${reflectionDash} ${circumference - reflectionDash}`}
            strokeDashoffset={-(segmentLength * 2)}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${reflectionDash} ${circumference - reflectionDash}` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
          />
        </svg>

        {/* Center percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-4xl font-bold text-cream-warm"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {overallPercent}%
          </motion.span>
        </div>
      </div>

      {/* Individual progress labels */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-glow" />
          <span className="text-white/70">{progress.salah.completed}/{progress.salah.total} Salah</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gold-soft" />
          <span className="text-white/70">{progress.quran.versesRead}/{progress.quran.target} Verses</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-cream-warm" />
          <span className="text-white/70">{progress.reflection.done ? 'Done' : 'Pending'}</span>
        </div>
      </div>
    </div>
  )
}
