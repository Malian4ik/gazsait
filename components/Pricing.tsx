'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/context/LangContext'
import { content } from '@/lib/content'
import styles from './Pricing.module.css'

export default function Pricing() {
  const { lang } = useLang()
  const c = content.pricing
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="pricing" ref={sectionRef} aria-labelledby="pricing-title">
      <div className="container">
        <div className="section-header">
          <span className="tag reveal">{c.tag[lang]}</span>
          <h2 className="heading-lg reveal d1" id="pricing-title" style={{ marginTop: 16, marginBottom: 12 }}>
            {c.title[lang]}
          </h2>
          <p className={`reveal d2 ${styles.note}`}>{c.note[lang]}</p>
        </div>

        <div className={styles.cards}>
          {c.plans.map((plan, i) => (
            <div
              key={plan.id}
              className={`${styles.card} ${plan.featured ? styles.featured : ''} reveal d${(i + 1) as 1|2|3}`}
              id={`pricing-${plan.id}`}
            >
              {plan.featured && (
                <div className={styles.featuredBadge}>
                  {lang === 'ru' ? 'Популярно' : 'Popular'}
                </div>
              )}
              <div className={styles.cardHeader}>
                <div>
                  <span className={styles.planName}>{plan.name[lang]}</span>
                  <span className={styles.planDesc}>{plan.desc[lang]}</span>
                  <span className={styles.planFor} style={{ display: 'block', fontSize: '0.75rem', marginTop: 4, color: 'var(--accent-lt)', fontWeight: 600 }}>
                    {plan.for[lang]}
                  </span>
                </div>
                <div className={styles.price}>{plan.price[lang]}</div>
              </div>
              <div className={styles.divider} />
              <div className={styles.includesLabel} style={{ fontSize: '0.85rem', color: 'var(--text-3)', marginBottom: 12, fontWeight: 500 }}>
                {c.includesLabel[lang]}
              </div>
              <ul className={styles.features}>
                {plan.features[lang].map((feat, j) => (
                  <li key={j} className={styles.feature}>
                    <span className={styles.checkIcon}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
              <a
                href={content.contact.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${plan.featured ? 'btn-primary' : 'btn-ghost'} ${styles.cta}`}
                id={`pricing-cta-${plan.id}`}
              >
                {lang === 'ru' ? 'Забронировать' : 'Book This'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
