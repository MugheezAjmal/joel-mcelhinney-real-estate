import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--navy)', color: 'white' }}>
      {/* Top CTA strip */}
      <div style={{ background: 'var(--teal)', padding: '40px 0' }}>
        <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>
              Ready to make your move?
            </p>
            <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(255,255,255,0.85)', fontSize: 15, marginTop: 4 }}>
              Schedule a free, no-obligation consultation today.
            </p>
          </div>
          <Link href="/contact" className="btn-navy flex-shrink-0">
            Book a Free Consultation
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Logo variant="light" size="md" />
            <p
              style={{
                fontFamily: 'Lato, sans-serif',
                color: 'rgba(255,255,255,0.65)',
                fontSize: 14,
                lineHeight: 1.75,
                marginTop: 16,
              }}
            >
              Serving Saint John, Rothesay, Quispamsis and surrounding New Brunswick communities with expert real estate guidance.
            </p>
            {/* EXIT Realty badge */}
            <div
              className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded"
              style={{ background: 'rgba(238,49,36,0.15)', border: '1px solid rgba(238,49,36,0.3)' }}
            >
              <span style={{ color: '#EE3124', fontWeight: 900, fontFamily: 'Montserrat, sans-serif', fontSize: 12, letterSpacing: '0.05em' }}>
                EXIT
              </span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Lato, sans-serif', fontSize: 11 }}>
                Realty Specialists
              </span>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--teal)',
                marginBottom: 20,
              }}
            >
              Navigate
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { href: '/',            label: 'Home' },
                { href: '/buy',         label: 'Buying a Home' },
                { href: '/sell',        label: 'Selling a Home' },
                { href: '/listings',    label: 'Browse Listings' },
                { href: '/calculators', label: 'Calculators' },
                { href: '/about',       label: 'About Joel' },
                { href: '/contact',     label: 'Contact & Booking' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-teal-400 transition-colors duration-200"
                    style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas Served */}
          <div>
            <h4
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--teal)',
                marginBottom: 20,
              }}
            >
              Areas Served
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                'Saint John, NB',
                'Rothesay, NB',
                'Quispamsis, NB',
                'Grand Bay-Westfield, NB',
                'Hampton, NB',
                'Sussex, NB',
                'Greater Saint John Area',
              ].map(area => (
                <li
                  key={area}
                  style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--teal)',
                marginBottom: 20,
              }}
            >
              Get in Touch
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+15061234567"
                className="hover:text-teal-400 transition-colors duration-200"
                style={{ fontFamily: 'Lato, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.85)' }}
              >
                📞 (506) 123-4567
              </a>
              <a
                href="mailto:joel@joelmcelhinney.ca"
                className="hover:text-teal-400 transition-colors duration-200"
                style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.85)' }}
              >
                ✉ joel@joelmcelhinney.ca
              </a>
              <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                EXIT Realty Specialists<br />
                Saint John, NB, Canada
              </p>
              {/* Social links */}
              <div className="flex gap-3 mt-2">
                {['Facebook', 'Instagram', 'LinkedIn'].map(social => (
                  <a
                    key={social}
                    href="#"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: 11,
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 700,
                    }}
                    aria-label={social}
                    title={social}
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 0' }}>
        <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            © {year} Joel McElhinney Real Estate. All rights reserved.
          </p>
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)', maxWidth: 500, lineHeight: 1.5 }}>
            Joel McElhinney is a registered REALTOR® with EXIT Realty Specialists, a member of CREA. The trademarks REALTOR®, REALTORS® and the REALTOR® logo are controlled by CREA and identify real estate professionals who are members of CREA.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}
              className="hover:text-white transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}
              className="hover:text-white transition-colors duration-200"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
