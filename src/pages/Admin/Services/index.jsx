import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { autoTranslateFields } from '../../../services/translateService';
import LangTabBar from '../../../components/admin/LangTabBar';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { COLLECTIONS, SERVICES } from '../../../constants';

function fromDoc(snap) {
  return { id: snap.id, ...snap.data() };
}

const ICON_OPTIONS = [
  'HardHat', 'City', 'Home', 'Office', 'Factory', 'Wrench',
  'Building', 'Crane', 'Tools', 'Blueprint',
];
const COLOR_OPTIONS = ['accent', 'primary', 'cta'];

const COLOR_PREVIEW = {
  accent:  'bg-accent/20 text-accent',
  primary: 'bg-primary/20 text-primary',
  cta:     'bg-cta/20 text-cta',
};

function EditModal({ service, onSave, onClose }) {
  const { t } = useTranslation();
  const [langTab,     setLangTab]     = useState('tr');
  const [translating, setTranslating] = useState(false);
  const [form, setForm] = useState({
    key:         service?.key       ?? '',
    icon:        service?.icon      ?? 'HardHat',
    color:       service?.color     ?? 'accent',
    featured:    service?.featured  ?? false,
    order:       service?.order     ?? 1,
    title_tr:    service?.title?.tr ?? '',
    title_en:    service?.title?.en ?? '',
    title_de:    service?.title?.de ?? '',
    desc_tr:     service?.desc?.tr  ?? '',
    desc_en:     service?.desc?.en  ?? '',
    desc_de:     service?.desc?.de  ?? '',
  });
  const [saving, setSaving] = useState(false);

  const titleKey = `title_${langTab}`;
  const descKey  = `desc_${langTab}`;

  function toServiceKey(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_');
  }

  async function handleAutoTranslate(fromLang) {
    const fields = {
      title: form[`title_${fromLang}`] ?? '',
      desc:  form[`desc_${fromLang}`]  ?? '',
    };
    const nonEmpty = Object.fromEntries(
      Object.entries(fields).filter(([, v]) => v.trim()),
    );
    if (!Object.keys(nonEmpty).length) return;

    setTranslating(true);
    try {
      const results = await autoTranslateFields(nonEmpty, fromLang);
      setForm((prev) => {
        const next = { ...prev };
        for (const [toLang, translations] of Object.entries(results)) {
          if (translations.title !== undefined) next[`title_${toLang}`] = translations.title;
          if (translations.desc  !== undefined) next[`desc_${toLang}`]  = translations.desc;
        }
        return next;
      });
    } catch (e) {
      alert(t('admin.multiLang.translateError', { message: e.message }));
    } finally {
      setTranslating(false);
    }
  }

  async function handleSave() {
    const keySource = form.key || form.title_tr || form.title_en || form.title_de;
    if (!keySource.trim()) { alert(t('admin.services.editModal.keyRequired')); return; }
    setSaving(true);
    try {
      await onSave({
        key:      toServiceKey(keySource),
        icon:     form.icon,
        color:    form.color,
        featured: form.featured,
        order:    Number(form.order) || 1,
        title:    { tr: form.title_tr, en: form.title_en, de: form.title_de },
        desc:     { tr: form.desc_tr,  en: form.desc_en,  de: form.desc_de  },
      });
      onClose();
    } catch (e) {
      alert(t('admin.services.editModal.saveFailed', { message: e.message }));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl border border-slate-200 p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <h3 className="font-heading font-semibold text-slate-800 mb-5">
          {service ? t('admin.services.editModal.editTitle') : t('admin.services.editModal.newTitle')}
        </h3>
        <p className="text-sm text-slate-500 mb-5">{t('admin.services.editModal.subtleHint')}</p>

        <div className="space-y-4">
          {/* Order + icon */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">{t('admin.services.editModal.sortOrder')}</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>
          </div>

          {/* Icon + color */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">{t('admin.services.editModal.icon')}</label>
              <select
                value={form.icon}
                onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              >
                {ICON_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">{t('admin.services.editModal.color')}</label>
              <select
                value={form.color}
                onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              >
                {COLOR_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* ── Multilingual content (tabbed TR / EN / DE) ── */}
          <div className="border border-slate-200 rounded-xl p-4">
            <LangTabBar
              activeLang={langTab}
              onLangChange={setLangTab}
              onTranslate={handleAutoTranslate}
              translating={translating}
              hasContent={Boolean(
                (form[`title_${langTab}`] ?? '').trim() ||
                (form[`desc_${langTab}`]  ?? '').trim()
              )}
            />

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                  {t('admin.services.editModal.titleTr').replace('(TR)', `(${langTab.toUpperCase()})`)}
                </label>
                <input
                  value={form[titleKey] ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, [titleKey]: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                  {t('admin.services.editModal.descTr').replace('(TR)', `(${langTab.toUpperCase()})`)}
                </label>
                <textarea
                  value={form[descKey] ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, [descKey]: e.target.value }))}
                  rows={3}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Featured toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${form.featured ? 'bg-accent' : 'bg-slate-200'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform mt-0.5 ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
            <span className="text-sm font-medium text-slate-700">{t('admin.services.editModal.featuredPage')}</span>
          </label>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
            {t('admin.common.cancel')}
          </button>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm font-medium text-white bg-[#1A2B3C] hover:bg-[#243A52] rounded-lg transition disabled:opacity-60">
            {saving ? t('admin.common.saving') : t('admin.services.editModal.saveService')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ServicesAdmin() {
  const { t } = useTranslation();
  const [services,  setServices]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [editItem,  setEditItem]  = useState(null);   // null = closed, false = new, object = edit
  const [deleteId,  setDeleteId]  = useState(null);
  const [deleting,  setDeleting]  = useState(false);
  const [seeded,    setSeeded]    = useState(false);

  async function load() {
    setLoading(true);
    try {
      const q = query(collection(db, COLLECTIONS.SERVICES), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        setServices(snap.docs.map(fromDoc));
      } else {
        setServices(SERVICES.map((s, i) => ({ ...s, id: s.key, order: i + 1, _fromConstants: true })));
      }
    } catch {
      setServices(SERVICES.map((s, i) => ({ ...s, id: s.key, order: i + 1, _fromConstants: true })));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSave(data) {
    if (editItem && editItem.id && !editItem._fromConstants) {
      await updateDoc(doc(db, COLLECTIONS.SERVICES, editItem.id), {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      await addDoc(collection(db, COLLECTIONS.SERVICES), {
        ...data,
        createdAt: serverTimestamp(),
      });
    }
    await load();
  }

  async function handleToggleFeatured(service) {
    if (service._fromConstants) {
      alert(t('admin.services.card.toggleSeedFirst'));
      return;
    }
    await updateDoc(doc(db, COLLECTIONS.SERVICES, service.id), {
      featured: !service.featured,
      updatedAt: serverTimestamp(),
    });
    setServices((prev) =>
      prev.map((s) => s.id === service.id ? { ...s, featured: !s.featured } : s),
    );
  }

  async function confirmDelete() {
    setDeleting(true);
    try {
      await deleteDoc(doc(db, COLLECTIONS.SERVICES, deleteId));
      setServices((prev) => prev.filter((s) => s.id !== deleteId));
    } catch (e) {
      alert(t('admin.services.deleteFailed', { message: e.message }));
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  async function seedToFirestore() {
    for (const [i, s] of SERVICES.entries()) {
      await addDoc(collection(db, COLLECTIONS.SERVICES), {
        ...s,
        order:     i + 1,
        createdAt: serverTimestamp(),
      });
    }
    setSeeded(true);
    await load();
  }

  const hasSeeded = services.some((s) => !s._fromConstants);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-800">{t('admin.services.title')}</h1>
          <p className="text-slate-500 text-sm mt-0.5">{t('admin.services.count', { count: services.length })}</p>
        </div>
        <div className="flex gap-3">
          {!hasSeeded && (
            <button
              onClick={seedToFirestore}
              className="px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition"
            >
              {t('admin.services.seedFirestore')}
            </button>
          )}
          <button
            onClick={() => setEditItem(false)}
            className="inline-flex items-center gap-2 bg-[#1A2B3C] hover:bg-[#243A52] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {t('admin.services.newService')}
          </button>
        </div>
      </div>

      {seeded && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700 mb-5">
          {t('admin.services.seedSuccess')}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-7 h-7 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => {
            const title = typeof service.title === 'object'
              ? (service.title.tr ?? service.title.en ?? service.key)
              : (service.key ?? '');
            return (
              <div key={service.id} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${COLOR_PREVIEW[service.color] ?? 'bg-slate-100 text-slate-600'}`}>
                    {service.icon?.charAt(0)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleFeatured(service)}
                      className={`text-xs px-2 py-1 rounded font-medium transition ${
                        service.featured
                          ? 'bg-accent/10 text-accent'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {service.featured ? t('admin.services.card.featured') : t('admin.services.card.hidden')}
                    </button>
                  </div>
                </div>
                <p className="font-semibold text-slate-800 text-sm mb-1">{title || service.key}</p>
                <p className="text-xs text-slate-400 mb-4">
                  {typeof service.desc === 'object' ? (service.desc.tr ?? '') : ''}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditItem(service)}
                    className="flex-1 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                  >
                    {t('admin.common.edit')}
                  </button>
                  {!service._fromConstants && (
                    <button
                      onClick={() => setDeleteId(service.id)}
                      className="flex-1 py-1.5 text-xs font-medium bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                    >
                      {t('admin.common.delete')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit/New Modal */}
      {editItem !== null && (
        <EditModal
          service={editItem || null}
          onSave={handleSave}
          onClose={() => setEditItem(null)}
        />
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-heading font-semibold text-slate-800 mb-2">{t('admin.services.deleteTitle')}</h3>
            <p className="text-sm text-slate-500 mb-6">{t('admin.services.deleteBody')}</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} disabled={deleting} className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition">{t('admin.common.cancel')}</button>
              <button onClick={confirmDelete} disabled={deleting} className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition disabled:opacity-60">
                {deleting ? t('admin.common.deleting') : t('admin.common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
