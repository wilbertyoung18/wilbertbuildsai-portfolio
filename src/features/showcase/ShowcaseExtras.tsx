import { useRef } from 'react'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { PageHeader } from '@/components/page/PageHeader'
import { showcaseExtras, type ShowcaseExtra } from '@/content/showcase'
import { BrowserWindow } from './BrowserWindow'

function canHoverPlay() {
  return window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches
}

/** One outbound project. The clip has no poster attribute, so nothing loads until a real hover. */
function ExtraBlock({ item, level }: { item: ShowcaseExtra; level: 2 | 3 }) {
  const clipRef = useRef<HTMLVideoElement>(null)
  const Icon = item.cta.newTab ? ArrowUpRight : ArrowRight
  const tab = item.cta.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  const hover = item.clip
    ? {
        onMouseEnter: () => {
          if (canHoverPlay()) clipRef.current?.play().catch(() => {})
        },
        onMouseLeave: () => clipRef.current?.pause(),
      }
    : {}

  return (
    <section className="kt-extra" aria-labelledby={`kt-extra-${item.id}`}>
      <PageHeader level={level} id={`kt-extra-${item.id}`} eyebrow={item.eyebrow} titleThin={item.titleThin} titleBold={item.titleBold} lede={item.lede}>
        <div className="kt-cta">
          <a className="pg-btn" href={item.cta.href} {...tab}>
            {item.cta.label}
            <Icon size={16} weight="bold" aria-hidden />
            {item.cta.newTab ? <span className="sr-only">(opens in a new tab)</span> : null}
          </a>
          <p className="kt-foot pg-mono">{item.meta}</p>
        </div>
      </PageHeader>

      <div className="kt-extra__frame" {...hover}>
        <BrowserWindow url={item.windowUrl}>
          <div className="kt-screen kt-extra__screen">
            <img className="kt-extra__img" src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} loading="lazy" decoding="async" />
            {item.clip ? (
              <>
                <video ref={clipRef} className="kt-extra__clip" muted loop playsInline preload="none" aria-hidden>
                  {item.clip.map((s) => (
                    <source key={s.src} src={s.src} type={s.type} />
                  ))}
                </video>
                <span className="kt-extra__badge" aria-hidden>
                  Preview
                </span>
              </>
            ) : null}
          </div>
        </BrowserWindow>
      </div>
    </section>
  )
}

/** 3D Experience and Wilbert AI, closing the Showcase on both Home and /showcase. */
export function ShowcaseExtras({ level }: { level: 2 | 3 }) {
  return (
    <>
      {showcaseExtras.map((item) => (
        <ExtraBlock key={item.id} item={item} level={level} />
      ))}
    </>
  )
}
