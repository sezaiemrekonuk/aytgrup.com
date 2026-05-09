import React from 'react';
import { useTranslation } from 'react-i18next';

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800 font-mono">{value || '—'}</span>
    </div>
  );
}

export default function Settings() {
  const { t } = useTranslation();
  const configured = Boolean(process.env.REACT_APP_FIREBASE_PROJECT_ID);

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-slate-800">{t('admin.settingsPage.title')}</h1>
        <p className="text-slate-500 text-sm mt-0.5">{t('admin.settingsPage.subtitle')}</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-5">
        <h2 className="font-heading font-semibold text-slate-700 mb-4">{t('admin.settingsPage.firebaseTitle')}</h2>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-2.5 h-2.5 rounded-full ${configured ? 'bg-green-500' : 'bg-red-400'}`} />
          <span className={`text-sm font-medium ${configured ? 'text-green-700' : 'text-red-600'}`}>
            {configured ? t('admin.settingsPage.connected') : t('admin.settingsPage.notConfigured')}
          </span>
        </div>
        {!configured && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
            <p className="font-semibold mb-1">{t('admin.settingsPage.setupTitle')}</p>
            <p>
              {t('admin.settingsPage.setupBody', {
                example: t('admin.settingsPage.exampleFile'),
                local: t('admin.settingsPage.localFile'),
              })}
            </p>
          </div>
        )}
        <div className="mt-4 space-y-0 divide-y divide-slate-100">
          <InfoRow label={t('admin.settingsPage.projectId')} value={process.env.REACT_APP_FIREBASE_PROJECT_ID} />
          <InfoRow label={t('admin.settingsPage.authDomain')} value={process.env.REACT_APP_FIREBASE_AUTH_DOMAIN} />
          <InfoRow label={t('admin.settingsPage.storageBucket')} value={process.env.REACT_APP_FIREBASE_STORAGE_BUCKET} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-heading font-semibold text-slate-700 mb-3">{t('admin.settingsPage.authHelpTitle')}</h2>
        <p className="text-sm text-slate-500 mb-3">
          {t('admin.settingsPage.authHelpIntro')}
        </p>
        <ol className="text-sm text-slate-600 space-y-1.5 list-decimal list-inside">
          <li>{t('admin.settingsPage.authStep1')}</li>
          <li>{t('admin.settingsPage.authStep2')}</li>
          <li>{t('admin.settingsPage.authStep3')}</li>
          <li>{t('admin.settingsPage.authStep4')}</li>
        </ol>
      </div>
    </div>
  );
}
