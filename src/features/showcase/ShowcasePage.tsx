import { useRef, useState, type CSSProperties } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { PageMeta } from '@/app/PageMeta'
import type { PageRoute } from '@/app/routes'
import { PageHeader } from '@/components/page/PageHeader'
import { showcaseFaq, showcaseFilm, showcaseHost, showcasePage, showcaseStats, productTabs } from '@/content/showcase'
import { useScrollScene } from '@/hooks/use-scroll-scene'
import { showcaseJsonLd } from '@/lib/seo'
import { BrowserWindow } from './BrowserWindow'
import { roomsScene } from './rooms-scene'
import './showcase.css'

const pad2 = (n: number) => String(n).padStart(2, '0')

/** The head (H1 on the page, H2 as a Home section) with the one call to action under the lede. */
function ShowcaseHeader({ nested }: { nested: boolean }) {
  const c = showcasePage
  return (
    <PageHeader level={nested ? 2 : 1} id={nested ? 'showcase-title' : undefined} eyebrow={c.eyebrow} titleThin={c.titleThin} titleBold={c.titleBold} lede={c.lede}>
      <div className="kt-cta">
        <a className="pg-btn" href={c.cta.href} target="_blank" rel="noopener">
          {c.cta.label}
          <ArrowUpRight size={16} weight="bold" aria-hidden />
        </a>
        <p className="kt-foot">{c.footnote}</p>
      </div>
    </PageHeader>
  )
}

