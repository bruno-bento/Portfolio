/* ─────────────────────────────────────────────
   LOGO — Bruno B Portfolio
   Icon mark: corner-bracket box + B serif
   Wordmark: icon + "Bruno.B" text
───────────────────────────────────────────── */

/* Icon mark — inline SVG, uses DM Serif Display already loaded by the page */
export function LogoMark({ size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0, display: 'block' }}
    >
      {/* Border box */}
      <rect x="0.5" y="0.5" width="27" height="27" stroke="#1E1E1E" strokeWidth="1"/>

      {/* Top-left corner accent */}
      <path d="M0.5 8L0.5 0.5H8" stroke="#C8FF00" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>

      {/* Bottom-right corner accent */}
      <path d="M20 27.5H27.5V20" stroke="#C8FF00" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>

      {/* Accent dot — bottom-left inner corner */}
      <rect x="3" y="22" width="2.5" height="2.5" fill="#C8FF00" opacity="0.5"/>

      {/* B letter */}
      <text
        x="14" y="20"
        textAnchor="middle"
        fontFamily="'DM Serif Display', Georgia, serif"
        fontSize="17"
        fill="#EDE9DF"
      >B</text>
    </svg>
  );
}

/* Full nav logo: icon mark + wordmark */
export default function Logo() {
  return (
    <a
      href="#"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
        fontFamily: "'DM Serif Display', serif",
        fontSize: '20px',
        color: '#EDE9DF',
        letterSpacing: '-0.5px',
      }}
    >
      <LogoMark size={26} />
      Bruno<span style={{ color: '#C8FF00' }}>.</span>B
    </a>
  );
}
