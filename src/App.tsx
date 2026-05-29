import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { AppProvider, useAppContext } from './contexts/AppContext'
import { ThemeProvider } from './contexts/ThemeContext'
import MobileFrame from './components/layout/MobileFrame'
import AppShell from './components/layout/AppShell'
import OnboardingLayout from './pages/onboarding/OnboardingLayout'
import OnboardingStep1 from './pages/onboarding/Step1'
import OnboardingStep2 from './pages/onboarding/Step2'
import OnboardingStep3 from './pages/onboarding/Step3'
import OnboardingStep4 from './pages/onboarding/Step4'
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
  const { user } = useAppContext()

  if (!user.onboardingComplete) {
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
        <AppProvider>
          <BrowserRouter>
            <MobileFrame>
              <AppRoutes />
            </MobileFrame>
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}
