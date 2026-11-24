import {
  Binary,
  Bug,
  Crosshair,
  Database,
  Globe,
  Network,
  Radar,
  Router,
  Server,
  ShieldCheck,
  SquareTerminal,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal, SectionHeading } from './reveal'

type Category = { title: string; code: string; span: string; cols: string; items: { name: string; Icon: LucideIcon; level?: string }[] }
const categories: Category[] = [
  {
    title: 'Cybersecurity',
    code: 'SEC',
    span: 'lg:col-span-2',
    cols: 'sm:grid-cols-2 xl:grid-cols-4',
    items: [
     { name: 'Ethical Hacking Fundamentals', Icon: ShieldCheck, level: 'Foundational' },
     { name: 'Penetration Testing Basics', Icon: Crosshair, level: 'Beginner' },
     { name: 'Web Security Fundamentals', Icon: Globe, level: 'Foundational' },
     { name: 'Networking Fundamentals', Icon: Network, level: 'Learning' },
         ],
  },
  {
    title: 'Programming & Database',
    code: 'DEV',
    span: '',
    cols: 'sm:grid-cols-2 lg:grid-cols-1',
    items: [
          { name: 'Python', Icon: Binary, level: 'Learning' },
          { name: 'Kali Linux', Icon: SquareTerminal, level: 'Learning' },
          { name: 'VirtualBox', Icon: Server, level: 'Learning' },
    ],
  },
  {
    title: 'Security Tools',
    code: 'OPS',
    span: 'lg:col-span-2',
    cols: 'sm:grid-cols-3',
    items: [
      { name: 'Nmap', Icon: Radar, level: 'Basic' },
      { name: 'Kali Linux', Icon: SquareTerminal, level: 'Beginner' },
      { name: 'Metasploit', Icon: Bug, level: 'Exploring' },
    ],
  },
  {
    title: 'Networking & Development Tools',
    code: 'NET',
    span: '',
    cols: 'sm:grid-cols-2 lg:grid-cols-1',
    items: [
      { name: 'Cisco Packet Tracer', Icon: Router, level: 'Learning' },
      { name: 'VirtualBox', Icon: Server, level: 'Beginner' },
    ],
  },
]

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1520px] px-5 py-24 md:px-10 md:py-32 lg:px-16">
      <SectionHeading
        index="02"
        label="TECHNICAL SKILLS"
        title="The Toolkit"
        description="The languages, security concepts and tools I work with across my studies and projects."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <Reveal key={cat.title} delay={i * 0.06} className={cn('min-w-0', cat.span)}>
            <article className="card-surface rounded-[2rem] p-5 md:p-7">
              <header className="mb-8 flex items-start justify-between gap-4">
                <h3 className="font-heading text-2xl font-bold leading-tight text-foreground md:text-[1.9rem]">{cat.title}</h3>
                <span className="shrink-0 rounded-full border border-border px-3 py-1 font-mono text-xs tracking-[0.2em] text-muted-foreground">
                  {cat.code}
                </span>
              </header>
              <ul className={cn('grid gap-4', cat.cols)}>
              {cat.items.map(({ name, Icon }) => (
                  <li
                    key={name}
                    className="group rounded-3xl border border-border bg-background/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_16px_40px_-20px_var(--glow)]"
                  >
                    <span className="flex size-11 items-center justify-center rounded-full border border-border bg-surface text-primary transition-colors group-hover:border-primary/50">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="mt-4 block text-base font-semibold leading-snug text-foreground">{name}</span>
                   
                     
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
