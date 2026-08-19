/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BsArrowCounterclockwise, BsArrowDown, BsArrowLeft, BsArrowRight, BsArrowUp, BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { easeDefault } from 'lib/utils'

const GRID = 21
const CELL = 20
const SIZE = GRID * CELL
const HIGH_SCORE_KEY = 'rangga-snake-high-score'

const FOOD_EMOJIS = ['⚛️', '🔥', '🧠', '🚀', '💡']
const INITIAL_SPEED = 150
const MIN_SPEED = 75

type Direction = 'up' | 'down' | 'left' | 'right'
type Status = 'idle' | 'playing' | 'paused' | 'over'
type Vec = { x: number; y: number }

const OPPOSITE: Record<Direction, Direction> = { up: 'down', down: 'up', left: 'right', right: 'left' }
const DIRECTION_VECTOR: Record<Direction, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }

function getHighScore() {
  if (typeof window === 'undefined') return 0
  return Number(window.localStorage.getItem(HIGH_SCORE_KEY) || 0)
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const snakeRef = useRef<Vec[]>([])
  const dirRef = useRef<Direction>('right')
  const nextDirRef = useRef<Direction>('right')
  const foodRef = useRef<Vec>({ x: 10, y: 10 })
  const foodEmojiRef = useRef(FOOD_EMOJIS[0])
  const scoreRef = useRef(0)
  const speedRef = useRef(INITIAL_SPEED)
  const accRef = useRef(0)
  const lastTimeRef = useRef(0)
  const statusRef = useRef<Status>('idle')
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  const [status, setStatus] = useState<Status>('idle')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(getHighScore)

  useEffect(() => {
    statusRef.current = status
  }, [status])

  const spawnFood = useCallback(() => {
    const snake = snakeRef.current
    let pos: Vec
    do {
      pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }
    } while (snake.some((s) => s.x === pos.x && s.y === pos.y))
    foodRef.current = pos
    foodEmojiRef.current = FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)]
  }, [])

  const resetGame = useCallback(() => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
      { x: 7, y: 10 }
    ]
    dirRef.current = 'right'
    nextDirRef.current = 'right'
    scoreRef.current = 0
    speedRef.current = INITIAL_SPEED
    accRef.current = 0
    setScore(0)
    spawnFood()
  }, [spawnFood])

  const step = useCallback(() => {
    const snake = snakeRef.current
    if (OPPOSITE[nextDirRef.current] !== dirRef.current) dirRef.current = nextDirRef.current

    const head = snake[0]
    const [dx, dy] = DIRECTION_VECTOR[dirRef.current]
    const newHead = { x: head.x + dx, y: head.y + dy }

    const hitWall = newHead.x < 0 || newHead.x >= GRID || newHead.y < 0 || newHead.y >= GRID
    const hitSelf = snake.some((s) => s.x === newHead.x && s.y === newHead.y)

    if (hitWall || hitSelf) {
      const finalScore = scoreRef.current
      const prevBest = getHighScore()
      const nextBest = Math.max(prevBest, finalScore)
      setStatus('over')
      setHighScore(nextBest)
      if (nextBest > prevBest) window.localStorage.setItem(HIGH_SCORE_KEY, String(nextBest))
      return
    }

    snake.unshift(newHead)

    if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
      scoreRef.current += 1
      setScore(scoreRef.current)
      speedRef.current = Math.max(MIN_SPEED, INITIAL_SPEED - scoreRef.current * 3)
      spawnFood()
    } else {
      snake.pop()
    }
  }, [spawnFood])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, SIZE, SIZE)

    ctx.fillStyle = '#EAE5DF'
    ctx.fillRect(0, 0, SIZE, SIZE)

    ctx.strokeStyle = 'rgba(27, 27, 27, 0.06)'
    ctx.lineWidth = 1
    for (let i = 1; i < GRID; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL, 0)
      ctx.lineTo(i * CELL, SIZE)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * CELL)
      ctx.lineTo(SIZE, i * CELL)
      ctx.stroke()
    }

    ctx.font = `${CELL * 1.2}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(foodEmojiRef.current, foodRef.current.x * CELL + CELL / 2, foodRef.current.y * CELL + CELL / 2 + 1)

    snakeRef.current.forEach((seg, i) => {
      const isHead = i === 0
      ctx.fillStyle = isHead ? '#1B1B1B' : '#3D3D3D'
      const pad = 1.5
      roundRect(ctx, seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, CELL / 3)
      ctx.fill()

      if (isHead) {
        ctx.fillStyle = '#EAE5DF'
        const [dx, dy] = DIRECTION_VECTOR[dirRef.current]
        const cx = seg.x * CELL + CELL / 2 + dx * 4
        const cy = seg.y * CELL + CELL / 2 + dy * 4
        const px = -dy * 3
        const py = dx * 3
        ctx.beginPath()
        ctx.arc(cx + px, cy + py, 2.2, 0, Math.PI * 2)
        ctx.arc(cx - px, cy - py, 2.2, 0, Math.PI * 2)
        ctx.fill()
      }
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = SIZE * dpr
    canvas.height = SIZE * dpr
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }, [])

  useEffect(() => {
    let rafId = 0
    const loop = (t: number) => {
      const dt = t - lastTimeRef.current
      lastTimeRef.current = t
      if (statusRef.current === 'playing') {
        accRef.current += dt
        if (accRef.current >= speedRef.current) {
          accRef.current = 0
          step()
        }
      }
      draw()
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [draw, step])

  const startGame = useCallback(() => {
    resetGame()
    setStatus('playing')
  }, [resetGame])

  const pressDirection = useCallback(
    (dir: Direction) => {
      if (statusRef.current === 'idle' || statusRef.current === 'over') startGame()
      nextDirRef.current = dir
    },
    [startGame]
  )

  const togglePause = useCallback(() => {
    if (statusRef.current === 'playing') setStatus('paused')
    else if (statusRef.current === 'paused') setStatus('playing')
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return

      const status = statusRef.current

      const directionKey: Direction | null =
        e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W'
          ? 'up'
          : e.key === 'ArrowDown' || e.key === 's' || e.key === 'S'
          ? 'down'
          : e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A'
          ? 'left'
          : e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D'
          ? 'right'
          : null

      if (directionKey) {
        if (status === 'playing') {
          e.preventDefault()
          nextDirRef.current = directionKey
        }
        return
      }

      if (e.key === ' ') {
        if (status === 'playing' || status === 'paused') {
          e.preventDefault()
          setStatus(status === 'playing' ? 'paused' : 'playing')
        }
        return
      }

      if (e.key === 'Enter' && (status === 'idle' || status === 'over')) {
        startGame()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [startGame])

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    touchStartRef.current = { x: t.clientX, y: t.clientY }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current
    touchStartRef.current = null
    if (!start) return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return
    if (Math.abs(dx) > Math.abs(dy)) pressDirection(dx > 0 ? 'right' : 'left')
    else pressDirection(dy > 0 ? 'down' : 'up')
  }

  const dpadBtn =
    'flex h-14 w-14 items-center justify-center rounded-xl border border-secondary/30 text-xl text-secondary transition duration-200 hover:bg-secondary hover:text-primary active:scale-90'

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-6 flex items-center justify-between gap-4 font-poppins">
        <div className="rounded-lg bg-secondary px-4 py-2">
          <p className="text-[10px] uppercase tracking-[0.25em] text-primary/60">Score</p>
          <p className="text-2xl font-semibold text-primary">{score}</p>
        </div>
        <p className="hidden font-display text-xl text-secondary/50 md:block">eat the tech · grow your stack</p>
        <div className="rounded-lg border border-secondary/30 px-4 py-2">
          <p className="text-[10px] uppercase tracking-[0.25em] text-secondary/60">Best</p>
          <p className="text-2xl font-semibold text-secondary">{highScore}</p>
        </div>
      </div>

      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative mx-auto touch-none select-none overflow-hidden rounded-2xl border border-secondary/20 shadow-2xl"
      >
        <canvas ref={canvasRef} style={{ width: SIZE, height: SIZE, maxWidth: '100%' }} className="block" />

        {status !== 'playing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-primary/70 backdrop-blur-[2px]">
            {status === 'idle' && (
              <>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: easeDefault }}
                  className="font-display text-3xl font-semibold text-secondary md:text-4xl"
                >
                  Ready? 🐍
                </motion.p>
                <p className="px-8 text-center font-poppins text-sm text-secondary/70">
                  Eat the tech emojis and grow your stack. Use arrow keys or WASD, space to pause, swipe on mobile.
                </p>
                <button
                  onClick={startGame}
                  className="rounded border border-secondary px-6 py-2 font-poppins text-lg capitalize text-secondary transition duration-300 hover:bg-secondary hover:text-primary"
                >
                  Start Game
                </button>
              </>
            )}
            {status === 'paused' && (
              <>
                <p className="font-display text-3xl font-semibold text-secondary md:text-4xl">Paused ⏸️</p>
                <button
                  onClick={togglePause}
                  className="rounded border border-secondary px-6 py-2 font-poppins text-lg capitalize text-secondary transition duration-300 hover:bg-secondary hover:text-primary"
                >
                  Resume
                </button>
              </>
            )}
            {status === 'over' && (
              <>
                <p className="font-display text-3xl font-semibold text-secondary md:text-4xl">Game Over 💀</p>
                <p className="font-poppins text-lg text-secondary/80">
                  Score: <span className="font-semibold text-yellow-300">{score}</span>
                  {score >= highScore && score > 0 ? ' · New best! 🏆' : ''}
                </p>
                <button
                  onClick={startGame}
                  className="rounded border border-secondary px-6 py-2 font-poppins text-lg capitalize text-secondary transition duration-300 hover:bg-secondary hover:text-primary"
                >
                  Play Again
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2 md:hidden">
        <button onClick={() => pressDirection('up')} aria-label="move up" className={dpadBtn}>
          <BsArrowUp />
        </button>
        <div className="flex gap-2">
          <button onClick={() => pressDirection('left')} aria-label="move left" className={dpadBtn}>
            <BsArrowLeft />
          </button>
          <button onClick={() => pressDirection('down')} aria-label="move down" className={dpadBtn}>
            <BsArrowDown />
          </button>
          <button onClick={() => pressDirection('right')} aria-label="move right" className={dpadBtn}>
            <BsArrowRight />
          </button>
        </div>
      </div>

      <div className="mt-6 hidden items-center justify-center gap-3 md:flex">
        <button
          onClick={togglePause}
          className="flex items-center gap-2 rounded border border-secondary/40 px-5 py-2 font-poppins capitalize text-secondary transition duration-300 hover:bg-secondary hover:text-primary"
        >
          {status === 'playing' ? <BsPauseFill /> : <BsPlayFill />}
          {status === 'playing' ? 'Pause' : 'Resume'}
        </button>
        <button
          onClick={startGame}
          className="flex items-center gap-2 rounded border border-secondary/40 px-5 py-2 font-poppins capitalize text-secondary transition duration-300 hover:bg-secondary hover:text-primary"
        >
          <BsArrowCounterclockwise />
          Restart
        </button>
      </div>

      <p className="mt-5 text-center font-poppins text-xs text-secondary/40">space = pause · enter = restart</p>
    </div>
  )
}
