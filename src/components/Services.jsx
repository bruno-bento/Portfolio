import { useEffect, useRef, useState } from "react";
import { useFadeUp } from "../hooks/useFadeUp";
import DiagramSVG from "./DiagramSVG";

export default function Services({ t }) {
  const outerRef = useRef(null);
  const tRef = useRef(t);
  tRef.current = t;

  const [step, setStep] = useState(0);
  const fadeRef = useFadeUp();

  // Derived from state + props — no separate state needed
  const labelHtml = `<span class="hl">${t.stepLabels[step][0]}</span> — ${t.stepLabels[step][1]}`;
  const progress  = (step + 1) / 6 * 100;

  useEffect(() => {
    const handler = () => {
      const outer = outerRef.current;
      if (!outer) return;
      const rect    = outer.getBoundingClientRect();
      const scrolled = -rect.top;
      const total    = rect.height - window.innerHeight;
      if (total <= 0) return;
      const pct = Math.max(0, Math.min(1, scrolled / total));
      setStep(Math.min(5, Math.floor(pct * 6)));
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section id="services">
      <div className="section-header fade-up" ref={fadeRef}>
        <div>
          <span className="section-num">{t.services.num}</span>
          <h2 className="section-title">{t.services.title} <em>{t.services.em}</em></h2>
        </div>
        <p className="section-note">{t.services.note}</p>
      </div>
      <div className="sticky-outer" ref={outerRef}>
        <div className="sticky-inner">
          <div className="services-list">
            {t.services.items.map((svc, i) => (
              <div key={i} className={`svc-item${step === i ? ' active' : ''}`}>
                <span className="svc-num">{svc.num}</span>
                <div className="svc-body">
                  <h3 className="svc-name">{svc.name}</h3>
                  <p className="svc-desc">{svc.desc}</p>
                  <div className="svc-tags">
                    {svc.tags.map(tag => <span key={tag} className="svc-tag">{tag}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="diagram-wrap">
            <div className={`diagram-scan${step >= 5 ? ' active' : ''}`}/>
            <div className="diagram-label" dangerouslySetInnerHTML={{ __html: labelHtml }}/>
            <div className="diagram-progress" style={{ width: `${progress}%` }}/>
            <DiagramSVG step={step}/>
          </div>
        </div>
      </div>
    </section>
  );
}
