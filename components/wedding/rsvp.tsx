'use client'

import Link from 'next/link'
import { useRef, useState, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Heart, Gift } from 'lucide-react'
import { Reveal, SectionTitle, FloralCorner } from './ui'
import emailjs from '@emailjs/browser';


export function Rsvp() {
const [submitted, setSubmitted] = useState(false)
const [selectedGiftFromUrl, setSelectedGiftFromUrl] = useState<{name: string; price: number} | null>(null)
const [customGift, setCustomGift] = useState('')
const [skipGift, setSkipGift] = useState(false)
const [loading, setLoading] = useState(false) 
const form = useRef<HTMLFormElement>(null);

useEffect(() => {
  const readGiftParams = () => {
    const params = new URLSearchParams(window.location.search)
    const giftName = params.get('gift')
    const giftPrice = params.get('price')
    
    if (giftName) {
      setSelectedGiftFromUrl({
        name: decodeURIComponent(giftName),
        price: parseInt(giftPrice || '0')
      })
    }
  }
  
  readGiftParams()
  
  // Listen for URL changes
  window.addEventListener('hashchange', readGiftParams)
  return () => window.removeEventListener('hashchange', readGiftParams)
}, [])

const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  let giftText = ''
  
  if (skipGift) {
    giftText = 'Not giving any gift'
  } else if (selectedGiftFromUrl) {
    giftText = `${selectedGiftFromUrl.name} - ₹${selectedGiftFromUrl.price.toLocaleString()}`
  } else if (customGift.trim()) {
    giftText = customGift.trim()
  } else {
    alert('Please select a gift, type a custom gift, or check "I don\'t want to give a gift".')
    return
  }

  setLoading(true)

  const formData = new FormData(form.current!)

  const templateParams = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    guests: formData.get('guests'),
    attend: formData.get('attend'),
    gift: giftText,
    message: formData.get('message'),
  }

  try {
    // Email to Admin
    await emailjs.send(
      'service_q98ktcq',
      'template_3070k1t',
      templateParams,
      '6pcRMDv0uhBMAWhfn'
    )

    // Auto Reply to Guest
    await emailjs.send(
      'service_q98ktcq',
      'template_3070k1t',
      templateParams,
      '6pcRMDv0uhBMAWhfn'
    )

    setSubmitted(true)
    form.current?.reset()
  } catch (error) {
    console.error(error)
    alert('Failed to send RSVP.')
  } finally {
    setLoading(false)
  }
}

  const inputClass =
    'w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-base text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-2 focus:ring-lavender-soft'
  const labelClass = 'mb-2 block text-xs uppercase tracking-wide-lux text-muted-foreground'

  return (
    <section id="rsvp" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <FloralCorner position="top-right" opacity={0.55} size={230} />
      <FloralCorner position="bottom-left" opacity={0.55} size={230} />

      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <SectionTitle eyebrow="Kindly respond" title="Will You Join Us?" />

        <Reveal delay={0.1} className="mt-14">
          <div className="relative rounded-3xl border border-border bg-cream px-6 py-10 shadow-xl shadow-primary/10 sm:px-12">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full border border-gold-soft/60 bg-background text-primary"
                  >
                    <Check className="h-9 w-9" strokeWidth={1.5} />
                  </motion.span>
                  <h3 className="mt-6 font-script text-5xl text-primary">Thank You!</h3>
                  <p className="mt-3 max-w-sm text-pretty font-body text-lg leading-relaxed text-muted-foreground">
                    Your response has been received with joy. We can&apos;t wait to celebrate this
                    blessed day together with you.
                  </p>
                  <Heart className="mt-6 h-6 w-6 animate-floaty fill-current text-gold" strokeWidth={1} />
                </motion.div>
              ) : (
                <motion.form
                    ref={form}
                    key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <label className={labelClass} htmlFor="name">
                      Full Name
                    </label>
                    <input id="name" name="name" required className={inputClass} placeholder="Your name" />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        className={inputClass}
                        placeholder="+91"
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className={inputClass}
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="guests">
                        Number of Guests
                      </label>
                      <select id="guests" name="guests" defaultValue="1" required className={inputClass}>
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="attend">
                        Will You Attend?
                      </label>
                      <select id="attend" name="attend" defaultValue="yes" required className={inputClass}>
                        <option value="yes">Joyfully Accept</option>
                        <option value="no">Regretfully Decline</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedGiftFromUrl ? (
                      <>
                        <div>
                          <label className={labelClass}>Selected Gift</label>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-xl border-2 border-gold bg-gold/5 p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Gift className="h-5 w-5 text-gold" />
                              <div>
                                <p className="font-semibold text-foreground">{selectedGiftFromUrl.name}</p>
                                <p className="text-sm text-muted-foreground">From gift registry</p>
                              </div>
                            </div>
                            <p className="font-script text-2xl text-gold">₹{selectedGiftFromUrl.price.toLocaleString()}</p>
                          </div>
                        </motion.div>
                        <Link
                          href="/gift"
                          className="inline-block text-sm text-gold hover:text-gold/80 underline"
                        >
                          Change gift selection
                        </Link>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className={labelClass}>Gift Options</label>
                          <p className="text-xs text-muted-foreground mb-3">Choose one option below:</p>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-xl border-2 border-gold/20 bg-muted/30 p-4"
                        >
                          <p className="text-sm text-muted-foreground mb-3">
                            Select a gift from our <Link href="/gift" className="font-semibold text-gold hover:underline">gift registry</Link>
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-xl border-2 border-gold/20 bg-muted/30 p-4"
                        >
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={customGift.length > 0}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setCustomGift('')
                                  setSkipGift(false)
                                } else {
                                  setCustomGift('')
                                }
                              }}
                              className="h-4 w-4 rounded border-gold/50"
                            />
                            <span className="font-medium text-foreground">I want to give a custom gift</span>
                          </label>
                          {customGift !== null && (
                            <input
                              type="text"
                              value={customGift}
                              onChange={(e) => {
                                setCustomGift(e.target.value)
                                setSkipGift(false)
                              }}
                              placeholder="Type your gift (e.g., Gold Watch)"
                              className={`${inputClass} mt-3`}
                            />
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-xl border-2 border-gold/20 bg-muted/30 p-4"
                        >
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={skipGift}
                              onChange={(e) => {
                                setSkipGift(e.target.checked)
                                if (e.target.checked) {
                                  setCustomGift('')
                                }
                              }}
                              className="h-4 w-4 rounded border-gold/50"
                            />
                            <span className="font-medium text-foreground">I don't want to give a gift</span>
                          </label>
                        </motion.div>
                      </>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="message">
                      A Message for the Couple
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="Your blessings and wishes..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-primary px-6 py-4 text-xs uppercase tracking-luxury text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send RSVP'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
