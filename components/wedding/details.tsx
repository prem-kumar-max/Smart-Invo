'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, Clock, MapPin, Utensils, BookOpen } from 'lucide-react'
import { Reveal, SectionTitle, FloralDivider, FloralCorner } from './ui'
import styles from './details.module.css'

const DETAILS = [
  {
    icon: CalendarDays,
    label: 'The Date',
    lines: ['Friday', '2 October 2026'],
  },
  {
    icon: Clock,
    label: 'The Time',
    lines: ['10:45 AM', 'Onwards'],
  },
  {
    icon: MapPin,
    label: 'The Venue',
    lines: ['Shadikhana Function Hall', 'Ajit Singh Nagar, Vijayawada'],
  },
  {
    icon: Utensils,
    label: 'Reception',
    lines: ['Followed by', 'Dinner'],
  },
]

const PARENTS = [
  {
    label: "Bride's Parents",
    image: '/wedding/bride-parents.webp',
    alt: "Family portrait shared by the bride's parents",
    father: 'Mr. Komire Vara Prasad',
    mother: 'Mrs. Sarojini Baby',
  },
  {
    label: "With the blessings of our beloved grandparents",
    image: '/wedding/Grand parents.png',
    alt: "With the blessings of our beloved grandparents",
    father: 'Late Sri Vemula Kotaiah',
    mother: 'Smt. Vemula Mariyamma (Mallamma)',
  },
]

export function Details() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="details" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <FloralCorner position="top-left" opacity={0.5} size={220} />
      <FloralCorner position="bottom-right" opacity={0.5} size={220} />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Join us as we celebrate" title="Wedding Details" />

        {/* Detail cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DETAILS.map((d, i) => {
            const Icon = d.icon
            return (
              <Reveal
                key={d.label}
                delay={i * 0.08}
                className="flex flex-col items-center rounded-2xl border border-border bg-cream px-6 py-10 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-soft/60 text-primary">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <span className="mt-5 text-xs uppercase tracking-luxury text-gold">{d.label}</span>
                {d.lines.map((line, idx) => (
                  <p
                    key={line}
                    className={
                      idx === 0
                        ? 'mt-2 font-display text-xl text-primary'
                        : 'font-body text-lg text-muted-foreground'
                    }
                  >
                    {line}
                  </p>
                ))}
              </Reveal>
            )
          })}
        </div>

        {/* Ceremony */}
        <Reveal className="mx-auto mt-20 max-w-3xl">
          <div className="rounded-3xl border border-border bg-cream px-8 py-12 text-center shadow-sm sm:px-14">
            <span className="text-xs uppercase tracking-luxury text-gold">The Ceremony</span>
            <h3 className="mt-3 font-script text-4xl text-primary sm:text-5xl">Holy Matrimony</h3>
            <FloralDivider className="mt-6" />

            <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div className="flex flex-col items-center">
                <BookOpen className="h-6 w-6 text-primary" strokeWidth={1.5} />
                <p className="mt-3 text-xs uppercase tracking-wide-lux text-muted-foreground">
                  To be Solemnized by
                </p>
                <p className="mt-2 font-display text-xl text-primary">Pastors</p>
                <p className="font-body text-base text-muted-foreground">
                  The holy wedding ceremony will be conducted
                  by anointed servants of God.
                </p>
              </div>

            </div>
          </div>
        </Reveal>

        {/* Parents */}
        <div className="mx-auto mt-20 max-w-5xl">
          <Reveal>
            <SectionTitle eyebrow="Our beloved parents" title="With Their Blessings" />
            <p className="mx-auto mt-5 max-w-md text-center font-body text-lg italic leading-relaxed text-muted-foreground">
              Their love brought us here. Their blessings go with us, always.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
            {PARENTS.map((parents, index) => (
              <motion.div
                key={parents.label}
                initial={reducedMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
                variants={{
                  hidden: { opacity: 0, y: 36, scale: 0.97 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : index * 0.16, ease: [0.22, 1, 0.36, 1] }}
                className={`${styles.entrance} h-full`}
              >
                <figure className={`${styles.card} relative m-0 h-full overflow-hidden rounded-[2rem] border border-gold-soft/60 bg-gradient-to-b from-cream to-background p-3 shadow-[0_16px_45px_-24px_rgba(91,62,126,0.3)] sm:p-4`}>
                  <div className={`${styles.photoFrame} relative overflow-hidden rounded-[1.3rem] bg-cream`}>
                    <motion.div
                      className={styles.photoEntrance}
                      variants={{ hidden: { scale: 1.08 }, visible: { scale: 1 } }}
                      transition={{ duration: reducedMotion ? 0 : 1.25, delay: reducedMotion ? 0 : index * 0.16, ease: [0.22, 1, 0.36, 1] }}
                    >
                    <Image
                      src={parents.image}
                      alt={parents.alt}
                      width={960}
                      height={640}
                      sizes="(max-width: 767px) calc(100vw - 80px), (max-width: 1152px) 44vw, 472px"
                      loading="lazy"
                      className={`${styles.photo} block h-auto w-full`}
                    />
                    </motion.div>
                    <div aria-hidden="true" className={`${styles.photoOutline} pointer-events-none absolute inset-2 rounded-[1rem] border border-white/40`} />
                  </div>
                  <motion.figcaption
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : 0.2 + index * 0.16 }}
                    className={`${styles.caption} relative px-3 pb-7 pt-8 text-center sm:px-5`}
                  >
                    <span className="inline-block rounded-full border border-gold-soft/60 bg-gold-soft/10 px-5 py-2 text-[10px] uppercase tracking-luxury text-primary/80">
                      {parents.label}
                    </span>
                    <h3 className="mt-6 font-display text-xl font-normal leading-relaxed text-primary sm:text-2xl">
                      {parents.father}
                      <span aria-hidden="true" className="my-1 block font-script text-2xl text-gold">&amp;</span>
                      <span className="sr-only"> and </span>
                      <span className="block">{parents.mother}</span>
                    </h3>
                    <FloralDivider className="mt-6 opacity-70" />
                  </motion.figcaption>
                </figure>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
