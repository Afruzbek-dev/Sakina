import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  headline: string
  body: string
  ctaLabel?: string
  onCta?: () => void
}

export default function EmptyState({ icon, headline, body, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center text-center px-8 py-12"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-white/30">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-cream-warm mb-2">{headline}</h3>
      <p className="text-sm text-white/50 leading-relaxed max-w-[260px]">{body}</p>
      {ctaLabel && onCta && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onCta}
          className="mt-6 px-6 py-2.5 rounded-xl bg-emerald-glow/20 border border-emerald-glow/30 text-emerald-glow text-sm font-medium"
        >
          {ctaLabel}
        </motion.button>
      )}
    </motion.div>
  )
}
