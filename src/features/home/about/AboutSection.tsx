import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, MapPin, X } from '@phosphor-icons/react'
import { aboutSection, capabilities, credentials, certificates, type AboutCredential } from '@/content/about'
import { certification, externalLinks, socials } from '@/content/site'
import { personJsonLd } from '@/lib/seo'
import { setScrollLock } from '@/lib/motion/smooth-scroll'
import './about.css'

const pad2 = (n: number) => String(n).padStart(2, '0')

const personLd = personJsonLd({
  description: aboutSection.lede,
  skills: capabilities.map((c) => c.title),
  credential: { name: certification.title, id: certification.detail.replace(/^(Member|Credential) ID /, ''), url: certification.href },
  sameAs: [...socials.filter((s) => !s.partner).map((s) => s.href), ...(certification.href ? [certification.href] : [])],
  companyUrl: externalLinks.company,
})

function Credential({ c }: { c: AboutCredential }) {
  const isBrand = c.id === 'brand'

  // Standard credentials (cert, place, community)
  if (!isBrand) {
    const body = (
      <>
        <span className="ab__cred-mark">
          {c.image ? <img className={c.imageDark ? 'only-light' : undefined} src={c.image.src} alt="" width={c.image.width} height={c.image.height} loading="lazy" decoding="async" /> : <MapPin size={16} weight="fill" aria-hidden />}
          {c.imageDark ? <img className="only-dark" src={c.imageDark.src} alt="" width={c.imageDark.width} height={c.imageDark.height} loading="lazy" decoding="async" /> : null}
        </span>
        <span className="ab__cred-copy">
          <b>{c.title}</b>
          <small>{c.detail}</small>
        </span>
      </>
    )
    return c.href ? (
      <a className="ab__cred" href={c.href} target="_blank" rel="noopener noreferrer">
        {body}
        <ArrowUpRight className="ab__cred-go" size={15} weight="bold" aria-hidden />
      </a>
    ) : (
      <span className="ab__cred">{body}</span>
    )
  }

  // WilbertBuildsAI brand — transparent logo with theme-aware switching
  return (
    <a className="ab__cred ab__cred--brand" href={c.href} target="_blank" rel="noopener noreferrer">
      <span className="ab__cred-logo">
        {c.image && <img className="only-light" src={c.image.src} alt="" width={c.image.width} height={c.image.height} loading="lazy" decoding="async" />}
        {c.imageDark && <img className="only-dark" src={c.imageDark.src} alt="" width={c.imageDark.width} height={c.imageDark.height} loading="lazy" decoding="async" />}
      </span>
      <span className="ab__cred-copy">
        <b>{c.title}</b>
        <small>{c.detail}</small>
      </span>
      <ArrowUpRight className="ab__cred-go" size={15} weight="bold" aria-hidden />
    </a>
  )
}

function ToolIcon({ name, logo, scale = 1 }: { name: string; logo: string; scale?: number }) {
  const size = 20 * scale
  return (
    <span className="ab__key" title={name} aria-label={name} style={{ '--icon-size': `${size}px` } as React.CSSProperties}>
      <img src={logo} alt={name} width={size} height={size} loading="lazy" decoding="async" />
    </span>
  )
}

/**
 * About, "The floor": the desk illustration set large, standing on a
 * hairline floor that runs edge to edge, the story set over its space; the four roles with their
 * tools as raised paper keys and the credentials sit below the floor. The picture rises onto the
 * floor as it scrolls in (CSS scroll-driven, compositor only; still under reduced motion).
 */
