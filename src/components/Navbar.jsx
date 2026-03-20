import { useEffect, useRef, useState } from "react";
import Logo from "../Logo";
import { IconLinkedIn, IconDownload } from "./Icons";

export default function Navbar({ lang, setLang, t }) {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () =>
      navRef.current?.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav ref={navRef} id="navbar">
      <Logo />
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        <li><a href="#services" onClick={closeMenu}>{t.nav.services}</a></li>
        <li><a href="#portfolio" onClick={closeMenu}>{t.nav.portfolio}</a></li>
        <li><a href="#process" onClick={closeMenu}>{t.nav.process}</a></li>
        <li><a href="#contact" onClick={closeMenu}>{t.nav.contact}</a></li>
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
        <a href="#contact" className="nav-cta" onClick={closeMenu}>{t.nav.cta}</a>
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
