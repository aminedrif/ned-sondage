import { demographicQuestions } from '../../lib/surveyData';

export default function SectionA({ answers, onChange, lang, error }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-surface-900">
          {lang === 'fr' ? 'Section A : Informations démographiques' : 'Section A: Demographic Information'}
        </h2>
        <p className="text-sm text-surface-500 mt-1">
          {lang === 'fr'
            ? 'Veuillez sélectionner une réponse pour chaque question.'
            : 'Please select one answer for each question.'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      <div className="space-y-6">
        {demographicQuestions.map((q) => (
          <div key={q.key} className="bg-surface-50 rounded-2xl p-4 border border-surface-200">
            <p className="text-sm font-semibold text-surface-800 mb-3">
              {q.label[lang]}
            </p>
            <div className="flex flex-wrap gap-2">
              {q.options.map((opt) => {
                const isSelected = answers[q.key] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onChange(q.key, opt.value)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all duration-150 active:scale-95 ${
                      isSelected
                        ? 'bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-200'
                        : 'bg-white border-surface-200 text-surface-700 hover:border-primary-300 hover:bg-primary-50'
                    }`}
                  >
                    {opt.label[lang]}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
