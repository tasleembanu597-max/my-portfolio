'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { markBooted, useBooted } from '@/hooks/use-boot'

const BOOT_LINES = [
  { text: 'INITIALIZING OBSIDIAN...', tone: 'primary' },
  { text: 'Loading security modules...', tone: 'muted', status: '[ OK ]' },
  { text: 'Establishing secure connection...', tone: 'muted', status: '[ OK ]' },
  { text: 'Welcome to OBSIDIAN.', tone: 'foreground' },
] as const

const FINAL_LINE = '<Hello, World />'
const CHAR_MS = 22
const LINE_PAUSE_MS = 220

export function BootSequence() {
  const booted = useBooted()
  const [lineIndex, setLineIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [exiting, setExiting] = useState(false)
  const finishedRef = useRef(false)

  const allLines = [...BOOT_LINES.map((l) => l.text), FINAL_LINE]

  const finish = () => {
    if (finishedRef.current) return
    finishedRef.current = true
    setExiting(true)
  }

  useEffect(() => {
    if (booted || exiting) return
    const current = allLines[lineIndex]
    let timer: ReturnType<typeof setTimeout>
    if (charCount < current.length) {
      timer = setTimeout(() => setCharCount((c) => c + 1), CHAR_MS)
    } else if (lineIndex < allLines.length - 1) {
      timer = setTimeout(() => {
        setLineIndex((i) => i + 1)
        setCharCount(0)
      }, LINE_PAUSE_MS)
    } else {
      timer = setTimeout(finish, 700)
    }
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted, exiting, lineIndex, charCount])

  useEffect(() => {
    if (booted) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') finish()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [booted])

  if (booted) return null

  return (
    <AnimatePresence onExitComplete={markBooted}>
      {!exiting && (
        <motion.div
          key="boot"
          role="status"
          aria-live="polite"
          aria-label="Loading OBSIDIAN portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="boot-overlay fixed inset-0 z-[90] flex items-center justify-center bg-background px-6"
        >
          <div className="w-full max-w-xl font-mono">
            <div className="mb-6 flex items-center gap-2 text-xs tracking-[0.3em] text-muted-foreground">
              <span className="size-2 rounded-full bg-primary shadow-[0_0_10px_var(--glow)]" />
              OBSIDIAN://BOOT
            </div>
            <ul className="space-y-3 text-sm md:text-base">
              {BOOT_LINES.map((line, i) => {
                if (i > lineIndex) return null
                const visible = i < lineIndex ? line.text : line.text.slice(0, charCount)
                const done = i < lineIndex
                return (
                  <li key={line.text} className="flex items-center justify-between gap-4">
                    <span
                      className={
                        line.tone === 'primary'
                          ? 'tracking-[0.2em] text-primary'
                          : line.tone === 'foreground'
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                      }
                    >
                      <span className="mr-2 text-primary/70">{'>'}</span>
                      {visible}
                      {!done && <span className="cursor-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-primary" />}
                    </span>
                    {'status' in line && done && <span className="text-xs text-primary">{line.status}</span>}
                  </li>
                )
              })}
            </ul>
            {lineIndex === allLines.length - 1 && (
              <p className="mt-10 font-heading text-4xl font-bold text-primary drop-shadow-[0_0_24px_var(--glow)] md:text-6xl">
                {FINAL_LINE.slice(0, charCount)}
                <span className="cursor-blink ml-1 inline-block h-10 w-3 translate-y-1 bg-bright md:h-14" />
              </p>
            )}
            <button
              type="button"
              onClick={finish}
              className="mt-12 text-xs tracking-[0.3em] text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              SKIP INTRO
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
