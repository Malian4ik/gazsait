'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/context/LangContext'
import { content } from '@/lib/content'
import styles from './HowItWorks.module.css'

const icons = [
  // Choose format
  <svg key="1" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  // Contact
  <svg key="2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z" fill="currentColor" stroke="none"/></svg>,
  // Pick time
  <svg key="3" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="8 14 10 16 13 13"/></svg>,
  // Enjoy
  <svg key="4" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
]

export default function HowItWorks() {
  const { lang } = useLang()
  const c = content.howItWorks
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
    <section className={`section ${styles.section}`} id="how-it-works" ref={sectionRef} aria-labelledby="how-title">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto clamp(48px,7vw,72px)' }}>
          <span className="tag reveal">{c.tag[lang]}</span>
          <h2 className="heading-lg reveal d1" id="how-title" style={{ marginTop: 16, whiteSpace: 'pre-line' }}>
            {c.title[lang]}
          </h2>
        </div>

        <div className={styles.steps}>
          {c.steps.map((step, i) => (
            <div key={step.n} className={`${styles.step} reveal d${(i + 1) as 1|2|3|4}`} id={`step-${step.n}`}>
              <div className={styles.stepIconWrap}>
                {icons[i]}
                <span className={styles.stepNum}>{step.n}</span>
              </div>
              {i < c.steps.length - 1 && (
                <div className={styles.connector} aria-hidden="true" />
              )}
              <h3 className={`heading-md ${styles.stepTitle}`}>{step.title[lang]}</h3>
              <p className={styles.stepDesc}>{step.desc[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
