import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../../contexts/AppContext'

interface Question {
  id: string
  text: string
  options: string[]
}

const questions: Question[] = [
  {
    id: 'prayer',
    text: 'How often do you pray all 5?',
    options: ['Rarely', 'Sometimes', 'Usually', 'Always'],
  },
  {
    id: 'quran',
    text: 'How often do you read Quran?',
    options: ['Never', 'Weekly', 'Few times/week', 'Daily'],
  },
  {
    id: 'stress',
    text: 'How stressed do you feel?',
    options: ['Very', 'Somewhat', 'A little', 'Rarely'],
  },
  {
    id: 'consistency',
    text: 'How consistent are your habits?',
    options: ['Not at all', 'Slightly', 'Moderately', 'Very'],
  },
]

export default function OnboardingStep3() {
  const navigate = useNavigate()
  const { setAssessment } = useAppContext()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const question = questions[currentQ]
  const progress = ((currentQ + (answers[question.id] ? 1 : 0)) / questions.length) * 100

  const selectOption = (option: string) => {
    const newAnswers = { ...answers, [question.id]: option }
    setAnswers(newAnswers)

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1)
      } else {
        // Save assessment answers to context before navigating
        setAssessment({
          prayerFrequency: newAnswers['prayer'] || '',
          quranFrequency: newAnswers['quran'] || '',
          stressLevel: newAnswers['stress'] || '',
          habitConsistency: newAnswers['consistency'] || '',
        })
        navigate('/onboarding/step-4')
      }
    }, 400)
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
        <h1 className="text-2xl font-bold text-cream-warm">
          Let&apos;s understand where you are
        </h1>
      </motion.div>

      {/* Progress bar */}
      <div className="mb-8 mt-4">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-glow rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        <p className="text-white/40 text-xs mt-2">
          Question {currentQ + 1} of {questions.length}
        </p>
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <h2 className="text-xl font-semibold text-cream-warm mb-8 text-center">
              {question.text}
            </h2>

            <div className="flex flex-wrap justify-center gap-3">
              {question.options.map((option) => {
                const isSelected = answers[question.id] === option
                return (
                  <motion.button
                    key={option}
                    onClick={() => selectOption(option)}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-3 rounded-full border transition-all duration-200 text-sm font-medium ${
                      isSelected
                        ? 'border-emerald-glow bg-emerald-glow/15 text-emerald-glow shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                        : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {option}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
