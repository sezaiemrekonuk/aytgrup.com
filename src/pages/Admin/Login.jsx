import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { persistAdminLanguage } from '../../constants/adminLocale';

function LoginLanguageSwitcher() {
  const { i18n } = useTranslation();
  const active = i18n.language.startsWith('en') ? 'en' : 'tr';

  function setLang(code) {
    const next = persistAdminLanguage(code);
    i18n.changeLanguage(next);
  }

  return (
    <div className="flex rounded-lg border border-[#243A52] overflow-hidden text-[11px] font-semibold">
      <button
        type="button"
        onClick={() => setLang('tr')}
        className={`px-2.5 py-1 transition ${active === 'tr' ? 'bg-accent text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
      >
        TR
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-2.5 py-1 transition ${active === 'en' ? 'bg-accent text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
      >
        EN
      </button>
    </div>
  );
}

export default function AdminLogin() {
  const { t } = useTranslation();
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      const messages = {
        'auth/invalid-credential':      t('admin.login.errors.invalidCredential'),
        'auth/user-not-found':          t('admin.login.errors.userNotFound'),
        'auth/wrong-password':          t('admin.login.errors.wrongPassword'),
        'auth/too-many-requests':       t('admin.login.errors.tooManyRequests'),
        'auth/network-request-failed':  t('admin.login.errors.network'),
      };
      setError(messages[err.code] ?? t('admin.login.errors.generic'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="relative mb-8">
          <div className="absolute top-0 right-0">
            <LoginLanguageSwitcher />
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="font-heading font-bold text-white text-lg">A</span>
              </div>
              <span className="font-heading font-bold text-2xl text-white">AYT Grup</span>
            </div>
            <p className="text-slate-400 text-sm">{t('admin.login.subtitle')}</p>
          </div>
        </div>

        <div className="bg-[#162436] rounded-xl border border-[#243A52] p-8">
          <h1 className="font-heading font-semibold text-xl text-white mb-6">{t('admin.login.signIn')}</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                {t('admin.login.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-[#1A2B3C] border border-[#243A52] text-white rounded-lg px-3 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                placeholder="admin@aytgrup.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                {t('admin.login.password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-[#1A2B3C] border border-[#243A52] text-white rounded-lg px-3 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? t('admin.login.signingIn') : t('admin.login.signIn')}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          {t('admin.login.footerNote')}
        </p>
      </div>
    </div>
  );
}
