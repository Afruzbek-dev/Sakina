import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, BookOpen, Sparkles, Trophy, User } from 'lucide-react'
import PageTransition from './PageTransition'
import { useTheme } from '../../contexts/ThemeContext'

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/quran', icon: BookOpen, label: 'Quran' },
  { path: '/coach', icon: Sparkles, label: 'Coach' },
  { path: '/challenges', icon: Trophy, label: 'Challenges' },
  { path: '/profile', icon: User, label: 'Profile' },
]

export default function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable page content */}
      <div className="flex-1 scroll-container scroll-smooth">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>

      {/* Bottom tab navigation */}
      <nav
        className={`shrink-0 px-2 pt-2 pb-8 ${isLight ? 'bg-white border-t border-gray-200' : 'glass-premium'}`}
        style={{ height: '88px' }}
        role="tablist"
      >
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                whileTap={{ scale: 0.85, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
                role="tab"
                aria-selected={isActive}
                aria-label={tab.label}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors duration-200 ${
                  isActive
                    ? 'text-primary'
                    : isLight
                    ? 'text-gray-400 hover:text-gray-600'
                    : 'text-white/50 hover:text-white/80'
                }`}
                style={isActive ? { boxShadow: isLight ? 'none' : '0 0 12px rgba(45, 212, 191, 0.25)' } : undefined}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                <span style={{ fontSize: '12px' }} className="font-medium">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="w-5 h-1 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
