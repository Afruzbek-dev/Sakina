import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, BookOpen, Moon, Sunrise, Trophy } from 'lucide-react'
import { container, item } from '../lib/motion-variants'

interface Challenge {
  id: string
  title: string
  description: string
  progress: number
  total: number
  dailyTask: string
  gradient: string
  icon: React.ReactNode
  joined: boolean
}

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'fajr',
      title: '7-Day Fajr Reset',
      description: 'Wake for Fajr every day for 7 days',
      progress: 3,
      total: 7,
      dailyTask: 'Set alarm for 4:45 AM',
      gradient: 'from-emerald-deep to-emerald-glow',
      icon: <Sunrise className="w-5 h-5 text-emerald-glow" />,
      joined: true,
    },
    {
      id: 'quran',
      title: '30-Day Quran Consistency',
      description: 'Read Quran every single day for 30 days',
      progress: 12,
      total: 30,
      dailyTask: 'Read 5 verses minimum',
      gradient: 'from-gold-warm to-gold-soft',
      icon: <BookOpen className="w-5 h-5 text-gold-soft" />,
      joined: true,
    },
    {
      id: 'ramadan',
      title: 'Ramadan Rebuild',
      description: 'Rebuild your Ramadan habits year-round',
      progress: 5,
      total: 21,
      dailyTask: 'Fast a Monday or Thursday',
      gradient: 'from-purple-700 to-purple-400',
      icon: <Moon className="w-5 h-5 text-purple-400" />,
      joined: false,
    },
    {
      id: 'morning',
      title: 'Morning Routine Challenge',
      description: 'Build a powerful morning routine',
      progress: 8,
      total: 14,
      dailyTask: 'Complete full morning checklist',
      gradient: 'from-gold-warm to-cream-warm',
      icon: <Sun className="w-5 h-5 text-cream-warm" />,
      joined: false,
    },
  ])

  function toggleJoin(id: string) {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, joined: !c.joined } : c))
    )
  }

  function getMilestones(total: number) {
    return [0.25, 0.5, 0.75, 1].map((pct) => Math.round(total * pct))
  }

  return (
    <motion.div
      className="pb-24 pt-12 px-5 space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-cream-warm">Challenges</h1>
        <p className="text-sm text-white/50 mt-0.5">Push your growth</p>
      </motion.div>

      {/* Active Challenge */}
      <motion.div
        variants={item}
        className="bg-gradient-to-br from-emerald-deep/60 to-emerald-glow/20 border border-emerald-glow/20 rounded-2xl p-5"
      >
        <div className="flex items-center gap-2 mb-2">
          <Sunrise className="w-4 h-4 text-emerald-glow" />
          <span className="text-xs font-medium text-emerald-glow">Active Challenge</span>
        </div>
        <h3 className="text-base font-semibold text-cream-warm">7-Day Fajr Reset</h3>
        <p className="text-xs text-white/50 mt-1">Day 3 of 7 &middot; Set alarm for 4:45 AM</p>
        <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-glow rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(3 / 7) * 100}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </motion.div>

      {/* Challenge Cards */}
      <motion.div variants={item} className="space-y-4">
        {challenges.map((challenge) => {
          const pct = (challenge.progress / challenge.total) * 100
          const milestones = getMilestones(challenge.total)

          return (
            <motion.div
              key={challenge.id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  {challenge.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-cream-warm">{challenge.title}</h3>
                  <p className="text-xs text-white/40 mt-0.5">{challenge.description}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="relative mb-2">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${challenge.gradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
                {/* Milestone markers */}
                <div className="absolute inset-0 flex">
                  {milestones.map((_, mi) => (
                    <div
                      key={mi}
                      className="flex-1 relative"
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/20" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/50">
                    Day {challenge.progress}/{challenge.total}
                  </p>
                  <p className="text-[10px] text-white/30 mt-0.5">
                    Today: {challenge.dailyTask}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleJoin(challenge.id)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium ${
                    challenge.joined
                      ? 'bg-emerald-glow/20 text-emerald-glow'
                      : 'bg-white/10 text-white/70'
                  }`}
                >
                  {challenge.joined ? 'Continue' : 'Join'}
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Completed Section */}
      <motion.div
        variants={item}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-gold-soft" />
        </div>
        <div>
          <p className="text-sm font-medium text-cream-warm">3 Challenges Completed</p>
          <p className="text-xs text-white/40">Keep the momentum going!</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
