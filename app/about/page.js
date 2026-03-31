'use client';

import Link from 'next/link';

const values = [
  { icon: '🎯', title: 'Honest Advice',        desc: 'Joel tells you what you need to hear — not what you want to hear. You deserve accurate, transparent guidance, not just enthusiasm.' },
  { icon: '💡', title: 'Strategic Thinking',    desc: 'With a commercial background, Joel approaches every deal with analytical precision and investment-grade strategy.' },
  { icon: '🤝', title: 'Lasting Relationships', desc: 'Joel\'s goal isn\'t a single transaction — it\'s to be your trusted real estate resource for every stage of life.' },
  { icon: '🏘️', title: 'Local Expertise',       desc: 'Born and raised in the Greater Saint John area, Joel knows the neighbourhoods, the market cycles, and the community.' },
];

const experience = [
  { year: '2021',    title: 'Licensed REALTOR®',             body: 'Joined EXIT Realty Specialists as a residential REALTOR®, bringing a decade of commercial expertise to the residential market.' },
  { year: '2011–20', title: 'Commercial Real Estate',        body: 'Spent over 10 years in commercial real estate across sales, leasing, and investment strategy — developing a deep understanding of contracts, negotiations, and property valuation.' },
  { year: 'Today',   title: 'Serving Greater Saint John',    body: 'Helping buyers and sellers in Saint John, Rothesay, Quispamsis, Grand Bay-Westfield, Hampton, and surrounding NB communities.' },
];

