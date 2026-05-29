import { motion } from 'framer-motion'
import { Users, Lock, Heart, Plus } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { container, item } from '../lib/motion-variants'

const circles = [
  {
    name: 'Family Circle',
    members: 4,
    sharedStreak: 12,
    avatars: ['A', 'S', 'Y', 'M'],
  },
  {
    name: 'Study Group',
    members: 6,
    sharedStreak: 8,
    challenge: '30-Day Quran',
    avatars: ['H', 'O', 'K', 'R', 'F', 'N'],
  },
]

export default function CommunityPage() {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <motion.div
      className="pb-24 pt-12 px-5 space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className={`text-2xl font-bold ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>Community</h1>
        <p className={`text-sm mt-0.5 ${isLight ? 'text-gray-500' : 'text-white/50'}`}>Private & accountable</p>
      </motion.div>

      {/* Your Circles */}
      <motion.div variants={item} className="space-y-3">
        <h3 className={`text-sm font-medium ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>Your Circles</h3>
        {circles.map((circle) => (
          <motion.div
            key={circle.name}
            className={`rounded-2xl p-4 ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-white/5 backdrop-blur-xl border border-white/10'}`}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isLight ? 'bg-teal-50' : 'bg-emerald-glow/10'}`}>
                  <Users className={`w-4 h-4 ${isLight ? 'text-teal-600' : 'text-emerald-glow'}`} />
                </div>
                <div>
                  <p className={`text-sm font-medium ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>{circle.name}</p>
                  <p className={`text-xs ${isLight ? 'text-gray-400' : 'text-white/40'}`}>{circle.members} members</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${isLight ? 'text-teal-600' : 'text-emerald-glow'}`}>{circle.sharedStreak} days</p>
                <p className={`text-[10px] ${isLight ? 'text-gray-400' : 'text-white/30'}`}>shared streak</p>
              </div>
            </div>

            {/* Avatars */}
            <div className="flex items-center gap-1">
              {circle.avatars.slice(0, 5).map((initial, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full flex items-center justify-center -ml-1 first:ml-0 ${isLight ? 'bg-gray-100 border border-gray-200' : 'bg-charcoal-lighter border border-white/10'}`}
                >
                  <span className={`text-xs ${isLight ? 'text-gray-500' : 'text-white/60'}`}>{initial}</span>
                </div>
              ))}
              {circle.members > 5 && (
                <span className={`text-xs ml-2 ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
                  +{circle.members - 5}
                </span>
              )}
            </div>

            {circle.challenge && (
              <p className={`text-xs mt-2 pt-2 border-t ${isLight ? 'text-gray-400 border-gray-100' : 'text-white/40 border-white/5'}`}>
                Challenge: {circle.challenge}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Accountability Partner */}
      <motion.div
        variants={item}
        className={`rounded-2xl p-5 ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'}`}
      >
        <h3 className={`text-sm font-medium mb-3 ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>Accountability Partner</h3>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${isLight ? 'bg-teal-50 border-white' : 'bg-emerald-glow/20 border-charcoal'}`}>
              <span className={`text-sm font-medium ${isLight ? 'text-teal-600' : 'text-emerald-glow'}`}>A</span>
            </div>
            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${isLight ? 'bg-amber-50 border-white' : 'bg-gold-soft/20 border-charcoal'}`}>
              <span className="text-sm font-medium text-gold-soft">Y</span>
            </div>
          </div>
          <div className="flex-1">
            <p className={`text-sm font-medium ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>Ahmad & Yusuf</p>
            <div className="flex gap-3 mt-1">
              <span className={`text-xs ${isLight ? 'text-teal-600' : 'text-emerald-glow'}`}>12 days</span>
              <span className="text-xs text-gold-soft">9 days</span>
            </div>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className={`w-full mt-4 py-2.5 rounded-xl text-sm font-medium ${isLight ? 'bg-teal-50 border border-teal-200 text-teal-700' : 'bg-emerald-glow/10 border border-emerald-glow/20 text-emerald-glow'}`}
        >
          <Heart className="w-3.5 h-3.5 inline mr-1.5" />
          Send Encouragement
        </motion.button>
      </motion.div>

      {/* Shared Challenges */}
      <motion.div
        variants={item}
        className={`rounded-2xl p-4 ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-white/5 backdrop-blur-xl border border-white/10'}`}
      >
        <h3 className={`text-sm font-medium mb-2 ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>Shared Challenges</h3>
        <p className={`text-xs ${isLight ? 'text-gray-400' : 'text-white/40'}`}>Family Circle &middot; 30-Day Quran</p>
        <div className={`mt-2 h-2 rounded-full overflow-hidden ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
          <motion.div
            className="h-full bg-primary/60 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <p className={`text-[10px] mt-1 ${isLight ? 'text-gray-400' : 'text-white/30'}`}>Combined progress: 65%</p>
      </motion.div>

      {/* Create Circle */}
      <motion.div variants={item}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className={`w-full rounded-2xl p-5 flex items-center justify-center gap-3 border border-dashed ${isLight ? 'bg-gray-50 border-gray-300' : 'bg-white/5 backdrop-blur-xl border-white/20'}`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
            <Plus className={`w-5 h-5 ${isLight ? 'text-gray-400' : 'text-white/50'}`} />
          </div>
          <span className={`text-sm font-medium ${isLight ? 'text-gray-500' : 'text-white/60'}`}>Create a Circle</span>
        </motion.button>
      </motion.div>

      {/* Privacy Note */}
      <motion.div variants={item} className="flex items-center gap-2 px-2">
        <Lock className={`w-3.5 h-3.5 ${isLight ? 'text-gray-300' : 'text-white/30'}`} />
        <p className={`text-xs ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
          All circles are private. Only members can see activity.
        </p>
      </motion.div>
    </motion.div>
  )
}
