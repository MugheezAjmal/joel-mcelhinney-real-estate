'use client';

import Link from 'next/link';

const steps = [
  {
    num: '01',
    title: 'Free Market Valuation',
    icon: '📊',
    desc: 'Joel prepares a comprehensive Comparative Market Analysis (CMA) — a detailed look at recent sales, current competition, and market trends in your neighbourhood. This gives you a realistic price range and a solid strategy.',
    action: { label: 'Request a Free Valuation', href: '/contact' },
  },
  {
    num: '02',
    title: 'Prepare & Stage Your Home',
    icon: '🏡',
    desc: 'First impressions matter. Joel provides actionable staging advice to maximize your home\'s appeal — whether that\'s decluttering, minor repairs, or a fresh coat of paint. Professional real estate photography is included.',
    action: null,
  },
  {
    num: '03',
    title: 'Strategic Pricing',
    icon: '🎯',
    desc: 'Pricing is both an art and a science. Joel uses market data, neighbourhood comparables, and 10+ years of experience to price your home to attract serious buyers quickly — without leaving money on the table.',
    action: null,
  },
  {
    num: '04',
    title: 'Maximum Market Exposure',
    icon: '📢',
    desc: 'Your listing gets full MLS exposure, social media marketing, professional listing presentation, and promotion to Joel\'s buyer network. Your home is seen by the right buyers at the right time.',
    action: null,
  },
  {
    num: '05',
    title: 'Offers & Negotiations',
    icon: '🤝',
    desc: 'Joel presents every offer with a clear breakdown and analysis. He negotiates firmly on your behalf — not just on price, but on conditions, timelines, and inclusions — to get you the best overall deal.',
    action: null,
  },
  {
    num: '06',
    title: 'Smooth Closing',
    icon: '✅',
    desc: 'From accepted offer to closing day, Joel manages every detail — conditional period, inspection coordination, lawyer communication, and final walkthrough. Your job is to start planning your next chapter.',
    action: null,
  },
];

const valueProps = [
  { title: 'Professional Photography',     icon: '📸', desc: 'High-quality listing photos that showcase your home in the best possible light.' },
  { title: 'Full MLS Exposure',            icon: '🌐', desc: 'Listed on MLS® and all major real estate portals across New Brunswick and Canada.' },
  { title: 'Targeted Social Media Marketing', icon: '📱', desc: 'Strategic paid and organic promotion to reach active buyers in your area.' },
  { title: 'Accurate Pricing Strategy',    icon: '💎', desc: 'Data-driven pricing that attracts serious buyers while maximizing your return.' },
  { title: 'Expert Negotiation',           icon: '🎤', desc: '10+ years of commercial and residential deal-making working in your favour.' },
  { title: 'Seamless Transaction Management', icon: '📋', desc: 'Joel handles the details so you can focus on what comes next.' },
];

const faqs = [
  { q: 'How is your listing price determined?', a: 'Joel prepares a Comparative Market Analysis (CMA) using recent sales of similar properties in your neighbourhood. This data-driven approach — combined with his market intuition — results in a pricing strategy that is both competitive and profitable.' },
  { q: 'How long will it take to sell my home?', a: 'Average days on market in Greater Saint John varies, but with the right pricing and marketing, well-prepared homes often sell within 30–60 days. Joel will give you a realistic timeline based on current conditions.' },
  { q: 'What costs should I expect when selling?', a: 'Typical seller costs include realtor commission (negotiable), lawyer fees ($800–$1,500), any agreed-upon repairs, and moving costs. Joel provides a transparent net proceeds estimate before you list.' },
  { q: 'Do I need to move out before listing?', a: 'Not necessarily. Many homes sell successfully while occupied. Joel advises on staging strategies that work whether you\'re living there or the home is vacant.' },
  { q: 'What happens if my home doesn\'t sell right away?', a: 'Joel continuously monitors feedback and market data. If needed, he\'ll recommend pricing adjustments or additional marketing initiatives. You\'re never left wondering — Joel communicates proactively throughout.' },
];

