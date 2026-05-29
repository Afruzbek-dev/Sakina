import { motion } from 'framer-motion'
import { TrendingUp, Calendar, Star } from 'lucide-react'
import { container, item } from '../lib/motion-variants'

// Mock data
const consistencyData = [65, 70, 68, 75, 80, 72, 78, 82, 85, 80, 88, 85, 90, 87, 92, 88, 90, 93, 95, 91, 88, 90, 92, 95, 93, 90, 92, 95, 97, 94]
const quranDaily = [5, 12, 8, 10, 15, 7, 11]
const heatmapData = [
  [5, 4, 5, 3, 5, 4, 5],
  [4, 5, 3, 5, 4, 5, 4],
  [5, 5, 4, 4, 5, 3, 5],
  [3, 4, 5, 5, 4, 5, 4],
  [5, 4, 4, 5, 5, 4, 5],
]

const prayerLabels = ['F', 'D', 'A', 'M', 'I']

// Activity ring data (percentage complete)
const activityRings = [
  { prayer: 'Fajr', pct: 100, color: '#2DD4BF' },
  { prayer: 'Dhuhr', pct: 100, color: '#22D3C5' },
  { prayer: 'Asr', pct: 80, color: '#34D399' },
  { prayer: 'Maghrib', pct: 60, color: '#5EEAD4' },
  { prayer: 'Isha', pct: 40, color: '#14B8A6' },
]

function getHeatmapColor(value: number): string {
  if (value === 5) return 'bg-primary/80'
  if (value === 4) return 'bg-primary/60'
  if (value === 3) return 'bg-primary/40'
  if (value === 2) return 'bg-primary/20'
  return 'bg-white/5'
}

function createAreaPath(data: number[], width: number, height: number): string {
  const max = Math.max(...data)
  const min = Math.min(...data) - 10
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((val - min) / (max - min)) * height
    return { x, y }
  })

  let path = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) / 3
    const cp1y = points[i - 1].y
    const cp2x = points[i].x - (points[i].x - points[i - 1].x) / 3
    const cp2y = points[i].y
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i].x} ${points[i].y}`
  }
  path += ` L ${width} ${height} L 0 ${height} Z`
  return path
}

function createLinePath(data: number[], width: number, height: number): string {
  const max = Math.max(...data)
  const min = Math.min(...data) - 10
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((val - min) / (max - min)) * height
    return { x, y }
  })

  let path = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) / 3
    const cp1y = points[i - 1].y
    const cp2x = points[i].x - (points[i].x - points[i - 1].x) / 3
    const cp2y = points[i].y
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i].x} ${points[i].y}`
  }
  return path
}

function ActivityRings() {
  const centerX = 60
  const centerY = 60
  const strokeWidth = 4
  const gap = 5
  const baseRadius = 20

  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {activityRings.map((ring, i) => {
          const radius = baseRadius + i * (strokeWidth + gap)
          const circumference = 2 * Math.PI * radius
          const filled = circumference * (ring.pct / 100)
          return (
            <g key={ring.prayer}>
              <circle
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={strokeWidth}
              />
              <motion.circle
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke={ring.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - filled }}
                transition={{ duration: 1.2, delay: i * 0.15 }}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px' }}
              />
            </g>
          )
        })}
      </svg>
      <div className="flex items-center gap-3 mt-3 flex-wrap justify-center">
        {activityRings.map((ring) => (
          <div key={ring.prayer} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ring.color }} />
            <span className="text-[10px] text-white/50">{ring.prayer}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CircularScoreBadge({ score }: { score: number }) {
  const pct = score / 100
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(#2DD4BF ${pct * 360}deg, rgba(255,255,255,0.05) ${pct * 360}deg 360deg)`,
          padding: '4px',
        }}
      >
        <div className="w-full h-full rounded-full bg-surface flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{score}</span>
        </div>
      </div>
      <span className="text-[13px] text-text-secondary mt-1.5">This Week</span>
    </div>
  )
}

