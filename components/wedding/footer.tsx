'use client'

import { Heart } from 'lucide-react'
import { Reveal, FloralDivider } from './ui'
import Image from 'next/image' // <-- this import is required
import logo from '@/public/wedding/holywood-logo.png'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary py-20 text-center text-background">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal>
          <FloralDivider className="[&_span]:bg-gold-soft/40" />
          <p className="mt-8 text-xs uppercase tracking-luxury text-gold-soft">With Love</p>
          <h2 className="mt-4 flex flex-col items-center leading-none">
            <span className="font-script text-5xl text-background sm:text-6xl">Kiran</span>
            <span className="my-1 flex items-center gap-3 text-gold-soft">
              <span className="h-px w-8 bg-gold-soft/60" />
              <Heart className="h-4 w-4 fill-current" strokeWidth={1} />
              <span className="h-px w-8 bg-gold-soft/60" />
            </span>
            <span className="font-script text-5xl text-background sm:text-6xl">Prasanna</span>
          </h2>
          <p className="mx-auto mt-8 max-w-md text-pretty font-body text-lg leading-relaxed text-background/85">
            Thank you for being part of our special day. Your presence and prayers mean the world to
            us.
          </p>
          <p className="mt-10 font-body text-sm text-background/60">
            2 October 2026 &middot; Vijayawada
          </p>
           {/* Logo + Credit with link */}
          <div className="mt-12 flex flex-col items-center gap-3">
            <a
              href="https://www.youtube.com/channel/UC1YjTjqLkYTNNx5o9UgeWlw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2"
            >
              <Image
                src={logo}
                alt="Holywood Fx Logo"
                width={40}
                height={40}
                className="rounded-md shadow-md"
              />
              <p className="text-xs font-body text-background/50">
                Made by <span className="font-semibold text-gold-soft">Holywood Fx</span>
              </p>
            </a>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
