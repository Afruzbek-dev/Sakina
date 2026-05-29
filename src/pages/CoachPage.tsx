import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Lightbulb } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { container, item } from '../lib/motion-variants'

const moods = [
  { emoji: '\u{1F630}', label: 'Stressed' },
  { emoji: '\u{1F614}', label: 'Low' },
  { emoji: '\u{1F610}', label: 'Neutral' },
  { emoji: '\u{1F642}', label: 'Good' },
  { emoji: '\u{1F60A}', label: 'Great' },
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
  { text: 'Sleep before 11 PM increased your Fajr consistency by 40%', icon: '\u{1F319}' },
  { text: 'Weekends are your strongest Quran reading days', icon: '\u{1F4D6}' },
]

const suggestedPrompts = [
  'How can I improve Fajr?',
  'Dua for anxiety',
  'Quran reading plan',
  'Evening routine',
]

export default function CoachPage() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
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
        <h1 className={`text-2xl font-bold ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>AI Coach</h1>
        <p className={`text-[13px] mt-0.5 ${isLight ? 'text-gray-500' : 'text-white/50'}`}>Your spiritual mentor</p>
      </motion.div>

      {/* Daily Check-in / Mood Selector */}
      <AnimatePresence>
        {selectedMood === null && (
          <motion.div
            variants={item}
            exit={{ opacity: 0, height: 0 }}
            className={`rounded-2xl p-5 ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-white/5 backdrop-blur-xl border border-white/10'}`}
          >
            <p className={`text-[16px] font-medium mb-4 ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>
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
                  >
                    {mood.emoji}
                  </motion.span>
                  <span className={`text-[10px] ${isLight ? 'text-gray-400' : 'text-white/40'}`}>{mood.label}</span>
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
            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${isLight ? 'bg-teal-50' : 'bg-emerald-glow/20'}`}>
              <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-teal-600' : 'text-emerald-glow'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`rounded-2xl rounded-tl-sm px-5 py-4 ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'border border-white/5'}`}
                style={isLight ? undefined : {
                  background: 'linear-gradient(135deg, #182230, #1d2a3a)',
                }}
              >
                <p className={`text-[16px] leading-relaxed ${isLight ? 'text-gray-700' : 'text-cream-warm/90'}`}>{msg.text}</p>
              </div>
              <p className={`text-[10px] mt-1 ml-2 ${isLight ? 'text-gray-300' : 'text-white/30'}`}>{msg.time}</p>
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
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${isLight ? 'bg-teal-50' : 'bg-emerald-glow/20'}`}>
                <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-teal-600' : 'text-emerald-glow'}`} />
              </div>
              <div
                className={`rounded-2xl rounded-tl-sm px-5 py-4 ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'border border-white/5'}`}
                style={isLight ? undefined : {
                  background: 'linear-gradient(135deg, #182230, #1d2a3a)',
                }}
              >
                <div className="flex gap-1.5 items-center py-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className={`w-[3px] h-[3px] rounded-full ${isLight ? 'bg-gray-400' : 'bg-white/40'}`}
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
        className={`rounded-3xl p-5 ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-[#121923] border border-white/10'}`}
      >
        <h3 className={`text-[13px] font-medium mb-4 ${isLight ? 'text-gray-400' : 'text-white/50'}`}>Weekly Insight Summary</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-xl font-bold text-primary">85%</p>
            <p className={`text-[13px] mt-1 ${isLight ? 'text-gray-500' : 'text-white/50'}`}>Prayer</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-primary">92%</p>
            <p className={`text-[13px] mt-1 ${isLight ? 'text-gray-500' : 'text-white/50'}`}>Quran</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-primary">5 days</p>
            <p className={`text-[13px] mt-1 ${isLight ? 'text-gray-500' : 'text-white/50'}`}>Reflection</p>
          </div>
        </div>
      </motion.div>

      {/* Reflection Prompt */}
      <motion.div
        variants={item}
        className={`rounded-2xl p-5 border-l-4 border-l-[#F4C95D] ${isLight ? 'bg-white shadow-sm border border-gray-100' : ''}`}
        style={isLight ? undefined : { backgroundColor: '#182230' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-gold-soft" />
          <span className="text-[13px] font-medium text-gold-soft">Today&apos;s Reflection</span>
        </div>
        <p className={`text-[16px] leading-relaxed italic ${isLight ? 'text-gray-700' : 'text-cream-warm/90'}`}>
          &ldquo;What is one thing you can do today that your future self will thank you for?&rdquo;
        </p>
      </motion.div>

      {/* Habit Insights */}
      <motion.div variants={item} className="space-y-3">
        <h3 className={`text-[13px] font-medium ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>Habit Insights</h3>
        {insightCards.map((insight, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.98 }}
            className={`rounded-xl p-4 flex items-center gap-3 ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'}`}
          >
            <span className="text-xl">{insight.icon}</span>
            <p className={`text-[13px] leading-relaxed ${isLight ? 'text-gray-600' : 'text-white/70'}`}>{insight.text}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Suggested Prompts */}
      <motion.div variants={item}>
        <h3 className={`text-[13px] font-medium mb-3 ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>Suggested Prompts</h3>
        <div className="overflow-x-auto flex gap-3 pb-2 -mx-1 px-1">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              className={`h-[44px] flex-shrink-0 rounded-full border px-[18px] text-[13px] whitespace-nowrap ${isLight ? 'border-gray-200 bg-white text-gray-600' : 'border-white/10 text-white/70'}`}
              style={isLight ? undefined : { backgroundColor: '#182230' }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
