'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLang } from '@/context/LangContext'
import { content } from '@/lib/content'
import styles from './VisitFormats.module.css'

export default function VisitFormats() {
  const { lang } = useLang()
  const c = content.formats
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    const elements = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    elements?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="formats" ref={sectionRef} aria-labelledby="formats-title">
      <div className="container">
        <div className={`section-header ${styles.header}`}>
          <span className="tag reveal">{c.tag[lang]}</span>
          <h2 className="heading-lg reveal d1" id="formats-title" style={{ marginTop: 16 }}>
            {c.title[lang]}
          </h2>
        </div>

        {/* Club Block */}
        <h3 className="heading-md reveal d2" style={{ marginBottom: 20 }}>
          {lang === 'ru' ? 'Киберклуб' : 'Cyberclub'}
        </h3>
        <div className={styles.track}>
          <div className={styles.cards}>
            {c.clubItems.map((item, i) => (
              <div
                key={item.id}
                className={`${styles.card} reveal d${Math.min(i + 1, 4) as 1|2|3|4}`}
                id={`format-card-${item.id}`}
              >
                <div className={styles.cardImg}>
                  <Image src={item.image} alt={item.title[lang]} fill sizes="(max-width:900px) 280px, 320px" className={styles.img} />
                  <span className={styles.cardTag}>{item.tag[lang]}</span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={`heading-md ${styles.cardTitle}`}>{item.title[lang]}</h3>
                  <p className={styles.cardDesc}>{item.desc[lang]}</p>
                  <span className={styles.cardFor}>{item.for[lang]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Deep dive CTA */}
        <div className="reveal d3" style={{ marginTop: 20, marginBottom: 60 }}>
          <a href="#contact" className="btn btn-outline" style={{ display: 'inline-flex' }}>
            {lang === 'ru' ? 'Посмотреть все комнаты \u2192' : 'View all rooms \u2192'}
          </a>
        </div>

        {/* Restaurant & Events Block */}
        <h3 className="heading-md reveal d1" style={{ marginBottom: 20 }}>
          {lang === 'ru' ? 'Ресторан и Мероприятия' : 'Restaurant & Events'}
        </h3>
        <div className={styles.track}>
          <div className={`${styles.cards} ${styles.cardsRest}`}>
            {c.restItems.map((item, i) => (
              <div
                key={item.id}
                className={`${styles.card} reveal d${Math.min(i + 1, 4) as 1|2|3|4}`}
                id={`format-card-${item.id}`}
              >
                <div className={styles.cardImg}>
                  <Image src={item.image} alt={item.title[lang]} fill sizes="(max-width:900px) 280px, 320px" className={styles.img} />
                  <span className={styles.cardTag}>{item.tag[lang]}</span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={`heading-md ${styles.cardTitle}`}>{item.title[lang]}</h3>
                  <p className={styles.cardDesc}>{item.desc[lang]}</p>
                  <span className={styles.cardFor}>{item.for[lang]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
