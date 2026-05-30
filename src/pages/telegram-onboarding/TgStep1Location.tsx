import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'

const cities = ['Toshkent', 'Samarqand', 'Buxoro', 'Namangan', "Farg'ona", 'Andijon']

export default function TgStep1Location() {
  const navigate = useNavigate()
  const { telegramUser } = useAuth()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [selectedCity, setSelectedCity] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const firstName = telegramUser?.first_name || 'friend'
  const photoUrl = telegramUser?.photo_url
  const initial = firstName.charAt(0).toUpperCase()

  const filteredCities = searchQuery
    ? cities.filter((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const handleContinue = () => {
    if (!selectedCity) return
    localStorage.setItem('sakina-tg-onboarding-city', selectedCity)
    navigate('/tg-onboarding/goals')
  }

  return (
    <div className="h-full flex flex-col p-6">
      {/* Avatar + Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center mb-6"
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={firstName}
            className="w-16 h-16 rounded-full object-cover mb-3"
          />
        ) : (
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3"
            style={{ background: 'linear-gradient(135deg, #2DD4BF, #8B5CF6)' }}
          >
            {initial}
          </div>
        )}
        <h1 className={`text-2xl font-bold text-center ${isLight ? 'text-gray-900' : 'text-cream-warm'}`}>
          Assalomu alaykum, {firstName}!
        </h1>
        <p className={`text-sm mt-1 text-center ${isLight ? 'text-gray-500' : 'text-white/60'}`}>
          Shahringizni tanlang
        </p>
      </motion.div>

      {/* City chips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-wrap gap-2 justify-center mb-4"
      >
        {cities.map((city) => (
          <motion.button
            key={city}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setSelectedCity(city); setSearchQuery('') }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCity === city
                ? 'bg-[var(--primary)] text-white'
                : isLight
                  ? 'bg-[#F2F2F7] text-gray-700 border border-gray-200'
                  : 'bg-[var(--surface)] text-white/70 border border-white/10'
            }`}
          >
            {city}
          </motion.button>
        ))}
      </motion.div>

      {/* Search input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative mb-4"
      >
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-gray-400' : 'text-white/40'}`} />
        <input
          type="text"
          placeholder="Boshqa shahar qidirish..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); if (e.target.value) setSelectedCity('') }}
          className={`w-full h-12 pl-10 pr-4 rounded-2xl text-sm outline-none transition-colors ${
            isLight
              ? 'bg-[#F2F2F7] text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[var(--primary)]'
              : 'bg-[var(--surface)] text-white placeholder:text-white/40 focus:ring-2 focus:ring-[var(--primary)]'
          }`}
        />
      </motion.div>

      {/* Search results */}
      {searchQuery && filteredCities.length > 0 && (
        <div className="mb-4 space-y-1">
          {filteredCities.map((city) => (
            <button
              key={city}
              onClick={() => { setSelectedCity(city); setSearchQuery('') }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                selectedCity === city
                  ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                  : isLight
                    ? 'hover:bg-gray-50 text-gray-700'
                    : 'hover:bg-white/5 text-white/70'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {/* Custom city from search */}
      {searchQuery && filteredCities.length === 0 && searchQuery.length >= 2 && (
        <button
          onClick={() => { setSelectedCity(searchQuery); setSearchQuery('') }}
          className={`mb-4 w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
            isLight ? 'bg-[#F2F2F7] text-gray-700' : 'bg-[var(--surface)] text-white/70'
          }`}
        >
          &quot;{searchQuery}&quot; ni tanlash
        </button>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <button
          onClick={handleContinue}
          disabled={!selectedCity}
          className={`w-full h-[56px] rounded-full bg-[var(--primary)] text-white font-semibold text-[16px] transition-opacity ${
            !selectedCity ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          Keyingisi
        </button>
      </motion.div>
    </div>
  )
}
