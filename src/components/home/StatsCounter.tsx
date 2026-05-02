'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Fuel, IndianRupee, TrendingUp } from 'lucide-react'

const STATS = [
  { value: 36, suffix: '+', label: 'Districts Covered', icon: MapPin },
  { value: 480, suffix: '+', label: 'Pumps Target', icon: Fuel },
  { value: 3.5, prefix: '₹', suffix: '/L', label: 'Per Litre Commission', icon: IndianRupee, decimals: 1 },
  { value: 10, suffix: '%', label: 'Pump Sale Incentive', icon: TrendingUp },
]

function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 1400
    let raf = 0
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(to * eased)
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return <span ref={ref}>{val.toFixed(decimals)}</span>
}

export function StatsCounter() {
  return (
    <section className="border-y border-navy-100 bg-navy-50/50 py-12">
      <div className="container-default">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-gold-100 text-gold-700">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="font-display text-3xl font-bold text-navy-900 md:text-4xl">
                  {s.prefix}
                  <Counter to={s.value} decimals={s.decimals ?? 0} />
                  {s.suffix}
                </p>
                <p className="mt-1 text-sm text-navy-600">{s.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
