'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, FloralCorner } from './ui'

// Friday, 2 October 2026, 10:45 AM IST (UTC+5:30).
const TARGET = new Date('2026-10-02T10:45:00+05:30').getTime()

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now())
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { days, hours, minutes, seconds }
}

function Unit({ value, label }: { value: number | null; label: string }) {
  const display = value === null ? '--' : String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-background shadow-sm sm:h-28 sm:w-28">
        <motion.span
          key={display}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display text-3xl text-primary sm:text-5xl"
        >
          {display}
        </motion.span>
      </div>
      <span className="mt-3 text-[10px] uppercase tracking-luxury text-muted-foreground sm:text-xs">
        {label}
      </span>
    </div>
  )
}

type Remaining = { days: number; hours: number; minutes: number; seconds: number }

export function Countdown() {
  // Start null so the server and first client render match, avoiding hydration mismatch.
  const [time, setTime] = useState<Remaining | null>(null)

  useEffect(() => {
    setTime(getRemaining())
    const id = setInterval(() => setTime(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <FloralCorner position="top-left" opacity={0.5} size={200} />
      <FloralCorner position="bottom-right" opacity={0.5} size={200} />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <span className="text-xs uppercase tracking-luxury text-gold">Save the Date</span>
          <h2 className="mt-3 text-3xl font-medium text-primary sm:text-4xl">Wedding Begins In</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex items-start justify-center gap-3 sm:gap-6">
            <Unit value={time?.days ?? null} label="Days" />
            <Unit value={time?.hours ?? null} label="Hours" />
            <Unit value={time?.minutes ?? null} label="Minutes" />
            <Unit value={time?.seconds ?? null} label="Seconds" />
          </div>
          <p className="mt-10 font-body text-lg italic text-muted-foreground">
            Friday, 2 October 2026 &middot; 10:45 AM IST onwards
          </p>
        </Reveal>
      </div>
    </section>
  )
}
