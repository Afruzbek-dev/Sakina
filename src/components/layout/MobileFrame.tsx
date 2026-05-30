import { useEffect, type ReactNode } from 'react'
import AmbientBackground from '../shared/AmbientBackground'
import { useTheme } from '../../contexts/ThemeContext'
import { isTelegramWebApp, expandApp, setHeaderColor } from '../../lib/telegram'

interface MobileFrameProps {
  children: ReactNode
}

export default function MobileFrame({ children }: MobileFrameProps) {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  useEffect(() => {
    if (isTelegramWebApp()) {
      expandApp()
      setHeaderColor('#0A7E6E')
    }
  }, [])

  return (
    <div className={`flex items-center justify-center min-h-dvh p-4 ${isLight ? 'bg-neutral-100' : 'bg-neutral-900'}`}>
      <div
        className={`relative w-[390px] max-w-[430px] h-[844px] max-h-[95dvh] rounded-[3rem] overflow-hidden ${isLight ? 'ring-1 ring-black/10' : 'ring-1 ring-white/5'}`}
        style={{
          background: 'var(--bg)',
          boxShadow: isLight
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05)'
            : '0 0 40px rgba(45, 212, 191, 0.08), 0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Dynamic Island notch */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[100px] h-[24px] bg-black rounded-full z-50 flex items-center justify-end pr-2">
          <div className="w-[8px] h-[8px] rounded-full bg-neutral-800 ring-1 ring-neutral-700" />
        </div>
        {/* Ambient background - dark mode only */}
        {!isLight && <AmbientBackground />}
        {/* Content area */}
        <div className="relative h-full w-full overflow-hidden flex flex-col scroll-smooth z-10">
          {children}
        </div>
      </div>
    </div>
  )
}
