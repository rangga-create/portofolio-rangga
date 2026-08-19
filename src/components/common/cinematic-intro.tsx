import AmongUsAnimation from 'assets/animation/amongus.json'
import RocketAnimation from 'assets/animation/rocket.json'
import WarningAnimation from 'assets/animation/warning.json'
import SatisfiedThumbsUp from 'assets/images/satisfied-thumbs-up.gif'
import { AnimatePresence, motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import Lottie from 'lottie-react'
import React, { useEffect, useRef, useState } from 'react'

type Phase = 'alarm' | 'intruder' | 'defend' | 'secured' | 'reveal'

const TIMING = {
  alarm: 1500,
  intruder: 1400,
  defend: 1700,
  secured: 1500
}

function CinematicIntro({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<Phase>('alarm')
  const [skipped, setSkipped] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    const schedule = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms))
    }
    schedule(() => setPhase('intruder'), TIMING.alarm)
    schedule(() => setPhase('defend'), TIMING.alarm + TIMING.intruder)
    schedule(() => setPhase('secured'), TIMING.alarm + TIMING.intruder + TIMING.defend)
    schedule(() => setPhase('reveal'), TIMING.alarm + TIMING.intruder + TIMING.defend + TIMING.secured)
    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    if (phase === 'reveal' && !skipped) {
      const t = setTimeout(onFinish, 950)
      timersRef.current.push(t)
      return () => clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, skipped])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') skip()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const skippedRef = useRef(false)
  const skip = () => {
    if (skippedRef.current) return
    skippedRef.current = true
    setSkipped(true)
    setPhase('reveal')
  }

  return (
    <AnimatePresence>
      {!skipped && (
        <motion.div
          key="cinematic"
          className="fixed left-0 top-0 z-[92] flex h-screen w-screen select-none flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
          animate={phase === 'reveal' ? { y: '-100vh' } : { y: 0 }}
          transition={{ duration: 0.9, ease: easeDefault }}
          style={{ touchAction: 'manipulation' }}
        >
          {/* red alarm vignette */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{
              opacity: phase === 'secured' || phase === 'reveal' ? 0 : 0.55,
              boxShadow:
                phase === 'alarm' || phase === 'intruder' ? 'inset 0 0 140px 40px rgba(220,38,38,0.5)' : 'inset 0 0 140px 40px rgba(234,229,223,0.15)'
            }}
            transition={{ duration: 0.5 }}
          />

          {/* top alarm strip */}
          <motion.div
            className="absolute inset-x-0 top-0 flex items-center justify-center gap-3 bg-red-600/90 py-2"
            animate={{ y: phase === 'secured' || phase === 'reveal' ? -100 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            <span className="font-spartan text-sm tracking-[0.4em] text-white md:text-base">⚠ SECURITY ALERT</span>
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          </motion.div>

          {/* phase: alarm */}
          <AnimatePresence>
            {phase === 'alarm' && (
              <motion.div
                key="alarm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="relative flex flex-col items-center"
              >
                <motion.div
                  animate={{ rotate: [0, -4, 4, -4, 0] }}
                  transition={{ duration: 0.45, repeat: Infinity, repeatDelay: 0.35 }}
                  className="w-36 md:w-44"
                >
                  <Lottie animationData={WarningAnimation} loop />
                </motion.div>
                <motion.h1
                  className="mt-6 text-center font-display text-4xl font-bold text-red-500 md:text-7xl"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  SITE UNDER ATTACK
                </motion.h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* phase: intruder */}
          <AnimatePresence>
            {phase === 'intruder' && (
              <motion.div
                key="intruder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex flex-col items-center"
              >
                <motion.div
                  initial={{ x: '60vw', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: easeDefault }}
                  className="w-40 md:w-56"
                >
                  <Lottie animationData={AmongUsAnimation} loop />
                </motion.div>
                <p className="mt-4 font-spartan text-xl tracking-[0.3em] text-red-400 md:text-2xl">INTRUDER DETECTED...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* phase: defend — rocket launch */}
          <AnimatePresence>
            {phase === 'defend' && (
              <motion.div
                key="defend"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex h-[60vh] w-full flex-col items-center justify-end"
              >
                <motion.div
                  initial={{ y: '45vh', opacity: 0 }}
                  animate={{ y: '-45vh', opacity: 1 }}
                  transition={{ duration: 1.4, ease: 'easeIn' }}
                  className="w-24 md:w-32"
                >
                  <Lottie animationData={RocketAnimation} loop={false} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.4, times: [0, 0.7, 0.85, 1] }}
                  className="pointer-events-none absolute inset-0 bg-white"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* phase: secured */}
          <AnimatePresence>
            {phase === 'secured' && (
              <motion.div
                key="secured"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center px-6 text-center"
              >
                <motion.img
                  src={SatisfiedThumbsUp}
                  alt="site secured"
                  className="w-32 rounded-xl md:w-40"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.h1
                  className="mt-6 font-display text-3xl font-bold text-secondary md:text-6xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                >
                  SITE SECURED ✔
                </motion.h1>
                <motion.p
                  className="mt-3 font-spartan text-sm tracking-[0.3em] text-secondary/60 md:text-base"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  THIS PORTFOLIO IS PROTECTED BY RANGGA
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* skip */}
          <button
            onClick={skip}
            className="absolute right-4 top-14 z-10 rounded-full border border-secondary/30 px-5 py-2 font-spartan text-xs tracking-[0.25em] text-secondary/70 transition-colors hover:bg-secondary hover:text-primary md:right-8"
          >
            SKIP INTRO →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default React.memo(CinematicIntro)
