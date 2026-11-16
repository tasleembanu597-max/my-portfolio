'use client'

import { RotateCcw } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'

type Line = { id: number; kind: 'cmd' | 'out' | 'sys' | 'err'; text: string }

const COMMANDS: Record<string, string[]> = {
  whoami: ['Tasleem Banu'],
  education: ['Diploma in Computer Science Engineering'],
  interests: ['Cybersecurity | Networking | Python'],
  help: [
    'Available commands:',
    '  whoami      — who am I',
    '  education   — current program',
    '  interests   — areas of interest',
    '  help        — list commands',
    '  clear       — clear the terminal',
  ],
}

const SUGGESTIONS = ['whoami', 'education', 'interests', 'help', 'clear']

let lineId = 0
const mk = (kind: Line['kind'], text: string): Line => ({ id: ++lineId, kind, text })
const initialLines = (): Line[] => [
  mk('sys', 'OBSIDIAN secure shell v1.0'),
  mk('sys', "Type 'help' to list available commands."),
]

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(initialLines)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [focused, setFocused] = useState(false)
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  useEffect(() => {
    const el = outputRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    setHistory((h) => [...h, cmd])
    setHistoryIndex(-1)
    if (cmd === 'clear') {
      setLines([])
      return
    }
    const output = COMMANDS[cmd]
    setLines((prev) => [
      ...prev,
      mk('cmd', cmd),
      ...(output
        ? output.map((t) => mk('out', t))
        : [mk('err', `command not found: ${cmd}. Type 'help' for available commands.`)]),
    ])
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    run(input)
    setInput('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault()
      const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown' && historyIndex >= 0) {
      e.preventDefault()
      const next = historyIndex + 1
      if (next >= history.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(next)
        setInput(history[next])
      }
    }
  }

  const restart = () => {
    setLines(initialLines())
    setInput('')
    setHistory([])
    setHistoryIndex(-1)
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-[#0a111d] font-mono text-sm text-[#d6e4f7] shadow-[0_20px_60px_-30px_var(--glow)]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </span>
          <span className="text-xs text-[#9baac1]">tasleem@obsidian: ~</span>
        </div>
        <button
          type="button"
          onClick={restart}
          aria-label="Restart terminal"
          className="rounded-md p-1.5 text-[#9baac1] transition-colors hover:bg-white/5 hover:text-[#53b5ff]"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div
        ref={outputRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        onClick={() => inputRef.current?.focus()}
        className="h-56 overflow-y-auto overflow-x-hidden px-5 py-4 leading-relaxed [overflow-wrap:anywhere]"
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={cn(
              'whitespace-pre-wrap',
              line.kind === 'sys' && 'text-[#7d8ea8]',
              line.kind === 'out' && 'text-[#d6e4f7]',
              line.kind === 'err' && 'text-[#ff8a8a]',
            )}
          >
            {line.kind === 'cmd' ? (
              <>
                <span className="text-[#53b5ff]">{'tasleem@obsidian:~$ '}</span>
                {line.text}
              </>
            ) : (
              line.text
            )}
          </div>
        ))}

        <form onSubmit={onSubmit} className="relative flex items-center">
          <label htmlFor={inputId} className="sr-only">
            Terminal command
          </label>
          <span className="shrink-0 text-[#53b5ff]">{'tasleem@obsidian:~$\u00a0'}</span>
          <span className="relative min-w-0 flex-1">
            <span aria-hidden="true" className="pointer-events-none whitespace-pre">
              {input}
              <span
                className={cn(
                  'inline-block h-4 w-2 translate-y-0.5 bg-[#53b5ff]',
                  focused ? 'cursor-blink' : 'opacity-60',
                )}
              />
            </span>
            <input
              id={inputId}
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              maxLength={40}
              className="absolute inset-0 w-full bg-transparent text-transparent caret-transparent outline-none"
            />
          </span>
        </form>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-5 py-3.5">
        <span className="mr-1 text-xs text-[#7d8ea8]">Run a command:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => run(s)}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[#d6e4f7] transition-colors hover:border-[#268bff]/60 hover:text-[#53b5ff]"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
