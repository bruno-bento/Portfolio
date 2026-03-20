import { useEffect, useRef, useState } from "react";
import PixelBlast from "./components/PixelBlast";
import Logo from "./Logo";

/* ─────────────────────────────────────────────
   GLOBAL CSS injected once into <head>
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@300;400;500&family=Syne:wght@400;700;800&display=swap');

:root {
  --bg:#080808; --bg2:#111111; --bg3:#181818;
  --text:#EDE9DF; --muted:#908C88;
  --accent:#C8FF00; --accent2:#FF4D1C;
  --border:#222222;
  --mono:'IBM Plex Mono',monospace;
  --serif:'DM Serif Display',serif;
  --sans:'Syne',sans-serif;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--text);font-family:var(--mono);font-size:14px;line-height:1.6;overflow-x:hidden;}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:20px 48px;border-bottom:1px solid transparent;transition:border-color .4s,background .4s;}
nav.scrolled{border-color:var(--border);background:rgba(8,8,8,.9);backdrop-filter:blur(16px);}
.nav-logo{font-family:var(--serif);font-size:20px;color:var(--text);text-decoration:none;letter-spacing:-.5px;}
.nav-logo span{color:var(--accent);}
.nav-links{display:flex;gap:36px;list-style:none;}
.nav-links a{color:var(--muted);text-decoration:none;font-size:12px;letter-spacing:.08em;text-transform:uppercase;transition:color .2s;position:relative;}
.nav-links a::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:var(--accent);transition:width .3s;}
.nav-links a:hover{color:var(--text);}
.nav-links a:hover::after{width:100%;}
.nav-right{display:flex;align-items:center;gap:12px;}
.nav-icon{color:var(--muted);display:flex;align-items:center;padding:5px;transition:color .2s;text-decoration:none;}
.nav-icon:hover{color:var(--accent);}
.nav-cta{background:var(--accent);color:var(--bg);padding:8px 20px;font-family:var(--mono);font-size:12px;font-weight:500;letter-spacing:.05em;text-decoration:none;text-transform:uppercase;transition:background .2s,transform .15s;}
.nav-cta:hover{background:var(--text);transform:translateY(-1px);}
.lang-select{-webkit-appearance:none;appearance:none;background:var(--bg) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='5' viewBox='0 0 7 5'%3E%3Cpath d='M0 0l3.5 5L7 0z' fill='%23908C88'/%3E%3C/svg%3E") no-repeat right 8px center;background-size:7px 5px;border:1px solid var(--border);color:var(--muted);font-family:var(--mono);font-size:11px;letter-spacing:.1em;padding:5px 24px 5px 9px;cursor:pointer;outline:none;transition:border-color .2s,color .2s;}
.lang-select:hover,.lang-select:focus{border-color:var(--accent);color:var(--accent);}
.lang-select option{background:var(--bg2);color:var(--text);}

/* HERO */
#hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;}
.pixel-blast-container{position:absolute;inset:0;z-index:0;}
.hero-grid{position:absolute;inset:0;z-index:1;pointer-events:none;background-image:radial-gradient(circle,rgba(237,233,223,.07) 1px,transparent 1px);background-size:32px 32px;mask-image:radial-gradient(ellipse 90% 90% at 50% 50%,black 30%,transparent 100%);}
.hero-noise{position:absolute;inset:0;z-index:2;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");opacity:.35;}
.hero-vignette{position:absolute;inset:0;z-index:3;pointer-events:none;background:radial-gradient(ellipse 120% 100% at 50% 50%,transparent 20%,rgba(8,8,8,.88) 100%);}
.hero-content{position:relative;z-index:10;padding:0 48px 72px;max-width:920px;}
.hero-tag{display:inline-flex;align-items:center;gap:8px;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--accent);margin-bottom:32px;}
.hero-tag::before{content:'';display:block;width:24px;height:1px;background:var(--accent);}
.hero-title{font-family:var(--serif);font-size:clamp(52px,7vw,96px);line-height:1.0;letter-spacing:-2px;margin-bottom:12px;}
.hero-title em{font-style:italic;color:var(--muted);}
.scramble-word{display:inline-block;color:var(--accent);min-width:320px;}
.hero-sub{font-size:13px;color:var(--muted);max-width:480px;line-height:1.9;margin-top:24px;margin-bottom:40px;}
.hero-actions{display:flex;align-items:center;gap:24px;margin-bottom:40px;}
.btn-primary{background:var(--accent);color:var(--bg);padding:14px 32px;font-family:var(--mono);font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:.1em;text-decoration:none;display:inline-block;position:relative;overflow:hidden;transition:transform .2s;cursor:pointer;border:none;}
.btn-primary::before{content:'';position:absolute;inset:0;background:var(--accent2);transform:translateX(-101%);transition:transform .3s ease;}
.btn-primary:hover{transform:translateY(-1px);}
.btn-primary:hover::before{transform:translateX(0);}
.btn-primary span{position:relative;z-index:1;}
.btn-ghost{color:var(--muted);font-size:12px;letter-spacing:.05em;text-decoration:none;display:flex;align-items:center;gap:8px;transition:color .2s;}
.btn-ghost:hover{color:var(--text);}
.btn-ghost .arrow{transition:transform .2s;}
.btn-ghost:hover .arrow{transform:translateX(4px);}
.hero-bottom-row{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:20px;}
.hero-stats{display:flex;gap:1px;background:var(--border);border:1px solid var(--border);}
.stat{background:rgba(8,8,8,.65);padding:16px 24px;backdrop-filter:blur(12px);}
.stat-num{font-family:var(--serif);font-size:28px;color:var(--accent);line-height:1;margin-bottom:4px;}
.stat-label{font-size:10px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;}
.hero-links{display:flex;gap:2px;}
.hero-link{display:inline-flex;align-items:center;gap:7px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:10px 16px;border:1px solid var(--border);background:rgba(8,8,8,.6);backdrop-filter:blur(8px);transition:all .2s;}
.hero-link:hover{border-color:var(--accent);color:var(--accent);}
.scroll-indicator{position:absolute;bottom:28px;right:48px;display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--muted);font-size:10px;letter-spacing:.15em;text-transform:uppercase;z-index:10;}
.scroll-line{width:1px;height:40px;background:linear-gradient(to bottom,var(--accent),transparent);animation:scrollPulse 2s ease-in-out infinite;}
@keyframes scrollPulse{0%,100%{opacity:.4;}50%{opacity:1;}}

