import { useEffect, useRef } from "react";
import { useFadeUp } from "../hooks/useFadeUp";

export default function Process({ t }) {
  const fadeRef = useFadeUp();
  const stepsRef = useRef(null);

  useEffect(() => {
    const steps = stepsRef.current?.querySelectorAll('.process-step');
    if (!steps?.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    steps.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="process">
      <div className="section-header fade-up" ref={fadeRef} style={{ marginBottom: 56 }}>
        <div>
          <span className="section-num">{t.process.num}</span>
          <h2 className="section-title">{t.process.title} <em>{t.process.em}</em></h2>
        </div>
        <p className="section-note">{t.process.note}</p>
      </div>
      <div className="process-steps" ref={stepsRef}>
        {t.process.steps.map(s => (
          <div key={s.n} className="process-step fade-up">
            <div className="process-dot">{s.n}</div>
            <h3 className="process-step-title">{s.t}</h3>
            <p className="process-step-desc">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
