import { motion } from 'framer-motion'
import { TrendingUp, Calendar } from 'lucide-react'
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

function getHeatmapColor(value: number): string {
  if (value === 5) return 'bg-emerald-glow/80'
  if (value === 4) return 'bg-emerald-glow/50'
  if (value === 3) return 'bg-emerald-glow/25'
  return 'bg-white/10'
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

      {/* Monthly Growth Score */}
      <motion.div
        variants={item}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center"
      >
        <p className="text-xs text-white/40 mb-1">Monthly Growth</p>
        <div className="flex items-center justify-center gap-2">
          <motion.span
            className="text-4xl font-bold text-emerald-glow"
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
        <p className="text-xs text-white/40 mt-1">this month</p>
      </motion.div>

      {/* Consistency Trend Chart */}
      <motion.div
        variants={item}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
      >
        <h3 className="text-sm font-medium text-cream-warm mb-4">Consistency Trends</h3>
        <svg width="100%" viewBox={`0 0 ${chartW} ${chartH + 20}`} className="overflow-visible">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={createAreaPath(consistencyData, chartW, chartH)}
            fill="url(#areaGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.path
            d={createLinePath(consistencyData, chartW, chartH)}
            fill="none"
            stroke="#10B981"
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
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
      >
        <h3 className="text-sm font-medium text-cream-warm mb-3">Prayer Completion</h3>
        <div className="space-y-1.5">
          {heatmapData.map((week, wi) => (
            <div key={wi} className="flex gap-1.5">
              {week.map((val, di) => (
                <div
                  key={di}
                  className={`flex-1 aspect-square rounded-sm ${getHeatmapColor(val)}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <span key={i} className="flex-1 text-center text-[9px] text-white/30">{d}</span>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] text-white/30">Less</span>
          <div className="flex gap-1">
            {['bg-white/10', 'bg-emerald-glow/25', 'bg-emerald-glow/50', 'bg-emerald-glow/80'].map((c, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
            ))}
          </div>
          <span className="text-[10px] text-white/30">More</span>
        </div>
      </motion.div>

      {/* Quran Reading Trends */}
      <motion.div
        variants={item}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
      >
        <h3 className="text-sm font-medium text-cream-warm mb-3">Quran Reading</h3>
        <div className="flex items-end gap-2 h-20">
          {quranDaily.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full rounded-sm bg-gold-soft/60"
                initial={{ height: 0 }}
                animate={{ height: `${(val / 15) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              />
              <span className="text-[9px] text-white/30">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Reflection Frequency */}
      <motion.div
        variants={item}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
      >
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
              <motion.circle
                cx="18" cy="18" r="15.5"
                fill="none" stroke="#10B981" strokeWidth="3"
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
        className="bg-emerald-glow/5 border border-emerald-glow/10 rounded-2xl p-5"
      >
        <p className="text-sm text-cream-warm leading-relaxed">
          You are 40% more consistent than last month. Keep going! 🌱
        </p>
      </motion.div>
    </motion.div>
  )
}
