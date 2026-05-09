import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getProjects, deleteProject } from '../../../services/projectService';

const STATUS_COLORS = {
  completed: 'bg-green-100 text-green-700',
  ongoing:   'bg-orange-100 text-orange-700',
};
const CATEGORY_COLORS = {
  residential: 'bg-blue-100 text-blue-700',
  commercial:  'bg-purple-100 text-purple-700',
  industrial:  'bg-slate-100 text-slate-700',
};

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function Badge({ label, color }) {
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}

export default function ProjectsList() {
  const { t } = useTranslation();
  const [projects,    setProjects]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [search,      setSearch]      = useState('');
  const [statusFilter,setStatusFilter]= useState('all');
  const [deleteId,    setDeleteId]    = useState(null);
  const [deleting,    setDeleting]    = useState(false);

  function load() {
    setLoading(true);
    getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function confirmDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteProject(deleteId);
      setProjects((prev) => prev.filter((p) => p.id !== deleteId));
    } catch (e) {
      alert(t('admin.projects.list.deleteFailed', { message: e.message }));
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  const filtered = projects.filter((p) => {
    const titleTr = typeof p.title === 'object' ? (p.title.tr ?? '') : (p.title ?? '');
    const matchSearch = titleTr.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-800">{t('admin.projects.list.title')}</h1>
          <p className="text-slate-500 text-sm mt-0.5">{t('admin.projects.list.total', { count: projects.length })}</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-[#1A2B3C] hover:bg-[#243A52] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {t('admin.projects.list.newProject')}
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder={t('admin.projects.list.searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent w-56"
        />
        <div className="flex rounded-lg border border-slate-200 overflow-hidden text-sm">
              {['all', 'completed', 'ongoing'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 transition ${
                statusFilter === s
                  ? 'bg-[#1A2B3C] text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {s === 'all' ? t('projects.filter.all') : t(`projects.status.${s}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="bg-white rounded-xl border border-slate-200 px-4 py-3">
          <p className="text-xs text-slate-500">{t('admin.projects.list.kpiTotal')}</p>
          <p className="text-xl font-heading font-bold text-slate-800 mt-1">{projects.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 px-4 py-3">
          <p className="text-xs text-slate-500">{t('admin.projects.list.kpiOngoing')}</p>
          <p className="text-xl font-heading font-bold text-orange-600 mt-1">{projects.filter((p) => p.status === 'ongoing').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 px-4 py-3">
          <p className="text-xs text-slate-500">{t('admin.projects.list.kpiCompleted')}</p>
          <p className="text-xl font-heading font-bold text-green-600 mt-1">{projects.filter((p) => p.status === 'completed').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 px-4 py-3">
          <p className="text-xs text-slate-500">{t('admin.projects.list.kpiFeatured')}</p>
          <p className="text-xl font-heading font-bold text-accent mt-1">{projects.filter((p) => p.featured).length}</p>
        </div>
      </div>

      {/* Card list */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-7 h-7 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">{t('admin.projects.list.empty')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
            {filtered.map((project) => {
              const title = typeof project.title === 'object'
                ? (project.title.tr ?? project.title.en ?? '')
                : (project.title ?? '');
              const location = typeof project.location === 'object'
                ? (project.location.tr ?? project.location.en ?? '')
                : (project.location ?? '');
              return (
                <article key={project.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <div className="h-36 bg-slate-100">
                    {project.heroImage ? (
                      <img src={project.heroImage} alt={title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xs text-slate-400">
                        {t('admin.projects.list.noImage')}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-semibold text-slate-800 line-clamp-1">{title}</p>
                      <Badge
                        label={t(`projects.status.${project.status}`, { defaultValue: project.status })}
                        color={STATUS_COLORS[project.status] ?? 'bg-slate-100 text-slate-600'}
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        label={t(`projects.filter.${project.category}`, { defaultValue: project.category })}
                        color={CATEGORY_COLORS[project.category] ?? 'bg-slate-100 text-slate-600'}
                      />
                      {project.featured && (
                        <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent">
                          {t('admin.projects.list.table.featured')}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-500 space-y-1 mb-4">
                      {location && <p>{location}</p>}
                      <p>{t('admin.projects.list.updatedAt', { date: formatDate(project.updatedAt?.toDate?.() || project.updatedAt) })}</p>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/admin/projects/${project.id}`}
                        className="flex-1 py-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition text-center"
                      >
                        {t('admin.common.edit')}
                      </Link>
                      <button
                        onClick={() => setDeleteId(project.id)}
                        className="flex-1 py-2 text-xs font-medium bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                      >
                        {t('admin.common.delete')}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-heading font-semibold text-slate-800 mb-2">{t('admin.projects.list.deleteTitle')}</h3>
            <p className="text-sm text-slate-500 mb-6">
              {t('admin.projects.list.deleteBody')}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              >
                {t('admin.common.cancel')}
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition disabled:opacity-60"
              >
                {deleting ? t('admin.common.deleting') : t('admin.common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
