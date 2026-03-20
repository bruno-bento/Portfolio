import { useState } from "react";

const WEB3FORMS_KEY = 'COLE_SUA_CHAVE_AQUI';

export default function ContactForm({ t }) {
  const [form, setForm]         = useState({ name:'', email:'', type:'', msg:'' });
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError]     = useState('');

  const setField = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) return;
    setFormLoading(true);
    setFormError('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Portfólio] ${form.type || 'Contato'} — ${form.name}`,
          name: form.name,
          email: form.email,
          'Tipo de projeto': form.type,
          message: form.msg,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormSent(true);
        setForm({ name:'', email:'', type:'', msg:'' });
        setTimeout(() => setFormSent(false), 5000);
      } else {
        setFormError(t.error);
      }
    } catch {
      setFormError(t.error);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="contact-form">
      <div className="form-group">
        <label className="form-label">{t.name} <span style={{ color:'var(--accent2)' }}>*</span></label>
        <input type="text" className="form-input" placeholder={t.namePh} value={form.name} onChange={setField('name')}/>
      </div>
      <div className="form-group">
        <label className="form-label">{t.email} <span style={{ color:'var(--accent2)' }}>*</span></label>
        <input type="email" className="form-input" placeholder={t.emailPh} value={form.email} onChange={setField('email')}/>
      </div>
      <div className="form-group">
        <label className="form-label">{t.type}</label>
        <input type="text" className="form-input" placeholder={t.typePh} value={form.type} onChange={setField('type')}/>
      </div>
      <div className="form-group">
        <label className="form-label">{t.msg}</label>
        <textarea className="form-textarea" placeholder={t.msgPh} value={form.msg} onChange={setField('msg')}/>
      </div>
      {formError && (
        <p style={{ color:'var(--accent2)', fontSize:'0.8rem', padding:'0 24px 12px' }}>{formError}</p>
      )}
      <button
        className={`form-submit${formSent ? ' sent' : ''}`}
        onClick={handleSubmit}
        disabled={formSent || formLoading}
      >
        <span>{formSent ? t.sent : formLoading ? t.sending : t.submit}</span>
        <span>{formSent ? '✓' : formLoading ? '…' : '→'}</span>
      </button>
    </div>
  );
}
