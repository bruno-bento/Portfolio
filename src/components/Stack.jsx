import { useFadeUp } from "../hooks/useFadeUp";

export default function Stack({ t }) {
  const fadeRef1 = useFadeUp();
  const fadeRef2 = useFadeUp();

  return (
    <section id="stack">
      <div className="stack-layout">
        <div className="stack-intro fade-up" ref={fadeRef1}>
          <div className="section-header" style={{ border:'none', marginBottom:0, paddingBottom:0 }}>
            <div>
              <span className="section-num">{t.stack.num}</span>
              <h2 className="section-title">{t.stack.title}<br/><em>{t.stack.em}</em></h2>
            </div>
          </div>
          <p>{t.stack.desc}</p>
        </div>
        <div className="stack-grid fade-up" ref={fadeRef2}>
          {t.stack.items.map(s => (
            <div key={s.name} className={`stack-item${s.primary ? ' primary' : ''}`}>
              <span className="stack-item-name">{s.name}</span>
              <span className="stack-item-type">{s.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
