import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { addProject, updateProject, getProject } from '../../../services/projectService';
import { autoTranslateFields } from '../../../services/translateService';
import { uploadImageFile, deleteImageByUrl } from '../../../services/storageService';
import LangTabBar from '../../../components/admin/LangTabBar';

const EMPTY = {
  title:          { tr: '', en: '', de: '' },
  description:    { tr: '', en: '', de: '' },
  location:       { tr: '', en: '', de: '' },
  category:       'residential',
  status:         'ongoing',
  sqm:            '',
  units:          '',
  startDate:      '',
  completionDate: '',
  heroImage:      '',
  gallery:        ['', '', ''],
  progress:       { foundation: 0, structure: 0, finishing: 0 },
  featured:       false,
  order:          1,
};

function Input({ label, value, onChange, type = 'text', placeholder, min, max }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
      />
    </div>
  );
}


function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition bg-white"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="border-b border-slate-200 pb-2 mb-4 mt-8 first:mt-0">
      <h3 className="font-heading font-semibold text-slate-700 text-sm uppercase tracking-wide">{title}</h3>
    </div>
  );
}

function ProgressSlider({ label, value, onChange }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <label className="text-xs font-semibold text-slate-600 capitalize">{label}</label>
        <span className="text-xs font-bold text-accent">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        step="5"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-amber-600"
      />
    </div>
  );
}

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isEdit = Boolean(id) && id !== 'new';

  const [form,        setForm]        = useState(EMPTY);
  const [loading,     setLoading]     = useState(isEdit);
  const [saving,      setSaving]      = useState(false);
  const [error,       setError]       = useState('');
  const [langTab,     setLangTab]     = useState('tr');
  const [translating, setTranslating] = useState(false);
  const [uploading,   setUploading]   = useState({ hero: false, gallery: {} });
  const [deleting,    setDeleting]    = useState({ hero: false, gallery: {} });

  useEffect(() => {
    if (!isEdit) return;
    getProject(id)
      .then((project) => {
        if (!project) { setError(t('admin.projects.form.notFound')); return; }
        // Normalize fields
        const normalize = (field) =>
          typeof field === 'object' && field !== null
            ? field
            : { tr: field ?? '', en: field ?? '', de: '' };

        setForm({
          title:          normalize(project.title),
          description:    normalize(project.description),
          location:       normalize(project.location),
          category:       project.category ?? 'residential',
          status:         project.status ?? 'ongoing',
          sqm:            project.sqm ?? '',
          units:          project.units ?? '',
          startDate:      project.startDate ?? '',
          completionDate: project.completionDate ?? '',
          heroImage:      project.heroImage ?? '',
          gallery:        project.gallery?.length
            ? [...project.gallery, ...Array(3).fill('')].slice(0, Math.max(3, project.gallery.length))
            : ['', '', ''],
          progress: {
            foundation: project.progress?.foundation ?? 0,
            structure:  project.progress?.structure  ?? 0,
            finishing:  project.progress?.finishing  ?? 0,
          },
          featured: project.featured ?? false,
          order:    project.order ?? 1,
        });
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]); // eslint-disable-line react-hooks/exhaustive-deps -- t() only localizes one error string

  function setLang(field, lang, value) {
    setForm((f) => ({ ...f, [field]: { ...f[field], [lang]: value } }));
  }

  function setGallery(index, value) {
    setForm((f) => {
      const g = [...f.gallery];
      g[index] = value;
      return { ...f, gallery: g };
    });
  }

  function addGallerySlot() {
    setForm((f) => ({ ...f, gallery: [...f.gallery, ''] }));
  }

  async function removeGallerySlot(index) {
    const currentUrl = form.gallery[index];
    if (currentUrl) {
      setDeleting((prev) => ({ ...prev, gallery: { ...prev.gallery, [index]: true } }));
      try {
        await deleteImageByUrl(currentUrl);
      } catch (e) {
        setError(t('admin.projects.form.deleteFailed', { message: e.message }));
        setDeleting((prev) => ({ ...prev, gallery: { ...prev.gallery, [index]: false } }));
        return;
      }
      setDeleting((prev) => ({ ...prev, gallery: { ...prev.gallery, [index]: false } }));
    }

    setForm((f) => ({ ...f, gallery: f.gallery.filter((_, i) => i !== index) }));
  }

  function setProgress(key, value) {
    setForm((f) => ({ ...f, progress: { ...f.progress, [key]: value } }));
  }

  async function uploadHeroImage(file) {
    if (!file) return;
    setError('');
    setUploading((prev) => ({ ...prev, hero: true }));
    try {
      const url = await uploadImageFile(file, { folder: 'projects/hero' });
      setForm((prev) => ({ ...prev, heroImage: url }));
    } catch (e) {
      setError(t('admin.projects.form.uploadFailed', { message: e.message }));
    } finally {
      setUploading((prev) => ({ ...prev, hero: false }));
    }
  }

  async function uploadGalleryImage(index, file) {
    if (!file) return;
    setError('');
    setUploading((prev) => ({
      ...prev,
      gallery: { ...prev.gallery, [index]: true },
    }));
    try {
      const url = await uploadImageFile(file, { folder: 'projects/gallery' });
      setGallery(index, url);
    } catch (e) {
      setError(t('admin.projects.form.uploadFailed', { message: e.message }));
    } finally {
      setUploading((prev) => ({
        ...prev,
        gallery: { ...prev.gallery, [index]: false },
      }));
    }
  }

  function openImagePreview(url) {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  async function removeHeroImage() {
    if (!form.heroImage) return;
    setDeleting((prev) => ({ ...prev, hero: true }));
    setError('');
    try {
      await deleteImageByUrl(form.heroImage);
      setForm((prev) => ({ ...prev, heroImage: '' }));
    } catch (e) {
      setError(t('admin.projects.form.deleteFailed', { message: e.message }));
    } finally {
      setDeleting((prev) => ({ ...prev, hero: false }));
    }
  }

  async function removeGalleryImage(index) {
    const currentUrl = form.gallery[index];
    if (!currentUrl) return;
    setDeleting((prev) => ({ ...prev, gallery: { ...prev.gallery, [index]: true } }));
    setError('');
    try {
      await deleteImageByUrl(currentUrl);
      setGallery(index, '');
    } catch (e) {
      setError(t('admin.projects.form.deleteFailed', { message: e.message }));
    } finally {
      setDeleting((prev) => ({ ...prev, gallery: { ...prev.gallery, [index]: false } }));
    }
  }

  async function handleAutoTranslate(fromLang) {
    const fields = {
      title:       form.title[fromLang]       ?? '',
      description: form.description[fromLang] ?? '',
      location:    form.location[fromLang]    ?? '',
    };
    const nonEmpty = Object.fromEntries(
      Object.entries(fields).filter(([, v]) => v.trim()),
    );
    if (!Object.keys(nonEmpty).length) return;

    setTranslating(true);
    setError('');
    try {
      const results = await autoTranslateFields(nonEmpty, fromLang);
      setForm((prev) => {
        const next = { ...prev };
        for (const [toLang, translations] of Object.entries(results)) {
          for (const [field, text] of Object.entries(translations)) {
            next[field] = { ...next[field], [toLang]: text };
          }
        }
        return next;
      });
    } catch (e) {
      setError(t('admin.multiLang.translateError', { message: e.message }));
    } finally {
      setTranslating(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setError('');
    if (!form.title.tr.trim()) { setError(t('admin.projects.form.titleRequired')); return; }

    setSaving(true);
    try {
      const data = {
        ...form,
        sqm:     form.sqm   ? Number(form.sqm)   : null,
        units:   form.units ? Number(form.units)  : null,
        order:   Number(form.order) || 1,
        gallery: form.gallery.filter(Boolean),
        slug:    form.title.tr
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-'),
      };

      if (isEdit) {
        await updateProject(id, data);
      } else {
        await addProject(data);
      }
      navigate('/admin/projects');
    } catch (e) {
      setError(t('admin.projects.form.saveFailed', { message: e.message }));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-7 h-7 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/projects')}
          className="text-slate-400 hover:text-slate-700 transition"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-800">
            {isEdit ? t('admin.projects.form.editTitle') : t('admin.projects.form.newTitle')}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {isEdit ? t('admin.projects.form.editSubtitle') : t('admin.projects.form.newSubtitle')}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-0">
        {/* ─── Translations (tabbed: TR / EN / DE) ──────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-5">
          <LangTabBar
            activeLang={langTab}
            onLangChange={setLangTab}
            onTranslate={handleAutoTranslate}
            translating={translating}
            hasContent={Boolean(
              (form.title[langTab]       ?? '').trim() ||
              (form.description[langTab] ?? '').trim() ||
              (form.location[langTab]    ?? '').trim()
            )}
          />

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t('admin.projects.form.sectionTitle')}
                {langTab === 'tr' && <span className="text-red-400 ml-0.5">*</span>}
              </label>
              <input
                type="text"
                value={form.title[langTab] ?? ''}
                onChange={(e) => setLang('title', langTab, e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t('admin.projects.form.sectionDescription')}
              </label>
              <textarea
                rows={4}
                value={form.description[langTab] ?? ''}
                onChange={(e) => setLang('description', langTab, e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition resize-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t('admin.projects.form.sectionLocation')}
              </label>
              <input
                type="text"
                value={form.location[langTab] ?? ''}
                onChange={(e) => setLang('location', langTab, e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
            </div>
          </div>
        </div>

        {/* ─── Details ─────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-5">
          <SectionHeader title={t('projects.form.sectionDetails')} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <Select
              label={t('projects.detail.category')}
              value={form.category}
              onChange={(v) => setForm((f) => ({ ...f, category: v }))}
              options={[
                { value: 'residential', label: t('projects.filter.residential') },
                { value: 'commercial',  label: t('projects.filter.commercial') },
                { value: 'industrial',  label: t('projects.filter.industrial') },
              ]}
            />
            <Select
              label={t('projects.detail.status')}
              value={form.status}
              onChange={(v) => setForm((f) => ({ ...f, status: v }))}
              options={[
                { value: 'ongoing',   label: t('projects.status.ongoing') },
                { value: 'completed', label: t('projects.status.completed') },
              ]}
            />
            <Input label={t('admin.projects.form.areaSqm')} type="number" value={form.sqm} onChange={(v) => setForm((f) => ({ ...f, sqm: v }))} placeholder="32000" />
            <Input label={t('admin.projects.form.unitsOptional')} type="number" value={form.units} onChange={(v) => setForm((f) => ({ ...f, units: v }))} placeholder="180" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('admin.projects.form.startDate')} value={form.startDate} onChange={(v) => setForm((f) => ({ ...f, startDate: v }))} placeholder="2023-06" />
            <Input label={t('admin.projects.form.completionDate')} value={form.completionDate} onChange={(v) => setForm((f) => ({ ...f, completionDate: v }))} placeholder="2025-12" />
          </div>
        </div>

        {/* ─── Images ──────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-5">
          <SectionHeader title={t('admin.projects.form.sectionImages')} />
          <div className="mb-5">
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              {t('admin.projects.form.heroImage')}
            </label>
            {form.heroImage ? (
              <div className="relative mt-1 rounded-xl overflow-hidden border border-slate-200">
                <img src={form.heroImage} alt="Hero preview" className="h-44 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => openImagePreview(form.heroImage)}
                      className="px-3 py-1.5 text-xs font-medium rounded-md bg-white/90 text-slate-800 hover:bg-white transition"
                    >
                      {t('admin.projects.form.previewImage')}
                    </button>
                    <label className="px-3 py-1.5 text-xs font-medium rounded-md bg-accent text-white hover:bg-accent/90 cursor-pointer transition">
                      {uploading.hero ? t('admin.projects.form.uploading') : t('admin.projects.form.changeImage')}
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploading.hero}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          uploadHeroImage(file);
                          e.target.value = '';
                        }}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={removeHeroImage}
                      disabled={deleting.hero}
                      className="px-3 py-1.5 text-xs font-medium rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      {deleting.hero ? t('admin.projects.form.deletingImage') : t('admin.projects.form.removeImage')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <label className="mt-1 h-36 w-full border-2 border-dashed border-slate-300 hover:border-accent rounded-xl flex items-center justify-center text-sm font-medium text-slate-600 hover:text-accent cursor-pointer transition">
                {uploading.hero ? t('admin.projects.form.uploading') : t('admin.projects.form.uploadHeroImage')}
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading.hero}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    uploadHeroImage(file);
                    e.target.value = '';
                  }}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-600">{t('admin.projects.form.galleryLabel')}</label>
            {form.gallery.map((url, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-3">
                <div className="text-xs font-semibold text-slate-600 mb-2">
                  {t('admin.projects.form.galleryImage', { n: i + 1 })}
                </div>
                {url ? (
                  <div className="relative rounded-lg overflow-hidden border border-slate-200">
                    <img src={url} alt={`Gallery ${i + 1}`} className="h-36 w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-3 right-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => openImagePreview(url)}
                          className="px-3 py-1.5 text-xs font-medium rounded-md bg-white/90 text-slate-800 hover:bg-white transition"
                        >
                          {t('admin.projects.form.previewImage')}
                        </button>
                        <label className="px-3 py-1.5 text-xs font-medium rounded-md bg-accent text-white hover:bg-accent/90 cursor-pointer transition">
                          {uploading.gallery[i] ? t('admin.projects.form.uploading') : t('admin.projects.form.changeImage')}
                          <input
                            type="file"
                            accept="image/*"
                            disabled={Boolean(uploading.gallery[i])}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              uploadGalleryImage(i, file);
                              e.target.value = '';
                            }}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(i)}
                          disabled={Boolean(deleting.gallery[i])}
                          className="px-3 py-1.5 text-xs font-medium rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                        >
                          {deleting.gallery[i] ? t('admin.projects.form.deletingImage') : t('admin.projects.form.removeImage')}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <label className="h-24 w-full border-2 border-dashed border-slate-300 hover:border-accent rounded-lg flex items-center justify-center text-sm font-medium text-slate-600 hover:text-accent cursor-pointer transition">
                    {uploading.gallery[i] ? t('admin.projects.form.uploading') : t('admin.projects.form.uploadImage')}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={Boolean(uploading.gallery[i])}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        uploadGalleryImage(i, file);
                        e.target.value = '';
                      }}
                      className="hidden"
                    />
                  </label>
                )}
                <div className="flex items-center justify-end mt-2">
                  {form.gallery.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeGallerySlot(i)}
                      disabled={Boolean(deleting.gallery[i])}
                      className="text-xs text-slate-400 hover:text-red-500 transition"
                    >
                      {deleting.gallery[i] ? t('admin.projects.form.deletingImage') : t('admin.projects.form.deleteSlot')}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addGallerySlot}
              className="text-sm text-accent hover:underline"
            >
              {t('admin.projects.form.addImage')}
            </button>
          </div>
        </div>

        {/* ─── Progress ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-5">
          <SectionHeader title={t('projects.detail.timeline')} />
          <p className="text-xs text-slate-400 mb-4">{t('projects.form.progressHelper')}</p>
          <div className="space-y-5">
            <ProgressSlider label={t('projects.detail.progress.foundation')} value={form.progress.foundation} onChange={(v) => setProgress('foundation', v)} />
            <ProgressSlider label={t('projects.detail.progress.structure')}  value={form.progress.structure}  onChange={(v) => setProgress('structure', v)} />
            <ProgressSlider label={t('projects.detail.progress.finishing')}  value={form.progress.finishing}  onChange={(v) => setProgress('finishing', v)} />
          </div>
        </div>

        {/* ─── Settings ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-5">
          <SectionHeader title={t('admin.projects.form.sectionSettings')} />
          <div className="flex flex-wrap gap-6 items-center">
            <label className="flex items-center gap-3 cursor-pointer">
              <button
                type="button"
                role="switch"
                aria-checked={form.featured}
                onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                  form.featured ? 'bg-accent' : 'bg-slate-200'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform mt-0.5 ${
                  form.featured ? 'translate-x-5' : 'translate-x-0.5'
                }`} />
              </button>
              <span className="text-sm font-medium text-slate-700">{t('admin.projects.form.featuredHomepage')}</span>
            </label>
            <div className="w-28">
              <Input
                label={t('admin.projects.form.sortOrder')}
                type="number"
                value={form.order}
                onChange={(v) => setForm((f) => ({ ...f, order: v }))}
                min="1"
              />
            </div>
          </div>
        </div>

        {/* ─── Actions ─────────────────────────────────────────────────── */}
        <div className="flex gap-3 justify-end pt-2 pb-8">
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition"
          >
            {t('admin.common.cancel')}
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1A2B3C] hover:bg-[#243A52] rounded-lg transition disabled:opacity-60"
          >
            {saving ? t('admin.common.saving') : isEdit ? t('admin.projects.form.saveChanges') : t('admin.projects.form.createProject')}
          </button>
        </div>
      </form>
    </div>
  );
}
