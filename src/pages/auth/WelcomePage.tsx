import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Moon } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'

export default function WelcomePage() {
  const navigate = useNavigate()
  const { continueAsGuest } = useAuth()
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const handleGuest = () => {
    continueAsGuest()
  }

  return (
    <div
      className="h-full flex flex-col"
      style={{
        background: isLight
          ? 'linear-gradient(to bottom, #0A7E6E 0%, #FAFAF7 100%)'
          : 'linear-gradient(to bottom, #065f46 0%, #064e3b 30%, #0B0F14 100%)',
      }}
    >
      {/* Logo area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <Moon className="w-20 h-20 text-white mb-4" strokeWidth={1.5} />
          <h1 className="text-[32px] font-bold text-white">Niya</h1>
          <p className="text-[16px] text-white/80 text-center mt-2 px-8">
            Kunlik hayotingizni islom bilan uyg&apos;unlashtiring
          </p>
        </motion.div>
      </div>

      {/* Bottom card section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`rounded-t-[24px] px-6 pt-8 pb-10 ${
          isLight ? 'bg-white' : 'bg-[var(--card)]'
        }`}
      >
        {/* Boshlash button */}
        <button
          onClick={() => navigate('/auth/signin')}
          className="w-full h-[56px] rounded-full bg-[var(--primary)] text-white font-semibold text-[16px] mb-3"
        >
          Boshlash
        </button>

        {/* Kirish button */}
        <button
          onClick={() => navigate('/auth/signin')}
          className="w-full h-[56px] rounded-full border-2 border-[var(--primary)] text-[var(--primary)] font-semibold text-[16px] mb-6"
        >
          Kirish
        </button>

        {/* Arabic bismillah */}
        <p className="text-center text-[18px] text-[var(--primary)] opacity-40 mb-6 font-arabic">
          بِسْمِ ٱللَّٰهِ
        </p>

        {/* Guest link */}
        <button
          onClick={handleGuest}
          className="w-full text-center text-[14px] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
        >
          Mehmon sifatida davom etish
        </button>
      </motion.div>
    </div>
  )
}
