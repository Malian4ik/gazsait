import styles from '@/app/page.module.css'
import type { LandingContent } from '@/lib/landingData'

type PropertyLandingProps = {
  content: LandingContent
}

export default function PropertyLanding({ content }: PropertyLandingProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: content.siteTitle,
        url: `http://localhost:3000${content.path === '/' ? '' : content.path}`,
        description: content.pageDescription,
        inLanguage: 'ru-RU',
      },
      {
        '@type': 'Organization',
        name: content.siteTitle,
        url: `http://localhost:3000${content.path === '/' ? '' : content.path}`,
        description: content.pageDescription,
      },
    ],
  }

  return (
    <main className={`${styles.page} ${content.pageKind === 'commercial' ? styles.pageCommercial : ''}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className={styles.heroShell}>
        <header className={styles.header}>
          <a className={styles.brand} href="#top" aria-label={`${content.siteTitle}, перейти в начало страницы`}>
            <span className={styles.brandMark}>S</span>
            <div>
              <strong>{content.siteTitle}</strong>
              <span>{content.path === '/' ? 'Комфортная аренда без лишней суеты' : 'Коммерческая аренда без хаоса'}</span>
            </div>
          </a>

          <nav className={styles.nav} aria-label="Главная навигация">
            <a href={content.path === '/' ? '#search' : '/'}>Жилая аренда</a>
            <a href={content.path === '/commercial' ? '#search' : '/commercial'}>Коммерческая аренда</a>
            <a href="#homes">Подборки</a>
            <a href="#owners">Собственникам</a>
          </nav>

          <div className={styles.headerActions}>
            <a className={styles.secondaryButton} href="#owners">
              {content.secondaryCta}
            </a>
            <a className={styles.primaryButton} href={content.primaryHref}>
              {content.primaryCta}
            </a>
          </div>
        </header>

        <div className={styles.mobileSwitcher} aria-label="Переключение между типами недвижимости">
          <a
            className={`${styles.mobileSwitcherLink} ${content.path === '/' ? styles.mobileSwitcherLinkActive : ''}`}
            href="/"
          >
            Жилая аренда
          </a>
          <a
            className={`${styles.mobileSwitcherLink} ${
              content.path === '/commercial' ? styles.mobileSwitcherLinkActive : ''
            }`}
            href="/commercial"
          >
            Коммерческая аренда
          </a>
        </div>

        <div className={`${styles.hero} ${content.pageKind === 'commercial' ? styles.heroCommercial : ''}`} id="top">
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{content.heroEyebrow}</span>
            <h1 className={content.pageKind === 'commercial' ? styles.heroTitleCommercial : ''}>{content.heroTitle}</h1>
            <p>{content.heroText}</p>

            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href={content.primaryHref}>
                {content.primaryCta}
              </a>
              <a className={styles.secondaryButton} href={content.secondaryHref}>
                {content.secondaryCta}
              </a>
            </div>

            <div className={styles.heroStats}>
              {content.heroStats.map((stat) => (
                <article key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.heroPanel}>
            <div className={styles.heroImageCard}>
              <img className={styles.heroImage} src={content.heroImage} alt={content.heroImageAlt} />
              <div className={styles.heroImageOverlay}>
                <span>{content.heroImageTitle}</span>
                <strong>{content.siteTitle}</strong>
                <p>{content.heroImageMeta}</p>
              </div>
            </div>

            <div className={styles.searchCard} id="search">
              <div className={styles.cardHeader}>
                <span>Быстрый поиск</span>
                <strong>{content.searchTitle}</strong>
              </div>

              <div className={styles.searchGrid}>
                {content.searchFields.map((field) => (
                  <label key={field.label}>
                    {field.label}
                    <span>{field.value}</span>
                  </label>
                ))}
              </div>

              <div className={styles.searchFooter}>
                <div className={styles.quickTags}>
                  {content.quickTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a className={styles.primaryButton} href="#homes">
                  Показать варианты
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>Комфорт клиента</span>
          <h2>{content.comfortTitle}</h2>
        </div>

        <div className={styles.comfortGrid}>
          {content.comfortPoints.map((point) => (
            <article className={styles.comfortCard} key={point}>
              <span className={styles.cardBadge}>Comfort first</span>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="homes">
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>Подборки</span>
          <h2>{content.listingsTitle}</h2>
        </div>

        <div className={styles.listings}>
          {content.listings.map((listing) => (
            <article className={styles.listingCard} key={listing.title}>
              <div className={styles.listingVisual}>
                <img className={styles.listingImage} src={listing.image} alt={listing.alt} loading="lazy" />
                <span>{listing.tag}</span>
              </div>
              <div className={styles.listingContent}>
                <div>
                  <strong>{listing.title}</strong>
                  <p>{listing.location}</p>
                </div>
                <div className={styles.listingMeta}>
                  <span>{listing.price}</span>
                  <span>{listing.details}</span>
                </div>
                <div className={styles.listingActions}>
                  <a className={styles.primaryButton} href="#cta">
                    Записаться на просмотр
                  </a>
                  <a className={styles.inlineLink} href="#faq">
                    Подробнее об условиях
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.flowSection}`}>
        <div className={styles.flowPanels}>
          <article className={styles.flowPanel}>
            <span className={styles.eyebrow}>Для арендатора</span>
            <h3>{content.renterTitle}</h3>
            <ol>
              {content.renterSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <a className={styles.primaryButton} href={content.primaryHref}>
              {content.primaryCta}
            </a>
          </article>

          <article className={`${styles.flowPanel} ${styles.ownerPanel}`} id="owners">
            <span className={styles.eyebrow}>Для собственника</span>
            <h3>{content.ownerTitle}</h3>
            <ol>
              {content.ownerSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <a className={styles.secondaryButton} href="#cta">
              {content.path === '/' ? 'Разместить квартиру' : 'Разместить объект'}
            </a>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>Социальное доказательство</span>
          <h2>Спокойная подача и прозрачный сценарий повышают доверие лучше, чем шумные промо-блоки.</h2>
        </div>

        <div className={styles.testimonials}>
          {content.testimonials.map((item) => (
            <blockquote className={styles.testimonial} key={item.author}>
              <p>{item.quote}</p>
              <footer>{item.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className={styles.section} id="faq">
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>FAQ</span>
          <h2>Убираем лишние вопросы до того, как человек начнет сомневаться.</h2>
        </div>

        <div className={styles.faqList}>
          {content.faqs.map((item) => (
            <article className={styles.faqItem} key={item.question}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.ctaSection}`} id="cta">
        <div className={styles.ctaPanel}>
          <div>
            <span className={styles.eyebrow}>Финальный CTA</span>
            <h2>{content.ctaTitle}</h2>
            <p>{content.ctaText}</p>
          </div>

          <div className={styles.ctaActions}>
            <a className={styles.primaryButton} href={content.primaryHref}>
              {content.primaryCta}
            </a>
            <a className={styles.secondaryButton} href={content.secondaryHref}>
              {content.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      <div className={styles.mobileDock}>
        <a className={styles.primaryButton} href={content.primaryHref}>
          {content.path === '/' ? 'Найти жилье' : 'Найти объект'}
        </a>
        <a className={styles.secondaryButton} href={content.secondaryHref}>
          Разместить
        </a>
      </div>
    </main>
  )
}
