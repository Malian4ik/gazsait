'use client'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/context/LangContext'
import { content } from '@/lib/content'
import styles from './FAQ.module.css'

export default function FAQ() {
  const { lang } = useLang()
  const c = content.faq
  const [open, setOpen] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.06 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={`section ${styles.section}`} id="faq" ref={sectionRef} aria-labelledby="faq-title">
      <div className="container">
        <div className={styles.layout}>
          <div className={`${styles.left} reveal`}>
            <span className="tag">{c.tag[lang]}</span>
            <h2 className="heading-lg" id="faq-title" style={{ marginTop: 16, whiteSpace: 'pre-line' }}>
              {c.title[lang]}
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: '0.95rem', lineHeight: 1.7, marginTop: 16 }}>
              {lang === 'ru'
                ? 'Если не нашли ответ — напишите нам в Telegram, ответим в течение нескольких минут.'
                : "Didn't find your answer? Message us on Telegram — we reply within minutes."}
            </p>
            <a
              href={content.contact.telegram}
              className="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
              id="faq-telegram-cta"
              style={{ marginTop: 24, width: 'fit-content' }}
            >
              {lang === 'ru' ? 'Задать вопрос' : 'Ask a Question'}
            </a>
          </div>

          <div className={`${styles.right} reveal d2`}>
            {c.items.map((item, i) => (
              <div key={i} className={styles.item} id={`faq-item-${i}`}>
                <button
                  className={`${styles.question} ${open === i ? styles.questionOpen : ''}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{item.q[lang]}</span>
                  <span className={`${styles.chevron} ${open === i ? styles.chevronOpen : ''}`} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className={`${styles.answer} ${open === i ? styles.answerOpen : ''}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                >
                  <div className={styles.answerInner}>{item.a[lang]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
