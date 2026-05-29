import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useAppContext } from '../../contexts/AppContext'
import { useTheme } from '../../contexts/ThemeContext'

interface GoalOption {
  id: string
  emoji: string
  label: string
}

const goals: GoalOption[] = [
  { id: 'prayer', emoji: '\u{1F932}', label: "Barcha namozlarni o'qish" },
  { id: 'quran', emoji: '\u{1F4D6}', label: "Qur'on tilovat qilish" },
  { id: 'dhikr', emoji: '\u{1F4FF}', label: 'Zikr odatini shakllantirish' },
  { id: 'balance', emoji: '\u{2696}\u{FE0F}', label: 'Hayotda muvozanat' },
  { id: 'improvement', emoji: '\u{2728}', label: 'Umuman yaxshilanish' },
]

export default function OnboardingStep3() {
  const navigate = useNavigate()
  const { setGoals } = useAppContext()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [selected, setSelected] = useState<string[]>([])

  const toggleGoal = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    )
  }

  const handleContinue = () => {
    setGoals(selected)
    navigate('/onboarding/step-4')
  }

  return (
    <div className="h-full flex flex-col p-6">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-2"
      >
        <h1 className={`text-2xl font-bold ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>
          Asosiy maqsadingiz nima?
        </h1>
        <p className={`text-[16px] mt-2 ${isLight ? 'text-gray-500' : 'text-white/60'}`}>
          Bir yoki bir nechta tanlang
        </p>
      </motion.div>

      {/* Goal cards grid */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-3">
          {goals.map((goal) => {
            const isSelected = selected.includes(goal.id)
            return (
              <motion.button
                key={goal.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => toggleGoal(goal.id)}
                className={`relative p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 min-h-[100px] transition-all ${
                  isSelected
                    ? 'border-2 border-[var(--primary)] bg-[var(--primary)]/10'
                    : isLight
                      ? 'border-2 border-transparent bg-[#F2F2F7]'
                      : 'border-2 border-transparent bg-[var(--surface)]'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <span className="text-[28px]">{goal.emoji}</span>
                <span
                  className={`text-[13px] font-medium leading-tight ${
                    isSelected
                      ? 'text-[var(--primary)]'
                      : isLight
                        ? 'text-gray-700'
                        : 'text-white/80'
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className={`w-full h-[56px] rounded-full bg-[var(--primary)] text-white font-semibold text-[16px] transition-opacity ${
            selected.length === 0 ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          Davom etish
        </button>
      </motion.div>
    </div>
  )
}
