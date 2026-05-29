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

const suggestedPrompts = [
  'How can I improve Fajr?',
  'Dua for anxiety',
  'Quran reading plan',
  'Evening routine',
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
      {/* Premium Coach Avatar */}
      <motion.div variants={item} className="flex flex-col items-center">
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #2DD4BF, #8B5CF6)',
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
        >
          <Sparkles className="w-7 h-7 text-white" />
        </motion.div>
      </motion.div>

      {/* Header */}
      <motion.div variants={item} className="text-center">
        <h1 className="text-2xl font-bold text-cream-warm">AI Coach</h1>
        <p className="text-[13px] text-white/50 mt-0.5">Your spiritual mentor</p>
      </motion.div>

      {/* Daily Check-in / Mood Selector */}
      <AnimatePresence>
        {selectedMood === null && (
          <motion.div
            variants={item}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
          >
            <p className="text-[16px] font-medium text-cream-warm mb-4">
              How are you feeling today?
            </p>
            <div className="flex justify-between">
              {moods.map((mood, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => selectMood(i)}
                  className={`flex flex-col items-center gap-1.5 transition-opacity ${
                    selectedMood !== null && selectedMood !== i ? 'opacity-40' : ''
                  }`}
                  aria-label={mood.label}
                >
                  <motion.span
                    className="text-2xl block"
                    whileHover={{ scale: 1.15 }}
                    style={
                      selectedMood === i
                        ? { boxShadow: '0 0 12px rgba(45, 212, 191, 0.4)' }
                        : undefined
                    }
                  >
                    {mood.emoji}
                  </motion.span>
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
              <div
                className="rounded-2xl rounded-tl-sm px-5 py-4 border border-white/5"
                style={{
                  background: 'linear-gradient(135deg, #182230, #1d2a3a)',
                }}
              >
                <p className="text-[16px] text-cream-warm/90 leading-relaxed">{msg.text}</p>
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
              exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
              className="flex gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-glow/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-glow" />
              </div>
              <div
                className="rounded-2xl rounded-tl-sm px-5 py-4 border border-white/5"
                style={{
                  background: 'linear-gradient(135deg, #182230, #1d2a3a)',
                }}
              >
                <div className="flex gap-1.5 items-center py-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-[3px] h-[3px] rounded-full bg-white/40"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Weekly Insight Summary */}
      <motion.div
        variants={item}
        className="bg-[#121923] border border-white/10 rounded-3xl p-5"
      >
        <h3 className="text-[13px] font-medium text-white/50 mb-4">Weekly Insight Summary</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-xl font-bold text-[#2DD4BF]">85%</p>
            <p className="text-[13px] text-white/50 mt-1">Prayer</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-[#2DD4BF]">92%</p>
            <p className="text-[13px] text-white/50 mt-1">Quran</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-[#2DD4BF]">5 days</p>
            <p className="text-[13px] text-white/50 mt-1">Reflection</p>
          </div>
        </div>
      </motion.div>

      {/* Reflection Prompt */}
      <motion.div
        variants={item}
        className="rounded-2xl p-5 border-l-4 border-l-[#F4C95D]"
        style={{ backgroundColor: '#182230' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-gold-soft" />
          <span className="text-[13px] font-medium text-gold-soft">Today&apos;s Reflection</span>
        </div>
        <p className="text-[16px] text-cream-warm/90 leading-relaxed italic">
          &ldquo;What is one thing you can do today that your future self will thank you for?&rdquo;
        </p>
      </motion.div>

      {/* Habit Insights */}
      <motion.div variants={item} className="space-y-3">
        <h3 className="text-[13px] font-medium text-cream-warm">Habit Insights</h3>
        {insightCards.map((insight, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.98 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex items-center gap-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            <span className="text-xl">{insight.icon}</span>
            <p className="text-[13px] text-white/70 leading-relaxed">{insight.text}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Suggested Prompts */}
      <motion.div variants={item}>
        <h3 className="text-[13px] font-medium text-cream-warm mb-3">Suggested Prompts</h3>
        <div className="overflow-x-auto flex gap-3 pb-2 -mx-1 px-1">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              className="h-[44px] flex-shrink-0 rounded-full border border-white/10 px-[18px] text-[13px] text-white/70 whitespace-nowrap"
              style={{ backgroundColor: '#182230' }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
