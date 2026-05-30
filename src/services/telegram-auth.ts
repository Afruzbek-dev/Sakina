export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  language_code?: string
}

export interface TelegramAuthResult {
  valid: boolean
  user: TelegramUser
  profile: {
    telegram_id: number
    first_name: string
    city?: string
    goals?: string[]
    onboarding_completed: boolean
  } | null
}

export async function validateTelegramAuth(_initData: string): Promise<TelegramAuthResult> {
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user

  if (!user) {
    return { valid: false, user: {} as TelegramUser, profile: null }
  }

  let profile = null
  try {
    const stored = localStorage.getItem(`sakina-tg-profile-${user.id}`)
    profile = stored ? JSON.parse(stored) : null
  } catch {
    // Ignore corrupt localStorage data
  }

  return {
    valid: true,
    user: user as TelegramUser,
    profile: profile || {
      telegram_id: user.id,
      first_name: user.first_name,
      onboarding_completed: false,
    },
  }
}

export function saveTelegramProfile(telegramId: number, data: Record<string, unknown>) {
  const key = `sakina-tg-profile-${telegramId}`
  const existing = localStorage.getItem(key)
  const current = existing ? JSON.parse(existing) : {}
  const updated = { ...current, telegram_id: telegramId, ...data }
  localStorage.setItem(key, JSON.stringify(updated))
}
