import type { ReactNode } from 'react'

interface MobileFrameProps {
  children: ReactNode
}

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="flex items-center justify-center min-h-dvh bg-neutral-900 p-4">
      <div
        className="relative w-full max-w-[390px] h-[844px] max-h-[95dvh] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10"
        style={{
          background: 'var(--color-charcoal)',
        }}
      >
        {/* Device bezel top notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-b-2xl z-50" />
        {/* Content area */}
        <div className="h-full w-full overflow-hidden flex flex-col scroll-smooth">
          {children}
        </div>
      </div>
    </div>
  )
}
