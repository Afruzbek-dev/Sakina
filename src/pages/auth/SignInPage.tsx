import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'

export default function SignInPage() {
  const navigate = useNavigate()
  const { signInWithMagicLink, signInWithGoogle, signInWithApple } = useAuth()
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const handleSubmit = () => {
    if (!email.trim()) {
      setError('Email manzilini kiriting')
      return
    }
    if (!isValidEmail(email)) {
      setError("Email formati noto'g'ri")
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      signInWithMagicLink(email)
      setLoading(false)
      navigate('/auth/sent')
    }, 1500)
  }

  const handleGoogle = () => {
    signInWithGoogle()
    navigate('/')
  }

  const handleApple = () => {
    signInWithApple()
    navigate('/')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col px-6 pt-6 pb-8"
    >
      {/* Back arrow */}
      <button
        onClick={() => navigate('/auth')}
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-6 ${
          isLight ? 'bg-gray-100' : 'bg-white/5'
        }`}
      >
        <ArrowLeft className={`w-5 h-5 ${isLight ? 'text-gray-700' : 'text-white'}`} />
      </button>

      {/* Heading */}
      <h1 className={`text-[28px] font-bold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
        As-salamu alaykum
      </h1>
      <p className="text-[16px] text-[var(--text-secondary)] mb-8">
        Email manzilingizni kiriting
      </p>

      {/* Email input */}
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError('')
          }}
          placeholder="email@example.com"
          className={`w-full h-[56px] rounded-2xl px-4 text-[16px] outline-none transition-all ${
            isLight ? 'bg-[#F2F2F7] text-gray-900 placeholder:text-gray-400' : 'bg-[var(--surface)] text-white placeholder:text-white/40'
          } ${
            error
              ? 'border-2 border-red-500'
              : 'border-2 border-transparent focus:border-[var(--primary)]'
          }`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
        />
        {error && (
          <p className="text-red-500 text-[13px] mt-2 pl-1">{error}</p>
        )}
      </div>

      {/* Magic Link button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full h-[56px] rounded-full bg-[var(--primary)] text-white font-semibold text-[16px] flex items-center justify-center transition-opacity ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          'Magic Link yuborish'
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className={`flex-1 h-px ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />
        <span className="text-[13px] text-[var(--text-secondary)]">yoki</span>
        <div className={`flex-1 h-px ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />
      </div>

      {/* Google button */}
      <button
        onClick={handleGoogle}
        className={`w-full h-[56px] rounded-full flex items-center justify-center gap-3 font-medium text-[15px] mb-3 ${
          isLight
            ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-gray-700'
            : 'bg-[var(--card)] text-white shadow-[0_1px_3px_rgba(0,0,0,0.2)]'
        }`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Google bilan kirish
      </button>

      {/* Apple button */}
      <button
        onClick={handleApple}
        className="w-full h-[56px] rounded-full flex items-center justify-center gap-3 font-medium text-[15px] bg-black text-white"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
        Apple bilan kirish
      </button>

      {/* Footer */}
      <p className="text-center text-[13px] text-[var(--text-secondary)] mt-auto pt-6">
        Parol talab qilinmaydi
      </p>
    </motion.div>
  )
}
