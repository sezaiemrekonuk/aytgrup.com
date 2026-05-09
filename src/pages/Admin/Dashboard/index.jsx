import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getProjects } from '../../../services/projectService';
import { getContacts } from '../../../services/contactAdminService';
import { getReviews } from '../../../services/reviewService';

function StatCard({ label, value, sub, color, icon }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </div>
      <div>
        <p className="text-2xl font-heading font-bold text-slate-800">{value}</p>
        <p className="text-sm font-medium text-slate-700 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const { t } = useTranslation();
  const styles = {
    new:     'bg-blue-100 text-blue-700',
    read:    'bg-slate-100 text-slate-600',
    replied: 'bg-green-100 text-green-700',
  };
  const labelKey = `admin.contacts.status.${status}`;
  const label = t(labelKey, { defaultValue: status });
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${styles[status] ?? styles.read}`}>
      {label}
    </span>
  );
}

export default function Dashboard() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [reviews,  setReviews]  = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    Promise.all([getProjects(), getContacts(), getReviews()])
      .then(([p, c, r]) => { setProjects(p); setContacts(c); setReviews(r); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const completed = projects.filter((p) => p.status === 'completed').length;
  const ongoing   = projects.filter((p) => p.status === 'ongoing').length;
  const newMsgs   = contacts.filter((c) => c.status === 'new').length;
  const approvedR = reviews.filter((r) => r.status === 'approved').length;

  const recentContacts = contacts.slice(0, 6);

  const ICONS = {
    projects: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z',
    contacts: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
    reviews:  'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
    ongoing:  'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-64">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8 bg-white border border-slate-200 rounded-2xl p-6">
        <h1 className="font-heading font-bold text-2xl text-slate-800">{t('admin.dashboard.title')}</h1>
        <p className="text-slate-500 text-sm mt-1">{t('admin.dashboard.welcome')}</p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { to: '/admin/projects/new', labelKey: 'admin.dashboard.quickActions.newProject',  color: 'bg-[#1A2B3C] text-white' },
            { to: '/admin/reviews',      labelKey: 'admin.dashboard.quickActions.addReview',   color: 'bg-accent text-white' },
            { to: '/admin/contacts',     labelKey: 'admin.dashboard.quickActions.viewContacts',color: 'bg-slate-100 text-slate-700' },
            { to: '/admin/services',     labelKey: 'admin.dashboard.quickActions.manageServices', color: 'bg-slate-100 text-slate-700' },
          ].map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className={`text-center py-2.5 px-4 rounded-xl text-sm font-semibold transition hover:opacity-90 ${a.color}`}
            >
              {t(a.labelKey)}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label={t('admin.dashboard.stats.totalProjects')}
          value={projects.length}
          sub={t('admin.dashboard.stats.completedOngoing', { completed, ongoing })}
          color="bg-[#1A2B3C]"
          icon={ICONS.projects}
        />
        <StatCard
          label={t('admin.dashboard.stats.newContacts')}
          value={newMsgs}
          sub={t('admin.dashboard.stats.totalSubmissions', { count: contacts.length })}
          color="bg-cta"
          icon={ICONS.contacts}
        />
        <StatCard
          label={t('admin.dashboard.stats.reviews')}
          value={approvedR}
          sub={t('admin.dashboard.stats.reviewsSub', { total: reviews.length, approved: approvedR })}
          color="bg-accent"
          icon={ICONS.reviews}
        />
        <StatCard
          label={t('admin.dashboard.stats.ongoingProjects')}
          value={ongoing}
          sub={t('admin.dashboard.stats.completedCount', { completed })}
          color="bg-emerald-600"
          icon={ICONS.ongoing}
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-heading font-semibold text-slate-800">{t('admin.dashboard.recentContacts')}</h2>
          <Link to="/admin/contacts" className="text-sm text-accent hover:underline">
            {t('admin.dashboard.viewAll')}
          </Link>
        </div>
        {recentContacts.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400 text-sm">{t('admin.dashboard.noContacts')}</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentContacts.map((c) => (
              <div key={c.id} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-xs">{c.name?.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{c.name}</p>
                  <p className="text-xs text-slate-400 truncate">{c.email}</p>
                </div>
                <div className="hidden sm:block text-xs text-slate-500 truncate max-w-[160px]">
                  {c.subject}
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
