import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Moon, BookOpen, Target, Heart, Sun, BookMarked, Flame } from 'lucide-react'
import { useAppContext } from '../../contexts/AppContext'

const goals = [
  { id: 'pray-on-time', label: 'Pray on time', icon: Moon },
  { id: 'read-quran', label: 'Read Quran daily', icon: BookOpen },
  { id: 'improve-focus', label: 'Improve focus', icon: Target },
  { id: 'reduce-anxiety', label: 'Reduce anxiety', icon: Heart },
  { id: 'morning-routine', label: 'Build morning routine', icon: Sun },
  { id: 'learn-islam', label: 'Learn more Islam', icon: BookMarked },
  { id: 'improve-discipline', label: 'Improve discipline', icon: Flame },
]

export default function OnboardingStep2() {
  const navigate = useNavigate()
  const { setGoals } = useAppContext()
  const [selected, setSelected] = useState<string[]>([])

  const toggleGoal = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    )
  }

  const handleContinue = () => {
    setGoals(selected)
    navigate('/onboarding/step-3')
  }

  return (
    <div className="h-full flex flex-col p-6">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-cream-warm">
          What would you like to focus on?
        </h1>
        <p className="text-white/50 text-sm mt-2">Select all that apply</p>
      </motion.div>

      {/* Goals grid */}
      <div className="flex-1 overflow-y-auto scroll-container">
        <div className="grid grid-cols-2 gap-3">
          {goals.map((goal, index) => {
            const isSelected = selected.includes(goal.id)
            const Icon = goal.icon
            return (
              <motion.button
                key={goal.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => toggleGoal(goal.id)}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? 'border-emerald-glow bg-emerald-glow/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                    : 'border-white/10 bg-white/5 backdrop-blur-xl'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                    isSelected ? 'bg-emerald-glow/20 text-emerald-glow' : 'bg-white/10 text-white/60'
                  }`}
                >
                  <Icon size={20} />
                </div>
                <span
                  className={`text-sm font-medium text-center leading-tight transition-colors duration-200 ${
                    isSelected ? 'text-cream-warm' : 'text-white/70'
                  }`}
                >
                  {goal.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-4 pt-4"
      >
        <motion.button
          onClick={handleContinue}
          disabled={selected.length === 0}
          whileTap={selected.length > 0 ? { scale: 0.95 } : undefined}
          whileHover={selected.length > 0 ? { scale: 1.02 } : undefined}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
            selected.length > 0
              ? 'gradient-emerald text-white shadow-lg shadow-emerald-glow/20'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  )
}
