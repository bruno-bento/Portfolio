import { useEffect, useRef } from "react";
import Logo from "../Logo";
import { IconLinkedIn, IconDownload } from "./Icons";

export default function Navbar({ lang, setLang, t }) {
  const navRef = useRef(null);

  useEffect(() => {
    const handler = () =>
      navRef.current?.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav ref={navRef} id="navbar">
      <Logo />
      <ul className="nav-links">
        <li><a href="#services">{t.nav.services}</a></li>
        <li><a href="#portfolio">{t.nav.portfolio}</a></li>
        <li><a href="#process">{t.nav.process}</a></li>
        <li><a href="#contact">{t.nav.contact}</a></li>
      </ul>
      <div className="nav-right">
        <select
          className="lang-select"
          value={lang}
          onChange={e => setLang(e.target.value)}
          aria-label="Select language"
        >
          <option value="pt">PT</option>
          <option value="en">EN</option>
        </select>
        <a href="https://linkedin.com/in/bruno-bento-reinoso" target="_blank" rel="noreferrer" className="nav-icon" title="LinkedIn">
          <IconLinkedIn />
        </a>
        <a href={`/${t.cvFile}`} download className="nav-icon" title={t.hero.cv}>
          <IconDownload />
        </a>
        <a href="#contact" className="nav-cta">{t.nav.cta}</a>
      </div>
    </nav>
  );
}
