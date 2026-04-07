'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLang } from '@/context/LangContext'
import { content } from '@/lib/content'
import styles from './Restaurant.module.css'

export default function Restaurant() {
  const { lang } = useLang()
  const c = content.restaurant
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      .forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const foodPhotos = [
    { src: '/images/food_burger.jpg', alt: lang === 'ru' ? 'Бургер' : 'Burger' },
    { src: '/images/food_ramen.jpg', alt: lang === 'ru' ? 'Рамен' : 'Ramen' },
    { src: '/images/food_cocktail.jpg', alt: lang === 'ru' ? 'Коктейль' : 'Cocktail' },
    { src: '/images/food_wings.jpg', alt: lang === 'ru' ? 'Крылья' : 'Wings' },
  ]

  return (
    <section className={`section ${styles.section}`} id="restaurant" ref={sectionRef} aria-labelledby="restaurant-title">
      <div className="container">
        <div className={styles.layout}>
          {/* Text side */}
          <div className={`${styles.textSide} reveal-left`}>
            <span className="tag">{c.tag[lang]}</span>
            <h2 className={`heading-lg ${styles.title}`} id="restaurant-title">
              {c.title[lang].split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 ? <br /> : ''}</span>
              ))}
            </h2>
            <p className={styles.desc}>{c.desc[lang]}</p>
            <div className={styles.note}>
              <CheckIcon />
              <span>{c.note[lang]}</span>
            </div>
            <a
              href={c.menuHref}
              className="btn btn-outline"
              id="restaurant-menu-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MenuIcon />
              {c.cta[lang]}
            </a>
          </div>

          {/* Photo grid side */}
          <div className={`${styles.photoSide} reveal-right`}>
            <div className={styles.grid}>
              {foodPhotos.map((photo, i) => (
                <div key={i} className={styles.photoCell}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className={styles.photo}
                    sizes="(max-width:900px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  )
}
