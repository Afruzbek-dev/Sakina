import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useAppContext } from '../../contexts/AppContext'

interface PlanItem {
  title: string
  description: string
}

function generatePlan(goals: string[], assessment: { prayerFrequency: string; quranFrequency: string; stressLevel: string; habitConsistency: string } | null): PlanItem[] {
  const items: PlanItem[] = []

  if (goals.includes('pray-on-time')) {
    items.push({
      title: 'Fajr Challenge',
      description: 'Wake for Fajr daily this week',
    })
  }

  // If prayer frequency is low, emphasize the Fajr Challenge even if not explicitly selected
  if (assessment?.prayerFrequency === 'Rarely' && !goals.includes('pray-on-time')) {
    items.push({
      title: 'Fajr Challenge',
      description: 'Start with one prayer on time each day',
    })
  }

  if (goals.includes('read-quran')) {
    items.push({
      title: '5 Quran Verses',
      description: 'Read 5 verses every morning after Fajr',
    })
  }

  if (goals.includes('improve-focus')) {
    items.push({
      title: 'Mindful Prayer',
      description: 'Focus on khushu in at least 1 salah',
    })
  }

  if (goals.includes('reduce-anxiety')) {
    items.push({
      title: 'Morning Adhkar',
      description: 'Recite morning remembrances daily',
    })
  }

  // If stress is high, add breathing exercise
  if (assessment?.stressLevel === 'Very' || assessment?.stressLevel === 'Somewhat') {
    items.push({
      title: '5-Min Breathing Exercise',
      description: 'Calm your mind with guided breathing before bed',
    })
  }

  if (goals.includes('morning-routine')) {
    items.push({
      title: 'Rise & Shine',
      description: 'Wake 15 min before Fajr for tahajjud',
    })
  }

  if (goals.includes('learn-islam')) {
    items.push({
      title: 'Daily Hadith',
      description: 'Learn one new hadith each day',
    })
  }

  if (goals.includes('improve-discipline')) {
    items.push({
      title: 'Consistency Streak',
      description: 'Complete all daily tasks for 7 days',
    })
  }

  // Always include evening reflection
  items.push({
    title: 'Evening Reflection',
    description: '2 min gratitude journal before sleep',
  })

  return items
}

export default function OnboardingStep4() {
  const navigate = useNavigate()
  const { user, completeOnboarding } = useAppContext()
  const planItems = generatePlan(user.goals, user.assessment)

  const handleStart = () => {
    completeOnboarding()
    navigate('/')
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
          Your 7-Day Growth Plan
        </h1>
        <p className="text-white/50 text-sm mt-2">
          Tailored to your goals and current level
        </p>
      </motion.div>

      {/* Plan items */}
      <div className="flex-1 overflow-y-auto scroll-container">
        <div className="space-y-3">
          {planItems.map((planItem, index) => (
            <motion.div
              key={planItem.title + index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.12 }}
              className="flex items-start gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gold-soft/20">
                <Check size={16} className="text-gold-soft" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-cream-warm">
                  {planItem.title}
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  {planItem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-4 pt-4"
      >
        <motion.button
          onClick={handleStart}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="w-full py-4 rounded-2xl font-semibold text-white text-lg gradient-gold shadow-lg shadow-gold-soft/20"
        >
          Start My Journey
        </motion.button>
      </motion.div>
    </div>
  )
}
