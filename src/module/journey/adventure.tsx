import { AnimatePresence, motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import React, { useRef, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineHome, AiOutlinePicture } from 'react-icons/ai'
import { adventurePaths, type AdventurePath } from './journey-data'
import PhotoGallery, { type PhotoGalleryHandle } from './photo-gallery'

const fadeSlide = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 })
}

function PathCard({ path, onPick }: { path: AdventurePath; onPick: () => void }) {
  return (
    <motion.button
      onClick={onPick}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: easeDefault }}
      className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-secondary/20 bg-primary p-8 text-left transition-colors duration-300 hover:border-secondary/40 md:p-10"
    >
      <span className="absolute left-0 top-0 h-full w-1.5" style={{ backgroundColor: path.color }} />
      <span className="text-5xl md:text-6xl">{path.icon}</span>
      <h3 className="mt-5 font-display text-2xl font-semibold text-secondary md:text-3xl">{path.title}</h3>
      <p className="mt-2 font-poppins text-sm text-secondary/60 md:text-base">{path.tagline}</p>
      <span
        className="mt-6 flex items-center gap-2 font-poppins text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 group-hover:gap-4"
        style={{ color: path.color }}
      >
        Start the story <AiOutlineArrowRight className="text-base" />
      </span>
    </motion.button>
  )
}

function StoryView({ path, onBack }: { path: AdventurePath; onBack: () => void }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const isLast = index === path.scenes.length - 1

  const goTo = (next: number, dir: number) => {
    setDirection(dir)
    setIndex(next)
  }

  const scene = path.scenes[index]
  const galleryRef = useRef<PhotoGalleryHandle>(null)
  const scenePhotos = scene.photos?.length ? scene.photos : [scene.image]
  const heroIndex = Math.max(
    0,
    scenePhotos.findIndex((p) => p === scene.image)
  )

  return (
    <div className="rounded-2xl border border-secondary/20 bg-primary p-6 md:p-10">
      {/* top bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-poppins text-xs uppercase tracking-[0.25em] text-secondary/50 transition-colors hover:text-secondary"
        >
          <AiOutlineArrowLeft className="text-base" /> Other paths
        </button>
        <div className="flex items-center gap-2">
          {path.scenes.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to chapter ${i + 1}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === index ? 28 : 8,
                backgroundColor: i === index ? path.color : 'rgba(234,229,223,0.25)'
              }}
            />
          ))}
        </div>
      </div>

      {/* scene */}
      <div className="mt-8 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={fadeSlide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: easeDefault }}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-secondary/10 md:aspect-[21/9]">
              <motion.img
                src={scene.image}
                alt={scene.title}
                className="h-full w-full object-cover"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: easeDefault }}
              />
              <button
                onClick={() => galleryRef.current?.openAt(heroIndex)}
                aria-label={`Lihat foto kegiatan ${scene.title}`}
                className="group absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 hover:bg-black/30"
              >
                <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-poppins text-xs text-transparent backdrop-blur-sm transition-all duration-300 group-hover:text-white md:text-sm">
                  <AiOutlinePicture className="text-base" /> Lihat foto kegiatan
                </span>
              </button>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
                <div>
                  <p className="font-poppins text-[10px] uppercase tracking-[0.3em]" style={{ color: path.color }}>
                    Chapter {index + 1} · {scene.role}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-white md:text-4xl">{scene.title}</h3>
                </div>
                <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 font-poppins text-[10px] text-white/80 backdrop-blur-sm md:text-xs">
                  {scene.period}
                </span>
              </div>
            </div>
            <p className="mt-6 font-poppins text-base leading-relaxed text-secondary/80 md:text-xl">{scene.text}</p>

            {scene.photos?.length ? (
              <p className="mb-3 mt-6 font-poppins text-[10px] uppercase tracking-[0.3em] text-secondary/50">📷 Galeri kegiatan</p>
            ) : null}
            <PhotoGallery
              ref={galleryRef}
              photos={scenePhotos}
              title={scene.title}
              accentColor={path.color}
              showSingleTrigger={Boolean(scene.photos?.length)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* bottom controls */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => goTo(index - 1, -1)}
          disabled={index === 0}
          className="flex items-center gap-2 rounded-full border border-secondary/25 px-5 py-2.5 font-poppins text-sm text-secondary transition-all duration-300 enabled:hover:bg-secondary enabled:hover:text-primary disabled:opacity-30"
        >
          <AiOutlineArrowLeft /> Prev
        </button>

        {isLast ? (
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 rounded-full border border-secondary/25 px-5 py-2.5 font-poppins text-sm text-secondary transition-all duration-300 hover:bg-secondary hover:text-primary"
            >
              <AiOutlineHome /> All paths
            </button>
            <button
              onClick={() => goTo(0, 1)}
              className="rounded-full px-6 py-2.5 font-poppins text-sm font-semibold text-primary transition-transform duration-300 hover:scale-105"
              style={{ backgroundColor: path.color }}
            >
              ↺ Replay
            </button>
          </div>
        ) : (
          <button
            onClick={() => goTo(index + 1, 1)}
            className="flex items-center gap-2 rounded-full px-6 py-2.5 font-poppins text-sm font-semibold text-primary transition-transform duration-300 hover:scale-105"
            style={{ backgroundColor: path.color }}
          >
            Next <AiOutlineArrowRight />
          </button>
        )}
      </div>

      {/* completion toast */}
      <AnimatePresence>
        {isLast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-xl border border-dashed p-5 text-center"
            style={{ borderColor: path.color + '66' }}
          >
            <p className="font-poppins text-sm text-secondary/70 md:text-base">
              🏆 <span className="font-semibold text-secondary">Path complete!</span> That&apos;s one side of Rangga&apos;s story — there are{' '}
              {adventurePaths.length - 1} more to explore.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Adventure() {
  const [activePath, setActivePath] = useState<AdventurePath | null>(null)

  return (
    <div>
      <AnimatePresence mode="wait">
        {activePath ? (
          <motion.div
            key={activePath.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: easeDefault }}
          >
            <StoryView path={activePath} onBack={() => setActivePath(null)} />
          </motion.div>
        ) : (
          <motion.div
            key="paths"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: easeDefault }}
          >
            <p className="font-poppins text-sm text-secondary/60 md:text-base">
              Every developer has more than one story. Pick a path and step into a chapter of Rangga&apos;s journey — complete them all to see the
              full picture. 🗺️
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {adventurePaths.map((path) => (
                <PathCard key={path.id} path={path} onPick={() => setActivePath(path)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default React.memo(Adventure)
