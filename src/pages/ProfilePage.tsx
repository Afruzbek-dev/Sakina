import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Palette, Edit, CreditCard, Shield, Star, HelpCircle, Info, ChevronRight, Sunrise, Flame, BookOpen, TrendingUp, Moon } from 'lucide-react'
import { useAppContext } from '../contexts/AppContext'
import { useTheme } from '../contexts/ThemeContext'
import { container, item } from '../lib/motion-variants'

interface SettingItemProps {
  icon: React.ReactNode
  label: string
  value?: string
  toggle?: boolean
  toggleState?: boolean
  onToggle?: () => void
  isLight?: boolean
}

function SettingItem({ icon, label, value, toggle, toggleState, onToggle, isLight }: SettingItemProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-3 py-4 px-1 border-b last:border-0 ${isLight ? 'border-gray-100' : 'border-white/5'}`}
      {...(toggle ? { role: 'switch', 'aria-checked': toggleState } : {})}
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isLight ? 'bg-gray-100 text-gray-500' : 'bg-white/5 text-white/50'}`}>
        {icon}
      </div>
      <span className={`flex-1 text-sm text-left ${isLight ? 'text-gray-700' : 'text-cream-warm/80'}`}>{label}</span>
      {toggle ? (
        <div
          className={`w-10 h-5 rounded-full transition-colors ${
            toggleState ? 'bg-primary' : isLight ? 'bg-gray-200' : 'bg-white/10'
          } flex items-center px-0.5`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform ${
              toggleState ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </div>
      ) : value ? (
        <span className={`text-xs ${isLight ? 'text-gray-400' : 'text-white/40'}`}>{value}</span>
      ) : (
        <ChevronRight className={`w-4 h-4 ${isLight ? 'text-gray-300' : 'text-white/30'}`} />
      )}
    </button>
  )
}

const achievements = [
  { name: 'Early Bird', icon: Sunrise, earned: true },
  { name: '30 Day Streak', icon: Flame, earned: true },
  { name: 'Quran Scholar', icon: BookOpen, earned: true },
  { name: 'Consistent', icon: TrendingUp, earned: false },
  { name: 'Ramadan Champion', icon: Moon, earned: false },
]

