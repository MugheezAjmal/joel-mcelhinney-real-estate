'use client';

export default function Logo({ variant = 'dark', size = 'md' }) {
  const sizes = {
    sm: { icon: 28, textMain: 14, textSub: 6.5 },
    md: { icon: 36, textMain: 18, textSub: 8 },
    lg: { icon: 48, textMain: 24, textSub: 10 },
  };
  const s = sizes[size] || sizes.md;

  const teal  = variant === 'light' ? '#FFFFFF' : '#008C9A';
  const navy  = variant === 'light' ? '#FFFFFF' : '#003149';
  const grayC = variant === 'light' ? 'rgba(255,255,255,0.7)' : '#808285';

  return (
    <div className="flex items-center gap-3 select-none" aria-label="Joel McElhinney Real Estate">
      {/* Icon: M-house mark */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* House roof / M shape */}
        <path
          d="M4 26L12 14L20 22L28 10L36 22L44 14V38C44 39.1 43.1 40 42 40H6C4.9 40 4 39.1 4 38V26Z"
          fill={teal}
          opacity="0.18"
        />
        <path
          d="M4 26L12 14L20 22L28 10L36 22L44 14"
          stroke={teal}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Door */}
        <rect x="20" y="30" width="8" height="10" rx="4" fill={navy} />
        {/* Base line */}
        <line x1="4" y1="40" x2="44" y2="40" stroke={navy} strokeWidth="2.5" strokeLinecap="round" />
        {/* Dot accent */}
        <circle cx="38" cy="34" r="2.5" fill={teal} />
      </svg>

      {/* Text lockup */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-[3px]">
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: s.textMain,
              color: navy,
              letterSpacing: '-0.02em',
            }}
          >
            JOEL
          </span>
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: s.textMain * 0.82,
              color: navy,
              letterSpacing: '-0.01em',
            }}
          >
            McELHINNEY
          </span>
        </div>
        <span
          style={{
            fontFamily: 'Lato, sans-serif',
            fontWeight: 400,
            fontSize: s.textSub,
            color: grayC,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginTop: 2,
          }}
        >
          REAL ESTATE
        </span>
      </div>
    </div>
  );
}
