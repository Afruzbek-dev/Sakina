import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CelebrationProps {
  show: boolean
  message?: string
  onComplete?: () => void
}

function Particle({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-gold-soft"
      initial={{ opacity: 0, y: 0, x }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, -60, -120, -160],
        x: [x, x + (Math.random() - 0.5) * 40],
        scale: [0.5, 1, 0.8, 0],
      }}
      transition={{ duration: 2, delay, ease: 'easeOut' }}
    />
  )
}

export default function Celebration({ show, message = 'MashAllah!', onComplete }: CelebrationProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        onComplete?.()
      }, 2200)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 0.08,
    x: (i - 6) * 12,
  }))

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Particles */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            {particles.map((p) => (
              <Particle key={p.id} delay={p.delay} x={p.x} />
            ))}
          </div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-2xl font-bold text-gold-soft mt-[-2rem]"
          >
            {message}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
