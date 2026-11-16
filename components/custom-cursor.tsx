'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ring = ringRef.current
    const dot = dotRef.current
    if (!fine || reduced || !ring || !dot) return

    const target = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let raf = 0
    let hovering = false

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      ring.style.opacity = '1'
      dot.style.opacity = '1'
      const el = e.target as HTMLElement | null
      const next = !!el?.closest('a, button, input, [role="button"]')
      if (next !== hovering) {
        hovering = next
        ring.dataset.hover = next ? 'true' : 'false'
      }
    }
    const onLeave = () => {
      ring.style.opacity = '0'
      dot.style.opacity = '0'
    }
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18
      pos.y += (target.y - pos.y) * 0.18
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden [@media(pointer:fine)]:block">
      <div
        ref={ringRef}
        data-hover="false"
        className="absolute left-0 top-0 size-11 rounded-full border border-primary/60 bg-surface/40 opacity-0 shadow-[0_0_24px_var(--glow)] transition-[width,height,background-color] duration-200 data-[hover=true]:size-16 data-[hover=true]:bg-primary/10"
      />
      <div ref={dotRef} className="absolute left-0 top-0 size-2 rounded-full bg-primary opacity-0" />
    </div>
  )
}
