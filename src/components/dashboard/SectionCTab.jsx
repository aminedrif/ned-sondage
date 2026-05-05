import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Cell,
} from 'recharts';
import { round, itemAverage, dimensionAverage, likertDistribution, LIKERT_COLORS } from '../../lib/statsHelpers';
import { sectionCDimensions } from '../../lib/surveyData';

function ScoreBadge({ score }) {
  const color =
    score >= 4 ? 'bg-green-100 text-green-700' :
    score >= 3 ? 'bg-yellow-100 text-yellow-700' :
    'bg-red-100 text-red-700';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold ${color}`}>
      {score} / 5
    </span>
  );
}

function DimensionCard({ dim, responses, dimIndex }) {
  const keys = dim.items.map((i) => i.key);
  const dimAvg = round(dimensionAverage(responses, keys));

  const avgData = dim.items.map((item) => ({
    name: item.key.toUpperCase(),
    avg: round(itemAverage(responses, item.key)),
  }));

  const stackedData = dim.items.map((item) => {
    const dist = likertDistribution(responses, item.key);
    const total = responses.length || 1;
    return {
      name: item.key.toUpperCase(),
      ...Object.fromEntries(
        Object.entries(dist).map(([k, v]) => [k, round((v / total) * 100, 1)])
      ),
    };
  });

  const gradients = [
    'from-violet-500 to-violet-600',
    'from-fuchsia-500 to-fuchsia-600',
    'from-pink-500 to-pink-600',
    'from-rose-500 to-rose-600',
  ];

  return (
    <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
      <div className={`bg-gradient-to-r ${gradients[dimIndex % 4]} px-5 py-4 flex items-center justify-between`}>
        <div>
          <p className="text-white text-xs font-semibold uppercase tracking-widest opacity-80">Dimension {dimIndex + 1}</p>
          <h3 className="text-white font-bold text-base">{dim.title.en}</h3>
          <p className="text-white/70 text-xs">{dim.title.fr}</p>
        </div>
        <div className="text-right">
          <p className="text-white/70 text-xs mb-1">Avg. Score</p>
          <div className="bg-white/20 text-white font-extrabold text-xl px-3 py-1 rounded-xl">
            {dimAvg}<span className="text-sm font-medium opacity-70">/5</span>
          </div>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-semibold text-surface-500 uppercase tracking-wide mb-3">Average Score per Item</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={avgData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,.12)' }}
                cursor={{ fill: '#f1f5f9' }}
                formatter={(v) => [`${v}/5`, 'Average']}
              />
              <Bar dataKey="avg" radius={[6, 6, 0, 0]} name="Avg">
                {avgData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.avg >= 4 ? '#22c55e' : entry.avg >= 3 ? '#eab308' : '#ef4444'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <p className="text-xs font-semibold text-surface-500 uppercase tracking-wide mb-3">Likert Distribution (%)</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={stackedData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,.12)' }}
                cursor={{ fill: '#f1f5f9' }}
                formatter={(v) => [`${v}%`]}
              />
              <Legend iconType="circle" iconSize={8} />
              {[1, 2, 3, 4, 5].map((score) => (
                <Bar key={score} dataKey={String(score)} stackId="a" fill={LIKERT_COLORS[score]} name={String(score)} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="rounded-xl overflow-hidden border border-surface-100">
          <table className="w-full text-xs">
            <thead className="bg-surface-50">
              <tr>
                <th className="text-left px-3 py-2 text-surface-500 font-semibold">Item</th>
                <th className="text-left px-3 py-2 text-surface-500 font-semibold">Statement</th>
                <th className="text-center px-3 py-2 text-surface-500 font-semibold">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {dim.items.map((item) => (
                <tr key={item.key} className="hover:bg-surface-50">
                  <td className="px-3 py-2 font-bold text-surface-700 uppercase">{item.key}</td>
                  <td className="px-3 py-2 text-surface-600 max-w-xs truncate">{item.text.en}</td>
                  <td className="px-3 py-2 text-center">
                    <ScoreBadge score={round(itemAverage(responses, item.key))} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function SectionCTab({ responses }) {
  if (!responses.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-surface-400">
        <p className="text-sm font-medium">No responses yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-violet-50 rounded-2xl border border-violet-100">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-violet-900 text-sm">Section C — CRM System Effectiveness</p>
          <p className="text-violet-600 text-xs">Dependent Variable · 16 items · 4 dimensions</p>
        </div>
        <div className="ml-auto">
          <p className="text-xs text-violet-500">n = {responses.length}</p>
        </div>
      </div>

      {sectionCDimensions.map((dim, i) => (
        <DimensionCard key={i} dim={dim} responses={responses} dimIndex={i} />
      ))}
    </div>
  );
}
