import { uiStrings } from '../../lib/surveyData';

export default function ThankYou({ lang, onReset }) {
  const t = (key) => uiStrings[key][lang];

  return (
    <div className="text-center py-12 px-4">
      {/* Animated check */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl shadow-green-200 animate-bounce">
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-surface-900 mb-3">{t('thankYouTitle')}</h2>
      <p className="text-surface-600 text-base leading-relaxed max-w-md mx-auto mb-2">
        {t('thankYouMessage')}
      </p>
      <p className="text-surface-400 text-sm mb-8">
        {lang === 'fr' ? 'Tradifoot Algérie — Recherche académique BI & CRM' : 'Tradifoot Algeria — Academic Research BI & CRM'}
      </p>

      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-150 active:scale-95 shadow-md shadow-primary-200"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {t('newResponse')}
      </button>
    </div>
  );
}
