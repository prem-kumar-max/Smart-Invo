'use client'

import { MapPin, Navigation, ExternalLink } from 'lucide-react'
import { Reveal, SectionTitle } from './ui'

// Exact venue coordinates from the shared Google Maps place link.
const COORDINATES = '16.5416375,80.6404531'
const MAP_EMBED = `https://www.google.com/maps?q=${COORDINATES}&z=17&output=embed`
const MAP_LINK = 'https://www.google.com/maps/place/Shadikhana+function+hall/@16.5416375,80.6404531,630m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a35e5eecfd89b77:0x110145e234b535fb!8m2!3d16.5416375!4d80.6404531!16s%2Fg%2F11rn0gq3th'
const DIRECTIONS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${COORDINATES}`

export function Venue() {
  return (
    <section id="venue" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Where the celebration begins" title="The Venue" />

        <Reveal delay={0.1} className="mt-14">
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-background shadow-xl shadow-primary/10 lg:grid-cols-2">
            {/* Info */}
            <div className="flex flex-col justify-center px-8 py-12 text-center sm:px-14 lg:text-left">
              <span className="flex h-14 w-14 items-center justify-center self-center rounded-full border border-gold-soft/60 text-primary lg:self-start">
                <MapPin className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-script text-4xl text-primary sm:text-5xl">
                Shadikhana Function Hall
              </h3>
              <p className="mt-4 font-body text-lg leading-relaxed text-muted-foreground">
                Ajit Singh Nagar, Vijayawada
                <br />
                Andhra Pradesh, India
              </p>
              <p className="mt-6 font-body text-lg italic text-muted-foreground">
                Friday, 2 October 2026 &middot; 10:45 AM onwards
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs uppercase tracking-wide-lux text-primary-foreground transition hover:opacity-90"
                >
                  <ExternalLink className="h-4 w-4" strokeWidth={1.5} /> Open Maps
                </a>
                <a
                  href={DIRECTIONS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-xs uppercase tracking-wide-lux text-primary transition hover:bg-primary/5"
                >
                  <Navigation className="h-4 w-4" strokeWidth={1.5} /> Get Directions
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="relative min-h-[320px] w-full border-t border-border lg:border-l lg:border-t-0">
              <iframe
                title="Map to Shadikhana Function Hall, Ajit Singh Nagar, Vijayawada"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[0.15]"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
