import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'

function SkeletonBase({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <motion.div
      className={`relative overflow-hidden bg-white/5 ${className ?? ''}`}
      style={style}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
    >
      <div className="absolute inset-0 skeleton-shimmer" />
    </motion.div>
  )
}

export function SkeletonCard() {
  return <SkeletonBase className="rounded-2xl h-28 w-full" />
}

export function SkeletonCircle({ size = 48 }: { size?: number }) {
  return (
    <SkeletonBase
      className="rounded-full flex-shrink-0"
      style={{ width: size, height: size }}
    />
  )
}

export function SkeletonLine({ width = '100%' }: { width?: string }) {
  return (
    <SkeletonBase
      className="rounded h-3"
      style={{ width }}
    />
  )
}

export function HomeSkeleton() {
  return (
    <motion.div
      className="pb-24 pt-12 px-5 space-y-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="space-y-2">
        <SkeletonLine width="60%" />
        <SkeletonLine width="40%" />
      </div>
      <div className="flex justify-center py-2">
        <SkeletonCircle size={140} />
      </div>
      <SkeletonCard />
      <SkeletonCard />
    </motion.div>
  )
}
