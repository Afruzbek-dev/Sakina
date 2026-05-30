export function isTelegramWebApp(): boolean {
  return typeof window !== 'undefined' &&
    window.Telegram?.WebApp?.initData !== undefined &&
    window.Telegram.WebApp.initData.length > 0
}

export function getTelegramUser() {
  if (!isTelegramWebApp()) return null
  return window.Telegram!.WebApp!.initDataUnsafe?.user ?? null
}

export function getTelegramTheme(): 'light' | 'dark' {
  return window.Telegram?.WebApp?.colorScheme ?? 'dark'
}

export const haptic = {
  impact: (style: 'light' | 'medium' | 'heavy' = 'medium') => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(style)
  },
  notification: (type: 'success' | 'warning' | 'error') => {
    window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred(type)
  },
  selection: () => {
    window.Telegram?.WebApp?.HapticFeedback?.selectionChanged()
  },
}

export function expandApp() {
  window.Telegram?.WebApp?.expand()
}

export function setHeaderColor(color: string) {
  window.Telegram?.WebApp?.setHeaderColor(color)
}
