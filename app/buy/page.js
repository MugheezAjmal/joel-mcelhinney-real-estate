'use client';

import Link from 'next/link';

const steps = [
  {
    num: '01',
    title: 'Free Buyer Consultation',
    icon: '🤝',
    desc: 'We start with a relaxed, no-pressure conversation to understand your goals, timeline, budget, and must-haves. This helps Joel tailor the entire process to you — not a one-size-fits-all template.',
    action: { label: 'Book Your Free Consultation', href: '/contact' },
  },
  {
    num: '02',
    title: 'Mortgage Pre-Approval',
    icon: '🏦',
    desc: 'Before we start viewing homes, you\'ll want a pre-approval letter from your lender. This tells sellers you\'re serious and gives you a clear price ceiling. Joel can connect you with trusted mortgage brokers in the Saint John area.',
    action: { label: 'Calculate Your Mortgage', href: '/calculators#mortgage' },
  },
  {
    num: '03',
    title: 'Search & Tour Properties',
    icon: '🔍',
    desc: 'Joel provides you with real-time MLS access and curated property alerts. Tour homes in-person or virtually — whatever suits your schedule. With his market knowledge, Joel spots opportunities (and red flags) that others miss.',
    action: { label: 'Browse Current Listings', href: '/listings' },
  },
  {
    num: '04',
    title: 'Make a Competitive Offer',
    icon: '📝',
    desc: 'Found the one? Joel crafts a strong, well-structured offer backed by current market data and 10+ years of negotiation experience. He advocates for your best interests at every stage.',
    action: null,
  },
  {
    num: '05',
    title: 'Due Diligence & Inspection',
    icon: '🔬',
    desc: 'Once your offer is accepted, Joel guides you through the conditional period — home inspection, financing confirmation, and any other conditions. He works with trusted inspectors and lawyers across Greater Saint John.',
    action: null,
  },
  {
    num: '06',
    title: 'Close & Get Your Keys',
    icon: '🗝️',
    desc: 'On closing day, you\'ll sign final documents with your lawyer and receive the keys to your new home. Joel is available every step of the way — even after the sale — to help you settle in.',
    action: null,
  },
];

const faqs = [
  { q: 'How long does the buying process take?', a: 'On average, 30–90 days from your first consultation to receiving keys — though this varies based on your readiness, market conditions, and the specific property.' },
  { q: 'Do I need a REALTOR® when buying?', a: 'Technically no, but it\'s strongly advised. Joel\'s buyer services are typically paid by the seller, so you get professional representation and expertise at no direct cost to you.' },
  { q: 'What is a buyer agency agreement?', a: 'It\'s a written agreement that establishes Joel as your exclusive buyer\'s agent. It outlines his duties, your rights, and the commission structure. Joel always explains this clearly before you sign anything.' },
  { q: 'How much do I need for a down payment?', a: 'In Canada, the minimum is 5% for homes under $500,000. Between $500,000–$999,999 it\'s 5% on the first $500k plus 10% on the remainder. For $1M+ properties, 20% is required. Use the Affordability Calculator for a personalized estimate.' },
  { q: 'What are closing costs in New Brunswick?', a: 'Budget 2–4% of the purchase price for closing costs, including land transfer tax, legal fees, home inspection, and title insurance. Joel provides a detailed breakdown upfront.' },
  { q: 'What areas does Joel serve?', a: 'Joel primarily serves Saint John, Rothesay, Quispamsis, Grand Bay-Westfield, Hampton, and surrounding communities in the Greater Saint John area.' },
];

