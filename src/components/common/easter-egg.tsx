/* eslint-disable react/no-unescaped-entities */
import AmongUsAnimation from 'assets/animation/amongus.json'
import CarAnimation from 'assets/animation/car.json'
import WarningAnimation from 'assets/animation/warning.json'
import { AnimatePresence, motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import Lottie from 'lottie-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TfiClose } from 'react-icons/tfi'

type EasterType = 'amongus' | 'car' | 'warning'

const KONAMI_SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
const CONFETTI_COLORS = ['#FFC436', '#EAE5DF', '#F1592A', '#0091F8', '#FF7BAC']
const DURATION: Record<EasterType, number> = { amongus: 8000, car: 5000, warning: 4000 }

export default function EasterEgg() {
  const [active, setActive] = useState<EasterType | null>(null)
  const keysRef = useRef<string[]>([])
  const wordRef = useRef('')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const confetti = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.2 + Math.random() * 2,
        rotate: Math.random() * 360,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 8 + Math.random() * 10
      })),
    []
  )

  const trigger = useCallback((type: EasterType) => {
    setActive(type)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setActive(null), DURATION[type])
  }, [])

  const onClose = useCallback(() => setActive(null), [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      keysRef.current = [...keysRef.current, e.key.toLowerCase()].slice(-KONAMI_SEQUENCE.length)
      if (keysRef.current.join(',') === KONAMI_SEQUENCE.join(',')) {
        keysRef.current = []
        trigger('amongus')
        return
      }

      wordRef.current = (wordRef.current + e.key.toLowerCase()).slice(-12)
      if (wordRef.current.includes('car')) {
        wordRef.current = ''
        trigger('car')
      } else if (wordRef.current.includes('rangga')) {
        wordRef.current = ''
        trigger('warning')
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [trigger])

  return (
    <AnimatePresence>
      {active === 'amongus' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-primary/80 backdrop-blur-sm"
        >
          {confetti.map((c) => (
            <motion.span
              key={c.id}
              initial={{ y: '-10vh', opacity: 0, rotate: 0 }}
              animate={{ y: '110vh', opacity: [0, 1, 1, 0.6], rotate: c.rotate }}
              transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: 'linear' }}
              className="pointer-events-none absolute top-0"
              style={{ left: `${c.left}%`, width: c.size, height: c.size, backgroundColor: c.color }}
            />
          ))}
          <motion.div
            initial={{ scale: 0.6, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: easeDefault }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center gap-5 rounded-2xl bg-secondary p-10 text-center"
          >
            <button
              onClick={onClose}
              aria-label="close easter egg"
              className="absolute right-4 top-4 text-primary transition-transform duration-200 hover:rotate-90"
            >
              <TfiClose size={18} />
            </button>
            <Lottie animationData={AmongUsAnimation} loop style={{ width: 180, height: 180 }} />
            <h2 className="font-display text-3xl font-semibold text-primary md:text-4xl">SUS! 🕵️</h2>
            <p className="max-w-sm font-poppins text-sm text-primary/70 md:text-base">
              Congratulations, you found the hidden impostor easter egg! There are more secrets waiting to be discovered...
            </p>
          </motion.div>
        </motion.div>
      )}

      {active === 'car' && (
        <motion.div
          initial={{ x: '-30vw' }}
          animate={{ x: '130vw' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 4.2, ease: 'linear' }}
          className="pointer-events-none fixed bottom-8 z-[120]"
        >
          <Lottie animationData={CarAnimation} loop style={{ width: 220, height: 220 }} />
        </motion.div>
      )}

      {active === 'warning' && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: easeDefault }}
          className="fixed right-5 top-5 z-[120] flex items-center gap-3 rounded-xl border border-secondary bg-primary p-4 shadow-2xl"
        >
          <Lottie animationData={WarningAnimation} loop style={{ width: 56, height: 56 }} />
          <div className="pr-4">
            <h3 className="font-display text-lg font-semibold text-secondary">You typed my name... 🚨</h3>
            <p className="font-poppins text-sm text-secondary/70">I'm watching you 👀</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
