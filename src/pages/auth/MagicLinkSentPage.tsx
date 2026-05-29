import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'

export default function MagicLinkSentPage() {
  const navigate = useNavigate()
  const { email, verifyMagicLink } = useAuth()
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [countdown])

  const handleResend = useCallback(() => {
    setCountdown(30)
  }, [])

  const handleVerify = () => {
    verifyMagicLink()
    navigate('/')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Mail icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Mail className="w-[120px] h-[120px] text-[var(--primary)] mb-6" strokeWidth={1} />
      </motion.div>

      {/* Heading */}
      <h1 className={`text-[24px] font-bold mb-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
        Emailingizni tekshiring
      </h1>

      {/* Body with email */}
      <p className={`text-[16px] mb-8 ${isLight ? 'text-gray-600' : 'text-white/70'}`}>
        <span className="font-bold">{email || 'email@example.com'}</span>{' '}
        manziliga havola yuborildi
      </p>

      {/* Resend button */}
      <button
        onClick={handleResend}
        disabled={countdown > 0}
        className={`w-full h-[56px] rounded-full border-2 border-[var(--primary)] text-[var(--primary)] font-semibold text-[15px] mb-4 transition-opacity ${
          countdown > 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {countdown > 0 ? `Qayta yuborish (${countdown}s)` : 'Qayta yuborish'}
      </button>

      {/* Other email link */}
      <button
        onClick={() => navigate('/auth/signin')}
        className="text-[14px] text-[var(--primary)] font-medium mb-6"
      >
        Boshqa email
      </button>

      {/* Tip */}
      <p className="text-[13px] text-[var(--text-secondary)] mb-8">
        Spam papkasini ham tekshiring
      </p>

      {/* DEV verify button */}
      <button
        onClick={handleVerify}
        className={`w-full h-[48px] rounded-full font-medium text-[14px] ${
          isLight
            ? 'bg-gray-100 text-gray-600'
            : 'bg-white/5 text-white/60'
        }`}
      >
        Tasdiqlash (Demo)
      </button>
    </motion.div>
  )
}
