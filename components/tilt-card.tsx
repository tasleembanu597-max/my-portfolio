'use client'

import { useRef, type PointerEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1200px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        'group relative h-full transition-transform duration-300 ease-out [transform-style:preserve-3d] before:pointer-events-none before:absolute before:inset-0 before:rounded-[2rem] before:opacity-0 before:transition-opacity before:duration-300 before:[background:radial-gradient(500px_circle_at_var(--mx,50%)_var(--my,50%),color-mix(in_oklab,var(--primary)_14%,transparent),transparent_45%)] hover:before:opacity-100',
        className,
      )}
    >
      {children}
    </div>
  )
}