export default function BuyPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-center"
        style={{
          minHeight: '60vh',
          background: 'linear-gradient(150deg, #001e2d 0%, #003149 60%, #005a7a 100%)',
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
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none hidden lg:block"
          style={{
            background: 'url("https://placehold.co/900x600/003149/008C9A?text=Saint+John+Homes") center/cover no-repeat',
            opacity: 0.12,
          }}
        />
        <div className="container-wide relative z-10">
          <div className="max-w-2xl">
            <p
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--teal)',
                marginBottom: 20,
              }}
            >
              Buyer's Guide
            </p>
            <h1
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.2rem, 6vw, 5rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: 'white',
                marginBottom: 24,
              }}
            >
              Your Step-by-Step<br />
              <span style={{ color: 'var(--teal)' }}>Buying Journey</span>
            </h1>
            <p
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: 17,
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.7,
                maxWidth: 520,
                marginBottom: 36,
              }}
            >
              Buying a home is one of the biggest decisions you'll make. Joel is here to guide you through every step with clarity, honesty, and expert negotiation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">Book a Free Consultation</Link>
              <Link href="/listings" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.35)', color: 'white' }}>Browse Listings</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-pad">
        <div className="container-wide">
          <div className="text-center mb-14">
            <p className="font-subheading" style={{ color: 'var(--teal)', fontSize: 11, marginBottom: 12 }}>
              Clear. Simple. Confident.
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
              The Buying Process, Explained
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                {/* Number */}
                <div className="lg:col-span-1 flex lg:flex-col items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--teal)', boxShadow: '0 4px 20px rgba(0,140,154,0.3)' }}
                  >
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 15, color: 'white' }}>
                      {step.num}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="hidden lg:block w-[2px] flex-1"
                      style={{ background: 'linear-gradient(180deg, var(--teal), transparent)', minHeight: 40 }}
                    />
                  )}
                </div>

                {/* Content card */}
                <div
                  className="lg:col-span-11 rounded-xl p-6 lg:p-8"
                  style={{
                    background: 'white',
                    border: '1.5px solid var(--light)',
                    boxShadow: '0 2px 12px rgba(0,49,73,0.06)',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--teal)';
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,140,154,0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--light)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,49,73,0.06)';
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span style={{ fontSize: 28, flexShrink: 0 }}>{step.icon}</span>
                    <div className="flex-1">
                      <h3
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 800,
                          fontSize: 20,
                          color: 'var(--navy)',
                          letterSpacing: '-0.02em',
                          marginBottom: 10,
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'Lato, sans-serif',
                          fontSize: 15,
                          color: '#4a5568',
                          lineHeight: 1.75,
                          marginBottom: step.action ? 16 : 0,
                        }}
                      >
                        {step.desc}
                      </p>
                      {step.action && (
                        <Link href={step.action.href} className="btn-outline" style={{ padding: '8px 20px', fontSize: 12 }}>
                          {step.action.label}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator preview */}
      <section className="section-pad" style={{ background: 'var(--off-white, #F8F9FA)' }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '💰', title: 'Mortgage Calculator',    desc: 'See your estimated monthly payment.', href: '/calculators#mortgage' },
              { icon: '🏡', title: 'Affordability Calculator', desc: 'Find your true purchase budget.',     href: '/calculators#affordability' },
              { icon: '📋', title: 'Land Transfer Tax',       desc: 'NB land transfer tax in seconds.',   href: '/calculators#land-transfer' },
            ].map(c => (
              <Link key={c.href} href={c.href} className="card p-6 block group">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--navy)', marginBottom: 6 }}>{c.title}</h4>
                <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: 'var(--gray)', lineHeight: 1.6 }}>{c.desc}</p>
                <p className="mt-3 transition-transform duration-200 group-hover:translate-x-1" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 12, color: 'var(--teal)' }}>
                  Open Calculator →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-12">
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                letterSpacing: '-0.03em',
                color: 'var(--navy)',
              }}
            >
              Buyer FAQ
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-xl overflow-hidden"
                style={{ border: '1.5px solid var(--light)', background: 'white' }}
              >
                <summary
                  className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--navy)' }}
                >
                  {q}
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200 group-open:rotate-45"
                    style={{ background: 'var(--teal)', color: 'white', fontSize: 16, lineHeight: 1 }}
                  >
                    +
                  </span>
                </summary>
                <p
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: 15,
                    color: '#4a5568',
                    lineHeight: 1.75,
                    padding: '0 24px 24px',
                  }}
                >
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{ background: 'var(--teal)', padding: '64px 0' }}
      >
        <div className="container-wide text-center">
          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '-0.03em',
              color: 'white',
              marginBottom: 16,
            }}
          >
            Let's Find Your Next Home
          </h2>
          <p
            style={{
              fontFamily: 'Lato, sans-serif',
              fontSize: 16,
              color: 'rgba(255,255,255,0.8)',
              marginBottom: 32,
              maxWidth: 480,
              margin: '0 auto 32px',
              lineHeight: 1.7,
            }}
          >
            Book a free, no-obligation buyer consultation and start your journey with confidence.
          </p>
          <Link href="/contact" className="btn-navy">Book Your Free Consultation</Link>
        </div>
      </section>
    </>
  );
}
