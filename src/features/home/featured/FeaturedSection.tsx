import { useRef } from 'react'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { featuredCards, featuredSection, type FeaturedCard } from '@/content/featured'
import './featured.css'

/**
 * Home "Featured": two full-width project cards (3D Experience, Wilbert AI) in the 3D page's
 * dark / cyan look, stacked in one column below the hero. Each card is ONE link (the button is a
 * styled span, not a nested button). A lazy poster `<img>` carries the visible image; on a real
 * pointer hover OR keyboard focus (motion allowed) a muted looped clip fades in over it. Phones and
 * reduced-motion visitors see the poster only. The card name is an <h3> so both projects show up in
 * heading navigation; the poster is decorative (`alt=""`) and the pitch is wired to the link with
 * `aria-describedby`. The palette and fonts are scoped to `.ft`, so the light Geist site is untouched.
 */
function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
function canHoverPlay() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(hover: hover)').matches && !prefersReducedMotion()
}

function FeaturedCardView({ card }: { card: FeaturedCard }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const pitchId = `ft-pitch-${card.id}`

  // preload="none" keeps the clip off the critical path; it loads and plays only on hover/focus.
  const playHover = () => {
    if (canHoverPlay()) videoRef.current?.play().catch(() => {})
  }
  const playFocus = () => {
    if (!prefersReducedMotion()) videoRef.current?.play().catch(() => {})
  }
  const stop = () => {
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
    // Hover handlers sit on the stationary <li>: the <a> lifts on hover and would otherwise drop out
    // from under the pointer and thrash :hover + play/pause at the card's bottom edge.
    <li className="ft__item" onMouseEnter={playHover} onMouseLeave={stop}>
      <a
        className="ft__card"
        {...linkProps}
        aria-label={label}
        aria-describedby={pitchId}
        onFocus={playFocus}
        onBlur={stop}
      >
        <span className="ft__media">
          <img
            className="ft__img"
            src={card.poster}
            alt=""
            width={1600}
            height={800}
            loading="lazy"
            decoding="async"
          />
          <video ref={videoRef} className="ft__video" muted loop playsInline preload="none" aria-hidden>
            {card.sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
          <span className="ft__chip" aria-hidden>
            Preview
          </span>
        </span>

        <div className="ft__body">
          <div className="ft__text">
            <span className="ft__tag">{card.tag}</span>
            <h3 className="ft__name">{card.name}</h3>
            <span className="ft__pitch" id={pitchId}>
              {card.pitch}
            </span>
          </div>
          <span className="ft__action">
            <span className="ft__btn">
              {card.button}
              <Icon size={16} weight="bold" aria-hidden />
            </span>
            <span className="ft__note">{card.note}</span>
          </span>
        </div>
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