/* MARQUEE */
.marquee-wrap{border-top:1px solid var(--border);border-bottom:1px solid var(--border);overflow:hidden;padding:14px 0;background:var(--bg2);}
.marquee-track{display:flex;animation:marquee 28s linear infinite;white-space:nowrap;}
.marquee-track:hover{animation-play-state:paused;}
.marquee-item{display:flex;align-items:center;gap:24px;padding:0 32px;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);flex-shrink:0;}
.marquee-dot{width:4px;height:4px;border-radius:50%;background:var(--accent);flex-shrink:0;}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}

/* SECTION UTILS */
.section-header{display:flex;align-items:baseline;justify-content:space-between;padding-bottom:24px;border-bottom:1px solid var(--border);margin-bottom:64px;}
.section-num{font-size:11px;color:var(--accent);letter-spacing:.2em;margin-right:16px;}
.section-title{font-family:var(--serif);font-size:clamp(32px,4vw,52px);line-height:1.1;letter-spacing:-1px;}
.section-title em{font-style:italic;color:var(--muted);}
.section-note{font-size:11px;color:var(--muted);letter-spacing:.08em;text-align:right;max-width:220px;}
.fade-up{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease;}
.fade-up.visible{opacity:1;transform:translateY(0);}

/* SERVICES STICKY */
#services{position:relative;background:var(--bg);padding-top:80px;}
#services .section-header{padding:0 48px 24px;margin-bottom:0;}
.sticky-outer{height:700vh;position:relative;}
.sticky-inner{position:sticky;top:0;height:100vh;display:grid;grid-template-columns:1fr 1fr;overflow:hidden;border-top:1px solid var(--border);}
.services-list{display:flex;flex-direction:column;justify-content:center;padding:0 52px;border-right:1px solid var(--border);gap:2px;}
.svc-item{display:flex;align-items:flex-start;gap:16px;padding:12px 0;transition:all .5s ease;opacity:.2;transform:translateX(-8px);}
.svc-item.active{opacity:1;transform:translateX(0);}
.svc-num{font-size:11px;color:var(--border);letter-spacing:.1em;padding-top:3px;min-width:28px;transition:color .4s;}
.svc-item.active .svc-num{color:var(--accent);}
.svc-body{flex:1;}
.svc-name{font-family:var(--sans);font-size:clamp(16px,2.2vw,23px);font-weight:700;color:var(--muted);margin-bottom:5px;transition:color .4s;}
.svc-item.active .svc-name{color:var(--text);}
.svc-desc{font-size:13px;color:var(--muted);line-height:1.8;max-width:380px;max-height:0;overflow:hidden;transition:max-height .5s ease,opacity .4s;opacity:0;}
.svc-item.active .svc-desc{max-height:80px;opacity:1;}
.svc-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px;max-height:0;overflow:hidden;transition:max-height .5s ease,opacity .4s;opacity:0;}
.svc-item.active .svc-tags{max-height:40px;opacity:1;}
.svc-tag{font-size:10px;letter-spacing:.1em;text-transform:uppercase;padding:3px 8px;border:1px solid rgba(200,255,0,.2);color:var(--accent);}

