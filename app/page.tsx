import { About } from '@/components/about'
import { BootSequence } from '@/components/boot-sequence'
import { Contact } from '@/components/contact'
import { Education } from '@/components/education'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { Skills } from '@/components/skills'

export default function Home() {
  return (
    <>
      <BootSequence />
      <SiteNav />
      <main className="overflow-x-clip">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
