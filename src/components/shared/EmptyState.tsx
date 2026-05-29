import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

interface EmptyStateProps {
  icon: ReactNode
  headline: string
  body: string
  ctaLabel?: string
  onCta?: () => void
}

export default function EmptyState({ icon, headline, body, ctaLabel, onCta }: EmptyStateProps) {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center text-center px-8 py-12"
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${isLight ? 'bg-gray-100 text-gray-400' : 'bg-white/5 text-white/30'}`}>
        {icon}
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>{headline}</h3>
      <p className={`text-sm leading-relaxed max-w-[260px] ${isLight ? 'text-gray-500' : 'text-white/50'}`}>{body}</p>
      {ctaLabel && onCta && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onCta}
          className={`mt-6 px-6 py-2.5 rounded-xl text-sm font-medium ${isLight ? 'bg-teal-50 border border-teal-200 text-teal-700' : 'bg-emerald-glow/20 border border-emerald-glow/30 text-emerald-glow'}`}
        >
          {ctaLabel}
        </motion.button>
      )}
    </motion.div>
  )
}
