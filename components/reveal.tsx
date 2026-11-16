'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ index, label, title, description }: { index: string; label: string; title: string; description?: string }) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <p className="flex items-center gap-4 font-mono text-sm tracking-[0.3em] text-muted-foreground">
        <span className="text-primary">{index}</span>
        <span className="h-px w-12 bg-primary/60" aria-hidden="true" />
        {label}
      </p>
      <h2 className="mt-5 font-heading text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-tight tracking-tight text-foreground text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-2xl md:leading-relaxed">
          {description}
        </p>
      )}
    </Reveal>
  )
}
