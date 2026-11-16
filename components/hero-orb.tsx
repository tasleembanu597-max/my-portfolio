'use client'

import { Fingerprint, KeyRound, Lock } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useReducedMotion } from '@/hooks/use-boot'

const HeroOrbScene = dynamic(() => import('./hero-orb-scene'), { ssr: false })

const chips = [
  { label: 'AES-GCM', Icon: Lock, className: 'left-[2%] top-[22%]' },
  { label: 'SHA-256', Icon: Fingerprint, className: 'right-[0%] top-[46%]' },
  { label: 'ECDSA P-256', Icon: KeyRound, className: 'bottom-[10%] left-[10%]' },
]

export function HeroOrb() {
  const reduced = useReducedMotion()
  return (
    <div className="relative aspect-square w-full max-w-[720px]" aria-hidden="true">
      <div className="absolute inset-[18%] rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute inset-0">
        <HeroOrbScene animate={!reduced} />
      </div>
      {chips.map(({ label, Icon, className }) => (
        <div
          key={label}
          className={`absolute flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 font-mono text-xs text-foreground backdrop-blur md:text-sm ${className}`}
        >
          <Icon className="size-4 text-primary" />
          {label}
        </div>
      ))}
    </div>
  )
}
