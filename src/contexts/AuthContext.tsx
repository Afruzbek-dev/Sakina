import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

const STORAGE_KEY = 'niya-auth'

interface AuthState {
  isAuthenticated: boolean
  email: string
  isGuest: boolean
}

interface AuthContextType {
  isAuthenticated: boolean
  email: string
  isGuest: boolean
  signInWithMagicLink: (email: string) => void
  verifyMagicLink: () => void
  signInWithGoogle: () => void
  signInWithApple: () => void
  continueAsGuest: () => void
  signOut: () => void
}

const defaultState: AuthState = {
  isAuthenticated: false,
  email: '',
  isGuest: false,
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
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        email: state.email,
        isGuest: state.isGuest,
        signInWithMagicLink,
        verifyMagicLink,
        signInWithGoogle,
        signInWithApple,
        continueAsGuest,
        signOut,
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
