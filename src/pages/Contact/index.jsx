import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { BRAND, CONTACT_SUBJECTS } from '../../constants';
import { submitContact } from '../../services/contactService';

const INITIAL_FORM = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const { t }                       = useTranslation();
  const [form, setForm]             = useState(INITIAL_FORM);
  const [errors, setErrors]         = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = 'Bu alan zorunludur.';
    if (!form.email.trim())   errs.email   = 'Geçerli bir e-posta girin.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Geçerli bir e-posta girin.';
    if (!form.message.trim()) errs.message = 'Bu alan zorunludur.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    setSubmitError('');
    try {
      await submitContact(form);
      setSuccess(true);
      setForm(INITIAL_FORM);
    } catch (err) {
      setSubmitError(t('contact.form.error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO titleKey="seo.contact.title" descriptionKey="seo.contact.description" canonicalPath="/iletisim" />

      {/* Header */}
      <section className="bg-primary dark:bg-dark-bg py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid-dark bg-grid-md opacity-50" aria-hidden />
        <div className="container-site relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">İletişim</p>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-white mb-4">{t('contact.title')}</h1>
            <p className="text-neutral-300 text-lg">{t('contact.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-neutral dark:bg-dark-bg">
        <div className="container-site">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── Form ── */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="card-base p-8">
                <h2 className="font-heading font-bold text-xl text-primary dark:text-neutral-100 mb-6">
                  {t('contact.form.title')}
                </h2>

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-green-700 dark:text-green-300 font-heading font-semibold text-lg">
                      {t('contact.form.success')}
                    </p>
                    <button onClick={() => setSuccess(false)} className="btn-ghost mt-4 text-sm">
                      Yeni Mesaj Gönder
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label={t('contact.form.name')} error={errors.name}>
                        <input
                          name="name" type="text" value={form.name} onChange={handleChange}
                          placeholder={t('contact.form.namePlaceholder')}
                          className={fieldClass(errors.name)}
                        />
                      </Field>
                      <Field label={t('contact.form.email')} error={errors.email}>
                        <input
                          name="email" type="email" value={form.email} onChange={handleChange}
                          placeholder={t('contact.form.emailPlaceholder')}
                          className={fieldClass(errors.email)}
                        />
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label={t('contact.form.phone')}>
                        <input
                          name="phone" type="tel" value={form.phone} onChange={handleChange}
                          placeholder={t('contact.form.phonePlaceholder')}
                          className={fieldClass()}
                        />
                      </Field>
                      <Field label={t('contact.form.subject')}>
                        <select name="subject" value={form.subject} onChange={handleChange} className={fieldClass()}>
                          <option value="">{t('contact.form.subjectPlaceholder')}</option>
                          {CONTACT_SUBJECTS.map((s) => (
                            <option key={s} value={s}>{t(`contact.form.subjects.${s}`)}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field label={t('contact.form.message')} error={errors.message}>
                      <textarea
                        name="message" rows={5} value={form.message} onChange={handleChange}
                        placeholder={t('contact.form.messagePlaceholder')}
                        className={fieldClass(errors.message, 'resize-none')}
                      />
                    </Field>

                    {submitError && (
                      <p className="text-red-500 text-sm">{submitError}</p>
                    )}

                    <button type="submit" disabled={submitting} className="btn-cta w-full justify-center">
                      {submitting ? t('contact.form.submitting') : t('contact.form.submit')}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* ── Info sidebar ── */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-6"
            >
              <div className="card-base p-6">
                <h3 className="font-heading font-bold text-lg text-primary dark:text-neutral-100 mb-6">
                  {t('contact.info.title')}
                </h3>
                <ul className="space-y-5">
                  <InfoItem icon={<PhoneIcon />} label={t('contact.info.phone')}>
                    <a href={`tel:${BRAND.phone}`} className="hover:text-accent transition-colors font-semibold">
                      {BRAND.phone}
                    </a>
                  </InfoItem>
                  <InfoItem icon={<MailIcon />} label={t('contact.info.email')}>
                    <a href={`mailto:${BRAND.email}`} className="hover:text-accent transition-colors font-semibold break-all">
                      {BRAND.email}
                    </a>
                  </InfoItem>
                  <InfoItem icon={<MapPinIcon />} label={t('contact.info.address')}>
                    <address className="not-italic text-sm leading-relaxed">
                      {BRAND.addressFull?.tr}
                    </address>
                  </InfoItem>
                  <InfoItem icon={<ClockIcon />} label={t('contact.info.hours')}>
                    <span className="text-sm">{BRAND.workingHours?.tr}</span>
                  </InfoItem>
                </ul>
              </div>
            </motion.aside>
          </div>

          {/* ── Map ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <h2 className="font-heading font-bold text-xl text-primary dark:text-neutral-100 mb-4">
              {t('contact.map.title')}
            </h2>
            <div className="w-full h-80 rounded overflow-hidden border border-neutral-200 dark:border-dark-border">
              <iframe
                title="AYT Group Konumu"
                src={BRAND.mapEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-heading font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function fieldClass(error = false, extra = '') {
  return `w-full px-4 py-2.5 rounded border text-sm font-body bg-white dark:bg-dark-bg text-primary dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-dark-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${error ? 'border-red-400' : 'border-neutral-200 dark:border-dark-border'} ${extra}`;
}

function InfoItem({ icon, label, children }) {
  return (
    <li className="flex gap-3">
      <span className="shrink-0 mt-0.5 text-accent">{icon}</span>
      <div>
        <p className="text-xs font-heading font-semibold text-neutral-400 uppercase tracking-wide mb-0.5">{label}</p>
        <div className="text-primary dark:text-neutral-200">{children}</div>
      </div>
    </li>
  );
}

function PhoneIcon() { return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>; }
function MailIcon()  { return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>; }
function MapPinIcon() { return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>; }
function ClockIcon()  { return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>; }
