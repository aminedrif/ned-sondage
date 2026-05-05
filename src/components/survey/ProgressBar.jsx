import { uiStrings } from '../../lib/surveyData';

export default function ProgressBar({ step, totalSteps, lang }) {
  const t = (key) => uiStrings[key][lang];
  const pct = Math.round((step / totalSteps) * 100);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-primary-600 uppercase tracking-widest">
          {t('step')} {step} {t('of')} {totalSteps}
        </span>
        <span className="text-xs font-bold text-primary-600">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-surface-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-3 gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 text-center text-xs font-medium transition-colors duration-300 ${
              i + 1 <= step ? 'text-primary-600' : 'text-surface-400'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i + 1 < step
                  ? 'bg-primary-600 text-white'
                  : i + 1 === step
                  ? 'bg-primary-100 border-2 border-primary-600 text-primary-700'
                  : 'bg-surface-200 text-surface-400'
              }`}
            >
              {i + 1 < step ? '✓' : i + 1}
            </div>
            <span className="hidden sm:block truncate">
              {uiStrings.stepLabels[lang][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
