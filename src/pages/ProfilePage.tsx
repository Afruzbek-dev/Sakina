import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Palette, Edit, CreditCard, Shield, Star, HelpCircle, Info, ChevronRight } from 'lucide-react'
import { useAppContext } from '../contexts/AppContext'
import { container, item } from '../lib/motion-variants'

interface SettingItemProps {
  icon: React.ReactNode
  label: string
  value?: string
  toggle?: boolean
  toggleState?: boolean
  onToggle?: () => void
}

function SettingItem({ icon, label, value, toggle, toggleState, onToggle }: SettingItemProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-3 py-3 px-1 border-b border-white/5 last:border-0"
      {...(toggle ? { role: 'switch', 'aria-checked': toggleState } : {})}
    >
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/50">
        {icon}
      </div>
      <span className="flex-1 text-sm text-cream-warm/80 text-left">{label}</span>
      {toggle ? (
        <div
          className={`w-10 h-5 rounded-full transition-colors ${
            toggleState ? 'bg-emerald-glow' : 'bg-white/10'
          } flex items-center px-0.5`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform ${
              toggleState ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </div>
      ) : value ? (
        <span className="text-xs text-white/40">{value}</span>
      ) : (
        <ChevronRight className="w-4 h-4 text-white/30" />
      )}
    </button>
  )
}

export default function ProfilePage() {
  const { user, streak } = useAppContext()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

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
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-deep to-emerald-glow flex items-center justify-center mb-3">
          <span className="text-2xl font-bold text-white">
            {(user.name || 'A').charAt(0).toUpperCase()}
          </span>
        </div>
        <h1 className="text-xl font-bold text-cream-warm">{user.name || 'Ahmad'}</h1>
        <p className="text-xs text-white/40 mt-0.5">Member since Jan 2025</p>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={item} className="grid grid-cols-4 gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center">
            <p className="text-base font-bold text-cream-warm">{stat.value}</p>
            <p className="text-[10px] text-white/40 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Preferences */}
      <motion.div
        variants={item}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2"
      >
        <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider pt-3 pb-1">
          Preferences
        </h3>
        <SettingItem
          icon={<User className="w-4 h-4" />}
          label="Prayer Time Method"
          value="ISNA"
        />
        <SettingItem
          icon={<Bell className="w-4 h-4" />}
          label="Notifications"
          toggle
          toggleState={notifications}
          onToggle={() => setNotifications(!notifications)}
        />
        <SettingItem
          icon={<Palette className="w-4 h-4" />}
          label="Dark Mode"
          toggle
          toggleState={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
        />
      </motion.div>

      {/* Account */}
      <motion.div
        variants={item}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2"
      >
        <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider pt-3 pb-1">
          Account
        </h3>
        <SettingItem icon={<Edit className="w-4 h-4" />} label="Edit Profile" />
        <SettingItem icon={<CreditCard className="w-4 h-4" />} label="Manage Subscription" />
        <SettingItem icon={<Shield className="w-4 h-4" />} label="Privacy Settings" />
      </motion.div>

      {/* About */}
      <motion.div
        variants={item}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2"
      >
        <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider pt-3 pb-1">
          About
        </h3>
        <SettingItem icon={<Star className="w-4 h-4" />} label="Rate the App" />
        <SettingItem icon={<HelpCircle className="w-4 h-4" />} label="Help & Support" />
        <SettingItem icon={<Info className="w-4 h-4" />} label="About Sakina" />
      </motion.div>

      {/* App version */}
      <motion.div variants={item} className="text-center">
        <p className="text-xs text-white/20">Sakina v1.0.0</p>
      </motion.div>
    </motion.div>
  )
}
