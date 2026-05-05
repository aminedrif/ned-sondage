import { likertLabels } from '../../lib/surveyData';

export default function LikertRow({ itemKey, text, value, onChange, lang, index }) {
  const labels = likertLabels[lang];

  return (
    <div className="mb-6 last:mb-0">
      <p className="text-sm font-medium text-surface-700 mb-3 leading-relaxed">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold mr-2 flex-shrink-0">
          {index}
        </span>
        {text}
      </p>
      <div className="flex gap-2 sm:gap-3">
        {[1, 2, 3, 4, 5].map((score) => {
          const isSelected = value === score;
          const colorMap = {
            1: isSelected ? 'bg-red-500 border-red-500 text-white' : 'border-red-200 text-red-400 hover:bg-red-50',
            2: isSelected ? 'bg-orange-400 border-orange-400 text-white' : 'border-orange-200 text-orange-400 hover:bg-orange-50',
            3: isSelected ? 'bg-yellow-400 border-yellow-400 text-white' : 'border-yellow-200 text-yellow-500 hover:bg-yellow-50',
            4: isSelected ? 'bg-green-400 border-green-400 text-white' : 'border-green-200 text-green-500 hover:bg-green-50',
            5: isSelected ? 'bg-green-600 border-green-600 text-white' : 'border-green-300 text-green-600 hover:bg-green-50',
          };

          return (
            <button
              key={score}
              type="button"
              onClick={() => onChange(itemKey, score)}
              title={labels[score - 1]}
              className={`flex-1 min-h-[52px] flex flex-col items-center justify-center rounded-xl border-2 font-bold text-sm transition-all duration-150 active:scale-95 ${colorMap[score]}`}
            >
              <span className="text-base leading-none">{score}</span>
              <span className="text-[9px] leading-tight mt-1 font-medium opacity-80 hidden sm:block text-center px-1">
                {labels[score - 1].split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
      {/* Mobile labels */}
      <div className="flex gap-2 mt-1 sm:hidden">
        <span className="flex-1 text-center text-[9px] text-red-400">{labels[0].split(' ')[0]}</span>
        <span className="flex-1 text-center text-[9px] text-orange-400">{labels[1].split(' ')[0]}</span>
        <span className="flex-1 text-center text-[9px] text-yellow-500">{labels[2]}</span>
        <span className="flex-1 text-center text-[9px] text-green-500">{labels[3]}</span>
        <span className="flex-1 text-center text-[9px] text-green-600">{labels[4].split(' ')[0]}</span>
      </div>
    </div>
  );
}
