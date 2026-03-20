export default function DiagramSVG({ step }) {
  const shieldD = "M240,4 C320,4 418,50 462,132 L468,150 L468,445 C468,474 366,492 241,494 L240,496 L239,494 C114,492 12,474 12,445 L12,150 L18,132 C62,50 160,4 240,4 Z";

  const layerClass = (minStep) => `sys-layer${step >= minStep ? ' show' : ''}`;
  const lineClass  = (minStep) => `sys-line${step >= minStep ? ' draw' : ''}`;

  return (
    <svg className="sys-svg" viewBox="0 0 480 500" xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <defs>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* SHIELD */}
      <g id="sys-sec" className={layerClass(5)}>
        <path className={`shield-glow${step >= 5 ? ' draw' : ''}`} d={shieldD}/>
        <path className={`shield-path${step >= 5 ? ' draw' : ''}`} d={shieldD}/>
        <path className={`shield-fill${step >= 5 ? ' show' : ''}`} d={shieldD}/>
        <g style={{ opacity: step >= 5 ? 1 : 0, transition: 'opacity 0.9s ease 1s' }}>
          <path d="M218,248 L218,232 Q218,212 240,212 Q262,212 262,232 L262,248"
            fill="none" stroke="rgba(200,255,0,.8)" strokeWidth="4" strokeLinecap="round" filter="url(#glow)"/>
          <rect x="208" y="246" width="64" height="46" rx="7"
            fill="rgba(8,8,8,.75)" stroke="rgba(200,255,0,.75)" strokeWidth="2" filter="url(#glow)"/>
          <circle cx="240" cy="263" r="8"
            fill="rgba(8,8,8,.9)" stroke="rgba(200,255,0,.6)" strokeWidth="1.5"/>
          <rect x="237" y="267" width="6" height="12" rx="1.5" fill="rgba(200,255,0,.55)"/>
          <circle cx="240" cy="263" r="3" fill="rgba(200,255,0,.4)"/>
          <text x="240" y="306" textAnchor="middle"
            fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="2.5"
            fill="rgba(200,255,0,.55)">SECURED</text>
        </g>
      </g>

      {/* CONNECTORS */}
      <line id="ln-fe-sa" className={lineClass(4)} x1="240" y1="130" x2="240" y2="76"/>
      <line id="ln-be-fe" className={lineClass(3)} x1="240" y1="260" x2="240" y2="196"/>
      <line id="ln-db-be" className={lineClass(1)} x1="240" y1="388" x2="240" y2="322"/>
      <line id="ln-be-al" className={lineClass(2)} x1="168" y1="291" x2="130" y2="291"/>
      <line id="ln-be-ar" className={lineClass(2)} x1="312" y1="291" x2="350" y2="291"/>
      <polygon points="130,287 118,291 130,295" fill="rgba(200,255,0,.3)"
        style={{ opacity: step >= 2 ? 1 : 0, transition: 'opacity .5s' }}/>
      <polygon points="350,287 362,291 350,295" fill="rgba(200,255,0,.3)"
        style={{ opacity: step >= 2 ? 1 : 0, transition: 'opacity .5s' }}/>

      {/* FLOW PARTICLES */}
      {step >= 1 && step < 5 && <circle r="2.2" fill="rgba(200,255,0,.82)" filter="url(#glow)"><animateMotion dur="1.8s" repeatCount="indefinite" path="M240,388 L240,322"/></circle>}
      {step >= 2 && step < 5 && <circle r="2.2" fill="rgba(200,255,0,.7)"  filter="url(#glow)"><animateMotion dur="1.5s" repeatCount="indefinite" path="M168,291 L130,291"/></circle>}
      {step >= 2 && step < 5 && <circle r="2.2" fill="rgba(200,255,0,.7)"  filter="url(#glow)"><animateMotion dur="1.5s" repeatCount="indefinite" path="M312,291 L350,291"/></circle>}
      {step >= 3 && step < 5 && <circle r="2.2" fill="rgba(200,255,0,.82)" filter="url(#glow)"><animateMotion dur="1.6s" repeatCount="indefinite" path="M240,260 L240,196"/></circle>}
      {step >= 4 && step < 5 && <circle r="2.2" fill="rgba(200,255,0,.72)" filter="url(#glow)"><animateMotion dur="1.4s" repeatCount="indefinite" path="M240,130 L240,76"/></circle>}

      {/* DATABASE */}
      <g id="sys-db" className={layerClass(0)}>
        <ellipse cx="240" cy="398" rx="52" ry="12" fill="rgba(200,255,0,.07)" stroke="rgba(200,255,0,.42)" strokeWidth="1" filter="url(#glow)"/>
        <rect x="188" y="398" width="104" height="42" fill="rgba(200,255,0,.04)" stroke="rgba(200,255,0,.18)" strokeWidth="1"/>
        <ellipse cx="240" cy="440" rx="52" ry="12" fill="rgba(8,8,8,.75)" stroke="rgba(200,255,0,.2)" strokeWidth="1"/>
        <line x1="198" y1="412" x2="282" y2="412" stroke="rgba(200,255,0,.16)" strokeWidth=".7"/>
        <line x1="198" y1="423" x2="282" y2="423" stroke="rgba(200,255,0,.11)" strokeWidth=".7"/>
        <line x1="198" y1="434" x2="268" y2="434" stroke="rgba(200,255,0,.07)" strokeWidth=".7"/>
        <rect x="270" y="418" width="5" height="8" fill="rgba(200,255,0,.55)">
          <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/>
        </rect>
        <text x="240" y="457" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="8.5" letterSpacing="1.5" fill="rgba(200,255,0,.65)">DATABASE</text>
        <text x="240" y="468" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="7" letterSpacing=".8" fill="rgba(237,233,223,.22)">PostgreSQL · Redis · MongoDB</text>
      </g>

      {/* BACKEND */}
      <g id="sys-be" className={layerClass(1)}>
        <rect x="168" y="260" width="144" height="62" rx="3" fill="rgba(200,255,0,.065)" stroke="rgba(200,255,0,.42)" strokeWidth="1" filter="url(#glow)"/>
        <rect x="177" y="269" width="126" height="9" rx="1" fill="rgba(200,255,0,.09)" stroke="rgba(200,255,0,.2)" strokeWidth=".5"/>
        <rect x="177" y="281" width="126" height="9" rx="1" fill="rgba(200,255,0,.06)" stroke="rgba(200,255,0,.14)" strokeWidth=".5"/>
        <rect x="177" y="293" width="126" height="9" rx="1" fill="rgba(200,255,0,.04)" stroke="rgba(200,255,0,.1)" strokeWidth=".5"/>
        <rect x="177" y="305" width="88"  height="9" rx="1" fill="rgba(200,255,0,.025)" stroke="rgba(200,255,0,.07)" strokeWidth=".5"/>
        <circle cx="285" cy="273" r="2.2" fill="rgba(200,255,0,.82)" filter="url(#glow)"><animate attributeName="opacity" values="1;0.3;1" dur="1.7s" repeatCount="indefinite"/></circle>
        <circle cx="293" cy="273" r="2.2" fill="rgba(200,255,0,.45)"><animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite"/></circle>
        <circle cx="285" cy="285" r="2.2" fill="rgba(200,255,0,.3)"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite"/></circle>
        <text x="240" y="338" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="8.5" letterSpacing="1.5" fill="rgba(200,255,0,.65)">BACKEND</text>
        <text x="240" y="349" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="7" letterSpacing=".8" fill="rgba(237,233,223,.22)">Node.js · C# .NET · PHP</text>
      </g>

      {/* APIs */}
      <g id="sys-apis" className={layerClass(2)}>
        <rect x="22" y="273" width="108" height="36" rx="3" fill="rgba(237,233,223,.03)" stroke="rgba(237,233,223,.15)" strokeWidth="1"/>
        <text x="76" y="288" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1.5" fill="rgba(237,233,223,.5)">API</text>
        <text x="76" y="300" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="6.5" letterSpacing=".8" fill="rgba(237,233,223,.24)">Stripe · ERP · CRM</text>
        <rect x="350" y="273" width="108" height="36" rx="3" fill="rgba(237,233,223,.03)" stroke="rgba(237,233,223,.15)" strokeWidth="1"/>
        <text x="404" y="288" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1.5" fill="rgba(237,233,223,.5)">API</text>
        <text x="404" y="300" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="6.5" letterSpacing=".8" fill="rgba(237,233,223,.24)">Auth · SMS · Misc</text>
      </g>

      {/* FRONTEND */}
      <g id="sys-fe" className={layerClass(3)}>
        <rect x="168" y="130" width="144" height="66" rx="3" fill="rgba(200,255,0,.055)" stroke="rgba(200,255,0,.38)" strokeWidth="1" filter="url(#glow)"/>
        <rect x="168" y="130" width="144" height="17" rx="3" fill="rgba(200,255,0,.09)" stroke="rgba(200,255,0,.32)" strokeWidth="1"/>
        <circle cx="180" cy="138" r="2.4" fill="rgba(200,255,0,.5)"/>
        <circle cx="189" cy="138" r="2.4" fill="rgba(200,255,0,.26)"/>
        <circle cx="198" cy="138" r="2.4" fill="rgba(200,255,0,.14)"/>
        <rect x="208" y="133" width="80" height="9" rx="2" fill="rgba(200,255,0,.06)" stroke="rgba(200,255,0,.12)" strokeWidth=".5"/>
        <rect x="177" y="155" width="60" height="6" rx="1" fill="rgba(200,255,0,.2)"/>
        <rect x="177" y="165" width="42" height="4" rx="1" fill="rgba(237,233,223,.1)"/>
        <rect x="177" y="173" width="50" height="4" rx="1" fill="rgba(237,233,223,.07)"/>
        <rect x="177" y="181" width="34" height="4" rx="1" fill="rgba(237,233,223,.05)"/>
        <rect x="254" y="162" width="44" height="14" rx="2" fill="rgba(200,255,0,.19)" stroke="rgba(200,255,0,.46)" strokeWidth=".5"/>
        <text x="276" y="172" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="6" fill="rgba(200,255,0,.82)">ENTRAR</text>
        <text x="240" y="212" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="8.5" letterSpacing="1.5" fill="rgba(200,255,0,.65)">FRONTEND</text>
        <text x="240" y="223" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="7" letterSpacing=".8" fill="rgba(237,233,223,.22)">Next.js · React · TypeScript</text>
      </g>

      {/* LP / SaaS */}
      <g id="sys-saas" className={layerClass(4)}>
        <rect x="152" y="30" width="144" height="60" rx="3" fill="rgba(200,255,0,.02)" stroke="rgba(237,233,223,.07)" strokeWidth=".8"/>
        <rect x="160" y="22" width="144" height="60" rx="3" fill="rgba(200,255,0,.03)" stroke="rgba(237,233,223,.11)" strokeWidth=".8"/>
        <rect x="168" y="16" width="144" height="60" rx="3" fill="rgba(200,255,0,.07)" stroke="rgba(200,255,0,.46)" strokeWidth="1" filter="url(#glow)"/>
        <rect x="168" y="16" width="144" height="15" rx="3" fill="rgba(200,255,0,.12)" stroke="rgba(200,255,0,.4)" strokeWidth="1"/>
        <rect x="178" y="38" width="68" height="6" rx="1" fill="rgba(200,255,0,.25)"/>
        <rect x="178" y="48" width="46" height="4" rx="1" fill="rgba(237,233,223,.12)"/>
        <rect x="178" y="56" width="56" height="4" rx="1" fill="rgba(237,233,223,.08)"/>
        <rect x="278" y="38" width="26" height="12" rx="2" fill="rgba(200,255,0,.2)" stroke="rgba(200,255,0,.55)" strokeWidth=".5"/>
        <text x="291" y="47" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="5.8" fill="rgba(200,255,0,.9)">SaaS</text>
        <text x="240" y="92"  textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="8.5" letterSpacing="1.5" fill="rgba(200,255,0,.65)">LP &amp; SaaS</text>
        <text x="240" y="103" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="7" letterSpacing=".8" fill="rgba(237,233,223,.22)">Conversão · Auth · Billing</text>
      </g>
    </svg>
  );
}
