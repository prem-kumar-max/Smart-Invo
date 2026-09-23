'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionTitle, FloralCorner } from './ui'

const PHOTOS = [
  '/wedding/gallery-1.png',
  '/wedding/gallery-2.png',
  '/wedding/gallery-3.png',
  '/wedding/gallery-7.png',
  '/wedding/gallery-4.png',
  '/wedding/gallery-6.png',
  '/wedding/gallery-8.png',
  '/wedding/gallery-5.png',
  '/wedding/gallery-9.png',
  '/wedding/gallery-10.png',
]

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    [],
  )
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % PHOTOS.length)),
    [],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close, prev, next])

  return (
    <section id="gallery" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <FloralCorner position="top-left" opacity={0.5} size={220} />
      <FloralCorner position="bottom-right" opacity={0.5} size={220} />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Cherished moments" title="Our Gallery" />

        <div className="mt-14 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {PHOTOS.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
              className="group relative block w-full overflow-hidden rounded-2xl border border-border shadow-sm"
              aria-label={`Open photo ${i + 1}`}
            >
              <Image
                src={src || '/placeholder.svg'}
                alt={`Kiran and Prasanna — photo ${i + 1}`}
                width={600}
                height={800}
                sizes="(max-width: 768px) 45vw, 30vw"
                className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/15" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#150f1c]/92 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 text-background/80 transition hover:text-background"
            >
              <X className="h-8 w-8" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous photo"
              className="absolute left-3 text-background/80 transition hover:text-background sm:left-8"
            >
              <ChevronLeft className="h-10 w-10" strokeWidth={1.2} />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative max-h-[82vh] w-auto max-w-[88vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={PHOTOS[active] || '/placeholder.svg'}
                alt={`Kiran and Prasanna — photo ${active + 1}`}
                width={1200}
                height={1600}
                className="max-h-[82vh] w-auto rounded-2xl object-contain"
              />
            </motion.div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next photo"
              className="absolute right-3 text-background/80 transition hover:text-background sm:right-8"
            >
              <ChevronRight className="h-10 w-10" strokeWidth={1.2} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
