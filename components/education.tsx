import { GraduationCap, MapPin } from 'lucide-react'
import { profile } from '@/lib/site-data'
import { Reveal, SectionHeading } from './reveal'

export function Education() {
  const stats = [
    { label: 'CURRENT YEAR', value: <>{profile.year}</> },
    {
      label: 'FIRST-YEAR CGPA',
      value: (
        <>
          {profile.cgpa}
          <span className="text-lg font-medium text-muted-foreground">/10</span>
        </>
      ),
    },
    { label: 'EXPECTED GRADUATION', value: <>{profile.graduation}</> },
  ]

  return (
    <section id="education" className="mx-auto max-w-[1520px] px-5 py-24 md:px-10 md:py-32 lg:px-16">
      <SectionHeading index="04" label="EDUCATION" title="Academic Foundation" />
      <Reveal>
        <article className="card-surface relative overflow-hidden rounded-[2rem] p-6 md:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full border border-primary/15 bg-primary/5" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-10 size-[28rem] rounded-full border border-dashed border-primary/10" />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_10px_30px_-6px_var(--glow)]">
                <GraduationCap className="size-7" aria-hidden="true" />
              </span>
              <h3 className="mt-8 max-w-xl font-heading text-3xl font-bold leading-tight text-foreground text-balance md:text-[2.75rem]">
                {profile.program}
              </h3>
              <p className="mt-5 text-xl font-medium text-foreground/90">{profile.institution}</p>
              <p className="mt-3 flex items-center gap-2 text-lg text-muted-foreground">
                <MapPin className="size-5 text-primary" aria-hidden="true" />
                {profile.location}
              </p>
            </div>
            <dl className="grid gap-4 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-3xl border border-border bg-background/50 p-6 lg:w-48">
                  <dt className="font-mono text-xs leading-relaxed tracking-[0.25em] text-muted-foreground">{s.label}</dt>
                  <dd className="mt-3 font-heading text-3xl font-bold text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>
      </Reveal>
    </section>
  )
}