/** Film, stats, rooms, questions. Nested = inside a Home section, so every heading steps down one level. */
function ShowcaseBody({ nested }: { nested: boolean }) {
  const roomsRef = useRef<HTMLElement>(null)
  useScrollScene(roomsRef, roomsScene)
  const c = showcasePage
  const H2 = nested ? 'h3' : 'h2'
  const H3 = nested ? 'h4' : 'h3'

  // Track which screenshot is active for each room (0 = main, 1 = supporting)
  const [activeScreenshot, setActiveScreenshot] = useState<Record<number, number>>({})
  // Track which workflow diagram is active for room 5
  const [activeWorkflow, setActiveWorkflow] = useState(0)

  const handleScreenshotSwitch = (roomIndex: number, screenshotIndex: number) => {
    setActiveScreenshot((prev: Record<number, number>) => ({ ...prev, [roomIndex]: screenshotIndex }))
  }

  const handleWorkflowSwitch = (index: number) => {
    setActiveWorkflow(index)
  }

  const getRoomImage = (room: typeof productTabs[0], index: number) => {
    // Room 5 (index 4) has workflow diagrams
    if (index === 4 && room.workflowDiagrams && room.workflowDiagrams.length > 0 && room.workflowDiagrams[activeWorkflow]) {
      return room.workflowDiagrams[activeWorkflow].image
    }
    // Rooms 1-4: check for supporting image
    const screenshotIndex = activeScreenshot[index] ?? 0
    if (screenshotIndex === 1 && room.supportingImage) {
      return room.supportingImage
    }
    return room.image
  }

  const getRoomImageAlt = (room: typeof productTabs[0], index: number) => {
    if (index === 4 && room.workflowDiagrams && room.workflowDiagrams.length > 0 && room.workflowDiagrams[activeWorkflow]) {
      return room.workflowDiagrams[activeWorkflow].image.alt
    }
    const screenshotIndex = activeScreenshot[index] ?? 0
    if (screenshotIndex === 1 && room.supportingImage) {
      return room.supportingImage.alt
    }
    return room.image.alt
  }

  const getRoomImageClass = (room: typeof productTabs[0], index: number) => {
    // Room 5 (index 4) has workflow diagrams - add workflow-specific class
    if (index === 4) {
      const workflowIndex = activeWorkflow
      return `kt-room-image kt-room-5-workflow-${workflowIndex}`
    }
    // Rooms 1-4: different class for main vs supporting
    const screenshotIndex = activeScreenshot[index] ?? 0
    if (screenshotIndex === 1 && room.supportingImage) {
      return `kt-room-image kt-room-${index + 1}-supporting`
    }
    return `kt-room-image kt-room-${index + 1}-main`
  }

  const hasSupportingImage = (room: typeof productTabs[0], index: number) => {
    if (index === 4) return room.workflowDiagrams && room.workflowDiagrams.length > 1
    return !!room.supportingImage
  }

  const renderScreenshotControls = (room: typeof productTabs[0], index: number) => {
    if (index === 4 && room.workflowDiagrams && room.workflowDiagrams.length > 1) {
      // Room 5: workflow diagram selector
      return (
        <div className="kt-screen__controls" aria-label="Select workflow diagram">
          <div className="kt-screen__workflow-selector">
            {room.workflowDiagrams.map((wf, i) => (
              <button
                key={wf.id}
                type="button"
                className={`kt-screen__workflow-btn ${i === activeWorkflow ? 'active' : ''}`}
                onClick={() => handleWorkflowSwitch(i)}
                aria-current={i === activeWorkflow ? 'true' : 'false'}
                aria-label={`View ${wf.label} workflow`}
              >
                {wf.label}
              </button>
            ))}
          </div>
        </div>
      )
    }

    if (hasSupportingImage(room, index)) {
      // Rooms 1-4: toggle between main and supporting
      const current = activeScreenshot[index] ?? 0
      return (
        <div className="kt-screen__controls" aria-label="Switch screenshot">
          <button
            type="button"
            className={`kt-screen__nav-btn ${current === 0 ? 'active' : ''}`}
            onClick={() => handleScreenshotSwitch(index, 0)}
            aria-current={current === 0 ? 'true' : 'false'}
            aria-label="View main screenshot"
            title="Main screenshot"
          >
            <span className="pg-mono">01</span>
          </button>
          <button
            type="button"
            className={`kt-screen__nav-btn ${current === 1 ? 'active' : ''}`}
            onClick={() => handleScreenshotSwitch(index, 1)}
            aria-current={current === 1 ? 'true' : 'false'}
            aria-label="View supporting screenshot"
            title="Supporting screenshot"
          >
            <span className="pg-mono">02</span>
          </button>
        </div>
      )
    }

    return null
  }

  return (
    <>
      <div className="kt-film">
        <BrowserWindow url={`${showcaseHost} / client-onboarding`}>
          <div className="kt-screen">
            <img
              src={showcasePage.previewImage.src}
              alt={showcasePage.previewImage.alt}
              width={showcasePage.previewImage.width}
              height={showcasePage.previewImage.height}
              loading="eager"
              decoding="async"
              className="kt-preview-image"
            />
          </div>
        </BrowserWindow>
      </div>

      <dl className="kt-stats">
        {showcaseStats.map(([n, unit]) => (
          <div key={unit}>
            <dt>{n}</dt>
            <dd className="pg-mono">{unit}</dd>
          </div>
        ))}
      </dl>

      <section ref={roomsRef} className="kt-rooms" style={{ '--n': productTabs.length } as CSSProperties} aria-labelledby="kt-rooms-title">
        <div className="kt-rooms__pin">
          <div className="kt-rooms__nav">
            <H2 id="kt-rooms-title" className="pg-h2">
              {c.roomsTitle}
            </H2>
            <ol className="kt-rooms__list">
              {productTabs.map((room, i) => (
                <li key={room.id}>
                  <button type="button" data-kt-room={i} aria-controls={`kt-room-${room.id}`}>
                    <small>{pad2(i + 1)}</small>
                    {room.label}
                  </button>
                </li>
              ))}
            </ol>
            <span className="kt-rooms__rule" aria-hidden>
              <i data-kt-fill />
            </span>
          </div>

          <div className="kt-rooms__panes">
            {productTabs.map((room, i) => {
              const currentImage = getRoomImage(room, i)
              const currentAlt = getRoomImageAlt(room, i)
              const showControls = hasSupportingImage(room, i)

              return (
                <figure key={room.id} id={`kt-room-${room.id}`} className="kt-room" data-kt-pane={i} data-on={i === 0 ? '' : undefined}>
                  <BrowserWindow
                    url={`${showcaseHost} / ${room.label.toLowerCase()}`}
                    action={showControls && renderScreenshotControls(room, i)}
                  >
                    <div className="kt-screen">
                      <img
                        src={currentImage.src}
                        srcSet={currentImage.srcSet}
                        sizes="auto, (min-width: 1024px) 52vw, 92vw"
                        alt={currentAlt}
                        width={currentImage.width}
                        height={currentImage.height}
                        loading="lazy"
                        decoding="async"
                        className={getRoomImageClass(room, i)}
                      />
                    </div>
                  </BrowserWindow>
                  <figcaption>
                    <span className="pg-mono">
                      {pad2(i + 1)} / {pad2(productTabs.length)}
                    </span>
                    <H3>{room.label}</H3>
                    <p>{room.body}</p>
                    {room.businessBenefit && (
                      <p className="kt-room__benefit">
                        <strong>{room.businessBenefit}</strong>
                      </p>
                    )}
                    {room.workflow && (
                      <p className="kt-room__workflow">
                        <span className="pg-mono">Workflow: </span>
                        {room.workflow}
                      </p>
                    )}
                    {i === 4 && room.workflowDiagrams && room.workflowDiagrams[activeWorkflow] && (
                      <p className="kt-room__workflow-desc">
                        {room.workflowDiagrams[activeWorkflow].description}
                      </p>
                    )}
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      </section>

      <section className="kt-faq" aria-labelledby="kt-faq-title">
        <H2 id="kt-faq-title" className="pg-h2">
          Questions
        </H2>
        <dl>
          {showcaseFaq.map((f) => (
            <div key={f.question}>
              <dt>{f.question}</dt>
              <dd>{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}

/**
 * Showcase, "the film stage": the product film under the headline,
 * a quiet stats strip, then the five rooms walked by the page scroll, then three questions answered
 * from the product's own FAQ. Every caption is real text; the screens only illustrate it.
 */
export function ShowcasePage({ page }: { page: PageRoute }) {
  const c = showcasePage

  return (
    <div className="pg kt">
      <PageMeta page={page} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: showcaseJsonLd({ path: page.path, name: page.label, description: c.lede, url: c.cta.href, rooms: productTabs, film: showcaseFilm, faq: showcaseFaq }),
        }}
      />
      <ShowcaseHeader nested={false} />
      <ShowcaseBody nested={false} />
    </div>
  )
}

/** The same page as the Home section after Proof (the sidebar Showcase entry scrolls Home to #showcase). */
export function ShowcaseSection() {
  return (
    <section id="showcase" className="pg pg--section kt" aria-labelledby="showcase-title">
      <ShowcaseHeader nested />
      <ShowcaseBody nested />
    </section>
  )
}
