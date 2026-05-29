import { motion } from 'framer-motion'
import { ChevronRight, Sun, Moon, CloudSun } from 'lucide-react'
import { useAppContext } from '../../contexts/AppContext'
import { useTheme } from '../../contexts/ThemeContext'

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
  const { theme } = useTheme()
  const isLight = theme === 'light'
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
      className={`relative overflow-hidden rounded-3xl ${isLight ? 'border border-teal-200 bg-white shadow-sm' : 'border border-primary/30 bg-white/5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'}`}
      style={{ minHeight: '180px' }}
    >
      {/* Animated pulsing border overlay - dark mode only */}
      {!isLight && (
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(45,212,191,0.3), rgba(139,92,246,0.2), rgba(45,212,191,0.3))',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
            borderRadius: '24px',
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Shimmer sweep effect - dark mode only */}
      {!isLight && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)',
            borderRadius: '24px',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
        />
      )}

      {/* Subtle gradient overlay */}
      <div className={`absolute inset-0 pointer-events-none rounded-3xl ${isLight ? 'bg-gradient-to-br from-teal-50/50 to-transparent' : 'bg-gradient-to-br from-primary/5 to-transparent'}`} />

      <div className="relative flex items-center gap-4 p-5 h-full" style={{ minHeight: '180px' }}>
        <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${isLight ? 'bg-teal-50' : 'bg-primary/10'}`}>
          <Icon size={28} className="text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`text-xl font-semibold ${isLight ? 'text-gray-900' : 'text-white'}`}>{title}</h3>
          <p className={`text-sm mt-1 ${isLight ? 'text-gray-500' : 'text-white/60'}`}>{subtitle}</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleAction}
          className={`flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-primary text-sm font-medium transition-colors ${isLight ? 'bg-teal-50 hover:bg-teal-100' : 'bg-primary/20 hover:bg-primary/30'}`}
        >
          {action}
          <ChevronRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  )
}