export function AboutSection() {
  const s = aboutSection
  const [certModalOpen, setCertModalOpen] = useState(false)

  return (
    <section id="about" className="ab" aria-labelledby="ab-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personLd }} />
      <header>
        <p className="wk-eyebrow">{s.eyebrow}</p>
        <h2 id="ab-title" className="wk-title">
          <span>{s.titleThin}</span> <span className="wk-title__bold">{s.titleBold}</span>
        </h2>
        <p className="ab__lede">{s.lede}</p>
      </header>

      <div className="ab__stage">
        <p className="ab__lead">
          {s.lead} <span>{s.leadQuiet}</span>
        </p>
        <div className="ab__pic">
          <img
            src={s.picture.src}
            srcSet={s.picture.srcSet}
            sizes="auto, (min-width: 1024px) 46vw, 92vw"
            alt={s.picture.alt}
            width={s.picture.width}
            height={s.picture.height}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="ab__below">
        <div className="ab__bio">
          <p className="ab__note">
            <strong>{s.note.company}</strong>{' '}
            <a href={s.note.product.href} target="_blank" rel="noopener noreferrer">
              {s.note.product.label}
              <ArrowUpRight size={14} weight="bold" aria-hidden />
            </a>
          </p>
        </div>
        <ul className="ab__caps">
          {capabilities.map((c, i) => (
            <li key={c.title} className="ab__cap">
              <span className="ab__keys">
                {c.tools.map((t) => (
                  <ToolIcon key={t.name} name={t.name} logo={t.logo} scale={t.scale} />
                ))}
              </span>
              <span className="ab__cap-title">{c.title}</span>
              <span className="ab__cap-i" aria-hidden>
                {pad2(i + 1)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ab__creds">
        {credentials.map((c) => (
          <Credential key={c.id} c={c} />
        ))}
        <div className="ab__cert-cta">
          <button
            type="button"
            className="ab__cert-btn"
            onClick={() => setCertModalOpen(true)}
          >
            VIEW ALL 6 CERTIFICATES
            <ArrowUpRight size={14} weight="bold" aria-hidden />
          </button>
        </div>
      </div>

      <CertificationsModal open={certModalOpen} onClose={() => setCertModalOpen(false)} />
    </section>
  )
}

/** Certifications popup modal. */
function CertificationsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imgRef = useRef<HTMLImageElement>(null)

  // Handle dialog open/close with showModal/close for proper top-layer positioning
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      if (!dialog.open) {
        dialog.showModal()
        setScrollLock(true)
      }
      const panel = dialog.querySelector('.ab__cert-modal__panel') as HTMLElement | null
      panel?.focus({ preventScroll: true })
      return
    }
    if (dialog.open) {
      dialog.close()
      setScrollLock(false)
    }

    // Cleanup on unmount: ensure scroll lock is released even if modal was open
    return () => {
      setScrollLock(false)
    }
  }, [open])

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget && !lightboxOpen) onClose()
  }

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!lightboxOpen) onClose()
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setScale(1)
    setTranslate({ x: 0, y: 0 })
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  const goToImage = (delta: number) => {
    const newIndex = (lightboxIndex + delta + certificates.length) % certificates.length
    setLightboxIndex(newIndex)
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  const zoomIn = () => setScale(s => Math.min(s * 1.5, 8))
  const zoomOut = () => setScale(s => Math.max(s / 1.5, 0.25))
  const resetZoom = () => { setScale(1); setTranslate({ x: 0, y: 0 }) }

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

  const handleMouseUp = () => { setIsDragging(false) }

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

  const handleTouchEnd = () => { setIsDragging(false) }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        if (lightboxOpen) closeLightbox()
        else onClose()
        break
      case 'ArrowLeft':
        if (lightboxOpen) goToImage(-1)
        break
      case 'ArrowRight':
        if (lightboxOpen) goToImage(1)
        break
      case '+':
      case '=':
        if (lightboxOpen) zoomIn()
        break
      case '-':
        if (lightboxOpen) zoomOut()
        break
      case '0':
        if (lightboxOpen) resetZoom()
        break
    }
  }

  const currentCert = certificates[lightboxIndex]

  if (!open) return null

  // Render modal content
  const modalContent = (
    <dialog
      ref={dialogRef}
      className="ab__cert-modal"
      onCancel={handleCancel}
      onClick={handleDialogClick}
      onKeyDown={handleKeyDown}
    >
      <div className="ab__cert-modal__panel" role="document" tabIndex={-1}>
        <div className="ab__cert-modal__grab" aria-hidden><span /></div>

        <header className="ab__cert-modal__head">
          <div className="ab__cert-modal__head-content">
            <h3>CERTIFICATIONS & TRAINING</h3>
            <p className="ab__cert-modal__subtitle">
              Explore my AI, automation, and CRM training credentials.
            </p>
            <span className="ab__cert-modal__count">6 completed courses</span>
          </div>
          <button type="button" className="ab__cert-modal__close" onClick={onClose} aria-label="Close">
            <X size={20} weight="bold" aria-hidden />
          </button>
        </header>

        <div className="ab__cert-modal__body">
          <div className="ab__cert-modal__grid">
            {certificates.map((cert, index) => (
              <article key={cert.id} className="ab__cert-card">
                <div className="ab__cert-card__image">
                  <button
                    type="button"
                    className="ab__cert-image-btn"
                    onClick={() => openLightbox(index)}
                    aria-label={`View ${cert.title} enlarged`}
                  >
                    <img
                      src={cert.imageSrc}
                      alt={cert.imageAlt}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                </div>
                <div className="ab__cert-card__info">
                  <h4 className="ab__cert-card__title">{cert.title}</h4>
                  <p className="ab__cert-card__issuer">{cert.issuer}</p>
                  <p className="ab__cert-card__date">{cert.issuedDate}</p>
                  <a
                    className="ab__cert-card__verify"
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Certificate
                    <ArrowUpRight size={12} weight="bold" aria-hidden />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  )

  // Render lightbox if open
  const lightboxContent = lightboxOpen && currentCert ? (
    <dialog
      className="ab__lightbox"
      onCancel={(e) => { e.preventDefault(); closeLightbox(); }}
      onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
      onKeyDown={handleKeyDown}
    >
      <div className="ab__lightbox-viewer" onWheel={handleWheel}>
        <img
          ref={imgRef}
          className="ab__lightbox-img"
          src={currentCert.imageSrc}
          alt={currentCert.imageAlt}
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: '0 0',
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
        className="ab__lightbox-close"
        onClick={closeLightbox}
        aria-label="Close enlarged image"
      >
        <X size={24} weight="bold" aria-hidden />
      </button>

      {certificates.length > 1 && (
        <div className="ab__lightbox-controls" role="group" aria-label="Certificate viewer controls">
          <button
            type="button"
            className="ab__lightbox-btn"
            onClick={() => goToImage(-1)}
            aria-label="Previous certificate"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <span className="ab__lightbox-counter" aria-live="polite">
            {lightboxIndex + 1} / {certificates.length}
          </span>

          <button
            type="button"
            className="ab__lightbox-btn"
            onClick={() => goToImage(1)}
            aria-label="Next certificate"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          <button
            type="button"
            className="ab__lightbox-btn"
            onClick={zoomOut}
            aria-label="Zoom out"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M5 12h14" />
            </svg>
          </button>

          <button
            type="button"
            className="ab__lightbox-btn"
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
            className="ab__lightbox-btn"
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
  ) : null

  // Portal both modals to document.body for proper top-layer positioning
  return createPortal(<>{modalContent}{lightboxContent}</>, document.body)
}
