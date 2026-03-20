export default function Footer({ t }) {
  return (
    <footer>
      <div className="footer-logo">Bruno<span>.</span>B</div>
      <p className="footer-copy">{t.contact.footer}</p>
    </footer>
  );
}
