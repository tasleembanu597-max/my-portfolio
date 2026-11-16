'use client'

import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './brand-icons'
import { useState } from 'react'
import { profile } from '@/lib/site-data'
import { Reveal, SectionHeading } from './reveal'

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1800)
        } catch {}
      }}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="relative z-10 flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
    >
      {copied ? <Check className="size-4 text-primary" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

function ContactCard({
  Icon,
  label,
  value,
  href,
  external,
  copy,
}: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  value: string
  href?: string
  external?: boolean
  copy?: boolean
}) {
  return (
    <div className="card-surface relative flex h-full items-center gap-5 rounded-3xl p-6 transition-colors hover:border-primary/50">
      <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-xs tracking-[0.25em] text-muted-foreground">{label}</span>
        {href ? (
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="mt-1.5 block break-words text-lg font-semibold text-foreground after:absolute after:inset-0 after:rounded-3xl md:text-xl"
          >
            {value}
            {external && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
        ) : (
          <span className="mt-1.5 block text-lg font-semibold text-foreground md:text-xl">{value}</span>
        )}
      </span>
      {copy && <CopyButton value={value} label={label.toLowerCase()} />}
      {external && <ArrowUpRight className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />}
    </div>
  )
}

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1520px] px-5 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            index="05"
            label="CONTACT"
            title="Let's Connect"
            description="I'm always interested in connecting with people who share an interest in cybersecurity, technology and software development."
          />
          <Reveal>
            <a
              href={`mailto:${profile.email}`}
              className="-mt-6 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-lg font-semibold text-primary-foreground shadow-[0_10px_40px_-6px_var(--glow)] transition-transform hover:-translate-y-0.5"
            >
              <Mail className="size-5" aria-hidden="true" />
              Send an Email
            </a>
          </Reveal>
        </div>
        <Reveal className="grid content-start gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <ContactCard Icon={Mail} label="EMAIL" value={profile.email} href={`mailto:${profile.email}`} copy />
          </div>
          <div className="sm:col-span-2">
            <ContactCard Icon={Phone} label="PHONE" value={profile.phone} href={profile.phoneHref} copy />
          </div>
          <ContactCard Icon={Linkedin} label="LINKEDIN" value={profile.name} href={profile.linkedin} external />
          <ContactCard Icon={Github} label="GITHUB" value={profile.githubHandle} href={profile.github} external />
          <div className="sm:col-span-2">
            <ContactCard Icon={MapPin} label="LOCATION" value={profile.location} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
