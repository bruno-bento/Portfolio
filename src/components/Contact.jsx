import { useFadeUp } from "../hooks/useFadeUp";
import ContactForm from "./ContactForm";

export default function Contact({ t }) {
  const fadeRef = useFadeUp();

  return (
    <section id="contact">
      <div className="contact-left">
        <h2 className="contact-heading">
          {t.contact.heading}<br/><em>{t.contact.headingEm}</em>
        </h2>
        <p>{t.contact.desc}</p>
        <div className="contact-links">
          {t.contact.links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="contact-link"
              target={l.download ? undefined : '_blank'}
              rel="noreferrer"
              download={l.download}
            >
              <div>
                <div className="link-label">{l.label}</div>
                <div>{l.val}</div>
              </div>
              <span>{l.sym}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="contact-right fade-up" ref={fadeRef}>
        <ContactForm t={t.contact.form}/>
      </div>
    </section>
  );
}
