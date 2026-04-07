'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/context/LangContext'
import { content } from '@/lib/content'
import styles from './ContactMap.module.css'
import TrackedLink from './TrackedLink'

export default function ContactMap() {
  const { lang } = useLang()
  const c = content.contact
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={`section ${styles.section}`} id="contact" ref={sectionRef} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.layout}>
          {/* Left: info */}
          <div className={`${styles.info} reveal-left`}>
            <span className="tag">{c.tag[lang]}</span>
            <h2 className={`heading-lg ${styles.title}`} id="contact-title">
              {c.title[lang].split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 ? <br /> : ''}</span>
              ))}
            </h2>

            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={styles.detailIcon}><PinIcon /></span>
                <div>
                  <strong className={styles.detailLabel}>{lang === 'ru' ? 'Адрес' : 'Address'}</strong>
                  <span className={styles.detailVal}>{c.address[lang]}</span>
                </div>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailIcon}><ClockIcon /></span>
                <div>
                  <strong className={styles.detailLabel}>{lang === 'ru' ? 'Часы работы' : 'Hours'}</strong>
                  <span className={styles.detailVal}>{c.hours[lang]}</span>
                </div>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailIcon}><ParkingIcon /></span>
                <div>
                  <strong className={styles.detailLabel}>{lang === 'ru' ? 'Парковка' : 'Parking'}</strong>
                  <span className={styles.detailVal}>{c.parking[lang]}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 24, marginBottom: 16 }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent-lt)' }}>{c.microcopy[lang]}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-3)' }}>{c.microcopy2[lang]}</p>
            </div>

            <div className={styles.ctas}>
              <TrackedLink
                href={c.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                id="contact-telegram-cta"
              >
                <TelegramIcon />
                {c.cta1[lang]}
              </TrackedLink>
              <a
                href={`tel:${c.phone}`}
                className="btn btn-outline"
                id="contact-call-cta"
              >
                <PhoneIcon />
                {c.cta2[lang]}
              </a>
            </div>
          </div>

          {/* Right: Yandex map embed */}
          <div className={`${styles.mapWrap} reveal-right`}>
            <div className={styles.mapFrame}>
              {/* Yandex Maps placeholder — replace src with real embed URL */}
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.613098%2C55.756994&z=14&l=map&pt=37.613098,55.756994,pm2rdl"
                width="100%"
                height="100%"
                frameBorder="0"
                title={lang === 'ru' ? 'Карта ACS' : 'ACS Map'}
                className={styles.iframe}
                loading="lazy"
                allowFullScreen
              />
            </div>
            <div className={styles.mapNote}>
              {lang === 'ru' ? '📍 Уточните точный адрес при бронировании' : '📍 Confirm exact address when booking'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PinIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
}
function ClockIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}
function ParkingIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>
}
function TelegramIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/></svg>
}
function PhoneIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.49 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
}
