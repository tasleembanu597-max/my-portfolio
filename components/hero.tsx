'use client'

import { motion, type Variants } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useBooted, useReducedMotion } from '@/hooks/use-boot'
import { useTypewriter } from '@/hooks/use-typewriter'
import { profile } from '@/lib/site-data'
import { HeroOrb } from './hero-orb'

const NAME = 'TASLEEM BANU'
const PHRASES = [
  'an Aspiring Cybersecurity Professional',
  'a Computer Science Engineering Student',
  'a Networking & Cybersecurity Enthusiast',
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function NameReveal({ start, instant }: { start: boolean; instant: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start || instant || count >= NAME.length) return
    const t = setTimeout(() => setCount((c) => c + 1), count === 0 ? 450 : 75)
    return () => clearTimeout(t)
  }, [start, instant, count])
  const shown = instant ? NAME.length : count
  const typing = start && shown < NAME.length

  return (
    <p className="relative font-heading text-xl font-bold tracking-[0.35em] text-foreground md:text-2xl">
      <span className="sr-only">{profile.name}</span>
      <span aria-hidden="true" className="invisible">
        {NAME}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {NAME.slice(0, shown)}
        {typing && <span className="cursor-blink ml-1 inline-block h-5 w-2.5 translate-y-0.5 bg-primary" />}
      </span>
    </p>
  )
}

function RotatingTitle({ start, instant }: { start: boolean; instant: boolean }) {
  const { text } = useTypewriter(PHRASES, { enabled: start && !instant })
  const longest = PHRASES.reduce((a, b) => (b.length > a.length ? b : a))
  return (
    <p className="font-mono text-sm text-muted-foreground md:text-base">
      <span className="sr-only">{`I'm ${PHRASES.join(', ')}.`}</span>
      <span aria-hidden="true" className="grid">
        <span className="invisible col-start-1 row-start-1">{`I'm ${longest} |`}</span>
        <span className="col-start-1 row-start-1">
          {"I'm "}
          <span className="text-primary">{instant ? PHRASES[0] : text}</span>
          <span className="cursor-blink ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] bg-bright" />
        </span>
      </span>
    </p>
  )
}

export function Hero() {
  const booted = useBooted()
  const reduced = useReducedMotion()
  const [nameDone, setNameDone] = useState(false)

  useEffect(() => {
    if (!booted) return
    if (reduced) {
      setNameDone(true)
      return
    }
    const t = setTimeout(() => setNameDone(true), 450 + NAME.length * 75 + 250)
    return () => clearTimeout(t)
  }, [booted, reduced])

  return (
    <section id="home" className="relative mx-auto max-w-[1520px] px-5 pb-16 pt-32 md:px-10 md:pt-40 lg:px-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <motion.div variants={container} initial="hidden" animate={booted ? 'show' : 'hidden'} className="min-w-0">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-3 rounded-full border border-border bg-surface/60 px-5 py-2.5 font-mono text-[11px] tracking-[0.25em] text-muted-foreground md:text-sm"
          >
            <span className="size-2 rounded-full bg-primary shadow-[0_0_10px_var(--glow)]" />
            COMPUTER SCIENCE ENGINEERING STUDENT
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-10 font-heading text-[clamp(3.5rem,9vw,8.25rem)] font-bold leading-[0.98] tracking-tight text-balance"
          >
            <span className="block text-foreground">Exploring</span>
            <span className="block text-foreground">the</span>
            <span className="block bg-gradient-to-r from-primary to-bright bg-clip-text text-transparent">
              Digital Frontier.
            </span>
          </motion.h1>

          <motion.div variants={item} className="mt-14 space-y-3 border-l-2 border-primary pl-5">
            <NameReveal start={booted} instant={reduced} />
            <RotatingTitle start={nameDone} instant={reduced} />
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Computer Science Engineering Diploma Student
              <br />
              Aspiring Cybersecurity Professional
            </p>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-2xl md:leading-relaxed"
          >
            {"I'm a Computer Science Engineering diploma student interested in cybersecurity, ethical hacking, networking and secure application development. I enjoy exploring how digital systems work and building practical technical projects."}
          </motion.p>

          <motion.p variants={item} className="mt-8 font-mono text-sm tracking-[0.35em] text-primary">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-lg font-semibold text-primary-foreground shadow-[0_10px_40px_-6px_var(--glow)] transition-transform hover:-translate-y-0.5"
            >
              Explore Projects
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center rounded-full border border-border bg-surface/70 px-7 py-4 text-lg font-semibold text-foreground transition-colors hover:border-primary/60"
            >
              About Me
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center rounded-full border border-border bg-surface/70 px-7 py-4 text-lg font-semibold text-foreground transition-colors hover:border-primary/60"
            >
              Contact
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-8">
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 text-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              View Resume
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={booted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex justify-center"
        >
          <HeroOrb />
        </motion.div>
      </div>

      <div className="mt-14 flex items-center justify-between font-mono text-xs tracking-[0.3em] text-muted-foreground md:text-sm">
        <a href="#about" className="flex items-center gap-3 transition-colors hover:text-primary">
          <ArrowDown className="scroll-cue size-4" aria-hidden="true" />
          SCROLL
        </a>
        <span className="hidden sm:inline">TUMKUR, KARNATAKA, INDIA</span>
      </div>
    </section>
  )
}
