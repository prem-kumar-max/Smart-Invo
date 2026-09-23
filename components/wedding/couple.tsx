'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Reveal, SectionTitle, FloralCorner } from './ui'

function PortraitCard({
  src,
  name,
  role,
  description,
  delay = 0,
}: {
  src: string
  name: string
  role: string
  description: string
  delay?: number
}) {
  return (
    <Reveal delay={delay} className="flex flex-col items-center">
      <div className="group relative w-full max-w-sm">
        <div className="absolute -inset-2 rounded-[1.75rem] border border-gold-soft/40" />
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-xl shadow-primary/10">
          <Image
            src={src || '/placeholder.svg'}
            alt={name}
            fill
            sizes="(max-width: 768px) 90vw, 380px"
            className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
        </div>
      </div>
      <span className="mt-8 text-xs uppercase tracking-luxury text-gold">{role}</span>
      <h3 className="mt-2 font-script text-5xl text-primary sm:text-6xl">{name}</h3>
      <p className="mt-4 max-w-xs text-pretty text-center font-body text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
    </Reveal>
  )
}

export function Couple() {
  return (
    <section id="couple" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <FloralCorner position="top-right" opacity={0.55} size={230} />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Two hearts, one journey" title="The Happy Couple" />

        <div className="mt-16 grid grid-cols-1 items-start gap-14 md:grid-cols-[1fr_auto_1fr] md:gap-8">
          <PortraitCard
            src="/wedding/gallery-8.png"
            role="The Groom"
            name="Kiran"
            description="A man of faith and gentle strength, ready to walk hand in hand into a lifetime of love and devotion."
          />

          <div className="hidden items-center justify-center md:flex md:pt-40">
            <div className="flex flex-col items-center gap-3 text-gold">
              <span className="h-16 w-px bg-gold-soft/50" />
              <Heart className="h-7 w-7 animate-floaty fill-current" strokeWidth={1} />
              <span className="h-16 w-px bg-gold-soft/50" />
            </div>
          </div>

          <PortraitCard
            src="/wedding/bride.png"
            role="The Bride"
            name="Prasanna"
            description="Graceful, warm and full of light — a heart devoted to family, faith and the beautiful days ahead."
            delay={0.15}
          />
        </div>
      </div>
    </section>
  )
}
