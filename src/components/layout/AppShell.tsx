import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Moon, BookOpen, Sparkles, User } from 'lucide-react'
import PageTransition from './PageTransition'

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/prayer', icon: Moon, label: 'Prayer' },
  { path: '/quran', icon: BookOpen, label: 'Quran' },
  { path: '/coach', icon: Sparkles, label: 'Coach' },
  { path: '/profile', icon: User, label: 'Profile' },
]

export default function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable page content */}
      <div className="flex-1 scroll-container scroll-smooth">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>

      {/* Bottom tab navigation with glassmorphism */}
      <nav className="glass glass-inner shrink-0 px-2 pt-2 pb-6" role="tablist">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                whileTap={{ scale: 0.9 }}
                role="tab"
                aria-selected={isActive}
                aria-label={tab.label}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors duration-200 ${
                  isActive
                    ? 'text-emerald-glow'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                <motion.div
                  animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                </motion.div>
                <span className="text-[10px] font-medium">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="w-1 h-1 rounded-full bg-emerald-glow"
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