const areas = [
  { name: 'Saint John',           desc: 'The commercial and cultural hub of southern NB, with diverse neighbourhoods from uptown to the east side.' },
  { name: 'Rothesay',             desc: 'One of NB\'s most desirable communities — charming, family-friendly, and close to everything.' },
  { name: 'Quispamsis',           desc: 'A fast-growing suburb with excellent schools, parks, and a strong sense of community.' },
  { name: 'Grand Bay-Westfield',  desc: 'Peaceful riverfront living with easy access to Saint John.' },
  { name: 'Hampton',              desc: 'A welcoming small town in Kings County with a tight-knit community.' },
  { name: 'Sussex & Area',        desc: 'Rural charm with surprising amenities — perfect for those seeking space and value.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(150deg, #001e2d 0%, #003149 70%, #005a7a 100%)',
          paddingTop: 120,
          paddingBottom: 80,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="container-wide">
          <p className="font-subheading" style={{ color: 'var(--teal)', fontSize: 10, marginBottom: 14 }}>
            About
          </p>
          <h1
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.04em',
              color: 'white',
              lineHeight: 0.95,
              marginBottom: 16,
            }}
          >
            Joel McElhinney
          </h1>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: 15, color: 'var(--teal)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            REALTOR® &bull; EXIT Realty Specialists &bull; Saint John, NB
          </p>
        </div>
      </section>

      {/* Main bio section */}
      <section className="section-pad">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Photo column */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{ boxShadow: '0 12px 60px rgba(0,49,73,0.18), 0 4px 16px rgba(0,49,73,0.08)' }}
                >
                  <img
                    src="/joel-photo.jpg"
                    alt="Joel McElhinney — REALTOR® with EXIT Realty Specialists"
                    className="w-full object-cover object-center"
                    style={{ display: 'block', maxHeight: 560 }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,49,73,0.5) 0%, transparent 60%)' }}
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 20, color: 'white', letterSpacing: '-0.02em' }}>
                      Joel McElhinney
                    </p>
                    <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: 'var(--teal)' }}>
                      REALTOR® — EXIT Realty Specialists
                    </p>
                  </div>
                </div>

                {/* Quick contact card */}
                <div
                  className="mt-5 rounded-xl p-5"
                  style={{ background: 'white', border: '1.5px solid var(--light)', boxShadow: '0 2px 12px rgba(0,49,73,0.05)' }}
                >
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 14 }}>
                    Contact
                  </p>
                  {[
                    { icon: '📞', label: '(506) 123-4567',     href: 'tel:+15061234567' },
                    { icon: '✉',  label: 'joel@joelmcelhinney.ca', href: 'mailto:joel@joelmcelhinney.ca' },
                  ].map(({ icon, label, href }) => (
                    <a
                      key={href}
                      href={href}
                      className="flex items-center gap-3 py-2.5 hover:opacity-70 transition-opacity duration-200"
                      style={{ borderBottom: '1px solid var(--light)' }}
                    >
                      <span>{icon}</span>
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: 13, color: 'var(--navy)' }}>{label}</span>
                    </a>
                  ))}
                  <Link href="/contact" className="btn-primary w-full justify-center mt-4">
                    Book a Consultation
                  </Link>
                </div>
              </div>
            </div>

            {/* Content column */}
            <div className="lg:col-span-8">
              <p className="font-subheading" style={{ color: 'var(--teal)', fontSize: 10, marginBottom: 16 }}>
                My Story
              </p>
              <h2
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  letterSpacing: '-0.03em',
                  color: 'var(--navy)',
                  lineHeight: 1.1,
                  marginBottom: 28,
                }}
              >
                A Different Kind of<br />Real Estate Professional
              </h2>

              {[
                `I'm Joel McElhinney, a REALTOR® with EXIT Realty Specialists, serving buyers and sellers across Saint John, Rothesay, Quispamsis, and surrounding New Brunswick communities.`,
                `Before becoming a licensed REALTOR® in 2021, I spent over 10 years working in commercial real estate — sales, leasing, and investment strategy. That background gave me skills that most residential agents simply don't have: the ability to analyse a deal from an investor's perspective, structure contracts that protect my clients, and negotiate from a position of knowledge rather than just enthusiasm.`,
                `I made the move to residential real estate because I saw how much it truly matters to people. Buying or selling a home isn't just a financial transaction — it's one of the most significant decisions in a person's life. The stakes are high, the process can be complex, and you deserve someone who will give you honest guidance, not just tell you what you want to hear.`,
                `My approach is straightforward: understand your goals deeply, provide clear and honest advice, develop a smart strategy, and execute it with precision. Whether you're a first-time buyer, a growing family looking to upsize, or a homeowner ready to make your next move, I'm here to help you navigate the process with confidence.`,
                `Real estate is something I'm genuinely passionate about — and that passion drives me to stay at the top of my market knowledge, hone my negotiation skills, and deliver results that consistently exceed my clients' expectations.`,
              ].map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: 16,
                    color: '#4a5568',
                    lineHeight: 1.8,
                    marginBottom: 18,
                  }}
                >
                  {para}
                </p>
              ))}

              {/* Core values */}
              <div className="mt-12">
                <p className="font-subheading" style={{ color: 'var(--teal)', fontSize: 10, marginBottom: 20 }}>
                  Core Values
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {values.map(({ icon, title, desc }) => (
                    <div
                      key={title}
                      className="rounded-xl p-5"
                      style={{ background: 'white', border: '1.5px solid var(--light)', boxShadow: '0 1px 6px rgba(0,49,73,0.04)' }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span style={{ fontSize: 22 }}>{icon}</span>
                        <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--navy)' }}>{title}</h4>
                      </div>
                      <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: '#4a5568', lineHeight: 1.65 }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad" style={{ background: 'var(--off-white, #F8F9FA)' }}>
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-12">
            <p className="font-subheading" style={{ color: 'var(--teal)', fontSize: 10, marginBottom: 12 }}>
              Background & Experience
            </p>
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                letterSpacing: '-0.03em',
                color: 'var(--navy)',
              }}
            >
              Professional Journey
            </h2>
          </div>

          <div className="flex flex-col gap-0">
            {experience.map(({ year, title, body }, i) => (
              <div key={year} className="flex gap-6">
                <div className="flex flex-col items-center flex-shrink-0" style={{ width: 80 }}>
                  <div
                    className="rounded-lg px-2 py-1.5 text-center flex-shrink-0"
                    style={{ background: 'var(--teal)', minWidth: 72 }}
                  >
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 11, color: 'white', letterSpacing: '0.04em' }}>
                      {year}
                    </span>
                  </div>
                  {i < experience.length - 1 && (
                    <div className="w-[2px] flex-1 my-2" style={{ background: 'var(--light)' }} />
                  )}
                </div>
                <div style={{ paddingBottom: i < experience.length - 1 ? 32 : 0 }}>
                  <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 17, color: 'var(--navy)', marginBottom: 8, letterSpacing: '-0.01em' }}>
                    {title}
                  </h4>
                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 15, color: '#4a5568', lineHeight: 1.75 }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas served */}
      <section className="section-pad">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="font-subheading" style={{ color: 'var(--teal)', fontSize: 10, marginBottom: 12 }}>
              Coverage Area
            </p>
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                letterSpacing: '-0.03em',
                color: 'var(--navy)',
              }}
            >
              Areas Served
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {areas.map(({ name, desc }) => (
              <div
                key={name}
                className="rounded-xl p-6"
                style={{
                  background: 'white',
                  border: '1.5px solid var(--light)',
                  boxShadow: '0 1px 6px rgba(0,49,73,0.04)',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--teal)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,140,154,0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--light)';
                  e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,49,73,0.04)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: 'var(--teal)' }}
                  />
                  <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--navy)' }}>
                    {name}
                  </h4>
                </div>
                <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: 'var(--gray)', lineHeight: 1.65 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXIT Realty section */}
      <section className="section-pad" style={{ background: 'var(--navy)' }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-lg"
                style={{ background: 'rgba(238,49,36,0.15)', border: '1px solid rgba(238,49,36,0.3)' }}
              >
                <span style={{ color: '#EE3124', fontWeight: 900, fontFamily: 'Montserrat, sans-serif', fontSize: 18, letterSpacing: '0.05em' }}>EXIT</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Lato, sans-serif', fontSize: 13 }}>Realty Specialists</span>
              </div>
              <h2
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  letterSpacing: '-0.03em',
                  color: 'white',
                  lineHeight: 1.1,
                  marginBottom: 20,
                }}
              >
                Backed by One of Canada's Top Brokerages
              </h2>
              <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75 }}>
                As a REALTOR® with EXIT Realty Specialists, Joel operates within one of North America's most respected real estate brokerages — known for technology, training, and a commitment to client service. This means you benefit from industry-leading tools, market data, and resources behind every transaction.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'MLS®', label: 'Full MLS Access' },
                { value: 'CREA', label: 'Member of CREA' },
                { value: 'NBR',  label: 'NB REALTORS® Association' },
                { value: '2021', label: 'Licensed Since' },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl p-5 text-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 22, color: 'var(--teal)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {value}
                  </p>
                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--teal)', padding: '64px 0' }}>
        <div className="container-wide text-center">
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: 'white', marginBottom: 16 }}>
            Let's Talk About Your Real Estate Goals
          </h2>
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.8)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
            Whether you're buying, selling, or just exploring your options — Joel is here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="btn-navy">Book a Free Consultation</Link>
            <Link href="/listings" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