/* DIAGRAM */
.diagram-wrap{display:flex;align-items:center;justify-content:center;position:relative;background:var(--bg2);overflow:hidden;}
.diagram-wrap::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(200,255,0,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(200,255,0,.022) 1px,transparent 1px);background-size:44px 44px;}
.diagram-scan{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent 0%,rgba(200,255,0,.7) 20%,rgba(200,255,0,.95) 50%,rgba(200,255,0,.7) 80%,transparent 100%);opacity:0;pointer-events:none;z-index:50;box-shadow:0 0 10px rgba(200,255,0,.4);top:5%;transition:opacity .4s;}
.diagram-scan.active{opacity:.8;animation:scanSweep 2.2s ease-in-out infinite;}
@keyframes scanSweep{0%{top:4%;}100%{top:96%;}}
.diagram-label{position:absolute;bottom:24px;left:0;right:0;text-align:center;font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);z-index:20;transition:all .4s;}
.diagram-label .hl{color:var(--accent);}
.diagram-progress{position:absolute;bottom:0;left:0;height:2px;background:var(--accent);width:0%;transition:width .6s ease;z-index:20;box-shadow:0 0 8px rgba(200,255,0,.55);}
.sys-svg{width:100%;max-width:480px;height:auto;position:relative;z-index:10;padding:28px;}
.sys-layer{transition:opacity .65s ease,transform .65s ease;opacity:0;transform-origin:center;}
.sys-layer.show{opacity:1;}
#sys-db{transform:translateY(12px);}   #sys-db.show{transform:translateY(0);}
#sys-be{transform:translateY(10px);}   #sys-be.show{transform:translateY(0);}
#sys-apis{transform:scaleX(.82);}      #sys-apis.show{transform:scaleX(1);}
#sys-fe{transform:translateY(-10px);}  #sys-fe.show{transform:translateY(0);}
#sys-saas{transform:translateY(-12px);}#sys-saas.show{transform:translateY(0);}
#sys-sec{transform:scale(.93);}        #sys-sec.show{transform:scale(1);}
.sys-line{stroke:rgba(200,255,0,.22);stroke-width:1;fill:none;stroke-dasharray:400;stroke-dashoffset:400;transition:stroke-dashoffset .9s ease;}
.sys-line.draw{stroke-dashoffset:0;}
.shield-glow,.shield-path,.shield-fill{transform-box:fill-box;transform-origin:center;transform:scale(1.12);}
.shield-glow{fill:none;stroke:rgba(200,255,0,.09);stroke-width:14;stroke-dasharray:2800;stroke-dashoffset:2800;transition:stroke-dashoffset 1.9s cubic-bezier(.4,0,.2,1) .1s;filter:blur(7px);}
.shield-glow.draw{stroke-dashoffset:0;}
.shield-path{fill:none;stroke:rgba(200,255,0,.65);stroke-width:1.5;stroke-dasharray:2800;stroke-dashoffset:2800;transition:stroke-dashoffset 1.7s cubic-bezier(.4,0,.2,1);filter:drop-shadow(0 0 7px rgba(200,255,0,.38));}
.shield-path.draw{stroke-dashoffset:0;}
.shield-fill{fill:rgba(200,255,0,.028);opacity:0;transition:opacity 1.2s ease .5s;}
.shield-fill.show{opacity:1;}

/* STACK */
#stack{padding:80px 48px;background:var(--bg2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
.stack-layout{display:grid;grid-template-columns:1fr 2fr;gap:80px;align-items:start;}
.stack-intro p{font-size:13px;color:var(--muted);line-height:1.9;margin-top:16px;}
.stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);}
.stack-item{background:var(--bg2);padding:20px;display:flex;flex-direction:column;gap:6px;transition:background .2s;}
.stack-item:hover{background:var(--bg3);}
.stack-item-name{font-family:var(--sans);font-size:14px;font-weight:700;color:var(--text);}
.stack-item-type{font-size:10px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;}
.stack-item.primary .stack-item-name{color:var(--accent);}

/* PORTFOLIO */
#portfolio{padding:120px 48px;background:var(--bg);}
.portfolio-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);}
.portfolio-item{background:var(--bg);position:relative;overflow:hidden;aspect-ratio:4/3;cursor:pointer;}
.portfolio-item img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease,filter .4s;filter:grayscale(80%) brightness(.7);}
.portfolio-item:hover img{transform:scale(1.05);filter:grayscale(20%) brightness(.85);}
.portfolio-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,8,8,.95) 0%,transparent 60%);display:flex;flex-direction:column;justify-content:flex-end;padding:28px;transform:translateY(20px);opacity:0;transition:all .4s ease;}
.portfolio-item:hover .portfolio-overlay{transform:translateY(0);opacity:1;}
.portfolio-title{font-family:var(--sans);font-size:16px;font-weight:700;margin-bottom:6px;}
.portfolio-type{font-size:11px;color:var(--accent);letter-spacing:.1em;text-transform:uppercase;}
.portfolio-placeholder{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:var(--bg3);color:var(--muted);font-size:11px;letter-spacing:.1em;text-transform:uppercase;border:1px dashed var(--border);}
.portfolio-placeholder svg{width:28px;height:28px;opacity:.3;}
.portfolio-cta{text-align:center;margin-top:48px;}
.btn-outline{display:inline-flex;align-items:center;gap:10px;padding:12px 28px;border:1px solid var(--border);color:var(--muted);font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;transition:all .2s;}
.btn-outline:hover{border-color:var(--accent);color:var(--accent);}

/* PROCESS */
#process{padding:80px 48px;background:var(--bg2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
.process-steps{display:grid;grid-template-columns:repeat(4,1fr);position:relative;}
.process-steps::after{content:'';position:absolute;top:24px;left:0;right:0;height:1px;background:var(--border);z-index:0;}
.process-step{padding:0 28px 0 0;position:relative;z-index:1;}
.process-dot{width:48px;height:48px;border:1px solid var(--border);background:var(--bg2);display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--accent);margin-bottom:28px;transition:all .3s;cursor:default;}
.process-step:hover .process-dot{background:var(--accent);color:var(--bg);border-color:var(--accent);}
.process-step-title{font-family:var(--sans);font-size:14px;font-weight:700;margin-bottom:8px;}
.process-step-desc{font-size:12px;color:var(--muted);line-height:1.8;}

