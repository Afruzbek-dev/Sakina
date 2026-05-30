import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { isTelegramWebApp } from '../lib/telegram'
import { validateTelegramAuth, type TelegramUser } from '../services/telegram-auth'

const STORAGE_KEY = 'sakina-auth'

interface AuthState {
  isAuthenticated: boolean
  email: string
  isGuest: boolean
  telegramUser: TelegramUser | null
  tgOnboardingComplete: boolean
}

interface AuthContextType {
  isAuthenticated: boolean
  email: string
  isGuest: boolean
  telegramUser: TelegramUser | null
  tgOnboardingComplete: boolean
  signInWithMagicLink: (email: string) => void
  verifyMagicLink: () => void
  signInWithGoogle: () => void
  signInWithApple: () => void
  continueAsGuest: () => void
  signOut: () => void
  authenticateWithTelegram: () => void
  completeTgOnboarding: () => void
}

const defaultState: AuthState = {
  isAuthenticated: false,
  email: '',
  isGuest: false,
  telegramUser: null,
  tgOnboardingComplete: false,
}

function loadAuth(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw) as AuthState
    }
  } catch {
    // Ignore parse errors
  }
  return defaultState
}

function saveAuth(state: AuthState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignore storage errors
  }
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(loadAuth)

  useEffect(() => {
    saveAuth(state)
  }, [state])

  const authenticateWithTelegram = useCallback(() => {
    const initData = window.Telegram?.WebApp?.initData ?? ''
    validateTelegramAuth(initData)
      .then((result) => {
        if (result.valid) {
          setState((prev) => ({
            ...prev,
            isAuthenticated: true,
            telegramUser: result.user,
            tgOnboardingComplete: result.profile?.onboarding_completed ?? false,
          }))
        }
      })
      .catch(() => {
        // Fall back to default state so the app can still function
        setState(defaultState)
      })
  }, [])

  const completeTgOnboarding = useCallback(() => {
    setState((prev) => ({ ...prev, tgOnboardingComplete: true }))
  }, [])

  useEffect(() => {
    if (isTelegramWebApp()) {
      authenticateWithTelegram()
    }
  }, [authenticateWithTelegram])

  const signInWithMagicLink = useCallback((email: string) => {
    setState((prev) => ({ ...prev, email }))
  }, [])

  const verifyMagicLink = useCallback(() => {
    setState((prev) => ({ ...prev, isAuthenticated: true }))
  }, [])

  const signInWithGoogle = useCallback(() => {
    setState((prev) => ({ ...prev, isAuthenticated: true }))
  }, [])

  const signInWithApple = useCallback(() => {
    setState((prev) => ({ ...prev, isAuthenticated: true }))
  }, [])

  const continueAsGuest = useCallback(() => {
    setState((prev) => ({ ...prev, isGuest: true }))
  }, [])

  const signOut = useCallback(() => {
    setState(defaultState)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('sakina-state')
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        email: state.email,
        isGuest: state.isGuest,
        telegramUser: state.telegramUser,
        tgOnboardingComplete: state.tgOnboardingComplete,
        signInWithMagicLink,
        verifyMagicLink,
        signInWithGoogle,
        signInWithApple,
        continueAsGuest,
        signOut,
        authenticateWithTelegram,
        completeTgOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
