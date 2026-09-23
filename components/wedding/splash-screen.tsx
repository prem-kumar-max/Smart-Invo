'use client'

import { useCallback, useEffect, useState } from 'react'
import styles from './splash-screen.module.css'

export function SplashScreen() {
  const [phase, setPhase] = useState<'opening' | 'leaving' | 'hidden'>('opening')
  const dismiss = useCallback(() => {
    setPhase((current) => current === 'opening' ? 'leaving' : current)
  }, [])

  useEffect(() => {
    if (phase === 'hidden') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(
      () => phase === 'opening' ? dismiss() : setPhase('hidden'),
      phase === 'opening' ? (reduced ? 1000 : 3400) : (reduced ? 150 : 900),
    )
    return () => window.clearTimeout(timer)
  }, [phase, dismiss])

  useEffect(() => {
    if (phase === 'hidden') return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [phase, dismiss])

  if (phase === 'hidden') return null

  return (
    <div className={styles.splash} data-leaving={phase === 'leaving'}>
      <div className={`${styles.panel} ${styles.leftPanel}`} aria-hidden="true" />
      <div className={`${styles.panel} ${styles.rightPanel}`} aria-hidden="true" />
      <div className={styles.frame} aria-hidden="true" />
      <p className={styles.topline}>A celebration of love &amp; grace</p>

      <div className={styles.invitation}>
        <svg className={styles.arch} viewBox="0 0 440 580" fill="none" aria-hidden="true">
          <path className={styles.archLine} pathLength="1" d="M38 562V226a182 182 0 0 1 364 0v336" />
          <path className={styles.innerArch} pathLength="1" d="M49 555V226a171 171 0 0 1 342 0v329" />
          {/* Fixed geometry keeps the server and client renders identical. */}
          {[false, true].map((mirrored) => (
            <g key={String(mirrored)} transform={mirrored ? 'translate(440 0) scale(-1 1)' : undefined}>
              <path className={styles.stem} pathLength="1" d="M48 459C5 394 8 307 45 244C63 213 81 190 104 169" />
              <g className={styles.leaves}>
                <path d="M36 434C9 429 0 406 4 389C26 394 40 411 36 434Z" />
                <path d="M24 399C47 388 54 367 48 353C29 361 19 381 24 399Z" />
                <path d="M21 365C0 352 0 331 7 316C25 325 29 347 21 365Z" />
                <path d="M26 329C48 322 60 303 57 285C36 291 26 308 26 329Z" />
                <path d="M38 295C19 281 23 258 33 245C49 260 49 280 38 295Z" />
                <path d="M53 263C75 260 89 245 90 227C67 228 55 244 53 263Z" />
                <path d="M73 222C61 204 69 185 83 176C91 194 86 213 73 222Z" />
                <path d="M88 202C107 203 122 191 126 176C106 172 92 186 88 202Z" />
              </g>
            </g>
          ))}
        </svg>

        <div className={styles.content}>
          <div className={styles.seal} aria-hidden="true">
            <span className={styles.sealInitial}>K</span>
            <span className={styles.sealDivider} />
            <span className={styles.sealInitial}>P</span>
          </div>
          <p className={styles.eyebrow}>Together, by His grace</p>
          <h1 className={styles.names}>
            <span className={styles.firstName}>Kiran</span>
            <span className={styles.ampersand}>&amp;</span>
            <span className={styles.secondName}>Prasanna</span>
          </h1>
          <div className={styles.ornament} aria-hidden="true"><span />✦<span /></div>
          <p className={styles.date}>02 <span>/</span> 10 <span>/</span> 2026</p>
          <p className={styles.caption}>The beginning of our forever</p>
        </div>
      </div>

      <div className={styles.bottomline}>
        <span className={styles.progress} aria-hidden="true"><span /></span>
        <p>Your invitation awaits</p>
      </div>
      <button type="button" className={styles.skip} onClick={dismiss} disabled={phase === 'leaving'}>
        Open invitation <span aria-hidden="true">↗</span>
      </button>
    </div>
  )
}
