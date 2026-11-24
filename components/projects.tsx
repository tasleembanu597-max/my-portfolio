import { ArrowUpRight, Clock } from 'lucide-react'
import { GithubIcon as Github } from './brand-icons'
import type { ReactNode } from 'react'
import { ClinicShieldVisual, EmlaVisual, FreshBasketVisual, MoonPocketVisual } from './project-visuals'
import { Reveal, SectionHeading } from './reveal'
import { TiltCard } from './tilt-card'

type ProjectLink = { label: string; href?: string; kind: 'demo' | 'github' | 'soon' }
type Project = {
  number: string
  name: string
  subtitle: string
  description: string
  badge?: string
  features: string[]
  technologies?: string
  meta?: string
  link: ProjectLink
  visual: ReactNode
}

const projects: Project[] = [
  {
    number: '01',
    name: 'Moon Pocket',
    subtitle: 'Secure File Sharing & Lifecycle Control',
    description:
      'A security-focused file-sharing project designed around client-side encryption, controlled sharing and secure file lifecycle management.',
    badge: 'VERSION 0.1 — DRAFT',
    features: ['AES-GCM', 'SHA-256', 'ECDSA P-256', 'Client-side encryption', 'Viewer, Editor and Auditor roles', 'Secure sharing links', 'Audit trail'],
    link: { label: 'Live Demo', href: 'https://ciphervault-bmz.pages.dev/', kind: 'demo' },
    visual: <MoonPocketVisual />,
  },
  {
    number: '02',
    name: 'EMLA',
    subtitle: 'Error Message Linguistics Analyzer',
    description:
      'A Python-based web application security analysis tool designed to identify potentially sensitive information disclosed through HTTP error messages.',
    features: [
      'Authorized web crawling',
      'HTTP response analysis',
      'Regex-based detection',
      'Database error identification',
      'File path and stack trace detection',
      'Framework disclosure detection',
      'EIDS scoring',
      'JSON, HTML, Markdown, CSV, XML and TXT reports',
    ],
    technologies: 'Python, Regex, HTTP, JSON, CSV, XML and Pytest',
    link: { label: 'View on GitHub', href: 'https://github.com/tasleembanu597-max/Error-Message-Linguistics-Analyzer', kind: 'github' },
    visual: <EmlaVisual />,
  },
  {
    number: '03',
    name: 'Fresh Basket',
    subtitle: 'Online Grocery Store — DBMS Project',
    description: 'An academic database management project for an online grocery store.',
    badge: 'TEAM OF 6',
    features: [
      'Customer management',
      'Product management',
      'Inventory management',
      'Shopping cart',
      'Order management',
      'Payment and delivery management',
      'Admin management',
      'ER diagrams',
      'Database normalization',
      'SQL joins and CRUD operations',
    ],
    technologies: 'HTML, Python, Oracle Database and Oracle SQL Developer',
    meta: 'Team Size: 6',
    link: { label: 'Live Demo — Coming Soon', kind: 'soon' },
    visual: <FreshBasketVisual />,
  },
  {
    number: '04',
    name: 'ClinShield',
    subtitle: 'Local PII Gateway for Clinic LLM Use',
    description:
      'A privacy-focused local security gateway designed to reduce exposure of sensitive patient information during cloud AI interactions.',
    badge: 'IN PROGRESS',
    features: [
      'PII detection',
      'Placeholder-based masking',
      'Encrypted local data vault',
      'AES-GCM',
      'Local data restoration',
      'Fail-closed validation',
      'Metadata-only audit logging',
    ],
    technologies: 'Python, FastAPI, Microsoft Presidio, spaCy, AES-GCM, JavaScript and Chrome Extension',
    link: { label: 'API Documentation — Coming Soon', kind: 'soon' },
    visual: <ClinicShieldVisual />,
  },
]

function ProjectAction({ link, name }: { link: ProjectLink; name: string }) {
  if (link.kind === 'soon' || !link.href) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-5 py-3 text-sm font-semibold text-muted-foreground">
        <Clock className="size-4" aria-hidden="true" />
        {link.label}
      </span>
    )
  }
  const Icon = link.kind === 'github' ? Github : ArrowUpRight
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_30px_-8px_var(--glow)] transition-transform hover:-translate-y-0.5"
    >
      <Icon className="size-4" aria-hidden="true" />
      {link.label}
      <span className="sr-only">{` for ${name} (opens in a new tab)`}</span>
    </a>
  )
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1520px] px-5 py-24 md:px-10 md:py-32 lg:px-16">
      <SectionHeading
        index="03"
        label="FEATURED PROJECTS"
        title="Built to Understand Security"
        description="Practical projects exploring encryption, web application security analysis, database design and privacy."
      />
      <div className="grid max-w-6xl mx-auto gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={(i % 2) * 0.08} className="min-w-0">
            <TiltCard>
              <article className="card-surface relative flex h-full flex-col rounded-[2rem] p-3 transition-colors group-hover:border-primary/50">
                {p.visual}
                <div className="flex flex-1 flex-col p-4 pt-7 md:p-6">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
                    <span className="tracking-wider text-primary">{`PROJECT ${p.number}`}</span>
                    {p.badge && (
                      <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-xs tracking-wider text-primary">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-heading text-3xl font-bold text-foreground md:text-4xl">{p.name}</h3>
                  <p className="mt-2 text-lg font-medium text-foreground/90 md:text-xl">{p.subtitle}</p>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">{p.description}</p>

                  <p className="mt-7 font-mono text-xs tracking-[0.3em] text-muted-foreground">FEATURES</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.features.map((f) => (
                      <li key={f} className="rounded-full border border-border bg-background/50 px-3.5 py-1.5 text-sm text-foreground">
                        {f}
                      </li>
                    ))}
                  </ul>

                  {p.technologies && (
                    <>
                      <p className="mt-6 font-mono text-xs tracking-[0.3em] text-muted-foreground">TECHNOLOGIES</p>
                      <p className="mt-2 text-base text-foreground/90">{p.technologies}</p>
                    </>
                  )}

                  <div className="mt-auto pt-8">
                    <ProjectAction link={p.link} name={p.name} />
                  </div>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