/* CONTACT */
#contact{padding:120px 48px;background:var(--bg);display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;}
.contact-heading{font-family:var(--serif);font-size:clamp(36px,4.5vw,64px);line-height:1.05;letter-spacing:-1.5px;margin-bottom:24px;}
.contact-heading em{font-style:italic;color:var(--muted);}
.contact-left p{font-size:13px;color:var(--muted);line-height:1.9;max-width:400px;margin-bottom:40px;}
.contact-links{display:flex;flex-direction:column;gap:1px;}
.contact-link{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border:1px solid var(--border);color:var(--text);text-decoration:none;font-size:13px;transition:all .2s;background:var(--bg);}
.contact-link+.contact-link{border-top:none;}
.contact-link:hover{background:var(--bg2);border-color:var(--accent);color:var(--accent);}
.link-label{font-size:10px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;}
.contact-form{display:flex;flex-direction:column;gap:1px;background:var(--border);border:1px solid var(--border);}
.form-group{background:var(--bg);padding:20px 24px;}
.form-label{display:block;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);margin-bottom:8px;}
.form-input,.form-textarea{width:100%;background:transparent;border:none;outline:none;font-family:var(--mono);font-size:13px;color:var(--text);padding:0;line-height:1.6;}
.form-textarea{resize:none;height:80px;}
.form-group:focus-within{background:var(--bg2);}
.form-group:focus-within .form-label{color:var(--accent);}
.form-submit{background:var(--accent);color:var(--bg);border:none;padding:20px 24px;font-family:var(--mono);font-size:12px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;width:100%;transition:background .2s,opacity .2s;text-align:left;display:flex;align-items:center;justify-content:space-between;}
.form-submit:hover:not(:disabled){background:var(--text);}
.form-submit:disabled{opacity:.6;cursor:default;}
.form-submit.sent{background:var(--bg3);color:var(--accent);border:1px solid var(--accent);}
.form-required{color:var(--accent2);font-size:10px;letter-spacing:.05em;padding:10px 24px 0;font-family:var(--mono);}

