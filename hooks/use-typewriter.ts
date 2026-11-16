'use client'

import { useEffect, useState } from 'react'

type Options = {
  enabled: boolean
  typeMs?: number
  deleteMs?: number
  holdMs?: number
  loop?: boolean
}

export function useTypewriter(phrases: string[], { enabled, typeMs = 65, deleteMs = 35, holdMs = 1800, loop = true }: Options) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (!enabled || hidden) return
    const phrase = phrases[index]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting && text.length < phrase.length) {
      timer = setTimeout(() => setText(phrase.slice(0, text.length + 1)), typeMs)
    } else if (!deleting && text.length === phrase.length) {
      if (!loop && index === phrases.length - 1) return
      timer = setTimeout(() => setDeleting(true), holdMs)
    } else if (deleting && text.length > 0) {
      timer = setTimeout(() => setText(phrase.slice(0, text.length - 1)), deleteMs)
    } else {
      timer = setTimeout(() => {
        setDeleting(false)
        setIndex((i) => (i + 1) % phrases.length)
      }, 300)
    }
    return () => clearTimeout(timer)
  }, [enabled, hidden, phrases, index, text, deleting, typeMs, deleteMs, holdMs, loop])

  return { text, done: !deleting && text === phrases[index] }
}
