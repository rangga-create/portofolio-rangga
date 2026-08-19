import { AnimatePresence, motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineClose, AiOutlinePicture } from 'react-icons/ai'

export type PhotoGalleryHandle = {
  openAt: (index: number) => void
}

type PhotoGalleryProps = {
  photos: string[]
  title?: string
  accentColor?: string
  /** Kalau false & cuma 1 foto, tombol "Lihat Foto" disembunyikan (hero image sudah bisa diklik). */
  showSingleTrigger?: boolean
}

/**
 * Galeri foto kegiatan:
 * - strip thumbnail (klik thumbnail → buka lightbox)
 * - kalau cuma 1 foto, tampil tombol "Lihat Foto" (bisa disembunyikan via showSingleTrigger)
 * - lightbox: panah kiri/kanan, tombol ✕, klik di luar, keyboard (Esc / panah)
 */
const PhotoGallery = forwardRef<PhotoGalleryHandle, PhotoGalleryProps>(
  ({ photos, title, accentColor = '#FFC436', showSingleTrigger = true }, ref) => {
    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(0)
    const closeBtnRef = useRef<HTMLButtonElement>(null)
    const prevFocusRef = useRef<HTMLElement | null>(null)

    useImperativeHandle(ref, () => ({
      openAt: (i: number) => {
        setIndex(i)
        setOpen(true)
      }
    }))

    // keyboard navigation + lock body scroll while open
    useEffect(() => {
      if (!open) return
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
        if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % photos.length)
        if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + photos.length) % photos.length)
      }
      window.addEventListener('keydown', onKeyDown)
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        window.removeEventListener('keydown', onKeyDown)
        document.body.style.overflow = prevOverflow
      }
    }, [open, photos.length])

    // focus management: pindah fokus ke tombol tutup saat open, restore saat close
    useEffect(() => {
      if (open) {
        prevFocusRef.current = document.activeElement as HTMLElement | null
        closeBtnRef.current?.focus()
      } else {
        prevFocusRef.current?.focus?.()
        prevFocusRef.current = null
      }
    }, [open])

    const prev = (e: React.MouseEvent) => {
      e.stopPropagation()
      setIndex((i) => (i - 1 + photos.length) % photos.length)
    }
    const next = (e: React.MouseEvent) => {
      e.stopPropagation()
      setIndex((i) => (i + 1) % photos.length)
    }

    const openAt = (i: number) => {
      setIndex(i)
      setOpen(true)
    }

    const showTrigger = photos.length > 1 || (photos.length === 1 && showSingleTrigger)

    return (
      <>
        {showTrigger &&
          (photos.length === 1 ? (
            <button
              onClick={() => openAt(0)}
              className="flex items-center gap-2 rounded-full border border-secondary/25 px-4 py-2 font-poppins text-xs text-secondary transition-all duration-300 hover:bg-secondary hover:text-primary md:text-sm"
            >
              <AiOutlinePicture className="text-base" /> Lihat Foto
            </button>
          ) : (
            <div className="flex flex-wrap gap-3">
              {photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => openAt(i)}
                  aria-label={`Lihat foto ${title ?? 'kegiatan'} ${i + 1}`}
                  className="group relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-secondary/20 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/60 md:h-24 md:w-36"
                >
                  <img
                    src={photo}
                    alt={`${title ?? 'Foto kegiatan'} ${i + 1}`}
                    draggable={false}
                    className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                    <AiOutlineArrowRight className="text-lg" />
                  </span>
                </button>
              ))}
            </div>
          ))}

        {/* Lightbox */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="photo-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
              role="dialog"
              aria-modal="true"
              aria-label={title ? `Galeri ${title}` : 'Galeri foto'}
            >
              {/* close */}
              <button
                ref={closeBtnRef}
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(false)
                }}
                aria-label="Tutup galeri"
                className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-all duration-300 hover:rotate-90 hover:border-white/60 hover:text-white md:right-8 md:top-8"
              >
                <AiOutlineClose className="text-xl" />
              </button>

              {/* arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Foto sebelumnya"
                    className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white/80 transition-all duration-300 hover:border-white/60 hover:text-white md:left-8"
                  >
                    <AiOutlineArrowLeft className="text-xl" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Foto berikutnya"
                    className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white/80 transition-all duration-300 hover:border-white/60 hover:text-white md:right-8"
                  >
                    <AiOutlineArrowRight className="text-xl" />
                  </button>
                </>
              )}

              {/* image */}
              <div onClick={(e) => e.stopPropagation()} className="flex max-h-full w-full max-w-5xl flex-col items-center">
                <div className="flex max-h-[78vh] w-full items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={index}
                      src={photos[index]}
                      alt={title ? `${title} — foto ${index + 1}` : `Foto ${index + 1}`}
                      draggable={false}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.35, ease: easeDefault }}
                      className="max-h-[78vh] w-auto max-w-full select-none rounded-xl object-contain shadow-2xl"
                    />
                  </AnimatePresence>
                </div>

                {/* caption */}
                <div className="mt-4 flex flex-col items-center gap-1.5">
                  {photos.length > 1 && (
                    <span className="rounded-full bg-white/10 px-3 py-1 font-poppins text-xs" style={{ color: accentColor }}>
                      {index + 1} / {photos.length}
                    </span>
                  )}
                  {title && <p className="font-poppins text-sm text-white/60 md:text-base">{title}</p>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }
)

PhotoGallery.displayName = 'PhotoGallery'

export default React.memo(PhotoGallery)
