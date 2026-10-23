import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { ArrowRight, ArrowUpRight, X } from '@phosphor-icons/react'
import { HeadMeta } from '@/app/PageMeta'
import { chapterPath, workChapters } from '@/content/home'
import type { WorkChapter, WorkItem, Image } from '@/content/schema'
import { gsap, MOTION_CONDITIONS, spring } from '@/lib/motion/gsap'
import { chapterJsonLd, chapterTitle } from '@/lib/seo'
import { useSheet } from './use-sheet'
import './work-sheet.css'

type SheetState = { sheet?: boolean } | null

/**
 * The showcase for one Work chapter, at its own URL (/work/<chapter>) so it can be shared, indexed
 * and opened directly. A native modal <dialog> (focus trap, Escape, top layer) holding a sheet that
 * rises over Home. Closing goes back in history when the visitor came from Home, so Back closes it
 * too. The last chapter stays rendered while the sheet leaves.
 */
export function WorkSheet({ chapter }: { chapter: WorkChapter | null }) {
  const navigate = useNavigate()
  const location = useLocation()
  const fromHome = !!(location.state as SheetState)?.sheet
  const [shown, setShown] = useState<WorkChapter | null>(chapter)
  if (chapter && chapter !== shown) setShown(chapter)

  const requestClose = () => {
    if (fromHome) navigate(-1)
    else navigate('/', { preventScrollReset: true })
  }
  const { dialogRef, panelRef, scrimRef, onDragStart } = useSheet({
    open: !!chapter,
    onRequestClose: requestClose,
    onClosed: () => setShown(null),
  })

  // New chapter (opened, or "Next" inside the sheet): back to the top and bring the builds in.
  const bodyRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const body = bodyRef.current
    if (!body || !shown) return
    body.scrollTop = 0
    headRef.current?.removeAttribute('data-scrolled')
    if (window.matchMedia(MOTION_CONDITIONS.reduce).matches) return
    const items = Array.from(body.querySelectorAll('[data-reveal]')).slice(0, 8)
    const tween = gsap.from(items, { y: 22, autoAlpha: 0, stagger: 0.045, delay: 0.08, ...spring({ response: 0.55 }) })
    return () => {
      tween.revert()
    }
  }, [shown])

  const onBodyScroll = () => {
    const scrolled = (bodyRef.current?.scrollTop ?? 0) > 4
    headRef.current?.toggleAttribute('data-scrolled', scrolled)
  }

  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === scrimRef.current) requestClose()
  }

  const next = shown ? workChapters[(workChapters.indexOf(shown) + 1) % workChapters.length] : undefined

  return (
    <dialog
      ref={dialogRef}
      className="sh"
      aria-labelledby="sh-title"
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault()
        requestClose()
      }}
      onClick={onDialogClick}
    >
      <div ref={scrimRef} className="sh__scrim" />
      {chapter ? (
        <>
          <HeadMeta title={chapterTitle(chapter)} description={chapter.description} path={chapterPath(chapter.id)} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: chapterJsonLd(chapter, chapterPath(chapter.id)) }} />
        </>
      ) : null}

      <div ref={panelRef} className="sh__panel" tabIndex={-1}>
        <div className="sh__grab" onPointerDown={onDragStart} aria-hidden>
          <span />
        </div>

        {shown ? (
          <>
            <header ref={headRef} className="sh__head" onPointerDown={onDragStart}>
              <div>
                <p className="wk-count">
                  {shown.count} {shown.unit}
                </p>
                <h2 id="sh-title" className="sh__title">
                  {shown.title}
                </h2>
              </div>
              <button type="button" className="sh__close" onClick={requestClose} aria-label="Close">
                <X size={20} weight="bold" aria-hidden />
              </button>
            </header>

            <div ref={bodyRef} className="sh__body" onScroll={onBodyScroll}>
              <p className="sh__intro">{shown.description}</p>
              {shown.items.some((item) => item.screenshots?.length || item.gallery?.length) ? (
                <ProjectList chapter={shown} />
              ) : shown.items.some((item) => item.image) ? (
                <Showcase items={shown.items} />
              ) : (
                <Groups items={shown.items} />
              )}

              {next && next !== shown ? (
                <nav className="sh__next" aria-label="More work" data-reveal>
                  <Link to={chapterPath(next.id)} replace state={location.state} preventScrollReset>
                    <span className="wk-count">Next</span>
                    <span className="sh__next-title">{next.title}</span>
                    <ArrowRight size={22} weight="bold" aria-hidden />
                  </Link>
                </nav>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </dialog>
  )
}

/** Picture-led builds: the first one leads in a wide row, the rest in a grid. */
function Showcase({ items }: { items: WorkItem[] }) {
  // Items with a `group` (Websites) render as one titled grid per group, in first-seen order.
  const groups = [...new Set(items.map((item) => item.group ?? ''))]
  const [lightboxImg, setLightboxImg] = useState<Image | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxGallery, setLightboxGallery] = useState<Image[]>([])
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imgRef = useRef<HTMLImageElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const lightboxDialogRef = useRef<HTMLDialogElement>(null)

  const openLightbox = (gallery: Image[], index: number) => {
    const img = gallery[index]
    if (!img) return
    setLightboxGallery(gallery)
    setLightboxIndex(index)
    setLightboxImg(img)
    setScale(1)
    setTranslate({ x: 0, y: 0 })
    requestAnimationFrame(() => {
      lightboxDialogRef.current?.showModal()
    })
  }

  const closeLightbox = () => {
    lightboxDialogRef.current?.close()
    setLightboxImg(null)
    setLightboxGallery([])
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  const goToImage = (delta: number) => {
    const newIndex = (lightboxIndex + delta + lightboxGallery.length) % lightboxGallery.length
    const nextImg = lightboxGallery[newIndex]
    if (nextImg) {
      setLightboxIndex(newIndex)
      setLightboxImg(nextImg)
      setScale(1)
      setTranslate({ x: 0, y: 0 })
    }
  }

  const zoomIn = () => setScale(s => Math.min(s * 1.5, 8))
  const zoomOut = () => setScale(s => Math.max(s / 1.5, 0.25))
  const resetZoom = () => {
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.ctrlKey || e.metaKey) {
      const factor = e.deltaY > 0 ? 0.9 : 1.1
      setScale(s => Math.min(Math.max(s * factor, 0.25), 8))
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return
    setIsDragging(true)
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y })
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return
    setTranslate({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale <= 1) return
    const touch = e.touches[0]
    if (!touch) return
    setIsDragging(true)
    setDragStart({ x: touch.clientX - translate.x, y: touch.clientY - translate.y })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || scale <= 1) return
    e.preventDefault()
    const touch = e.touches[0]
    if (!touch) return
    setTranslate({ x: touch.clientX - dragStart.x, y: touch.clientY - dragStart.y })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        closeLightbox()
        break
      case 'ArrowLeft':
        goToImage(-1)
        break
      case 'ArrowRight':
        goToImage(1)
        break
      case '+':
      case '=':
        zoomIn()
        break
      case '-':
        zoomOut()
        break
      case '0':
        resetZoom()
        break
    }
  }

  const currentImg = lightboxGallery[lightboxIndex]
  const hasPrev = lightboxGallery.length > 1
  const hasNext = lightboxGallery.length > 1

  return (
    <>
      <div className="sh__sets">
        {groups.map((group, gi) => (
          <section key={group} className="sh__set">
            {group ? (
              <h3 className="sh__group-title" data-reveal>
                {group}
              </h3>
            ) : null}
            <Grid
              items={items.filter((item) => (item.group ?? '') === group)}
              lead={gi === 0}
              onOpenLightbox={openLightbox}
            />
          </section>
        ))}
      </div>

      {lightboxImg && currentImg && (
        <dialog
          ref={lightboxDialogRef}
          className="sh__lightbox"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
          onCancel={(e) => { e.preventDefault(); closeLightbox(); }}
          onKeyDown={handleKeyDown}
          onClose={closeLightbox}
        >
          <div className="sh__lightbox-viewer" ref={viewerRef} onWheel={handleWheel}>
            <img
              ref={imgRef}
              className="sh__lightbox-img"
              src={currentImg.src}
              alt={currentImg.alt}
              width={currentImg.width}
              height={currentImg.height}
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </div>

          <button
            type="button"
            className="sh__lightbox-close"
            onClick={closeLightbox}
            aria-label="Close enlarged image"
          >
            <X size={24} weight="bold" aria-hidden />
          </button>

          {lightboxGallery.length > 1 && (
            <div className="sh__lightbox-controls" role="group" aria-label="Image viewer controls">
              <button
                type="button"
                className="sh__lightbox-btn"
                onClick={() => goToImage(-1)}
                aria-label="Previous image"
                disabled={!hasPrev}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <span className="sh__lightbox-counter" aria-live="polite">
                {lightboxIndex + 1} / {lightboxGallery.length}
              </span>

              <button
                type="button"
                className="sh__lightbox-btn"
                onClick={() => goToImage(1)}
                aria-label="Next image"
                disabled={!hasNext}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>

              <button
                type="button"
                className="sh__lightbox-btn"
                onClick={zoomOut}
                aria-label="Zoom out"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M5 12h14" />
                </svg>
              </button>

              <button
                type="button"
                className="sh__lightbox-btn"
                onClick={resetZoom}
                aria-label="Reset zoom"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 12h6M12 9v6" />
                </svg>
              </button>

              <button
                type="button"
                className="sh__lightbox-btn"
                onClick={zoomIn}
                aria-label="Zoom in"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          )}
        </dialog>
      )}
    </>
  )
}

