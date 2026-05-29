import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Check } from 'lucide-react'
import { useAppContext } from '../../contexts/AppContext'
import { useTheme } from '../../contexts/ThemeContext'

export default function DailyReflection() {
  const { updateProgress, progress } = useAppContext()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [expanded, setExpanded] = useState(false)
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!text.trim()) return
    setSaved(true)
    updateProgress('reflection', { done: true })
    setTimeout(() => {
      setExpanded(false)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className={`rounded-3xl p-5 border-l-4 border-l-gold ${isLight ? 'bg-white shadow-sm border border-amber-100' : 'bg-white/5 backdrop-blur-xl border border-gold/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'}`}
    >
      {/* Header */}
      <button
        onClick={() => !saved && setExpanded(!expanded)}
        className="w-full flex items-center gap-3 text-left"
      >
        <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isLight ? 'bg-amber-50' : 'bg-gold/10'}`}>
          {/* Warm glow behind icon - dark mode only */}
          {!isLight && <div className="absolute inset-0 rounded-xl" style={{ boxShadow: '0 0 20px rgba(244, 201, 93, 0.3)' }} />}
          <Heart size={20} className="text-gold relative z-10" />
        </div>
        <div className="flex-1">
          <h3 className={`text-base font-medium ${isLight ? 'text-gray-900' : 'text-white'}`}>
            {progress.reflection.done ? 'Reflection complete' : 'What are you grateful for today?'}
          </h3>
          <p className={`text-xs mt-0.5 ${isLight ? 'text-gray-400' : 'text-white/50'}`}>Daily reflection</p>
        </div>
      </button>

      {/* Expandable area */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4">
              {!saved ? (
                <>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your reflection..."
                    className={`w-full h-24 rounded-xl p-3 text-sm resize-none focus:outline-none transition-colors ${isLight ? 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-300 focus:border-amber-300' : 'bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-gold/40'}`}
                  />
                  <AnimatePresence>
                    {text.trim() && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className={`mt-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isLight ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' : 'bg-gold/20 text-gold hover:bg-gold/30'}`}
                      >
                        Save Reflection
                      </motion.button>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2 py-3"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                  >
                    <Check size={16} className="text-primary" />
                  </motion.div>
                  <span className="text-sm text-primary font-medium">Saved!</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
