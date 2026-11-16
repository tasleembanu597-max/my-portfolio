import Link from 'next/link'

export function Logo({ href = '/#home' }: { href?: string }) {
  return (
    <Link href={href} className="group flex items-center gap-3" aria-label="OBSIDIAN — home">
      <span className="relative flex size-11 items-center justify-center rounded-full border border-primary/30 bg-surface shadow-[0_0_20px_var(--glow)]">
        <span className="size-4 rotate-45 rounded-[3px] bg-gradient-to-br from-bright to-primary shadow-[0_0_12px_var(--glow)] transition-transform duration-500 group-hover:rotate-[135deg]" />
      </span>
      <span className="font-heading text-xl font-bold tracking-[0.3em] text-foreground">OBSIDIAN</span>
    </Link>
  )
}
