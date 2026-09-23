'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ChevronDown, PlayCircle, MapPin, Gift } from 'lucide-react'

const SLIDES = ['/wedding/hero-1.png', '/wedding/hero-2.png', '/wedding/hero-3.png', '/wedding/hero-4.png', '/wedding/hero-5.png', '/wedding/hero-6.png', '/wedding/hero-7.png']

export function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="home" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 animate-kenburns">
              <Image
                src={SLIDES[index] || '/placeholder.svg'}
                alt="Kiran and Prasanna"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </AnimatePresence>
        {/* overlays */}
        <div className="absolute inset-0 bg-[#1c1424]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1424]/50 via-transparent to-[#1c1424]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center text-background">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-xl text-pretty font-body text-sm italic leading-relaxed text-background/90 sm:text-base"
        >
          &ldquo;Fear not, for I am with you; Be not dismayed, for I am your God. I will strengthen
          you, Yes, I will help you, I will uphold you with My righteous right hand.&rdquo;
        </motion.p>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-3 text-xs uppercase tracking-luxury text-gold-soft"
        >
          Isaiah 41:10
        </motion.span>

        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 text-xs uppercase tracking-luxury text-background/80"
        >
          Wedding Invitation
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 flex flex-col items-center leading-none"
        >
          <span className="font-script text-6xl text-background sm:text-7xl md:text-8xl">
            Kiran
          </span>
          <span className="my-1 flex items-center gap-3 text-gold-soft">
            <span className="h-px w-10 bg-gold-soft/60" />
            <Heart className="h-5 w-5 fill-current" strokeWidth={1} />
            <span className="h-px w-10 bg-gold-soft/60" />
          </span>
          <span className="font-script text-6xl text-background sm:text-7xl md:text-8xl">
            Prasanna
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 max-w-md text-pretty font-body text-base leading-relaxed text-background/90 sm:text-lg"
        >
          Together with our families, we joyfully invite you to celebrate our Holy Matrimony.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#video"
            className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-xs uppercase tracking-wide-lux text-primary transition hover:bg-gold-soft"
          >
            <PlayCircle className="h-4 w-4" strokeWidth={1.5} /> Watch Invitation
          </a>
          <a
            href="#venue"
            className="inline-flex items-center gap-2 rounded-full border border-background/70 px-6 py-3 text-xs uppercase tracking-wide-lux text-background transition hover:bg-background/10"
          >
            <MapPin className="h-4 w-4" strokeWidth={1.5} /> Venue
          </a>
          <a
            href="#rsvp"
            className="inline-flex items-center gap-2 rounded-full border border-gold-soft/70 bg-gold/20 px-6 py-3 text-xs uppercase tracking-wide-lux text-background transition hover:bg-gold/40"
          >
            RSVP
          </a>
            <a
            href="/gift"
            className="inline-flex items-center gap-2 rounded-full border border-background/70 px-6 py-3 text-xs uppercase tracking-wide-lux text-background transition hover:bg-background/10"
          >
            <Gift className="h-4 w-4" strokeWidth={1.5} /> Gift Registry
          </a>
        </motion.div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-gold-soft' : 'w-2 bg-background/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#couple"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-background/80"
      >
        <ChevronDown className="h-6 w-6 animate-floaty" strokeWidth={1.5} />
      </motion.a>
    </section>
  )
}
