'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useLang } from '@/context/LangContext'
import { content } from '@/lib/content'
import styles from './Gallery.module.css'

const galleryItems = [
  { src: '/images/hero_bg.jpg', label: { ru: 'Главный зал', en: 'Main Lounge' } },
  { src: '/images/private_room.jpg', label: { ru: 'PC-комната', en: 'PC Room' } },
  { src: '/images/restaurant_area.jpg', label: { ru: 'Ресторан', en: 'Restaurant' } },
  { src: '/images/gallery_vip.jpg', label: { ru: 'VIP-зона', en: 'VIP Suite' } },
  { src: '/images/format_bootcamp.jpg', label: { ru: 'Буткемп', en: 'Bootcamp' } },
  { src: '/images/format_club.jpg', label: { ru: 'Клубная комната', en: 'Club Room' } },
]

export default function Gallery() {
  const { lang } = useLang()
  const c = content.gallery
  const sectionRef = useRef<HTMLElement>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.06 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Close lightbox on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(l => l !== null ? Math.min(l + 1, galleryItems.length - 1) : null)
      if (e.key === 'ArrowLeft') setLightbox(l => l !== null ? Math.max(l - 1, 0) : null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <section className="section" id="gallery" ref={sectionRef} aria-labelledby="gallery-title">
      <div className="container">
        <div className="section-header">
          <span className="tag reveal">{c.tag[lang]}</span>
          <h2 className="heading-lg reveal d1" id="gallery-title" style={{ marginTop: 16 }}>
            {c.title[lang]}
          </h2>
        </div>

        <div className={styles.grid}>
          {galleryItems.map((item, i) => (
            <button
              key={i}
              className={`${styles.cell} reveal d${Math.min(i + 1, 4) as 1|2|3|4} ${i === 0 ? styles.tall : ''} ${i === 3 ? styles.wide : ''}`}
              onClick={() => setLightbox(i)}
              aria-label={`View ${item.label[lang]}`}
              id={`gallery-item-${i}`}
            >
              <Image
                src={item.src}
                alt={item.label[lang]}
                fill
                className={styles.img}
                sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw"
              />
              <span className={styles.label}>{item.label[lang]}</span>
              <span className={styles.zoomIcon} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)} role="dialog" aria-modal="true" aria-label="Image lightbox">
          <button className={styles.lbClose} onClick={() => setLightbox(null)} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <button className={`${styles.lbNav} ${styles.lbPrev}`} onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? Math.max(l - 1, 0) : null) }} aria-label="Previous" disabled={lightbox === 0}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className={styles.lbImgWrap} onClick={e => e.stopPropagation()}>
            <Image
              src={galleryItems[lightbox].src}
              alt={galleryItems[lightbox].label[lang]}
              fill
              className={styles.lbImg}
              quality={95}
              sizes="100vw"
              priority
            />
          </div>
          <button className={`${styles.lbNav} ${styles.lbNext}`} onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? Math.min(l + 1, galleryItems.length - 1) : null) }} aria-label="Next" disabled={lightbox === galleryItems.length - 1}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div className={styles.lbCounter}>{lightbox + 1} / {galleryItems.length}</div>
        </div>
      )}
    </section>
  )
}
