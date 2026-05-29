import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, BarChart3, Target, Trophy, Users, Heart, Brain, Star, Check } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { container, item } from '../lib/motion-variants'

const features = [
  { icon: <Sparkles className="w-5 h-5" />, title: 'AI Coach', desc: 'Personalized spiritual guidance' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Advanced Analytics', desc: 'Deep insights into patterns' },
  { icon: <Target className="w-5 h-5" />, title: 'Personalized Plans', desc: 'Custom growth roadmaps' },
  { icon: <Trophy className="w-5 h-5" />, title: 'Premium Challenges', desc: 'Exclusive challenges' },
  { icon: <Users className="w-5 h-5" />, title: 'Private Groups', desc: 'Unlimited circles' },
  { icon: <Heart className="w-5 h-5" />, title: 'Family Plans', desc: 'Grow together' },
  { icon: <Brain className="w-5 h-5" />, title: 'Deep Habit Insights', desc: 'Behavioral analysis' },
]

const freeFeatures = ['Basic prayer tracking', 'Simple Quran reading', '1 challenge', 'Limited analytics']
const premiumFeatures = ['AI Spiritual Coach', 'Unlimited challenges', 'Full analytics suite', 'Private groups', 'Family plan', 'Personalized roadmap']

export default function PremiumPage() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual')

  return (
    <motion.div
      className="pb-24 pt-12 px-5 space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Hero */}
      <motion.div variants={item} className="text-center py-4">
        <motion.div
          className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold-warm to-gold-soft flex items-center justify-center"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-7 h-7 text-charcoal" />
        </motion.div>
        <h1 className={`text-2xl font-bold ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>
          Transform Your Spiritual Journey
        </h1>
        <p className={`text-sm mt-2 ${isLight ? 'text-gray-500' : 'text-white/50'}`}>Unlock the full Sakina experience</p>
      </motion.div>

      {/* Before/After Comparison */}
      <motion.div variants={item} className="grid grid-cols-2 gap-3">
        <div className={`rounded-xl p-4 ${isLight ? 'bg-gray-50 border border-gray-200' : 'bg-white/5 border border-white/10'}`}>
          <p className={`text-xs font-medium mb-3 ${isLight ? 'text-gray-400' : 'text-white/40'}`}>Free</p>
          <div className="space-y-2">
            {freeFeatures.map((f, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <div className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${isLight ? 'bg-gray-300' : 'bg-white/30'}`} />
                <p className={`text-[11px] ${isLight ? 'text-gray-400' : 'text-white/40'}`}>{f}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`rounded-xl p-4 ${isLight ? 'bg-amber-50 border border-amber-200' : 'bg-gold-soft/5 border border-gold-soft/20'}`}>
          <p className="text-xs font-medium text-gold-soft mb-3">Premium</p>
          <div className="space-y-2">
            {premiumFeatures.map((f, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <Check className="w-3 h-3 text-gold-soft mt-0.5 flex-shrink-0" />
                <p className={`text-[11px] ${isLight ? 'text-gray-700' : 'text-cream-warm'}`}>{f}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Feature Highlights */}
      <motion.div variants={item} className="space-y-2">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            className={`rounded-xl p-3.5 flex items-center gap-3 ${isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-white/5 border border-white/5'}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-gold-soft flex-shrink-0 ${isLight ? 'bg-amber-50' : 'bg-gold-soft/10'}`}>
              {feat.icon}
            </div>
            <div>
              <p className={`text-sm font-medium ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>{feat.title}</p>
              <p className={`text-xs ${isLight ? 'text-gray-400' : 'text-white/40'}`}>{feat.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pricing Cards */}
      <motion.div variants={item} className="space-y-3">
        <motion.button
          onClick={() => setSelectedPlan('annual')}
          whileTap={{ scale: 0.97 }}
          className={`w-full p-4 rounded-xl border text-left relative overflow-hidden ${
            selectedPlan === 'annual'
              ? isLight ? 'border-amber-400 bg-amber-50' : 'border-gold-soft/50 bg-gold-soft/5'
              : isLight ? 'border-gray-200 bg-white' : 'border-white/10 bg-white/5'
          }`}
        >
          {selectedPlan === 'annual' && (
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gold-soft text-charcoal text-[10px] font-bold">
              BEST VALUE
            </div>
          )}
          <p className={`text-sm font-semibold ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>Annual</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-bold ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>$79.99</span>
            <span className={`text-xs ${isLight ? 'text-gray-400' : 'text-white/40'}`}>/year</span>
          </div>
          <p className="text-xs text-gold-soft mt-1">Save 33%</p>
        </motion.button>

        <motion.button
          onClick={() => setSelectedPlan('monthly')}
          whileTap={{ scale: 0.97 }}
          className={`w-full p-4 rounded-xl border text-left ${
            selectedPlan === 'monthly'
              ? isLight ? 'border-amber-400 bg-amber-50' : 'border-gold-soft/50 bg-gold-soft/5'
              : isLight ? 'border-gray-200 bg-white' : 'border-white/10 bg-white/5'
          }`}
        >
          <p className={`text-sm font-semibold ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>Monthly</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-bold ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>$9.99</span>
            <span className={`text-xs ${isLight ? 'text-gray-400' : 'text-white/40'}`}>/month</span>
          </div>
        </motion.button>
      </motion.div>

      {/* Social Proof */}
      <motion.div variants={item} className="text-center space-y-2">
        <div className="flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className={`w-4 h-4 ${i <= 4 ? 'text-gold-soft fill-gold-soft' : 'text-gold-soft/50 fill-gold-soft/50'}`} />
          ))}
          <span className={`text-xs ml-1 ${isLight ? 'text-gray-500' : 'text-white/50'}`}>4.9/5</span>
        </div>
        <p className={`text-xs ${isLight ? 'text-gray-400' : 'text-white/40'}`}>Join 10,000+ Muslims growing their deen</p>
      </motion.div>

      {/* CTA */}
      <motion.div variants={item}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="w-full py-4 rounded-xl font-semibold text-sm gradient-gold text-charcoal"
        >
          Start Free Trial
        </motion.button>
        <p className={`text-xs text-center mt-2 ${isLight ? 'text-gray-400' : 'text-white/30'}`}>7 days free, cancel anytime</p>
      </motion.div>
    </motion.div>
  )
}
