import { useEffect, useRef } from "react";
import PixelBlast from "./PixelBlast";
import { IconLinkedIn, IconDownload } from "./Icons";
import { useScramble } from "../hooks/useScramble";
import { useCounter } from "../hooks/useCounter";

function StatItem({ target, label }) {
  const [ref, val] = useCounter(target);
  return (
    <div className="stat">
      <div className="stat-num" ref={ref}>{val}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Hero({ t }) {
  const heroRef = useRef(null);
  const scramble = useScramble(t.scrambleWords);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handler = e => {
      const canvas = hero.querySelector('canvas');
      if (!canvas || e.target === canvas) return;
      canvas.dispatchEvent(new PointerEvent('pointerdown', {
        bubbles: false, clientX: e.clientX, clientY: e.clientY,
        pointerId: e.pointerId, pointerType: e.pointerType,
      }));
    };
    hero.addEventListener('pointerdown', handler);
    return () => hero.removeEventListener('pointerdown', handler);
  }, []);

  return (
    <section id="hero" ref={heroRef}>
      <PixelBlast
        color="#C8FF00"
        variant="square"
        pixelSize={3}
        patternDensity={0.8}
        patternScale={2}
        speed={0.4}
        edgeFade={0.35}
        enableRipples={true}
        transparent={true}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />
      <div className="hero-grid"/>
      <div className="hero-noise"/>
      <div className="hero-vignette"/>
      <div className="hero-content">
        <p className="hero-tag">{t.hero.tag}</p>
        <h1 className="hero-title">
          {t.hero.line1}<br/>
          <em>{t.hero.line2}</em><br/>
          <span className="scramble-word">{scramble}</span>
        </h1>
        <p className="hero-sub">{t.hero.sub}</p>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary"><span>{t.hero.cta}</span></a>
          <a href="#portfolio" className="btn-ghost">{t.hero.ctaGhost} <span className="arrow">→</span></a>
        </div>
        <div className="hero-bottom-row">
          <div className="hero-stats">
            <StatItem target={40} label={t.hero.statProjects}/>
            <StatItem target={5}  label={t.hero.statYears}/>
            <StatItem target={12} label={t.hero.statStacks}/>
          </div>
          <div className="hero-links">
            <a href="https://linkedin.com/in/bruno-bento-reinoso" target="_blank" rel="noreferrer" className="hero-link">
              <IconLinkedIn /> LinkedIn
            </a>
            <a href={`/${t.cvFile}`} download className="hero-link">
              <IconDownload size={13}/> {t.hero.cv}
            </a>
          </div>
        </div>
      </div>
      <div className="scroll-indicator"><span>scroll</span><div className="scroll-line"/></div>
    </section>
  );
}
