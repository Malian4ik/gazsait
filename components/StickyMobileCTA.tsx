'use client'
import { useState, useEffect } from 'react'
import { useLang } from '@/context/LangContext'
import { content } from '@/lib/content'
import styles from './StickyMobileCTA.module.css'
import TrackedLink from './TrackedLink'

export default function StickyMobileCTA() {
  const { lang } = useLang()
  const c = content.stickyBar
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`${styles.bar} ${visible ? styles.visible : ''}`}
      aria-label="Quick booking actions"
      role="complementary"
    >
      <TrackedLink
        href={content.contact.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn btn-primary ${styles.cta}`}
        id="sticky-telegram-cta"
      >
        <TgIcon />
        {c.cta1[lang]}
      </TrackedLink>
      <a
        href={`tel:${content.contact.phone}`}
        className={`btn btn-outline ${styles.cta}`}
        id="sticky-call-cta"
      >
        <PhoneIcon />
        {c.cta2[lang]}
      </a>
    </div>
  )
}

function TgIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.49 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}
