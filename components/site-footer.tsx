import { Mail } from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './brand-icons'
import Link from 'next/link'
import { navLinks, profile } from '@/lib/site-data'
import { Logo } from './logo'

export function SiteFooter() {
  const socials = [
    { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail, external: false },
    { label: 'LinkedIn', href: profile.linkedin, Icon: Linkedin, external: true },
    { label: 'GitHub', href: profile.github, Icon: Github, external: true },
  ]
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-[1520px] px-5 py-16 md:px-10 lg:px-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Logo />
            <p className="mt-6 font-mono text-sm tracking-[0.35em] text-primary">{profile.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-16 gap-y-4 sm:grid-cols-3">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <Link href={`/#${l.id}`} className="text-lg text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/resume" className="text-lg text-muted-foreground transition-colors hover:text-foreground">
                  Resume
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-border/60 pt-8 sm:flex-row sm:items-center">
          <p className="text-muted-foreground">{`© ${new Date().getFullYear()} ${profile.name}. All rights reserved.`}</p>
          <ul className="flex gap-3">
            {socials.map(({ label, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex size-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
