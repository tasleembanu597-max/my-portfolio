import { Award, BookOpen, CalendarDays, Flag, GraduationCap, MapPin } from 'lucide-react'
import Image from 'next/image'
import { profile } from '@/lib/site-data'
import { Reveal, SectionHeading } from './reveal'
import { Terminal } from './terminal'

const facts = [
  { label: 'PROGRAM', value: profile.program, Icon: GraduationCap },
  { label: 'INSTITUTION', value: profile.institution, Icon: BookOpen },
  { label: 'CURRENT YEAR', value: profile.year, Icon: CalendarDays },
  { label: 'FIRST-YEAR CGPA', value: `${profile.cgpa}/10`, Icon: Award },
  { label: 'EXPECTED GRADUATION', value: profile.graduation, Icon: Flag },
  { label: 'LOCATION', value: profile.location, Icon: MapPin },
]

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1520px] px-5 py-24 md:px-10 md:py-32 lg:px-16">
      <SectionHeading index="01" label="ABOUT" title="Behind the Curiosity" />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,520px)_1fr] lg:gap-20">
        <div className="flex min-w-0 flex-col gap-6">
          <Reveal>
            <figure className="rounded-[2rem] border border-border bg-surface/60 p-2.5 shadow-[0_30px_80px_-40px_var(--glow)]">
              <div className="relative aspect-[5/6] overflow-hidden rounded-[1.6rem]">
                <Image
                  src="/images/tasleem-banu.png"
                  alt="Portrait of Tasleem Banu wearing a black hijab and blazer"
                  fill
                  priority={false}
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover object-[50%_20%]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#070b14]/95 via-[#070b14]/55 to-transparent" />
                <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <span>
                    <span className="block font-heading text-2xl font-bold text-white">{profile.name}</span>
                    <span className="block text-sm text-white/80">Aspiring Cybersecurity Professional</span>
                  </span>
                  <span className="shrink-0 rounded-full border border-white/25 bg-black/40 px-3 py-1.5 font-mono text-xs font-medium tracking-wider text-white backdrop-blur">
                    SECOND YEAR
                  </span>
                </figcaption>
              </div>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <Terminal />
          </Reveal>
        </div>

        <div className="min-w-0">
          <Reveal>
            <p className="font-heading text-2xl font-medium leading-snug text-foreground text-pretty md:text-[2rem] md:leading-[1.5]">
              {"I'm a second-year Diploma student in Computer Science Engineering at "}
              <span className="text-primary">{profile.institution}</span>.
            </p>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground text-pretty md:text-[1.4rem] md:leading-relaxed">
              <p>
                I have a strong interest in cybersecurity and technology, particularly ethical hacking, networking,
                penetration testing fundamentals and secure application development.
              </p>
              <p>
                I enjoy exploring technical concepts, experimenting with virtual environments and building projects that
                help me understand real-world technology and security challenges.
              </p>
              <p>I aim to strengthen my technical knowledge and develop into a cybersecurity professional.</p>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {facts.map(({ label, value, Icon }, i) => (
              <li key={label}>
                <Reveal delay={i * 0.05} className="h-full">
                  <div className="card-surface flex h-full items-start gap-4 rounded-3xl p-6 transition-colors hover:border-primary/50">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-xs tracking-[0.25em] text-muted-foreground">{label}</span>
                      <span className="mt-2 block text-lg font-semibold leading-snug text-foreground">{value}</span>
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
