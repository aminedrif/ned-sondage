import { sectionBDimensions, uiStrings } from '../../lib/surveyData';
import LikertRow from './LikertRow';

export default function SectionB({ answers, onChange, lang, error }) {
  let globalIndex = 1;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-surface-900">
          {uiStrings.sectionBTitle[lang]}
        </h2>
        <p className="text-sm text-surface-500 mt-1">{uiStrings.sectionBInstructions[lang]}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-surface-400 bg-surface-50 rounded-lg px-3 py-1.5 border border-surface-100">
          <span className="font-semibold text-surface-500"> {lang === 'fr' ? 'Légende' : 'Legend'}:</span>
          <span><strong className="text-red-400">1</strong> = {lang === 'fr' ? 'Fortement en désaccord' : 'Strongly Disagree'}</span>
          <span><strong className="text-orange-400">2</strong> = {lang === 'fr' ? 'En désaccord' : 'Disagree'}</span>
          <span><strong className="text-yellow-500">3</strong> = {lang === 'fr' ? 'Neutre' : 'Neutral'}</span>
          <span><strong className="text-green-500">4</strong> = {lang === 'fr' ? "D'accord" : 'Agree'}</span>
          <span><strong className="text-green-600">5</strong> = {lang === 'fr' ? "Fortement d'accord" : 'Strongly Agree'}</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      <div className="space-y-6">
        {sectionBDimensions.map((dim, di) => {
          const dimStart = globalIndex;
          const dimEnd = dimStart + dim.items.length - 1;
          const dimItems = dim.items.map((item, ii) => ({
            ...item,
            index: dimStart + ii,
          }));
          globalIndex = dimEnd + 1;

          return (
            <div key={di} className="bg-white rounded-2xl border border-surface-200 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-4 py-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{dim.title[lang]}</h3>
                  <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
                    B{dimStart}–B{dimEnd}
                  </span>
                </div>
              </div>
              <div className="p-4 divide-y divide-surface-100">
                {dimItems.map((item) => (
                  <div key={item.key} className="py-4 first:pt-0 last:pb-0">
                    <LikertRow
                      itemKey={item.key}
                      text={item.text[lang]}
                      value={answers[item.key]}
                      onChange={onChange}
                      lang={lang}
                      index={item.index}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
