import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { average, round, countBy, responsesPerDay, COLORS } from '../../lib/statsHelpers';
import { sectionBDimensions, sectionCDimensions } from '../../lib/surveyData';

function KpiCard({ label, value, sub, color = 'primary' }) {
  const colorMap = {
    primary: 'from-primary-500 to-primary-600',
    violet: 'from-violet-500 to-purple-600',
    green: 'from-green-500 to-emerald-600',
    rose: 'from-rose-500 to-pink-600',
  };
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${colorMap[color]} text-white p-5 shadow-lg`}>
      <p className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1">{label}</p>
      <p className="text-3xl font-extrabold">{value}</p>
      {sub && <p className="text-xs opacity-70 mt-1">{sub}</p>}
    </div>
  );
}

const RADIAN = Math.PI / 180;
function renderCustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function OverviewTab({ responses }) {
  if (!responses.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-surface-400">
        <svg className="w-12 h-12 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
        <p className="text-sm font-medium">No responses yet</p>
      </div>
    );
  }

  const allBKeys = sectionBDimensions.flatMap((d) => d.items.map((i) => i.key));
  const allCKeys = sectionCDimensions.flatMap((d) => d.items.map((i) => i.key));

  const avgB = round(average(responses.flatMap((r) => allBKeys.map((k) => r[k]).filter((v) => v != null))));
  const avgC = round(average(responses.flatMap((r) => allCKeys.map((k) => r[k]).filter((v) => v != null))));

  const frCount = responses.filter((r) => r.lang === 'fr').length;
  const enCount = responses.filter((r) => r.lang === 'en').length;

  const genderCounts = countBy(responses.map((r) => r.genre));
  const genderData = Object.entries(genderCounts).map(([name, value]) => ({ name, value }));

  const ageCounts = countBy(responses.map((r) => r.age_group));
  const ageData = Object.entries(ageCounts).map(([name, value]) => ({ name, value }));

  const jobCounts = countBy(responses.map((r) => r.job_position));
  const jobData = Object.entries(jobCounts).map(([name, value]) => ({ name, value }));

  const expCrmCounts = countBy(responses.map((r) => r.exp_crm));
  const expCrmData = Object.entries(expCrmCounts).map(([name, value]) => ({ name, value }));

  const expBiCounts = countBy(responses.map((r) => r.exp_bi));
  const expBiData = Object.entries(expBiCounts).map(([name, value]) => ({ name, value }));

  const expCegidCounts = countBy(responses.map((r) => r.exp_cegid));
  const expCegidData = Object.entries(expCegidCounts).map(([name, value]) => ({ name, value }));

  const dailyData = responsesPerDay(responses);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard label="Total Responses" value={responses.length} color="primary" />
        <KpiCard label="Avg. Section B" value={`${avgB}/5`} sub="BI Tools" color="violet" />
        <KpiCard label="Avg. Section C" value={`${avgC}/5`} sub="CRM Effectiveness" color="green" />
        <KpiCard
          label="Language Split"
          value={`${frCount}FR / ${enCount}EN`}
          sub={`${round((frCount / responses.length) * 100)}% French`}
          color="rose"
        />
      </div>

      {/* Responses per Day */}
      <div className="bg-white rounded-2xl border border-surface-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-surface-700 mb-4">Responses Over Time</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dailyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,.12)' }}
              cursor={{ fill: '#f1f5f9' }}
            />
            <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} name="Responses" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Gender Pie */}
        <div className="bg-white rounded-2xl border border-surface-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-surface-700 mb-4">Gender Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={genderData} cx="50%" cy="50%" outerRadius={70} dataKey="value" labelLine={false} label={renderCustomLabel}>
                {genderData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,.12)' }} />
              <Legend iconType="circle" iconSize={10} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Age Bar */}
        <div className="bg-white rounded-2xl border border-surface-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-surface-700 mb-4">Age Groups</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ageData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,.12)' }} cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="value" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Job Bar */}
        <div className="bg-white rounded-2xl border border-surface-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-surface-700 mb-4">Job Positions</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={jobData} layout="vertical" margin={{ top: 4, right: 4, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#64748b' }} width={90} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,.12)' }} cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="value" fill="#ec4899" radius={[0, 6, 6, 0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Experience Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* CRM Experience */}
        <div className="bg-white rounded-2xl border border-surface-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-surface-700 mb-4">Expérience CRM</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={expCrmData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,.12)' }} cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="value" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* BI Experience */}
        <div className="bg-white rounded-2xl border border-surface-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-surface-700 mb-4">Expérience BI</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={expBiData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,.12)' }} cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="value" fill="#14b8a6" radius={[6, 6, 0, 0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CEGID Experience */}
        <div className="bg-white rounded-2xl border border-surface-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-surface-700 mb-4">Expérience CEGID</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={expCegidData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,.12)' }} cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="value" fill="#a855f7" radius={[6, 6, 0, 0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
