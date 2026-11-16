'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'

const BOOT_EVENT = 'obsidian:booted'

function subscribe(callback: () => void) {
  window.addEventListener(BOOT_EVENT, callback)
  return () => window.removeEventListener(BOOT_EVENT, callback)
}

export function markBooted() {
  document.documentElement.dataset.boot = 'done'
  try {
    sessionStorage.setItem('obsidian-boot', '1')
  } catch {}
  window.dispatchEvent(new Event(BOOT_EVENT))
}

export function useBooted() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.boot === 'done',
    () => false,
  )
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}
