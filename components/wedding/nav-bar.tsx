'use client'

import { useEffect, useState } from 'react'
import { Heart, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Couple', href: '#couple' },
  { label: 'Details', href: '#details' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Video', href: '#video' },
  { label: 'Venue', href: '#venue' },
  { label: 'Gift', href: '/gift' },
  { label: 'RSVP', href: '#rsvp' },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-500',
        scrolled
          ? 'border-b border-border/70 bg-background/80 py-3 backdrop-blur-md'
          : 'border-b border-transparent py-5',
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a
          href="#home"
          className={cn(
            'flex items-center gap-2 text-lg tracking-wide-lux transition-colors sm:text-xl',
            scrolled ? 'text-primary' : 'text-background',
          )}
        >
          <span className="font-script text-2xl leading-none sm:text-3xl">Kiran</span>
          <Heart className="h-4 w-4 fill-current text-gold" strokeWidth={1} />
          <span className="font-script text-2xl leading-none sm:text-3xl">Prasanna</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  'text-xs uppercase tracking-wide-lux transition-colors hover:text-gold',
                  scrolled ? 'text-foreground/80' : 'text-background/90',
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className={cn(
            'lg:hidden',
            scrolled || open ? 'text-primary' : 'text-background',
          )}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden bg-background/95 backdrop-blur-md transition-all duration-500 lg:hidden',
          open ? 'max-h-96 border-t border-border' : 'max-h-0',
        )}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm uppercase tracking-wide-lux text-foreground/80 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
