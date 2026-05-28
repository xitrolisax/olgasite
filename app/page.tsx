import Image from 'next/image';
import styles from './page.module.scss';
import { ContactTabs } from './contact-tabs';
import { ImpactCalculator } from './impact-calculator';
import {
  IconArrow,
  IconBag,
  IconBrackets,
  IconCheck,
  IconCube,
  IconDot,
  IconGear,
  IconHeart,
  IconLayers,
  IconLinkedIn,
  IconInstagram,
  IconLock,
  IconMail,
  IconMonitor,
  IconPencil,
  IconPhone,
  IconShield,
  IconSpark,
  IconSpeech,
} from './icons';

const services = [
  { icon: <IconMonitor />, title: 'Websites & Landing Pages'},
  { icon: <IconPhone />, title: 'Mobile Applications iOS & Android' },
  { icon: <IconCube />, title: 'Client Portals & Dashboards' },
  { icon: <IconBag />, title: 'E-commerce & Shopify Solutions' },
  { icon: <IconGear />, title: 'Internal Tools & Operational Systems' },
  { icon: <IconLayers />, title: 'Product Strategy & Architecture' },
  { icon: <IconPencil />, title: 'UX/UI Design & Prototyping' },
  { icon: <IconBrackets />, title: 'Frontend Development & Integrations' },
  { icon: <IconShield />, title: 'Performance, Security & Scalability' },
];

const processSteps = [
  {
    n: '01',
    title: 'Discovery',
    body: 'Goal clarification, audience, and project scope.',
  },
  {
    n: '02',
    title: 'Strategy & Scope',
    body: 'Plan creation, timeline, and transparent estimate.',
  },
  {
    n: '03',
    title: 'Design',
    body: 'Clean, intentional design focused on usability and quality.',
  },
  {
    n: '04',
    title: 'Development',
    body: 'High-quality code, integrations, and performance.',
  },
  {
    n: '05',
    title: 'Launch & Support',
    body: 'Product launch and ongoing support.',
  },
];

const principles = [
  'Selective project intake',
  'Clear communication and regular updates',
  'Small number of projects at a time',
  'Long-term partnerships',
  'Focus on quality, not quantity',
];

const valueCards = [
  {
    icon: <IconSpark />,
    title: 'Strategic Thinking',
    body: 'I look at the big picture and help you make the right decisions.',
  },
  {
    icon: <IconSpeech />,
    title: 'Reliable Communication',
    body: "You're always in the loop. I explain things clearly and simply.",
  },
  {
    icon: <IconHeart />,
    title: 'Design Meets Function',
    body: 'I combine aesthetics with performance and real-world usability.',
  },
];

const faq = [
  {
    q: 'What is the typical timeline for a project?',
    a: 'Most projects take 4–8 weeks from kickoff to launch, depending on scope. Larger products with custom backend or multiple integrations can run 2–4 months. I share a clear timeline with milestones during the Strategy phase.',
  },
  {
    q: 'How do you handle pricing?',
    a: 'I work on a fixed-price project basis, scoped during Discovery. After our first call I send a written proposal with deliverables, timeline, and a transparent quote — no hourly billing surprises.',
  },
  {
    q: 'Do you work on NDA projects?',
    a: 'Yes. About half of my work is under NDA. I sign mutual NDAs before any technical discussion. Selected private case studies are available on request after signing.',
  },
  {
    q: 'Do you provide ongoing support after launch?',
    a: 'Yes — every project includes 30 days of post-launch support at no extra cost. After that I offer monthly retainers for maintenance, content updates, and iterative improvements.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. I work with founders and teams across Europe, the US, and beyond. Communication is async over email with weekly sync calls on Zoom or Google Meet.',
  },
];

