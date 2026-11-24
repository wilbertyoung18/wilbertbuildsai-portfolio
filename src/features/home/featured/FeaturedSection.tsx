import { useRef } from 'react'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { featuredCards, featuredSection, type FeaturedCard } from '@/content/featured'
import './featured.css'

/**
 * Home "Featured": two full-width project cards (3D Experience, Wilbert AI) in the 3D page's
 * dark / cyan look, stacked in one column below the hero. Each card is ONE link (the button is a
 * styled span, not a nested button). A poster image carries the alt text and is lazy-loaded; on a
 * real pointer hover (desktop, motion allowed) a muted looped clip fades in over it. Phones and
 * reduced-motion visitors see the poster only. The palette and fonts are scoped to `.ft`, so the
 * rest of the (light, Geist) site is untouched.
 */
function canHoverPlay() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return (
    window.matchMedia('(hover: hover)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function FeaturedCardView({ card }: { card: FeaturedCard }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // preload="none" keeps the clip off the critical path; it loads and plays only on hover.
  const onEnter = () => {
    if (!canHoverPlay()) return
    videoRef.current?.play().catch(() => {})
  }
  const onLeave = () => {
    videoRef.current?.pause()
  }

  const Icon = card.sameTab ? ArrowRight : ArrowUpRight
  const linkProps = card.sameTab
    ? { href: card.href }
    : { href: card.href, target: '_blank', rel: 'noopener noreferrer' }
  const label = card.sameTab
    ? `${card.name}: ${card.button}`
    : `${card.name}: ${card.button} (opens in a new tab)`

  return (
    <li className="ft__item">
      <a
        className="ft__card"
        {...linkProps}
        aria-label={label}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <span className="ft__media">
          <img
            className="ft__img"
            src={card.poster}
            alt={card.alt}
            width={1600}
            height={800}
            loading="lazy"
            decoding="async"
          />
          <video
            ref={videoRef}
            className="ft__video"
            poster={card.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            tabIndex={-1}
          >
            {card.sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
          <span className="ft__chip" aria-hidden>
            Live preview loop
          </span>
        </span>

        <span className="ft__body">
          <span className="ft__text">
            <span className="ft__tag">{card.tag}</span>
            <span className="ft__name">{card.name}</span>
            <span className="ft__pitch">{card.pitch}</span>
          </span>
          <span className="ft__action">
            <span className="ft__btn">
              {card.button}
              <Icon size={16} weight="bold" aria-hidden />
            </span>
            <span className="ft__note">{card.note}</span>
          </span>
        </span>
      </a>
    </li>
  )
}

export function FeaturedSection() {
  return (
    <section id="featured" className="ft" aria-labelledby="featured-title">
      <header className="ft__head">
        <p className="ft__eyebrow">{featuredSection.eyebrow}</p>
        <h2 id="featured-title" className="ft__title">
          {featuredSection.title}
        </h2>
        <p className="ft__sub">{featuredSection.sub}</p>
      </header>
      <ul className="ft__list">
        {featuredCards.map((card) => (
          <FeaturedCardView key={card.id} card={card} />
        ))}
      </ul>
    </section>
  )
}
