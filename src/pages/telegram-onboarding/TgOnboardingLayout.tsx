import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const steps = ['/tg-onboarding', '/tg-onboarding/goals']

export default function TgOnboardingLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const currentIndex = steps.indexOf(location.pathname)
  const isFirstScreen = currentIndex === 0

  return (
    <div className={`h-full flex flex-col relative overflow-hidden ${isLight ? 'bg-white' : 'bg-charcoal'}`}>
      {/* Header with back button and step dots */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2">
        {!isFirstScreen ? (
          <button
            onClick={() => navigate(-1)}
            className={`p-2 rounded-full transition-colors ${isLight ? 'text-gray-400 hover:text-gray-700 hover:bg-gray-100' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
          >
            <ChevronLeft size={24} />
          </button>
        ) : (
          <div className="w-10" />
        )}
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i <= currentIndex ? 'bg-[var(--primary)]' : isLight ? 'bg-gray-200' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
        <div className="w-10" />
      </div>

      {/* Animated page content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
