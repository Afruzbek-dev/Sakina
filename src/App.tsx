import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { AppProvider, useAppContext } from './contexts/AppContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import MobileFrame from './components/layout/MobileFrame'
import AppShell from './components/layout/AppShell'
import OnboardingLayout from './pages/onboarding/OnboardingLayout'
import OnboardingStep1 from './pages/onboarding/Step1'
import OnboardingStep2 from './pages/onboarding/Step2'
import OnboardingStep3 from './pages/onboarding/Step3'
import OnboardingStep4 from './pages/onboarding/Step4'
import TgOnboardingLayout from './pages/telegram-onboarding/TgOnboardingLayout'
import TgStep1Location from './pages/telegram-onboarding/TgStep1Location'
import TgStep2Goals from './pages/telegram-onboarding/TgStep2Goals'
import WelcomePage from './pages/auth/WelcomePage'
import SignInPage from './pages/auth/SignInPage'
import MagicLinkSentPage from './pages/auth/MagicLinkSentPage'
import HomePage from './pages/Home'
import PrayerPage from './pages/PrayerPage'
import QuranPage from './pages/QuranPage'
import CoachPage from './pages/CoachPage'
import ChallengesPage from './pages/ChallengesPage'
import CommunityPage from './pages/CommunityPage'
import AnalyticsPage from './pages/AnalyticsPage'
import ProfilePage from './pages/ProfilePage'
import PremiumPage from './pages/PremiumPage'

function AppRoutes() {
  const { isAuthenticated, isGuest, telegramUser, tgOnboardingComplete } = useAuth()
  const { user } = useAppContext()

  // Telegram user needs TG-specific onboarding
  if (telegramUser && isAuthenticated && !tgOnboardingComplete) {
    return (
      <Routes>
        <Route path="/tg-onboarding" element={<TgOnboardingLayout />}>
          <Route index element={<TgStep1Location />} />
          <Route path="goals" element={<TgStep2Goals />} />
        </Route>
        <Route path="*" element={<Navigate to="/tg-onboarding" replace />} />
      </Routes>
    )
  }

  if (!isAuthenticated && !isGuest) {
    return (
      <Routes>
        <Route path="/auth" element={<WelcomePage />} />
        <Route path="/auth/signin" element={<SignInPage />} />
        <Route path="/auth/sent" element={<MagicLinkSentPage />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    )
  }

  // If Telegram user completed TG onboarding, skip generic onboarding
  if (!user.onboardingComplete && !(telegramUser && tgOnboardingComplete)) {
    return (
      <Routes>
        <Route path="/onboarding" element={<OnboardingLayout />}>
          <Route index element={<OnboardingStep1 />} />
          <Route path="step-2" element={<OnboardingStep2 />} />
          <Route path="step-3" element={<OnboardingStep3 />} />
          <Route path="step-4" element={<OnboardingStep4 />} />
        </Route>
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/prayer" element={<PrayerPage />} />
        <Route path="/quran" element={<QuranPage />} />
        <Route path="/coach" element={<CoachPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/premium" element={<PremiumPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <BrowserRouter>
              <MobileFrame>
                <AppRoutes />
              </MobileFrame>
            </BrowserRouter>
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}
