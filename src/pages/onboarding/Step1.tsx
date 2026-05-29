import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function OnboardingStep1() {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background organic shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 -left-16 w-48 h-48 bg-emerald-glow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 -right-16 w-64 h-64 bg-gold-soft/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-8 w-32 h-32 bg-emerald-deep/20 blob-shape blur-2xl" />
      </div>

      {/* Decorative crescent pattern */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative mb-12"
      >
        <div className="w-24 h-24 relative">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-glow/30" />
          <div className="absolute top-1 left-3 w-20 h-20 rounded-full bg-charcoal" />
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold-soft/60" />
          <div className="absolute top-6 -right-3 w-2 h-2 rounded-full bg-emerald-glow/40" />
          <div className="absolute -bottom-2 left-4 w-2 h-2 rounded-full bg-gold-soft/40" />
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="text-center relative z-10"
      >
        <h1 className="text-3xl font-bold text-cream-warm leading-tight mb-4">
          Build consistency
          <br />
          in your deen.
        </h1>
        <p className="text-white/60 text-base leading-relaxed max-w-xs mx-auto">
          Small daily actions. Lasting spiritual growth.
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
        className="mt-16 w-full max-w-xs relative z-10"
      >
        <motion.button
          onClick={() => navigate('/onboarding/step-2')}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="w-full py-4 rounded-2xl font-semibold text-white text-lg gradient-gold shadow-lg shadow-gold-soft/20"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  )
}