export default function ProfilePage() {
  const { user, streak } = useAppContext()
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'
  const [notifications, setNotifications] = useState(true)

  const stats = [
    { label: 'Prayers', value: '847' },
    { label: 'Verses', value: '2,340' },
    { label: 'Active Days', value: '180' },
    { label: 'Streak', value: String(streak.current || 7) },
  ]

  return (
    <motion.div
      className="pb-24 pt-12 px-5 space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Profile Header */}
      <motion.div variants={item} className="flex flex-col items-center text-center">
        {/* Animated Avatar Ring */}
        <div className="relative mb-3">
          <div
            className="w-[86px] h-[86px] rounded-full flex items-center justify-center"
            style={{
              background: 'conic-gradient(from 0deg, #2DD4BF, #8B5CF6, #F4C95D, #2DD4BF)',
              animation: 'spin-slow 4s linear infinite',
            }}
          >
            <div className={`w-[80px] h-[80px] rounded-full flex items-center justify-center ${isLight ? 'bg-[var(--surface)]' : 'bg-surface'}`}>
              <span className={`text-2xl font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {(user.name || 'A').charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        <h1 className={`text-xl font-bold ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>{user.name || 'Ahmad'}</h1>
        {/* Premium Member Badge */}
        <div className="flex items-center gap-1.5 mt-2 bg-[#F4C95D]/10 text-[#F4C95D] border border-[#F4C95D]/20 rounded-full px-3 py-1">
          <Star className="w-3.5 h-3.5" />
          <span className="text-[13px] font-medium">Premium Member</span>
        </div>
        <p className={`text-xs mt-1.5 ${isLight ? 'text-gray-400' : 'text-white/40'}`}>Member since Jan 2025</p>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={item} className="grid grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-2xl p-4 text-center ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-card'}`}>
            <p className={`text-xl font-bold ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>{stat.value}</p>
            <p className={`text-[13px] mt-0.5 ${isLight ? 'text-gray-400' : 'text-white/40'}`}>{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Achievements */}
      <motion.div variants={item}>
        <h3 className={`text-[16px] font-medium mb-3 ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>Achievements</h3>
        <div className="overflow-x-auto flex gap-4 pb-2">
          {achievements.map((badge) => {
            const Icon = badge.icon
            return (
              <div key={badge.name} className="flex flex-col items-center shrink-0">
                {badge.earned ? (
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #2DD4BF, #8B5CF6)',
                      padding: '2px',
                    }}
                  >
                    <div className={`w-full h-full rounded-full flex items-center justify-center ${isLight ? 'bg-[var(--surface)]' : 'bg-surface'}`}>
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                ) : (
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
                    <Icon className={`w-5 h-5 ${isLight ? 'text-gray-300' : 'text-white/20'}`} />
                  </div>
                )}
                <span className={`text-[10px] mt-1.5 max-w-[56px] text-center truncate ${isLight ? 'text-gray-500' : 'text-white/50'}`}>
                  {badge.name}
                </span>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        variants={item}
        className={`rounded-2xl px-4 py-2 ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-white/5 backdrop-blur-xl border border-white/10'}`}
      >
        <h3 className={`text-xs font-medium uppercase tracking-wider pt-3 pb-1 ${isLight ? 'text-gray-400' : 'text-white/40'}`}>
          Preferences
        </h3>
        <SettingItem
          icon={<User className="w-4 h-4" />}
          label="Prayer Time Method"
          value="ISNA"
          isLight={isLight}
        />
        <SettingItem
          icon={<Bell className="w-4 h-4" />}
          label="Notifications"
          toggle
          toggleState={notifications}
          onToggle={() => setNotifications(!notifications)}
          isLight={isLight}
        />
        <SettingItem
          icon={<Palette className="w-4 h-4" />}
          label="Dark Mode"
          toggle
          toggleState={theme === 'dark'}
          onToggle={toggleTheme}
          isLight={isLight}
        />
      </motion.div>

      {/* Account */}
      <motion.div
        variants={item}
        className={`rounded-2xl px-4 py-2 ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-white/5 backdrop-blur-xl border border-white/10'}`}
      >
        <h3 className={`text-xs font-medium uppercase tracking-wider pt-3 pb-1 ${isLight ? 'text-gray-400' : 'text-white/40'}`}>
          Account
        </h3>
        <SettingItem icon={<Edit className="w-4 h-4" />} label="Edit Profile" isLight={isLight} />
        <SettingItem icon={<CreditCard className="w-4 h-4" />} label="Manage Subscription" isLight={isLight} />
        <SettingItem icon={<Shield className="w-4 h-4" />} label="Privacy Settings" isLight={isLight} />
      </motion.div>

      {/* About */}
      <motion.div
        variants={item}
        className={`rounded-2xl px-4 py-2 ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-white/5 backdrop-blur-xl border border-white/10'}`}
      >
        <h3 className={`text-xs font-medium uppercase tracking-wider pt-3 pb-1 ${isLight ? 'text-gray-400' : 'text-white/40'}`}>
          About
        </h3>
        <SettingItem icon={<Star className="w-4 h-4" />} label="Rate the App" isLight={isLight} />
        <SettingItem icon={<HelpCircle className="w-4 h-4" />} label="Help & Support" isLight={isLight} />
        <SettingItem icon={<Info className="w-4 h-4" />} label="About Sakina" isLight={isLight} />
      </motion.div>

      {/* App version */}
      <motion.div variants={item} className={`border-t pt-4 mt-2 text-center ${isLight ? 'border-gray-100' : 'border-white/5'}`}>
        <p className={`text-xs ${isLight ? 'text-gray-300' : 'text-white/20'}`}>Sakina v1.0.0</p>
      </motion.div>

    </motion.div>
  )
}
