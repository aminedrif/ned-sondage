import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import OverviewTab from '../components/dashboard/OverviewTab';
import SectionBTab from '../components/dashboard/SectionBTab';
import SectionCTab from '../components/dashboard/SectionCTab';
import ExportTab from '../components/dashboard/ExportTab';

const TABS = [
  {
    id: 'overview',
    label: 'Overview',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    id: 'sectionB',
    label: 'Section B',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 'sectionC',
    label: 'Section C',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'export',
    label: 'Export',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchResponses() {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('responses')
      .select('*')
      .order('submitted_at', { ascending: false });
    if (err) {
      setError(err.message);
    } else {
      setResponses(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchResponses();

    // Realtime subscription
    const channel = supabase
      .channel('responses-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'responses' }, (payload) => {
        setResponses((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const activeTabData = TABS.find((t) => t.id === activeTab);

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      {/* Top header */}
      <header className="bg-white border-b border-surface-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md shadow-primary-200">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="font-extrabold text-surface-900 text-sm leading-none">BI & CRM Dashboard</h1>
              <p className="text-surface-400 text-xs mt-0.5">Tradifoot Algérie — Admin View</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!loading && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-surface-500 bg-surface-100 px-3 py-1.5 rounded-full font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Live · {responses.length} responses
              </span>
            )}
            <button
              onClick={fetchResponses}
              className="p-2 rounded-xl hover:bg-surface-100 text-surface-500 hover:text-surface-700 transition-colors"
              title="Refresh data"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <a
              href="/"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs font-semibold rounded-xl transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Survey
            </a>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-56 border-r border-surface-200 bg-white pt-6 pb-4 px-3 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest px-3 mb-3">Navigation</p>
          <nav className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-primary-500' : 'text-surface-400'}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-surface-100 px-3">
            <p className="text-[10px] text-surface-400 font-medium">Academic Research</p>
            <p className="text-[10px] text-surface-300">BI Impact on CRM Effectiveness</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 pb-24 md:pb-6 overflow-x-hidden">
          {/* Page title */}
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-surface-900">{activeTabData?.label}</h2>
              <p className="text-surface-400 text-xs mt-0.5">
                {activeTab === 'overview' && 'Key performance indicators and demographic breakdown'}
                {activeTab === 'sectionB' && 'Business Intelligence tools analysis (Independent Variable)'}
                {activeTab === 'sectionC' && 'CRM system effectiveness analysis (Dependent Variable)'}
                {activeTab === 'export' && 'Download or send data to external tools'}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-surface-400">
              <svg className="animate-spin w-10 h-10 mb-4 text-primary-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <p className="text-sm font-medium">Loading responses...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-5 text-sm">
              <p className="font-bold mb-1">Failed to load data</p>
              <p className="text-xs opacity-80">{error}</p>
              <p className="text-xs mt-2 opacity-60">Check your Supabase URL and ANON KEY in .env</p>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && <OverviewTab responses={responses} />}
              {activeTab === 'sectionB' && <SectionBTab responses={responses} />}
              {activeTab === 'sectionC' && <SectionCTab responses={responses} />}
              {activeTab === 'export' && <ExportTab responses={responses} />}
            </>
          )}
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-surface-200 flex">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-[10px] font-semibold transition-colors ${
              activeTab === tab.id ? 'text-primary-600' : 'text-surface-400'
            }`}
          >
            <span className={activeTab === tab.id ? 'text-primary-500' : 'text-surface-400'}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
