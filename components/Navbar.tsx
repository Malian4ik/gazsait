'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '@/context/LangContext'
import { content } from '@/lib/content'
import styles from './Navbar.module.css'
import TrackedLink from './TrackedLink'

export default function Navbar() {
  const { lang, toggle } = useLang()
  const c = content.nav
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation">
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <a href="#" className={styles.logo} aria-label="ACS — Avulus Cyber Space">
            <span className={styles.logoMark}>ACS</span>
            <span className={styles.logoSub}>Avulus Cyber Space</span>
          </a>

          {/* Desktop links */}
          <ul className={styles.links}>
            {c.links[lang].map((label, i) => (
              <li key={i}>
                <a href={c.hrefs[i]} className={styles.link}>{label}</a>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            {/* Language toggle */}
            <button
              className={styles.langBtn}
              onClick={toggle}
              aria-label={`Switch to ${lang === 'ru' ? 'English' : 'Russian'}`}
            >
              {c.langSwitch[lang]}
            </button>

            {/* Book CTA (desktop) */}
            <TrackedLink
              href={content.contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary ${styles.desktopCta}`}
              id="nav-book-cta"
            >
              {c.cta[lang]}
            </TrackedLink>

            {/* Hamburger */}
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className={styles.mobileLinks}>
          {c.links[lang].map((label, i) => (
            <li key={i}>
              <a
                href={c.hrefs[i]}
                className={styles.mobileLink}
                onClick={closeMenu}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.mobileCtas}>
          <TrackedLink
            href={content.contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
            onClick={closeMenu}
            id="mobile-menu-book"
          >
            {c.cta[lang]}
          </TrackedLink>
          <button className={styles.langBtnMobile} onClick={toggle}>
            {c.langSwitch[lang]}
          </button>
        </div>
      </div>
    </>
  )
}
