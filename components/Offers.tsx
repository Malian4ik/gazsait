'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/context/LangContext'
import { content } from '@/lib/content'
import offersData from '@/lib/offers'
import styles from './Offers.module.css'

export default function Offers() {
  const { lang } = useLang()
  const c = content.offers
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Don't render section at all if no offers
  if (offersData.length === 0) return null

  return (
    <section className={`section ${styles.section}`} id="offers" ref={sectionRef} aria-labelledby="offers-title">
      <div className="container">
        <div className="section-header">
          <span className="tag reveal">{c.tag[lang]}</span>
          <h2 className="heading-lg reveal d1" id="offers-title" style={{ marginTop: 16 }}>
            {c.title[lang]}
          </h2>
        </div>

        <div className={styles.cards}>
          {offersData.map((offer, i) => (
            <div key={offer.id} className={`${styles.card} reveal d${Math.min(i+1,4) as 1|2|3|4}`} id={`offer-${offer.id}`}>
              {offer.badge && (
                <div className={styles.badge}>{offer.badge[lang]}</div>
              )}
              <span className={styles.offerTag}>{offer.tag[lang]}</span>
              <h3 className={`heading-md ${styles.offerTitle}`}>{offer.title[lang]}</h3>
              <p className={styles.offerDesc}>{offer.desc[lang]}</p>
              {offer.validUntil && (
                <span className={styles.valid}>
                  {lang === 'ru' ? `До ${new Date(offer.validUntil).toLocaleDateString('ru-RU')}` : `Until ${new Date(offer.validUntil).toLocaleDateString('en-US')}`}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