export default function AnalyticsPage() {
  const chartW = 280
  const chartH = 100

  return (
    <motion.div
      className="pb-24 pt-12 px-5 space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cream-warm">Analytics</h1>
          <p className="text-sm text-white/50 mt-0.5">Your Growth</p>
        </div>
        <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg">
          <Calendar className="w-3.5 h-3.5 text-white/40" />
          <span className="text-xs text-white/60">January 2025</span>
        </div>
      </motion.div>

      {/* Monthly Growth Score with Circular Badge */}
      <motion.div
        variants={item}
        className="bg-surface border border-white/10 rounded-3xl p-5 min-h-[160px] flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Decorative sparkles */}
        <Star className="absolute top-4 right-6 w-3 h-3 text-gold-soft opacity-30" />
        <Star className="absolute top-8 left-8 w-2.5 h-2.5 text-gold-soft opacity-20" />
        <Star className="absolute bottom-6 right-10 w-2 h-2 text-gold-soft opacity-25" />

        <p className="text-xs text-white/40 mb-3">Monthly Growth</p>
        <div className="flex items-center gap-4">
          <CircularScoreBadge score={92} />
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <motion.span
                className="text-5xl font-bold text-emerald-glow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                +12%
              </motion.span>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <TrendingUp className="w-5 h-5 text-emerald-glow" />
              </motion.div>
            </div>
            {/* Comparison badge */}
            <span className="bg-success/10 text-success rounded-full px-2.5 py-0.5 text-[11px] font-medium">
              +5% vs last month
            </span>
          </div>
        </div>
        <p className="text-xs text-white/40 mt-2">this month</p>
      </motion.div>

      {/* Activity Rings - Apple Watch Style */}
      <motion.div
        variants={item}
        className="bg-surface border border-white/10 rounded-3xl p-5 min-h-[160px]"
      >
        <h3 className="text-sm font-medium text-cream-warm mb-4">Prayer Activity</h3>
        <ActivityRings />
      </motion.div>

      {/* Consistency Trend Chart */}
      <motion.div
        variants={item}
        className="bg-surface border border-white/10 rounded-3xl p-5 min-h-[160px]"
      >
        <h3 className="text-sm font-medium text-cream-warm mb-4">Consistency Trends</h3>
        <svg width="100%" viewBox={`0 0 ${chartW} ${chartH + 20}`} className="overflow-visible">
          <defs>
            <linearGradient id="consistencyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={createAreaPath(consistencyData, chartW, chartH)}
            fill="url(#consistencyGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.path
            d={createLinePath(consistencyData, chartW, chartH)}
            fill="none"
            stroke="#2DD4BF"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />
          {/* X-axis labels */}
          <text x="0" y={chartH + 16} fill="rgba(255,255,255,0.3)" fontSize="9">Week 1</text>
          <text x="90" y={chartH + 16} fill="rgba(255,255,255,0.3)" fontSize="9">Week 2</text>
          <text x="180" y={chartH + 16} fill="rgba(255,255,255,0.3)" fontSize="9">Week 3</text>
          <text x="250" y={chartH + 16} fill="rgba(255,255,255,0.3)" fontSize="9">Week 4</text>
        </svg>
      </motion.div>

      {/* Prayer Heatmap */}
      <motion.div
        variants={item}
        className="bg-surface border border-white/10 rounded-3xl p-5 min-h-[160px]"
      >
        <h3 className="text-sm font-medium text-cream-warm mb-3">Prayer Completion</h3>
        <div className="space-y-0" style={{ gap: '8px', display: 'flex', flexDirection: 'column' }}>
          {heatmapData.map((week, wi) => (
            <div key={wi} className="flex items-center gap-2">
              <span className="text-[10px] text-white/40 w-3 shrink-0">{prayerLabels[wi]}</span>
              <div className="flex gap-2 flex-1">
                {week.map((val, di) => (
                  <div
                    key={di}
                    className={`w-[42px] h-[42px] rounded-full border-2 border-transparent ${getHeatmapColor(val)} flex items-center justify-center`}
                    style={{ borderWidth: '4px', borderColor: val >= 4 ? 'rgba(45,212,191,0.3)' : 'rgba(255,255,255,0.05)' }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-[10px] text-white/30">Less</span>
          <div className="flex gap-1">
            {['bg-white/5', 'bg-primary/20', 'bg-primary/40', 'bg-primary/60', 'bg-primary/80'].map((c, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
            ))}
          </div>
          <span className="text-[10px] text-white/30">More</span>
        </div>
      </motion.div>

      {/* Quran Reading Trends */}
      <motion.div
        variants={item}
        className="bg-surface border border-white/10 rounded-3xl p-5 min-h-[160px]"
      >
        <h3 className="text-sm font-medium text-cream-warm mb-3">Quran Reading</h3>
        <svg width="100%" viewBox={`0 0 ${chartW} ${chartH + 20}`} className="overflow-visible">
          <defs>
            <linearGradient id="quranGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F4C95D" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F4C95D" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={createAreaPath(quranDaily, chartW, chartH)}
            fill="url(#quranGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.path
            d={createLinePath(quranDaily, chartW, chartH)}
            fill="none"
            stroke="#F4C95D"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />
          {/* X-axis labels */}
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <text key={i} x={(i / 6) * chartW} y={chartH + 16} fill="rgba(255,255,255,0.3)" fontSize="9">{d}</text>
          ))}
        </svg>
      </motion.div>

      {/* Reflection Frequency */}
      <motion.div
        variants={item}
        className="bg-surface border border-white/10 rounded-3xl p-5 min-h-[160px]"
      >
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
              <motion.circle
                cx="18" cy="18" r="15.5"
                fill="none" stroke="#2DD4BF" strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="97.4"
                initial={{ strokeDashoffset: 97.4 }}
                animate={{ strokeDashoffset: 97.4 * (1 - 18 / 30) }}
                transition={{ duration: 1 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-cream-warm">60%</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-cream-warm">Reflection</h3>
            <p className="text-xs text-white/40">18/30 days this month</p>
          </div>
        </div>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        variants={item}
        className="bg-primary/5 border border-primary/10 rounded-3xl p-5"
      >
        <p className="text-sm text-cream-warm leading-relaxed">
          You are 40% more consistent than last month. Keep going!
        </p>
      </motion.div>
    </motion.div>
  )
}