/** List of projects with featured layout (for chapters with multiple detailed projects). */
function ProjectList({ chapter }: { chapter: WorkChapter }) {
  const { items = [] } = chapter
  // Include all items that have an image (featured image), not just those with screenshots/gallery
  const projectsWithImages = items.filter((item) => item.image)

  // Shared lightbox state for all projects
  const [lightboxImg, setLightboxImg] = useState<Image | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxGallery, setLightboxGallery] = useState<Image[]>([])
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imgRef = useRef<HTMLImageElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const lightboxDialogRef = useRef<HTMLDialogElement>(null)

  const openLightbox = (gallery: Image[], index: number) => {
    const img = gallery[index]
    if (!img) return
    setLightboxGallery(gallery)
    setLightboxIndex(index)
    setLightboxImg(img)
    setScale(1)
    setTranslate({ x: 0, y: 0 })
    requestAnimationFrame(() => {
      lightboxDialogRef.current?.showModal()
    })
  }

  const closeLightbox = () => {
    lightboxDialogRef.current?.close()
    setLightboxImg(null)
    setLightboxGallery([])
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  const goToImage = (delta: number) => {
    const newIndex = (lightboxIndex + delta + lightboxGallery.length) % lightboxGallery.length
    const nextImg = lightboxGallery[newIndex]
    if (nextImg) {
      setLightboxIndex(newIndex)
      setLightboxImg(nextImg)
      setScale(1)
      setTranslate({ x: 0, y: 0 })
    }
  }

  const zoomIn = () => setScale((s) => Math.min(s * 1.5, 8))
  const zoomOut = () => setScale((s) => Math.max(s / 1.5, 0.25))
  const resetZoom = () => {
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.ctrlKey || e.metaKey) {
      const factor = e.deltaY > 0 ? 0.9 : 1.1
      setScale((s) => Math.min(Math.max(s * factor, 0.25), 8))
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return
    setIsDragging(true)
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y })
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return
    setTranslate({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale <= 1) return
    const touch = e.touches[0]
    if (!touch) return
    setIsDragging(true)
    setDragStart({ x: touch.clientX - translate.x, y: touch.clientY - translate.y })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || scale <= 1) return
    e.preventDefault()
    const touch = e.touches[0]
    if (!touch) return
    setTranslate({ x: touch.clientX - dragStart.x, y: touch.clientY - dragStart.y })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        closeLightbox()
        break
      case 'ArrowLeft':
        goToImage(-1)
        break
      case 'ArrowRight':
        goToImage(1)
        break
      case '+':
      case '=':
        zoomIn()
        break
      case '-':
        zoomOut()
        break
      case '0':
        resetZoom()
        break
    }
  }

  const currentImg = lightboxGallery[lightboxIndex]
  const hasPrev = lightboxGallery.length > 1
  const hasNext = lightboxGallery.length > 1

  // Build all images for a project for lightbox navigation
  const getAllImagesForProject = (project: WorkItem): Image[] => {
    const allImages: Image[] = []
    if (project.image) allImages.push(project.image)
    if (project.screenshots) {
      project.screenshots.forEach((s) => allImages.push(s.image))
    } else if (project.gallery) {
      project.gallery.forEach((img) => allImages.push(img))
    }
    return allImages
  }

  return (
    <>
      <div className="sh__projects-list">
        {projectsWithImages.map((project, projectIndex) => (
          <div key={project.id} className="sh__project" data-reveal>
            {/* Featured image with title/description beside it */}
            <div className="sh__featured" data-reveal>
              {project.image && (
                <button
                  type="button"
                  className="sh__shot sh__shot--featured"
                  onClick={() => {
                    const allImages = getAllImagesForProject(project)
                    openLightbox(allImages, 0)
                  }}
                  aria-label={`View ${project.image.alt} enlarged`}
                >
                  <img
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    decoding="async"
                  />
                </button>
              )}
              <div className="sh__featured-caption">
                <span className="sh__featured-label">{project.kicker}</span>
                <h3 className="sh__featured-title">{project.name}</h3>
                <p className="sh__featured-desc">{project.summary}</p>
                {project.stack && (
                  <span className="sh__featured-stack">{project.stack}</span>
                )}
                {project.status && (
                  <span className="sh__status">{project.status}</span>
                )}
              </div>
            </div>

            {/* Additional screenshots grid - grouped by section */}
            {(project.screenshots && project.screenshots.length > 0) && (() => {
              // Group screenshots by group field, preserving original index for lightbox
              interface ScreenshotWithIndex {
                image: Image
                label: string
                title: string
                description: string
                group?: string
                originalIndex: number
              }
              const groups = new Map<string, ScreenshotWithIndex[]>()
              project.screenshots.forEach((screenshot, i) => {
                const groupName = screenshot.group || 'Screenshots'
                if (!groups.has(groupName)) {
                  groups.set(groupName, [])
                }
                groups.get(groupName)!.push({ ...screenshot, originalIndex: i })
              })

              return (
                <div className="sh__screenshots" data-reveal>
                  {Array.from(groups.entries()).map(([groupName, screenshots]) => (
                    <section key={groupName} className="sh__screenshot-group">
                      <h4 className="sh__screenshot-group-title">{groupName}</h4>
                      <div className="sh__screenshot-group-grid">
                        {screenshots.map((screenshot) => {
                          const allImages = getAllImagesForProject(project)
                          const lightboxIndex = 1 + screenshot.originalIndex // featured image is index 0
                          return (
                            <article key={screenshot.image.src} className="sh__screenshot">
                              <button
                                type="button"
                                className="sh__shot"
                                onClick={() => openLightbox(allImages, lightboxIndex)}
                                aria-label={`View ${screenshot.image.alt} enlarged`}
                              >
                                <img
                                  src={screenshot.image.src}
                                  alt={screenshot.image.alt}
                                  width={screenshot.image.width}
                                  height={screenshot.image.height}
                                  loading="lazy"
                                  decoding="async"
                                />
                              </button>
                              <div className="sh__screenshot-caption">
                                <span className="sh__screenshot-label">{screenshot.label}</span>
                                <h4 className="sh__screenshot-title">{screenshot.title}</h4>
                                <p className="sh__screenshot-desc">{screenshot.description}</p>
                              </div>
                            </article>
                          )
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              )
            })()}

            {/* Gallery fallback for backward compatibility */}
            {(!project.screenshots || project.screenshots.length === 0) && project.gallery && project.gallery.length > 0 && (
              <ul className="sh__gallery">
                {project.gallery.map((img, i) => (
                  <li key={img.src} data-reveal>
                    <button
                      type="button"
                      className="sh__shot"
                      onClick={() => {
                        const allImages = getAllImagesForProject(project)
                        openLightbox(allImages, i)
                      }}
                      aria-label={`View ${img.alt} enlarged`}
                    >
                      <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Divider between projects (except last) */}
            {projectIndex < projectsWithImages.length - 1 && (
              <hr className="sh__project-divider" />
            )}
          </div>
        ))}
      </div>

      {lightboxImg && currentImg && (
        <dialog
          ref={lightboxDialogRef}
          className="sh__lightbox"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
          onCancel={(e) => { e.preventDefault(); closeLightbox(); }}
          onKeyDown={handleKeyDown}
          onClose={closeLightbox}
        >
          <div className="sh__lightbox-viewer" ref={viewerRef} onWheel={handleWheel}>
            <img
              ref={imgRef}
              className="sh__lightbox-img"
              src={currentImg.src}
              alt={currentImg.alt}
              width={currentImg.width}
              height={currentImg.height}
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </div>

          <button
            type="button"
            className="sh__lightbox-close"
            onClick={closeLightbox}
            aria-label="Close enlarged image"
          >
            <X size={24} weight="bold" aria-hidden />
          </button>

          {lightboxGallery.length > 1 && (
            <div className="sh__lightbox-controls" role="group" aria-label="Image viewer controls">
              <button
                type="button"
                className="sh__lightbox-btn"
                onClick={() => goToImage(-1)}
                aria-label="Previous image"
                disabled={!hasPrev}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <span className="sh__lightbox-counter" aria-live="polite">
                {lightboxIndex + 1} / {lightboxGallery.length}
              </span>

              <button
                type="button"
                className="sh__lightbox-btn"
                onClick={() => goToImage(1)}
                aria-label="Next image"
                disabled={!hasNext}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>

              <button
                type="button"
                className="sh__lightbox-btn"
                onClick={zoomOut}
                aria-label="Zoom out"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M5 12h14" />
                </svg>
              </button>

              <button
                type="button"
                className="sh__lightbox-btn"
                onClick={resetZoom}
                aria-label="Reset zoom"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 12h6M12 9v6" />
                </svg>
              </button>

              <button
                type="button"
                className="sh__lightbox-btn"
                onClick={zoomIn}
                aria-label="Zoom in"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          )}
        </dialog>
      )}
    </>
  )
}

function Grid({
  items,
  lead,
  onOpenLightbox,
}: { items: WorkItem[]; lead: boolean; onOpenLightbox: (gallery: Image[], index: number) => void }) {
  return (
    <ul className="sh__grid">
      {items.map((item, i) => {
        const gallery = item.gallery ?? []
        return (
          <li key={item.id} className={lead && i === 0 ? 'sh__item sh__item--lead' : 'sh__item'} data-reveal>
            <ItemLink item={item}>
              {gallery.length > 0 ? (
                <button
                  type="button"
                  className="sh__shot"
                  onClick={() => onOpenLightbox(gallery, 0)}
                  aria-label={`View ${item.name} screenshots enlarged`}
                >
                  {item.image ? (
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      loading={i < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  ) : null}
                </button>
              ) : (
                <span className={item.href ? 'sh__shot' : 'sh__shot sh__shot--contain'}>
                  {item.image ? (
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      loading={i < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  ) : null}
                </span>
              )}
              <span className="sh__cap">
                <span className="wk-count">
                  {item.kicker}
                  {item.status ? <span className="sh__status">{item.status}</span> : null}
                </span>
                <h3 className="sh__name">
                  {item.name}
                  {item.href ? <ArrowUpRight size={16} weight="bold" aria-hidden /> : null}
                </h3>
                <span className="sh__sum">{item.summary}</span>
              </span>
            </ItemLink>
          </li>
        )
      })}
    </ul>
  )
}

/** Builds with no pictures (side projects and experiments): grouped rows. */
function Groups({ items }: { items: WorkItem[] }) {
  const groups = [...new Set(items.map((item) => item.kicker))]
  return (
    <div className="sh__groups">
      {groups.map((group) => (
        <section key={group} className="sh__group" data-reveal>
          <h3 className="sh__group-title">{group}</h3>
          <ul>
            {items
              .filter((item) => item.kicker === group)
              .map((item) => (
                <li key={item.id} className="sh__row">
                  <h4 className="sh__name">{item.name}</h4>
                  <p className="sh__sum">{item.summary}</p>
                  <p className="wk-count">
                    {item.stack}
                    {item.status ? <span className="sh__status">{item.status}</span> : null}
                  </p>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  )
}


/** A live build opens in a new tab; one without a public link is a plain block. */
function ItemLink({ item, children }: { item: WorkItem; children: ReactNode }) {
  if (!item.href) return <div className="sh__link">{children}</div>
  return (
    <a className="sh__link" href={item.href} target="_blank" rel="noopener">
      {children}
    </a>
  )
}
