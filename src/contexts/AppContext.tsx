import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

const STORAGE_KEY = 'sakina-state'

interface AssessmentData {
  prayerFrequency: string
  quranFrequency: string
  stressLevel: string
  habitConsistency: string
}

interface UserState {
  name: string
  goals: string[]
  onboardingComplete: boolean
  assessment: AssessmentData | null
}

interface ProgressState {
  salah: { completed: number; total: number }
  quran: { versesRead: number; target: number }
  reflection: { done: boolean }
}

interface StreakData {
  current: number
  longest: number
  consistencyScore: number
}

interface PersistedState {
  user: UserState
  progress: ProgressState
  streak: StreakData
}

interface AppContextType {
  user: UserState
  progress: ProgressState
  streak: StreakData
  setGoals: (goals: string[]) => void
  setAssessment: (assessment: AssessmentData) => void
  completeOnboarding: () => void
  updateProgress: (key: keyof ProgressState, value: Partial<ProgressState[keyof ProgressState]>) => void
  incrementStreak: () => void
}

const defaultUser: UserState = {
  name: '',
  goals: [],
  onboardingComplete: false,
  assessment: null,
}

const defaultProgress: ProgressState = {
  salah: { completed: 0, total: 5 },
  quran: { versesRead: 0, target: 10 },
  reflection: { done: false },
}

const defaultStreak: StreakData = {
  current: 0,
  longest: 0,
  consistencyScore: 0,
}

function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw) as PersistedState
    }
  } catch {
    // Ignore parse errors
  }
  return null
}

function saveState(state: PersistedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignore storage errors
  }
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const persisted = loadState()

  const [user, setUser] = useState<UserState>(persisted?.user ?? defaultUser)
  const [progress, setProgress] = useState<ProgressState>(persisted?.progress ?? defaultProgress)
  const [streak, setStreak] = useState<StreakData>(persisted?.streak ?? defaultStreak)

  // Persist state on every change
  useEffect(() => {
    saveState({ user, progress, streak })
  }, [user, progress, streak])

  const setGoals = useCallback((goals: string[]) => {
    setUser((prev) => ({ ...prev, goals }))
  }, [])

  const setAssessment = useCallback((assessment: AssessmentData) => {
    setUser((prev) => ({ ...prev, assessment }))
  }, [])

  const completeOnboarding = useCallback(() => {
    setUser((prev) => ({ ...prev, onboardingComplete: true }))
  }, [])

  const updateProgress = useCallback(
    (key: keyof ProgressState, value: Partial<ProgressState[keyof ProgressState]>) => {
      setProgress((prev) => {
        const updated = { ...prev[key], ...value }

        // Clamp values to valid bounds
        if (key === 'salah' && 'completed' in updated) {
          const salah = updated as ProgressState['salah']
          const total = salah.total || prev.salah.total || 5
          salah.completed = Math.min(total, Math.max(0, salah.completed))
        }
        if (key === 'quran' && 'versesRead' in updated) {
          const quran = updated as ProgressState['quran']
          const target = quran.target || prev.quran.target || 10
          quran.versesRead = Math.min(target, Math.max(0, quran.versesRead))
        }

        return { ...prev, [key]: updated }
      })
    },
    []
  )

  const incrementStreak = useCallback(() => {
    setStreak((prev) => {
      const newCurrent = prev.current + 1
      return {
        current: newCurrent,
        longest: Math.max(newCurrent, prev.longest),
        consistencyScore: Math.min(100, prev.consistencyScore + 5),
      }
    })
  }, [])

  return (
    <AppContext.Provider
      value={{ user, progress, streak, setGoals, setAssessment, completeOnboarding, updateProgress, incrementStreak }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
