import { motion } from 'framer-motion'
import { ChevronRight, Sun, Moon, CloudSun } from 'lucide-react'
import { useAppContext } from '../../contexts/AppContext'

function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
}

function getNextAction(timeOfDay: 'morning' | 'afternoon' | 'evening', progress: ReturnType<typeof useAppContext>['progress']) {
  if (timeOfDay === 'morning') {
    if (progress.salah.completed === 0) {
      return { title: 'Time for Fajr', subtitle: 'Start your day with prayer', action: 'Mark Complete' }
    }
    return { title: 'Read your morning verses', subtitle: `${progress.quran.target - progress.quran.versesRead} verses remaining today`, action: 'Start Reading' }
  }
  if (timeOfDay === 'afternoon') {
    if (progress.salah.completed < 3) {
      return { title: 'Dhuhr prayer time', subtitle: 'Stay connected throughout the day', action: 'Mark Complete' }
    }
    return { title: 'Continue your Quran reading', subtitle: `${progress.quran.target - progress.quran.versesRead} verses remaining`, action: 'Start Reading' }
  }
  if (!progress.reflection.done) {
    return { title: 'Complete your evening reflection', subtitle: 'Take a moment of gratitude', action: 'Start' }
  }
  return { title: 'You are doing great today', subtitle: 'All tasks completed', action: 'View Progress' }
}

const iconMap = {
  morning: Sun,
  afternoon: CloudSun,
  evening: Moon,
}

export default function NextActionCard() {
  const { progress, updateProgress } = useAppContext()
  const timeOfDay = getTimeOfDay()
  const { title, subtitle, action } = getNextAction(timeOfDay, progress)
  const Icon = iconMap[timeOfDay]

  const handleAction = () => {
    if (action === 'Mark Complete') {
      updateProgress('salah', { completed: progress.salah.completed + 1 })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden rounded-2xl p-5 border border-emerald-glow/30 bg-white/5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-glow/5 to-transparent pointer-events-none" />

      <div className="relative flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-glow/10 flex items-center justify-center">
          <Icon size={24} className="text-emerald-glow" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-cream-warm">{title}</h3>
          <p className="text-sm text-white/60 mt-0.5">{subtitle}</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleAction}
          className="flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-glow/20 text-emerald-glow text-sm font-medium transition-colors hover:bg-emerald-glow/30"
        >
          {action}
          <ChevronRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  )
}