/* FOOTER */
footer{padding:32px 48px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.footer-logo{font-family:var(--serif);font-size:18px;color:var(--muted);}
.footer-logo span{color:var(--accent);}
.footer-copy{font-size:11px;color:var(--muted);letter-spacing:.05em;}

/* RESPONSIVE */
@media(max-width:900px){
  nav{padding:16px 24px;}
  .nav-links{display:none;}
  .hero-content{padding:0 24px 56px;}
  .hero-bottom-row{flex-direction:column;align-items:flex-start;}
  .sticky-inner{grid-template-columns:1fr;}
  .diagram-wrap{display:none;}
  .services-list{padding:0 24px;justify-content:flex-start;padding-top:80px;}
  .sticky-outer{height:400vh;}
  #stack{padding:60px 24px;}
  .stack-layout{grid-template-columns:1fr;gap:40px;}
  .stack-grid{grid-template-columns:repeat(2,1fr);}
  #portfolio{padding:80px 24px;}
  .portfolio-grid{grid-template-columns:1fr;}
  #process{padding:60px 24px;}
  .process-steps{grid-template-columns:1fr 1fr;gap:40px;}
  .process-steps::after{display:none;}
  #contact{padding:80px 24px;grid-template-columns:1fr;gap:48px;}
  footer{padding:24px;flex-direction:column;gap:12px;text-align:center;}
  #services .section-header{padding:0 24px 24px;}
}
`;

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  'Node.js','C# .NET','PHP','Next.js','React','TypeScript',
  'PostgreSQL','Docker','AWS','Redis','REST API','GraphQL',
  'Pentest','SaaS','Full Stack',
];

const TRANSLATIONS = {
  pt: {
    nav: { services:'Serviços', portfolio:'Portfólio', process:'Processo', contact:'Contato', cta:'Iniciar Projeto' },
    hero: {
      tag:'Disponível para projetos', line1:'Dev Full Stack', line2:'& Segurança',
      sub:'Do zero ao deploy. Desenvolvo produtos digitais completos — aplicações web, SaaS, APIs e integrações. Trabalho end-to-end com qualquer stack.',
      cta:'Falar sobre seu projeto', ctaGhost:'Ver portfólio',
      statProjects:'Projetos', statYears:'Anos', statStacks:'Stacks', cv:'Baixar CV',
    },
    scrambleWords: ['Web','SaaS','APIs','Apps','Segurança'],
    services: {
      num:'01 /', title:'O que', em:'entrego',
      note:'Do banco de dados ao produto — e sua segurança',
      items: [
        { num:'01', name:'Banco de Dados', desc:'Modelagem, normalização e otimização de banco de dados relacionais e NoSQL. A base sólida de qualquer sistema.', tags:['PostgreSQL','MySQL','MongoDB','Redis'] },
        { num:'02', name:'Backend', desc:'APIs robustas, lógica de negócio e serviços escaláveis. Arquitetura limpa, testável e pronta para crescer.', tags:['Node.js','C# .NET','PHP','Docker'] },
        { num:'03', name:'APIs & Integrações', desc:'Conexão com ERPs, gateways de pagamento, CRMs e qualquer API de terceiros. REST, GraphQL e Webhooks.', tags:['REST','GraphQL','Webhooks','n8n'] },
        { num:'04', name:'Frontend', desc:'Interfaces modernas, responsivas e performáticas. Componentes reutilizáveis com foco em UX e acessibilidade.', tags:['Next.js','React','TypeScript','Tailwind'] },
        { num:'05', name:'Landing Pages & SaaS', desc:'LPs de alta conversão e produtos SaaS completos com auth, multi-tenancy e billing. Do zero ao produto no ar.', tags:['SaaS','Stripe','Multi-tenant','SEO'] },
        { num:'06', name:'Auditoria & Pentest', desc:'Análise completa de segurança em aplicações web. Identificação de vulnerabilidades, relatório e remediação.', tags:['OWASP','Pentest','SAST','CVE'] },
      ],
    },
    stepLabels: [
      ['Banco de Dados','A fundação de tudo'],
      ['Backend','Lógica e processamento'],
      ['APIs & Integrações','Conectando o mundo externo'],
      ['Frontend','Interface com o usuário'],
      ['LP & SaaS','O produto no ar'],
      ['Auditoria & Pentest','Protegendo o sistema completo'],
    ],
    stack: {
      num:'02 /', title:'Stack &', em:'Tecnologias',
      desc:'Trabalho com qualquer stack — o que importa é a solução certa para o problema certo. As tecnologias abaixo são onde tenho mais domínio.',
      items: [
        { name:'Node.js',    type:'Backend / Runtime',    primary:true },
        { name:'C# / .NET',  type:'Backend / Enterprise', primary:true },
        { name:'PHP',        type:'Backend / Web',         primary:true },
        { name:'Next.js',    type:'Frontend / Fullstack',  primary:true },
        { name:'React',      type:'Frontend / UI',         primary:false },
        { name:'TypeScript', type:'Linguagem',             primary:false },
        { name:'PostgreSQL', type:'Banco de dados',        primary:false },
        { name:'Docker',     type:'DevOps / Infra',        primary:false },
        { name:'AWS',        type:'Cloud',                 primary:false },
        { name:'Redis',      type:'Cache / Queue',         primary:false },
        { name:'Prisma / EF',type:'ORM',                  primary:false },
        { name:'+ qualquer', type:'Adaptável ao projeto',  primary:false },
      ],
    },
    process: {
      num:'03 /', title:'Como', em:'funciona',
      note:'Processo claro e transparente',
      steps: [
        { n:'01', t:'Discovery',      d:'Entendimento do problema, levantamento de requisitos, definição de escopo e estimativa de prazo.' },
        { n:'02', t:'Planejamento',   d:'Arquitetura técnica, escolha de stack, wireframes se necessário e cronograma detalhado.' },
        { n:'03', t:'Desenvolvimento',d:'Ciclos de entrega com updates constantes. Código limpo, testado e documentado.' },
        { n:'04', t:'Deploy & Suporte',d:'Publicação, monitoramento e suporte pós-lançamento para garantir estabilidade.' },
      ],
    },
    cvFile: 'cv-bruno-bento-pt.pdf',
    contact: {
      heading:'Vamos construir', headingEm:'algo juntos?',
      desc:'Disponível para projetos freelance, contratos de desenvolvimento e consultorias técnicas. Me conta seu projeto — respondo em até 24h.',
      links: [
        { label:'Email',     val:'brunoreinoso10@gmail.com',           href:'mailto:brunoreinoso10@gmail.com',              sym:'→' },
        { label:'WhatsApp',  val:'+55 (11) 9 98543-3905',              href:'https://wa.me/5511998543905',                  sym:'→' },
        { label:'LinkedIn',  val:'linkedin.com/in/bruno-bento-reinoso', href:'https://linkedin.com/in/bruno-bento-reinoso', sym:'→' },
        { label:'GitHub',    val:'github.com/bruno-bento',             href:'https://github.com/bruno-bento',              sym:'→' },
        { label:'Currículo', val:'Baixar CV em PDF',                   href:'/cv-bruno-bento-pt.pdf',                      sym:'↓', download:true },
      ],
      form: {
        name:'Seu nome', namePh:'João Silva',
        email:'Email', emailPh:'joao@empresa.com',
        type:'Tipo de projeto', typePh:'Landing page, SaaS, API, Pentest...',
        msg:'Me conta mais', msgPh:'Qual o projeto? Qual o prazo? Tem orçamento em mente?',
        submit:'Enviar mensagem', sending:'Enviando…', sent:'Mensagem enviada!', error:'Erro ao enviar. Tente novamente.',
      },
      footer:'© 2025 Bruno B — Dev Full Stack & Segurança',
    },
  },
  en: {
    nav: { services:'Services', portfolio:'Portfolio', process:'Process', contact:'Contact', cta:'Start Project' },
    hero: {
      tag:'Available for projects', line1:'Full Stack Dev', line2:'& Security',
      sub:'From zero to deploy. I build complete digital products — web apps, SaaS, APIs and integrations. End-to-end with any stack.',
      cta:'Talk about your project', ctaGhost:'View portfolio',
      statProjects:'Projects', statYears:'Years', statStacks:'Stacks', cv:'Download CV',
    },
    scrambleWords: ['Web','SaaS','APIs','Apps','Security'],
    services: {
      num:'01 /', title:'What I', em:'deliver',
      note:'From the database to the product — and its security',
      items: [
        { num:'01', name:'Database', desc:'Modeling, normalization and optimization of relational and NoSQL databases. The solid foundation of any system.', tags:['PostgreSQL','MySQL','MongoDB','Redis'] },
        { num:'02', name:'Backend', desc:'Robust APIs, business logic and scalable services. Clean, testable architecture built to grow.', tags:['Node.js','C# .NET','PHP','Docker'] },
        { num:'03', name:'APIs & Integrations', desc:'Connection with ERPs, payment gateways, CRMs and any third-party API. REST, GraphQL and Webhooks.', tags:['REST','GraphQL','Webhooks','n8n'] },
        { num:'04', name:'Frontend', desc:'Modern, responsive and performant interfaces. Reusable components focused on UX and accessibility.', tags:['Next.js','React','TypeScript','Tailwind'] },
        { num:'05', name:'Landing Pages & SaaS', desc:'High-converting LPs and complete SaaS products with auth, multi-tenancy and billing. From zero to live.', tags:['SaaS','Stripe','Multi-tenant','SEO'] },
        { num:'06', name:'Audit & Pentest', desc:'Complete security analysis of web applications. Vulnerability identification, reporting and remediation.', tags:['OWASP','Pentest','SAST','CVE'] },
      ],
    },
    stepLabels: [
      ['Database','The foundation of everything'],
      ['Backend','Logic and processing'],
      ['APIs & Integrations','Connecting the outside world'],
      ['Frontend','User interface'],
      ['LP & SaaS','The product live'],
      ['Audit & Pentest','Securing the full system'],
    ],
    stack: {
      num:'02 /', title:'Stack &', em:'Technologies',
      desc:"I work with any stack — what matters is the right solution for the right problem. The technologies below are where I have the most expertise.",
      items: [
        { name:'Node.js',    type:'Backend / Runtime',    primary:true },
        { name:'C# / .NET',  type:'Backend / Enterprise', primary:true },
        { name:'PHP',        type:'Backend / Web',         primary:true },
        { name:'Next.js',    type:'Frontend / Fullstack',  primary:true },
        { name:'React',      type:'Frontend / UI',         primary:false },
        { name:'TypeScript', type:'Language',              primary:false },
        { name:'PostgreSQL', type:'Database',              primary:false },
        { name:'Docker',     type:'DevOps / Infra',        primary:false },
        { name:'AWS',        type:'Cloud',                 primary:false },
        { name:'Redis',      type:'Cache / Queue',         primary:false },
        { name:'Prisma / EF',type:'ORM',                  primary:false },
        { name:'+ any',      type:'Adaptable to project', primary:false },
      ],
    },
    process: {
      num:'03 /', title:'How it', em:'works',
      note:'Clear and transparent process',
      steps: [
        { n:'01', t:'Discovery',   d:'Problem understanding, requirements gathering, scope definition and timeline estimation.' },
        { n:'02', t:'Planning',    d:'Technical architecture, stack selection, wireframes if needed and detailed schedule.' },
        { n:'03', t:'Development', d:'Delivery cycles with constant updates. Clean, tested and documented code.' },
        { n:'04', t:'Deploy & Support', d:'Publishing, monitoring and post-launch support to ensure stability.' },
      ],
    },
    cvFile: 'cv-bruno-bento-en.pdf',
    contact: {
      heading:"Let's build", headingEm:'something together?',
      desc:'Available for freelance projects, development contracts and technical consulting. Tell me about your project — I respond within 24h.',
      links: [
        { label:'Email',    val:'brunoreinoso10@gmail.com',           href:'mailto:brunoreinoso10@gmail.com',              sym:'→' },
        { label:'WhatsApp', val:'+55 (11) 9 98543-3905',              href:'https://wa.me/5511998543905',                  sym:'→' },
        { label:'LinkedIn', val:'linkedin.com/in/bruno-bento-reinoso', href:'https://linkedin.com/in/bruno-bento-reinoso', sym:'→' },
        { label:'GitHub',   val:'github.com/bruno-bento',             href:'https://github.com/bruno-bento',              sym:'→' },
        { label:'Resume',   val:'Download PDF',                       href:'/cv-bruno-bento-en.pdf',                      sym:'↓', download:true },
      ],
      form: {
        name:'Your name', namePh:'John Smith',
        email:'Email', emailPh:'john@company.com',
        type:'Project type', typePh:'Landing page, SaaS, API, Pentest...',
        msg:'Tell me more', msgPh:'What is the project? What is the timeline? Do you have a budget in mind?',
        submit:'Send message', sending:'Sending…', sent:'Message sent!', error:'Failed to send. Please try again.',
      },
      footer:'© 2025 Bruno B — Full Stack Dev & Security',
    },
  },
};
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!%';

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const IconDownload = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IconScreen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
  </svg>
);

/* ─────────────────────────────────────────────
   SCRAMBLE HOOK
───────────────────────────────────────────── */
function useScramble(words) {
  const [display, setDisplay] = useState(words[0]);
  useEffect(() => {
    setDisplay(words[0]);
    let wIdx = 0;
    const interval = setInterval(() => {
      wIdx = (wIdx + 1) % words.length;
      const target = words[wIdx];
      let i = 0; const tot = 22;
      const iv = setInterval(() => {
        setDisplay(target.split('').map((c,j) =>
          j < i/(tot/target.length) ? c : SCRAMBLE_CHARS[Math.floor(Math.random()*SCRAMBLE_CHARS.length)]
        ).join(''));
        if (++i > tot) { setDisplay(target); clearInterval(iv); }
      }, 40);
    }, 2800);
    return () => clearInterval(interval);
  }, [words]);
  return display;
}

/* ─────────────────────────────────────────────
   COUNTER HOOK
───────────────────────────────────────────── */
function useCounter(target) {
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done) {
        setDone(true);
        let c = 0; const step = target/40;
        const iv = setInterval(() => {
          c += step;
          if (c >= target) { setVal(target); clearInterval(iv); } else setVal(Math.floor(c));
        }, 35);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, done]);
  return [ref, done ? `${target}+` : val];
}

/* ─────────────────────────────────────────────
   FADE-UP HOOK
───────────────────────────────────────────── */
function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─────────────────────────────────────────────
   STAT ITEM
───────────────────────────────────────────── */
function StatItem({ target, label }) {
  const [ref, val] = useCounter(target);
  return (
    <div className="stat">
      <div className="stat-num" ref={ref}>{val}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DIAGRAM SVG
───────────────────────────────────────────── */
function DiagramSVG({ step }) {
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
        {/* Padlock */}
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

      {/* DATABASE y=388–440 */}
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

      {/* BACKEND y=260–322 */}
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

      {/* APIs y≈291 */}
      <g id="sys-apis" className={layerClass(2)}>
        <rect x="22" y="273" width="108" height="36" rx="3" fill="rgba(237,233,223,.03)" stroke="rgba(237,233,223,.15)" strokeWidth="1"/>
        <text x="76" y="288" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1.5" fill="rgba(237,233,223,.5)">API</text>
        <text x="76" y="300" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="6.5" letterSpacing=".8" fill="rgba(237,233,223,.24)">Stripe · ERP · CRM</text>
        <rect x="350" y="273" width="108" height="36" rx="3" fill="rgba(237,233,223,.03)" stroke="rgba(237,233,223,.15)" strokeWidth="1"/>
        <text x="404" y="288" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1.5" fill="rgba(237,233,223,.5)">API</text>
        <text x="404" y="300" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="6.5" letterSpacing=".8" fill="rgba(237,233,223,.24)">Auth · SMS · Misc</text>
      </g>

      {/* FRONTEND y=130–196 */}
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

      {/* LP / SaaS y=16–76 — aligned x=168 same as Frontend */}
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

/* ─────────────────────────────────────────────
   PORTFOLIO PLACEHOLDER
───────────────────────────────────────────── */
function PortfolioPlaceholder({ type, title }) {
  return (
    <div className="portfolio-item fade-up">
      <div className="portfolio-placeholder">
        <IconScreen />
        <span>Adicionar screenshot</span>
      </div>
      <div className="portfolio-overlay">
        <p className="portfolio-type">{type}</p>
        <h3 className="portfolio-title">{title}</h3>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  const outerRef   = useRef(null);
  const navRef     = useRef(null);
  const heroRef    = useRef(null);
  const [lang, setLang] = useState('pt');
  const t = TRANSLATIONS[lang];
  const tRef = useRef(t);
  tRef.current = t;
  const scramble   = useScramble(t.scrambleWords);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name:'', email:'', type:'', msg:'' });
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const setField = field => e => setForm(f => ({ ...f, [field]: e.target.value }));
  const handleSubmit = async () => {
    const { name, email, type, msg } = form;
    if (!name.trim() || !email.trim()) return;
    setFormLoading(true);
    setFormError('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '707e50dd-5f69-456e-a6f4-e9d2c1ed8d20',
          subject: `[Portfólio] ${type || 'Contato'} — ${name}`,
          name,
          email,
          'Tipo de projeto': type,
          message: msg,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormSent(true);
        setForm({ name:'', email:'', type:'', msg:'' });
        setTimeout(() => setFormSent(false), 5000);
      } else {
        setFormError(t.contact.form.error ?? 'Erro ao enviar. Tente novamente.');
      }
    } catch {
      setFormError(t.contact.form.error ?? 'Erro ao enviar. Tente novamente.');
    } finally {
      setFormLoading(false);
    }
  };
  const [labelHtml, setLabelHtml] = useState(`<span class="hl">${TRANSLATIONS.pt.stepLabels[0][0]}</span> — ${TRANSLATIONS.pt.stepLabels[0][1]}`);
  const [progress, setProgress] = useState((1/6*100));

  /* Inject CSS once */
  useEffect(() => {
    const tag = document.createElement('style');
    tag.textContent = CSS;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  /* Dynamic SEO — update lang attr and title on language change */
  useEffect(() => {
    if (lang === 'pt') {
      document.documentElement.lang = 'pt-BR';
      document.title = 'Bruno B — Dev Full Stack & Segurança';
    } else {
      document.documentElement.lang = 'en';
      document.title = 'Bruno B — Full Stack Dev & Security';
    }
  }, [lang]);

  /* Forward hero clicks to PixelBlast canvas */
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

  /* Nav scroll */
  useEffect(() => {
    const handler = () => navRef.current?.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* Sync label when lang changes */
  useEffect(() => {
    setLabelHtml(`<span class="hl">${t.stepLabels[step][0]}</span> — ${t.stepLabels[step][1]}`);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Sticky scroll */
  useEffect(() => {
    const handler = () => {
      const outer = outerRef.current;
      if (!outer) return;
      const rect = outer.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const pct = Math.max(0, Math.min(1, scrolled / total));
      const s = Math.min(5, Math.floor(pct * 6));
      setStep(s);
      const sl = tRef.current.stepLabels;
      setLabelHtml(`<span class="hl">${sl[s][0]}</span> — ${sl[s][1]}`);
      setProgress((s + 1) / 6 * 100);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* Fade-up observer */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const fadeRef1  = useFadeUp();
  const fadeRef2  = useFadeUp();
  const fadeRef3  = useFadeUp();
  const fadeRef4  = useFadeUp();
  const fadeRef5  = useFadeUp();
  const fadeRef6  = useFadeUp();
  const fadeRef7  = useFadeUp();
  const fadeRef8  = useFadeUp();
  const fadeRef9  = useFadeUp();
  const fadeRef10 = useFadeUp();

  return (
    <>
      {/* NAV */}
      <nav ref={navRef} id="navbar">
        <Logo />
        <ul className="nav-links">
          <li><a href="#services">{t.nav.services}</a></li>
          <li><a href="#portfolio">{t.nav.portfolio}</a></li>
          <li><a href="#process">{t.nav.process}</a></li>
          <li><a href="#contact">{t.nav.contact}</a></li>
        </ul>
        <div className="nav-right">
          <select className="lang-select" value={lang} onChange={e => setLang(e.target.value)} aria-label="Select language">
            <option value="pt">PT</option>
            <option value="en">EN</option>
          </select>
          <a href="https://linkedin.com/in/bruno-bento-reinoso" target="_blank" rel="noreferrer" className="nav-icon" title="LinkedIn"><IconLinkedIn /></a>
          <a href={`/${t.cvFile}`} download className="nav-icon" title={t.hero.cv}><IconDownload /></a>
          <a href="#contact" className="nav-cta">{t.nav.cta}</a>
        </div>
      </nav>

      {/* HERO */}
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

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-dot"/>{item}
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services">
        <div className="section-header fade-up" ref={fadeRef1}>
          <div><span className="section-num">{t.services.num}</span><h2 className="section-title">{t.services.title} <em>{t.services.em}</em></h2></div>
          <p className="section-note">{t.services.note}</p>
        </div>
        <div className="sticky-outer" ref={outerRef}>
          <div className="sticky-inner">
            {/* Left */}
            <div className="services-list">
              {t.services.items.map((svc, i) => (
                <div key={i} className={`svc-item${step === i ? ' active' : ''}`}>
                  <span className="svc-num">{svc.num}</span>
                  <div className="svc-body">
                    <h3 className="svc-name">{svc.name}</h3>
                    <p className="svc-desc">{svc.desc}</p>
                    <div className="svc-tags">
                      {svc.tags.map(t => <span key={t} className="svc-tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Right */}
            <div className="diagram-wrap">
              <div className={`diagram-scan${step >= 5 ? ' active' : ''}`}/>
              <div className="diagram-label" dangerouslySetInnerHTML={{ __html: labelHtml }}/>
              <div className="diagram-progress" style={{ width: `${progress}%` }}/>
              <DiagramSVG step={step}/>
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack">
        <div className="stack-layout">
          <div className="stack-intro fade-up" ref={fadeRef2}>
            <div className="section-header" style={{ border:'none', marginBottom:0, paddingBottom:0 }}>
              <div><span className="section-num">{t.stack.num}</span><h2 className="section-title">{t.stack.title}<br/><em>{t.stack.em}</em></h2></div>
            </div>
            <p>{t.stack.desc}</p>
          </div>
          <div className="stack-grid fade-up" ref={fadeRef3}>
            {t.stack.items.map(s => (
              <div key={s.name} className={`stack-item${s.primary ? ' primary' : ''}`}>
                <span className="stack-item-name">{s.name}</span>
                <span className="stack-item-type">{s.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO 
      <section id="portfolio">
        <div className="section-header fade-up" ref={fadeRef4}>
          <div><span className="section-num">03 /</span><h2 className="section-title">Portfólio &amp; <em>Projetos</em></h2></div>
          <p className="section-note">Landing pages e produtos entregues</p>
        </div>
        <div className="portfolio-grid">
          <PortfolioPlaceholder type="Landing Page" title="Projeto 01"/>
          <PortfolioPlaceholder type="SaaS"         title="Projeto 02"/>
          <PortfolioPlaceholder type="Web App"      title="Projeto 03"/>
        </div>
        <div className="portfolio-cta fade-up" ref={fadeRef5}>
          <p style={{ color:'var(--muted)', fontSize:12, marginBottom:16 }}>Substitua os placeholders pelos screenshots dos seus projetos</p>
          <a href="#contact" className="btn-outline">Mais projetos no contato <span>→</span></a>
        </div>
      </section>
      2*/}
      {/* PROCESS */}
      <section id="process">
        <div className="section-header fade-up" ref={fadeRef6} style={{ marginBottom:56 }}>
          <div><span className="section-num">{t.process.num}</span><h2 className="section-title">{t.process.title} <em>{t.process.em}</em></h2></div>
          <p className="section-note">{t.process.note}</p>
        </div>
        <div className="process-steps">
          {t.process.steps.map(s => (
            <div key={s.n} className="process-step fade-up">
              <div className="process-dot">{s.n}</div>
              <h3 className="process-step-title">{s.t}</h3>
              <p className="process-step-desc">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-left">
          <h2 className="contact-heading">{t.contact.heading}<br/><em>{t.contact.headingEm}</em></h2>
          <p>{t.contact.desc}</p>
          <div className="contact-links">
            {t.contact.links.map(l => (
              <a key={l.label} href={l.href} className="contact-link" target={l.download ? undefined : '_blank'} rel="noreferrer" download={l.download}>
                <div><div className="link-label">{l.label}</div><div>{l.val}</div></div>
                <span>{l.sym}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="contact-right fade-up" ref={fadeRef7}>
          <div className="contact-form">
            <div className="form-group"><label className="form-label">{t.contact.form.name} <span style={{color:'var(--accent2)'}}>*</span></label><input type="text" className="form-input" placeholder={t.contact.form.namePh} value={form.name} onChange={setField('name')}/></div>
            <div className="form-group"><label className="form-label">{t.contact.form.email} <span style={{color:'var(--accent2)'}}>*</span></label><input type="email" className="form-input" placeholder={t.contact.form.emailPh} value={form.email} onChange={setField('email')}/></div>
            <div className="form-group"><label className="form-label">{t.contact.form.type}</label><input type="text" className="form-input" placeholder={t.contact.form.typePh} value={form.type} onChange={setField('type')}/></div>
            <div className="form-group"><label className="form-label">{t.contact.form.msg}</label><textarea className="form-textarea" placeholder={t.contact.form.msgPh} value={form.msg} onChange={setField('msg')}/></div>
            {formError && <p style={{color:'var(--accent2,#ff6b6b)',fontSize:'0.8rem',marginBottom:'0.5rem'}}>{formError}</p>}
            <button
              className={`form-submit${formSent ? ' sent' : ''}`}
              onClick={handleSubmit}
              disabled={formSent || formLoading}
            >
              <span>{formSent ? t.contact.form.sent : formLoading ? (t.contact.form.sending ?? 'Enviando…') : t.contact.form.submit}</span>
              <span>{formSent ? '✓' : formLoading ? '…' : '→'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Bruno<span>.</span>B</div>
        <p className="footer-copy">{t.contact.footer}</p>
      </footer>
    </>
  );
}