export default function Page() {
  return (
    <main>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.brand}>
            <span className={styles.brandName}>OLGA FREDRICK</span>
            <span className={styles.brandDot}>•</span>
          </a>
          <nav className={styles.nav}>
            <a href="#services">SERVICES</a>
            <a href="#experience">EXPERIENCE</a>
            <a href="#about">ABOUT</a> 
            <a href="#contact">CONTACT</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className={styles.hero} id="top" role="img" aria-label="Olga Fredrick portrait">
        <div className={styles.heroFade} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>12 YEARS IN SOFTWARE ENGINEERING</p>
            <h1 className={styles.heroTitle}>
              Digital products
              <br />
              designed to feel
              <br />
              <em>inevitable.</em>
            </h1>
            <p className={styles.heroLead}>
              I design and build websites and mobile
              <br />
              applications for brands that care about
              <br />
              clarity, aesthetics, and long-term growth.
            </p>
            <div className={styles.heroCtas}>
              <a href="#contact" className={styles.btnPrimary}>
                <span>DISCUSS A PROJECT</span>
                <IconArrow />
              </a>
              <a href="#services" className={styles.btnGhost}>
                VIEW SERVICES
              </a>
            </div>
            <p className={styles.heroFootnote}>
              <IconDot />
              <span>Currently accepting a limited number of projects.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className={styles.services} id="services">
        <div className={styles.servicesIntro}>
          <p className={styles.kickerDark}>SELECTED EXPERIENCE</p>
          <h2 className={styles.h2}>What I build.</h2>
          <p className={styles.lead}>
            I work on custom digital products across industries. <br/> From elegant
            websites to complex internal tools.
          </p>
         
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className={styles.servicesGridSection} id="services-grid">
        <div className={styles.servicesGridInner}>
          <ul className={styles.servicesGrid}>
            {services.map((s, i) => (
              <li key={i} className={styles.serviceCell}>
                <span className={styles.serviceIcon}>{s.icon}</span>
                <span className={styles.serviceText}>
                  {s.title}
                 
                </span>
              </li>
            ))}
          </ul>

          <div className={styles.nda}>
            <IconLock />
            <p>
              Many projects are under NDA. Types of work and outcomes are shared selectively.
              Selected private work available upon request.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS INTRO */}
      <section className={styles.process} id="experience">
        <div className={styles.processIntro}>
          <p className={styles.kickerDark}>MY PROCESS</p>
          <h2 className={styles.h2}>
            A clear process for a smooth experience.
          </h2>
          <p className={styles.lead}>
            I believe great results come from structure, communication, and
            attention to detail.
          </p>
        
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className={styles.processTimeline} id="process-timeline">
        <div className={styles.processTimelineInner}>
          <div className={styles.timeline}>
            <div className={styles.timelineTrack} aria-hidden="true">
              <span className={styles.timelineLine} />
              {processSteps.map((_, i) => (
                <span key={i} className={styles.timelineDot} />
              ))}
            </div>
            <ol className={styles.timelineSteps}>
              {processSteps.map((step) => (
                <li key={step.n} className={styles.step}>
                  <span className={styles.stepNum}>{step.n}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* WORKING STYLE */}
      <section className={styles.style} id="about">
        <div className={styles.styleInner}>
          <div className={styles.styleLeft}>
            <p className={styles.kickerDark}>WORKING STYLE</p>
            <h2 className={styles.h2}>
              How I work with
              <br />
              my clients.
            </h2>
            <ul className={styles.checks}>
              {principles.map((p) => (
                <li key={p}>
                  <IconCheck />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.stylePortrait}>
            <Image
              src="/images/portrait-side.JPG"
              alt="Olga Fredrick"
              fill
              sizes="(max-width: 960px) 100vw, 50vw"
              className={styles.styleImg}
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className={styles.testimonial}>
        <div className={styles.testimonialInner}>
          <div className={styles.testimonialHead}>
            <p className={styles.kickerDark}>WHAT CLIENTS SAY</p>
            <blockquote className={styles.quote}>
              <em>
                “Olga is not just a developer. She&rsquo;s a true partner who cares
                about the result as much as I do.”
              </em>
            </blockquote>
            <p className={styles.quoteAuthor}>— MARK T., FOUNDER</p>
          </div>

          <ul className={styles.valueCards}>
            {valueCards.map((v) => (
              <li key={v.title}>
                <span className={styles.valueIcon}>{v.icon}</span>
                <h4>{v.title}</h4>
                <p>{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection} id="faq">
        <div className={styles.faqInner}>
          <div className={styles.faqHead}>
            <p className={styles.kickerDark}>FAQ</p>
            <h2 className={styles.h2}>Common questions.</h2>
          </div>
          <ul className={styles.faqList}>
            {faq.map((item) => (
              <li key={item.q}>
                <details className={styles.faqItem}>
                  <summary className={styles.faqRow}>
                    <span>{item.q}</span>
                    <span className={styles.faqPlus} aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className={styles.faqAnswer}>
                    <p>{item.a}</p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
          <p className={styles.faqFooter}>More questions? Let's discuss your project.</p>
        </div>
      </section>

      {/* IMPACT — St. Jude */}
      <section className={styles.impact} id="impact">
        <div className={styles.impactInner}>
          <div className={styles.impactLogoCard}>
            <Image
              src="/images/stJude.png"
              alt="St. Jude Children's Research Hospital"
              width={400}
              height={400}
              sizes="(max-width: 768px) 220px, 280px"
              className={styles.impactLogo}
            />
          </div>

          <div className={styles.impactCopy}>
            <p className={styles.kickerDark}>GIVING BACK</p>
            <h2 className={styles.impactTitle}>
              10% of every project supports{' '}
              <em>St. Jude Children&rsquo;s Research Hospital.</em>
            </h2>
            <p className={styles.impactLead}>
              For every project I take on, ten percent of the total amount paid is donated to
              St. Jude to fund lifesaving treatment and research so families
              never receive a bill for care, travel, housing, or food.
            </p>

            <ImpactCalculator />

            <div className={styles.impactCtas}>
              <a
                href="http://fundraising.stjude.org/goto/syntria"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnDark}
              >
                <span>DONATE TO MY FUNDRAISER</span>
                <IconArrow />
              </a>
              <a
                href="https://www.stjude.org"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkUnderline}
              >
                LEARN ABOUT ST. JUDE <IconArrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className={styles.contactSection} id="contact">
        <div className={styles.contactInner}>
          <div className={styles.contactHead}>
            <p className={styles.kickerDark}>GET IN TOUCH</p>
            <h2 className={styles.h2}>Let's discuss your project.</h2>
            <p className={styles.lead}>
              Book a 30-min call or send me a message.<br/>I'll get back
              to you within 1–2 business days.
            </p>
          </div>
          <ContactTabs />
        </div>
      </section>

      {/* CTA BANNER */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            Let's create something
            <br />
            <em>exceptional</em> together.
          </h2>
          <p className={styles.ctaLead}>
            Have a project in mind?
            <br />
            Let's talk about how I can
            <br />
            bring your ideas to life.
          </p>
          <a href="#contact" className={styles.btnPrimary}>
            <span>DISCUSS A PROJECT</span>
            <IconArrow />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerCol}>
            <div className={styles.footerBrand}>
              <span>OLGA FREDRICK</span>
              <span className={styles.brandDot}>•</span>
            </div>
            <p>Software Engineer</p>
            <p>olga@syntria.io</p>
            <p>
              Based in the United States<span className={styles.brandDot}>•</span>Working Worldwide
            </p>
            <div className={styles.socials}>
             
            
              <a aria-label="Email" href="mailto:olga@syntria.io">
                <IconMail />
              </a>
            </div>
          </div>

          <div className={styles.footerCol}>
            <h5>NAVIGATION</h5>
            <a href="#services">SERVICES</a>
            <a href="#experience">EXPERIENCE</a>
            <a href="#about">ABOUT</a>
            <a href="#contact">CONTACT</a>
          </div>

         

          
        </div>

        <div className={styles.footerBottom}>
          <p>
            © {new Date().getFullYear()} OLGA FREDRICK<span className={styles.brandDot}>•</span>ALL RIGHTS
            RESERVED.
          </p>
       
        </div>
      </footer>
    </main>
  );
}
