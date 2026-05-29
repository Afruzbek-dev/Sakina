import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Lightbulb } from 'lucide-react'
import { container, item } from '../lib/motion-variants'

const moods = [
  { emoji: '😰', label: 'Stressed' },
  { emoji: '😔', label: 'Low' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😊', label: 'Great' },
]

interface Message {
  id: number
  text: string
  time: string
  isCoach: boolean
}

const coachMessages: Message[] = [
  { id: 1, text: 'Assalamu alaikum! Based on your recent activity, you are making great progress. Keep it up!', time: '9:00 AM', isCoach: true },
  { id: 2, text: 'You missed Fajr twice this week. Try setting your alarm 10 minutes earlier.', time: '10:15 AM', isCoach: true },
  { id: 3, text: 'I notice you are more consistent after journaling. Keep it up!', time: '2:30 PM', isCoach: true },
  { id: 4, text: 'Your Quran reading improved 30% this week. MashAllah!', time: '4:45 PM', isCoach: true },
]

const insightCards = [
  { text: 'Sleep before 11 PM increased your Fajr consistency by 40%', icon: '🌙' },
  { text: 'Weekends are your strongest Quran reading days', icon: '📖' },
]

export default function CoachPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [showTyping, setShowTyping] = useState(true)
  const [messages, setMessages] = useState<Message[]>(coachMessages)

  useEffect(() => {
    const timer = setTimeout(() => setShowTyping(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  function selectMood(idx: number) {
    setSelectedMood(idx)
    const moodResponse: Message = {
      id: messages.length + 1,
      text: `I see you are feeling ${moods[idx].label.toLowerCase()} today. ${
        idx < 2
          ? 'Remember, every test is temporary. Try a short dhikr session to calm your heart.'
          : 'Alhamdulillah! Let us build on this positive energy.'
      }`,
      time: 'Just now',
      isCoach: true,
    }
    setMessages((prev) => [...prev, moodResponse])
  }

  return (
    <motion.div
      className="pb-24 pt-12 px-5 space-y-5"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-cream-warm">AI Coach</h1>
          <Sparkles className="w-5 h-5 text-gold-soft" />
        </div>
        <p className="text-sm text-white/50 mt-0.5">Your spiritual mentor</p>
      </motion.div>

      {/* Daily Check-in */}
      <AnimatePresence>
        {selectedMood === null && (
          <motion.div
            variants={item}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
          >
            <p className="text-sm font-medium text-cream-warm mb-4">
              How are you feeling today?
            </p>
            <div className="flex justify-between">
              {moods.map((mood, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => selectMood(i)}
                  className="flex flex-col items-center gap-1.5"
                  aria-label={mood.label}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-[10px] text-white/40">{mood.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Messages */}
      <motion.div variants={item} className="space-y-3">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-glow/20 flex items-center justify-center flex-shrink-0 mt-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-glow" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3">
                <p className="text-sm text-cream-warm/90 leading-relaxed">{msg.text}</p>
              </div>
              <p className="text-[10px] text-white/30 mt-1 ml-2">{msg.time}</p>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {showTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-glow/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-glow" />
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-white/40"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Reflection Prompt */}
      <motion.div
        variants={item}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
      >
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-gold-soft" />
          <span className="text-xs font-medium text-gold-soft">Today&apos;s Reflection</span>
        </div>
        <p className="text-sm text-cream-warm/90 leading-relaxed italic">
          &ldquo;What is one thing you can do today that your future self will thank you for?&rdquo;
        </p>
      </motion.div>

      {/* Habit Insights */}
      <motion.div variants={item} className="space-y-3">
        <h3 className="text-sm font-medium text-cream-warm">Habit Insights</h3>
        {insightCards.map((insight, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.98 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex items-center gap-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            <span className="text-xl">{insight.icon}</span>
            <p className="text-xs text-white/70 leading-relaxed">{insight.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
