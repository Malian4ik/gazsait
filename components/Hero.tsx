'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLang } from '@/context/LangContext'
import { content } from '@/lib/content'
import styles from './Hero.module.css'

import TrackedLink from './TrackedLink'

export default function Hero() {
  const { lang } = useLang()
  const c = content.hero
  const imageRef = useRef<HTMLDivElement>(null)

  // Trigger above-fold reveal animations immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('#hero .reveal, #hero .reveal-left, #hero .reveal-right')
        .forEach(el => el.classList.add('visible'))
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Subtle parallax on scroll
  useEffect(() => {
    const el = imageRef.current
    const onScroll = () => {
      if (!el) return
      const y = window.scrollY
      if (y < window.innerHeight * 1.2) {
        el.style.transform = `translateY(${y * 0.28}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className={styles.hero} id="hero" aria-label="Hero">
      {/* Background image with parallax */}
      <div className={styles.bgWrap} ref={imageRef}>
        <Image
          src="/images/DAN_2989-HDR_resized.jpg"
          alt="ACS Gaming Lounge interior"
          fill
          priority
          quality={90}
          className={styles.bgImg}
          sizes="100vw"
        />
      </div>
      <div className={styles.overlay} />
      <div className={styles.gradientBloom} />

      {/* Animated noise particles */}
      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 18}s`,
            animationDuration: `${12 + Math.random() * 16}s`,
            width: `${1.5 + Math.random() * 2}px`,
            height: `${1.5 + Math.random() * 2}px`,
          }} />
        ))}
      </div>

      <div className={`container ${styles.content}`}>
        {/* Eyebrow */}
        <div className={`tag reveal ${styles.eyebrow}`}>
          <span className={styles.dot} />
          {c.eyebrow[lang]}
        </div>

        {/* Headline */}
        <h1 className={`heading-xl reveal d1 ${styles.headline}`}>
          {c.headline[lang].split('\n').map((line, i) => (
            <span key={i} className={i === 1 ? 'gradient-text' : ''}>
              {line}{i === 0 ? <br /> : ''}
            </span>
          ))}
        </h1>

        {/* Value pills */}
        <div className={`${styles.pills} reveal d2`}>
          {c.pills[lang].map((pill) => (
            <span key={pill} className={styles.pill}>{pill}</span>
          ))}
        </div>

        {/* CTAs */}
        <div className={`${styles.ctas} reveal d3`}>
          <TrackedLink
            href={content.contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-primary btn-lg ${styles.ctaPrimary}`}
            id="hero-book-cta"
          >
            {c.cta1[lang]}
          </TrackedLink>
          <TrackedLink
            href={content.contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-outline btn-lg`}
            id="hero-telegram-cta"
          >
            <TelegramIcon />
            {c.cta2[lang]}
          </TrackedLink>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLabel}>{c.scroll[lang]}</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.49 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}
