import { useEffect, useState } from "react";
import { TRANSLATIONS } from "./data/translations";
import Navbar    from "./components/Navbar";
import Hero      from "./components/Hero";
import Marquee   from "./components/Marquee";
import Services  from "./components/Services";
import Stack     from "./components/Stack";
import Process   from "./components/Process";
import Contact   from "./components/Contact";
import Footer    from "./components/Footer";

export default function App() {
  const [lang, setLang] = useState('pt');
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = lang === 'pt'
      ? 'Bruno B — Dev Full Stack & Segurança'
      : 'Bruno B — Full Stack Dev & Security';
  }, [lang]);

  return (
    <>
      <Navbar   lang={lang} setLang={setLang} t={t} />
      <Hero     t={t} />
      <Marquee  />
      <Services t={t} />
      <Stack    t={t} />
      <Process  t={t} />
      <Contact  t={t} />
      <Footer   t={t} />
    </>
  );
}
