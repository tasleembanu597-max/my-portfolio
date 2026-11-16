'use client'

import { FileText, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { navLinks } from '@/lib/site-data'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'

export function SiteNav({ onHome = true }: { onHome?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const prefix = onHome ? '' : '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!onHome) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const link of navLinks) {
      const el = document.getElementById(link.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [onHome])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open ? 'border-b border-border/60 bg-background/75 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-24 max-w-[1520px] items-center justify-between gap-6 px-5 md:px-10 lg:px-16">
        <Logo href={`${prefix}#home`} />

        <ul className="hidden items-center gap-7 whitespace-nowrap xl:flex 2xl:gap-10">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={`${prefix}#${link.id}`}
                aria-current={onHome && active === link.id ? 'true' : undefined}
                className={cn(
                  'text-[17px] font-medium transition-colors hover:text-foreground',
                  onHome && active === link.id ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-3 whitespace-nowrap md:gap-5">
          <Link
            href="/resume"
            className="hidden items-center gap-2 text-[17px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <FileText className="size-5" aria-hidden="true" />
            Resume
          </Link>
          <ThemeToggle />
          <Link
            href={`${prefix}#contact`}
            className="hidden whitespace-nowrap rounded-full bg-primary px-6 py-3 text-[17px] font-semibold text-primary-foreground shadow-[0_8px_30px_var(--glow)] transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            {"Let's Connect"}
          </Link>
          <button
            type="button"
            className="flex size-12 items-center justify-center rounded-full border border-border bg-surface/70 xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-border/60 px-5 pb-6 xl:hidden">
          <ul className="flex flex-col gap-1 pt-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={`${prefix}#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-lg font-medium text-muted-foreground hover:bg-surface hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/resume"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-lg font-medium text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                <FileText className="size-5" aria-hidden="true" />
                Resume
              </Link>
            </li>
            <li className="pt-2">
              <Link
                href={`${prefix}#contact`}
                onClick={() => setOpen(false)}
                className="flex justify-center rounded-full bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground"
              >
                {"Let's Connect"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
