import { Download, ExternalLink, FileText } from 'lucide-react'
import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { profile } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Resume | Tasleem Banu — OBSIDIAN',
  description: 'View or download the resume of Tasleem Banu, Computer Science Engineering diploma student and aspiring cybersecurity professional.',
}

export default function ResumePage() {
  return (
    <>
      <SiteNav onHome={false} />
      <main className="mx-auto max-w-[1280px] overflow-x-clip px-5 pb-24 pt-36 md:px-10 md:pt-44">
        <p className="flex items-center gap-4 font-mono text-sm tracking-[0.3em] text-muted-foreground">
          <FileText className="size-4 text-primary" aria-hidden="true" />
          RESUME
        </p>
        <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h1 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-tight tracking-tight text-foreground">
              {profile.name}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground md:text-xl">{profile.title}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={profile.resume}
              download="Tasleem_Banu_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-[0_10px_40px_-8px_var(--glow)] transition-transform hover:-translate-y-0.5"
            >
              <Download className="size-5" aria-hidden="true" />
              Download PDF
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-6 py-3.5 font-semibold text-foreground transition-colors hover:border-primary/60"
            >
              <ExternalLink className="size-5" aria-hidden="true" />
              Open in New Tab
            </a>
          </div>
        </div>

        <div className="card-surface mt-12 overflow-hidden rounded-[2rem] p-2.5">
          <object
            data={`${profile.resume}#view=FitH`}
            type="application/pdf"
            aria-label={`Resume of ${profile.name}`}
            className="h-[80vh] min-h-[560px] w-full rounded-[1.6rem] bg-white"
          >
            <div className="flex h-full flex-col items-center justify-center gap-4 p-10 text-center">
              <p className="text-lg text-muted-foreground">{"Your browser can't display the PDF inline."}</p>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">
                Open the resume PDF
              </a>
            </div>
          </object>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
