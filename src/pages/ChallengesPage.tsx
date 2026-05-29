import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, BookOpen, Moon, Sunrise, Trophy, Users } from 'lucide-react'
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
  category: 'salah' | 'quran' | 'habits' | 'ramadan'
  participants: number
  reward: string
}

const categoryConfig = {
  salah: { label: 'Salah', color: '#2DD4BF', bg: 'rgba(45, 212, 191, 0.15)' },
  quran: { label: 'Quran', color: '#F4C95D', bg: 'rgba(244, 201, 93, 0.15)' },
  habits: { label: 'Habits', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.15)' },
  ramadan: { label: 'Ramadan', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)' },
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
      category: 'salah',
      participants: 1240,
      reward: 'Early Bird Badge',
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
      category: 'quran',
      participants: 3580,
      reward: 'Quran Scholar Badge',
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
      category: 'ramadan',
      participants: 890,
      reward: 'Ramadan Spirit Badge',
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
      category: 'habits',
      participants: 2150,
      reward: 'Discipline Master Badge',
    },
  ])

  function toggleJoin(id: string) {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, joined: !c.joined } : c))
    )
  }

  const activeChallenge = challenges.find((c) => c.id === 'fajr')
  const activePct = activeChallenge
    ? (activeChallenge.progress / activeChallenge.total) * 100
    : 0

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
        <p className="text-[13px] text-white/50 mt-0.5">Push your growth</p>
      </motion.div>

      {/* Active Challenge Hero */}
      <motion.div
        variants={item}
        className="w-full h-[150px] rounded-3xl p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(45, 212, 191, 0.2), rgba(139, 92, 246, 0.2))',
          border: '1px solid rgba(45, 212, 191, 0.2)',
        }}
      >
        <div className="flex items-start justify-between h-full">
          <div className="flex flex-col justify-between h-full flex-1">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sunrise className="w-4 h-4 text-emerald-glow" />
                <span className="text-[13px] font-medium text-emerald-glow">Active Challenge</span>
              </div>
              <h2 className="text-[22px] font-semibold text-cream-warm">7-Day Fajr Reset</h2>
              <p className="text-[13px] text-white/50 mt-1">Day 3 of 7</p>
            </div>
            <div className="mt-3">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-glow rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${activePct}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </div>
          {/* Circular Progress Ring */}
          <div className="flex-shrink-0 ml-4">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="4"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="#2DD4BF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - activePct / 100)}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - activePct / 100) }}
                transition={{ duration: 1 }}
                style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
              />
              <text
                x="24"
                y="26"
                textAnchor="middle"
                fill="#2DD4BF"
                fontSize="11"
                fontWeight="600"
              >
                {Math.round(activePct)}%
              </text>
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Challenge Cards */}
      <motion.div variants={item} className="space-y-5">
        {challenges.map((challenge) => {
          const pct = (challenge.progress / challenge.total) * 100
          const cat = categoryConfig[challenge.category]

          return (
            <motion.div
              key={challenge.id}
              className="min-h-[150px] rounded-3xl p-6 border border-white/10"
              style={{ backgroundColor: '#182230' }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Category Tag */}
              <div className="mb-3">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                  style={{
                    backgroundColor: cat.bg,
                    color: cat.color,
                  }}
                >
                  {cat.label}
                </span>
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  {challenge.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[16px] font-semibold text-cream-warm">{challenge.title}</h3>
                  <p className="text-[13px] text-white/40 mt-0.5">{challenge.description}</p>
                </div>
              </div>

              {/* Participant Count */}
              <div className="flex items-center gap-1.5 mb-3">
                <Users className="w-3.5 h-3.5 text-[#A1A1AA]" />
                <span className="text-[13px] text-[#A1A1AA]">
                  {challenge.participants.toLocaleString()} people joined
                </span>
              </div>

              {/* Progress with Milestone Markers */}
              <div className="relative mb-3">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${challenge.gradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
                {/* Milestone markers - 4 dots at 25%, 50%, 75%, 100% */}
                <div className="absolute inset-0 flex items-center">
                  {[0.25, 0.5, 0.75, 1].map((milestone, mi) => (
                    <div
                      key={mi}
                      className="absolute w-[6px] h-[6px] rounded-full -translate-x-1/2"
                      style={{
                        left: `${milestone * 100}%`,
                        backgroundColor: pct >= milestone * 100 ? '#F4C95D' : 'rgba(255,255,255,0.2)',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] text-white/50">
                    Day {challenge.progress}/{challenge.total}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleJoin(challenge.id)}
                  className={`px-4 py-1.5 rounded-lg text-[13px] font-medium ${
                    challenge.joined
                      ? 'bg-emerald-glow/20 text-emerald-glow'
                      : 'bg-white/10 text-white/70'
                  }`}
                >
                  {challenge.joined ? 'Continue' : 'Join'}
                </motion.button>
              </div>

              {/* Reward Preview */}
              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/5">
                <Trophy className="w-3.5 h-3.5 text-[#A1A1AA]" />
                <span className="text-[13px] text-[#A1A1AA]">
                  Earn: {challenge.reward}
                </span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Completed Section */}
      <motion.div
        variants={item}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-gold-soft" />
        </div>
        <div>
          <p className="text-[16px] font-medium text-cream-warm">3 Challenges Completed</p>
          <p className="text-[13px] text-white/40">Keep the momentum going!</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
