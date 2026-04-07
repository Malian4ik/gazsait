'use client'
import { useLang } from '@/context/LangContext'
import { content } from '@/lib/content'
import styles from './Footer.module.css'

export default function Footer() {
  const { lang } = useLang()
  const c = content.footer

  return (
    <footer className={styles.footer} aria-label="Footer">
      <div className="container">
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoMark}>ACS</div>
            <p className={styles.tagline}>{c.tagline[lang]}</p>
            <p className={styles.address}>{content.contact.address[lang]}</p>
            <div className={styles.socials}>
              {c.socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.social}
                  aria-label={s.label}
                  id={`footer-social-${s.icon}`}
                >
                  {s.icon === 'ig' ? <IgIcon /> : <TgIcon />}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>{lang === 'ru' ? 'Быстрые ссылки' : 'Quick Links'}</h3>
            <ul className={styles.colLinks}>
              {c.links[lang].map((label, i) => (
                <li key={i}><a href={c.hrefs[i]}>{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>{lang === 'ru' ? 'Контакты' : 'Contact'}</h3>
            <ul className={styles.colLinks}>
              <li><a href={`tel:${content.contact.phone}`}>{content.contact.phone}</a></li>
              <li><a href={content.contact.telegram} target="_blank" rel="noopener noreferrer">Telegram</a></li>
              <li><span style={{ color: 'var(--text-3)' }}>{content.contact.hours[lang]}</span></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>{c.copyright[lang]}</span>
          <span className={styles.builtFor}>
            {lang === 'ru' ? 'Создано для уровня выше' : 'Built for the next level'}
          </span>
        </div>
      </div>
    </footer>
  )
}

function IgIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}
function TgIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
    </svg>
  )
}