export default function SellPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          minHeight: '60vh',
          background: 'linear-gradient(150deg, #004a6e 0%, #008C9A 70%, #00a8b8 100%)',
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
        <div className="container-wide relative z-10">
          <div className="max-w-2xl">
            <p
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: 20,
              }}
            >
              Seller's Guide
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
              Sell Your Home<br />
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>For What It's Worth.</span>
            </h1>
            <p
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: 17,
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.7,
                maxWidth: 520,
                marginBottom: 36,
              }}
            >
              With expert pricing, professional marketing, and proven negotiation skills, Joel ensures your home sells for the best possible price — in the shortest amount of time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-navy">Get a Free Home Valuation</Link>
              <Link href="/contact" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>
                Contact Joel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value props strip */}
      <section style={{ background: 'var(--navy)', padding: '48px 0' }}>
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {valueProps.map(({ title, icon, desc }) => (
              <div key={title} className="text-center group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(0,140,154,0.15)', fontSize: 20 }}
                >
                  {icon}
                </div>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 12, color: 'white', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-pad">
        <div className="container-wide">
          <div className="text-center mb-14">
            <p className="font-subheading" style={{ color: 'var(--teal)', fontSize: 11, marginBottom: 12 }}>
              The Selling Process
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
              How Joel Sells Your Home
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="rounded-xl p-7 flex flex-col"
                style={{
                  background: 'white',
                  border: '1.5px solid var(--light)',
                  boxShadow: '0 2px 12px rgba(0,49,73,0.05)',
                  transition: 'border-color 0.2s ease, box-shadow 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--teal)';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,140,154,0.14)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--light)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,49,73,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--teal)', boxShadow: '0 3px 12px rgba(0,140,154,0.3)' }}
                  >
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 12, color: 'white' }}>
                      {step.num}
                    </span>
                  </div>
                  <span style={{ fontSize: 22 }}>{step.icon}</span>
                </div>
                <h3
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 800,
                    fontSize: 17,
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
                    fontSize: 14,
                    color: '#4a5568',
                    lineHeight: 1.75,
                    flex: 1,
                  }}
                >
                  {step.desc}
                </p>
                {step.action && (
                  <Link href={step.action.href} className="btn-primary mt-5" style={{ padding: '10px 20px', fontSize: 12 }}>
                    {step.action.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="section-pad" style={{ background: 'var(--off-white, #F8F9FA)' }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-subheading" style={{ color: 'var(--teal)', fontSize: 11, marginBottom: 16 }}>
                Why Sellers Choose Joel
              </p>
              <h2
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  letterSpacing: '-0.03em',
                  color: 'var(--navy)',
                  lineHeight: 1.1,
                  marginBottom: 24,
                }}
              >
                Commercial Background.<br />
                <span style={{ color: 'var(--teal)' }}>Residential Results.</span>
              </h2>
              <p
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontSize: 16,
                  color: '#4a5568',
                  lineHeight: 1.75,
                  marginBottom: 16,
                }}
              >
                Before residential real estate, Joel spent over a decade in commercial sales and leasing — negotiating complex deals, understanding investment value, and managing multi-party transactions. He brings that precision and strategic mindset to every home sale.
              </p>
              <p
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontSize: 16,
                  color: '#4a5568',
                  lineHeight: 1.75,
                  marginBottom: 32,
                }}
              >
                The result? Sellers who receive above-average offers, faster conditional periods, and a smooth path to closing.
              </p>
              <Link href="/contact" className="btn-primary">
                Request a Free Home Valuation
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '98%',  label: 'List-to-Sale Price Ratio' },
                { value: '32',   label: 'Avg. Days on Market' },
                { value: '200+', label: 'Successful Transactions' },
                { value: '10+',  label: 'Years of Experience' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-xl p-6 text-center"
                  style={{ background: 'white', border: '1.5px solid var(--light)', boxShadow: '0 2px 12px rgba(0,49,73,0.05)' }}
                >
                  <p
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 900,
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      letterSpacing: '-0.04em',
                      color: 'var(--teal)',
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </p>
                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: 'var(--gray)', marginTop: 8, lineHeight: 1.4 }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
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
              Seller FAQ
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
                <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 15, color: '#4a5568', lineHeight: 1.75, padding: '0 24px 24px' }}>
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '64px 0' }}>
        <div className="container-wide text-center">
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: 'white', marginBottom: 16 }}>
            What Is Your Home Worth?
          </h2>
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
            Get a free, accurate market valuation and a selling strategy designed specifically for your property.
          </p>
          <Link href="/contact" className="btn-primary">Request Your Free Home Valuation</Link>
        </div>
      </section>
    </>
  );
}
