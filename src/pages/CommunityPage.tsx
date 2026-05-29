import { motion } from 'framer-motion'
import { Users, Lock, Heart, Plus } from 'lucide-react'
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
  return (
    <motion.div
      className="pb-24 pt-12 px-5 space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-cream-warm">Community</h1>
        <p className="text-sm text-white/50 mt-0.5">Private & accountable</p>
      </motion.div>

      {/* Your Circles */}
      <motion.div variants={item} className="space-y-3">
        <h3 className="text-sm font-medium text-cream-warm">Your Circles</h3>
        {circles.map((circle) => (
          <motion.div
            key={circle.name}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-glow/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-emerald-glow" />
                </div>
                <div>
                  <p className="text-sm font-medium text-cream-warm">{circle.name}</p>
                  <p className="text-xs text-white/40">{circle.members} members</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-emerald-glow">{circle.sharedStreak} days</p>
                <p className="text-[10px] text-white/30">shared streak</p>
              </div>
            </div>

            {/* Avatars */}
            <div className="flex items-center gap-1">
              {circle.avatars.slice(0, 5).map((initial, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-charcoal-lighter border border-white/10 flex items-center justify-center -ml-1 first:ml-0"
                >
                  <span className="text-xs text-white/60">{initial}</span>
                </div>
              ))}
              {circle.members > 5 && (
                <span className="text-xs text-white/30 ml-2">
                  +{circle.members - 5}
                </span>
              )}
            </div>

            {circle.challenge && (
              <p className="text-xs text-white/40 mt-2 pt-2 border-t border-white/5">
                Challenge: {circle.challenge}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Accountability Partner */}
      <motion.div
        variants={item}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      >
        <h3 className="text-sm font-medium text-cream-warm mb-3">Accountability Partner</h3>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full bg-emerald-glow/20 border-2 border-charcoal flex items-center justify-center">
              <span className="text-sm font-medium text-emerald-glow">A</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gold-soft/20 border-2 border-charcoal flex items-center justify-center">
              <span className="text-sm font-medium text-gold-soft">Y</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-cream-warm font-medium">Ahmad & Yusuf</p>
            <div className="flex gap-3 mt-1">
              <span className="text-xs text-emerald-glow">12 days</span>
              <span className="text-xs text-gold-soft">9 days</span>
            </div>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="w-full mt-4 py-2.5 rounded-xl bg-emerald-glow/10 border border-emerald-glow/20 text-emerald-glow text-sm font-medium"
        >
          <Heart className="w-3.5 h-3.5 inline mr-1.5" />
          Send Encouragement
        </motion.button>
      </motion.div>

      {/* Shared Challenges */}
      <motion.div
        variants={item}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
      >
        <h3 className="text-sm font-medium text-cream-warm mb-2">Shared Challenges</h3>
        <p className="text-xs text-white/40">Family Circle &middot; 30-Day Quran</p>
        <div className="mt-2 h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-glow/60 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <p className="text-[10px] text-white/30 mt-1">Combined progress: 65%</p>
      </motion.div>

      {/* Create Circle */}
      <motion.div variants={item}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full bg-white/5 backdrop-blur-xl border border-dashed border-white/20 rounded-2xl p-5 flex items-center justify-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
            <Plus className="w-5 h-5 text-white/50" />
          </div>
          <span className="text-sm text-white/60 font-medium">Create a Circle</span>
        </motion.button>
      </motion.div>

      {/* Privacy Note */}
      <motion.div variants={item} className="flex items-center gap-2 px-2">
        <Lock className="w-3.5 h-3.5 text-white/30" />
        <p className="text-xs text-white/30">
          All circles are private. Only members can see activity.
        </p>
      </motion.div>
    </motion.div>
  )
}
