import { useState } from 'react';
import { generateCSV, downloadFile } from '../../lib/statsHelpers';
import { spssEncodings, sectionBDimensions, sectionCDimensions } from '../../lib/surveyData';

const DEMO_COLS = ['genre', 'age_group', 'education', 'job_position', 'exp_crm', 'exp_bi'];
const B_KEYS = sectionBDimensions.flatMap((d) => d.items.map((i) => i.key));
const C_KEYS = sectionCDimensions.flatMap((d) => d.items.map((i) => i.key));
const ALL_COLS = ['id', 'submitted_at', 'lang', ...DEMO_COLS, ...B_KEYS, ...C_KEYS];
const ALL_HEADERS = ALL_COLS.map((c) => c.toUpperCase());

const APPS_SCRIPT_CODE = `// Google Apps Script — paste this in script.google.com
// Deploy as Web App: Execute as "Me", Who has access: "Anyone"

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  // Write headers if empty
  if (sheet.getLastRow() === 0) {
    const headers = Object.keys(data[0] || {});
    sheet.appendRow(headers);
  }
  
  // Append each response as a row
  data.forEach(row => {
    const values = Object.values(row);
    sheet.appendRow(values);
  });
  
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, rows: data.length }))
    .setMimeType(ContentService.MimeType.JSON);
}`;

function Toast({ msg, type }) {
  if (!msg) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-semibold flex items-center gap-2 animate-bounce ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      {type === 'success' ? '✓' : '✕'} {msg}
    </div>
  );
}

export default function ExportTab({ responses }) {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ msg: '', type: '' });
  const [showScript, setShowScript] = useState(false);

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3500);
  }

  function handleDownloadCSV() {
    const csv = generateCSV(responses, ALL_COLS, ALL_HEADERS);
    downloadFile(csv, `responses_${new Date().toISOString().slice(0, 10)}.csv`);
    showToast(`Downloaded ${responses.length} responses as CSV`);
  }

  function handleDownloadSPSS() {
    const encoded = responses.map((r) => {
      const row = { ...r };
      Object.entries(spssEncodings).forEach(([col, map]) => {
        row[col] = map[r[col]] ?? r[col];
      });
      return row;
    });
    const csv = generateCSV(encoded, ALL_COLS, ALL_HEADERS);
    downloadFile(csv, `responses_spss_${new Date().toISOString().slice(0, 10)}.csv`);
    showToast(`Downloaded SPSS-ready CSV (${responses.length} rows)`);
  }

  async function handleSendToSheets() {
    if (!webhookUrl.trim()) {
      showToast('Please enter a Google Apps Script URL', 'error');
      return;
    }
    setSending(true);
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responses),
      });
      showToast(`Sent ${responses.length} rows to Google Sheets!`);
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <Toast msg={toast.msg} type={toast.type} />

      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100">
        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-green-900 text-sm">Export Data</p>
          <p className="text-green-600 text-xs">{responses.length} responses ready to export</p>
        </div>
      </div>

      {/* CSV Download */}
      <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-surface-900 mb-1">Standard CSV</h3>
            <p className="text-surface-500 text-xs mb-4">
              All columns with original text values. Includes: id, submitted_at, lang, demographic fields, B1–B20, C1–C16.
            </p>
            <button
              onClick={handleDownloadCSV}
              disabled={!responses.length}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-200"
            >
              ↓ Download CSV
            </button>
          </div>
        </div>
      </div>

      {/* SPSS CSV */}
      <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-surface-900 mb-1">SPSS-Ready CSV</h3>
            <p className="text-surface-500 text-xs mb-2">
              Categorical variables encoded as integers for SPSS import:
            </p>
            <div className="bg-surface-50 rounded-xl p-3 text-xs text-surface-600 mb-4 font-mono space-y-0.5">
              <p>Genre: Homme=1, Femme=2</p>
              <p>Age: 20-30=1, 31-40=2, 41-50=3, +50=4</p>
              <p>Education: Secondaire=1, Licence=2, Master=3, Doctorat=4</p>
              <p>Job: Ventes=1, Marketing=2, Service client=3, IT-Données=4, Autre=5</p>
              <p>Exp: &lt;2ans=1, 2-5ans=2, &gt;5ans=3</p>
            </div>
            <button
              onClick={handleDownloadSPSS}
              disabled={!responses.length}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-purple-200"
            >
              ↓ Download SPSS CSV
            </button>
          </div>
        </div>
      </div>

      {/* Google Sheets */}
      <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-5">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-surface-900 mb-1">Send to Google Sheets</h3>
            <p className="text-surface-500 text-xs">
              POST all data as JSON to a Google Apps Script Web App URL.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <input
            type="url"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://script.google.com/macros/s/.../exec"
            className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm font-mono transition-all"
          />
          <button
            onClick={handleSendToSheets}
            disabled={sending || !responses.length}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-green-200 flex items-center justify-center gap-2"
          >
            {sending ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Sending...
              </>
            ) : (
              '↑ Send to Google Sheets'
            )}
          </button>
        </div>

        {/* Apps Script instructions */}
        <div className="mt-4">
          <button
            onClick={() => setShowScript((s) => !s)}
            className="flex items-center gap-2 text-xs font-semibold text-green-700 hover:text-green-900 transition-colors"
          >
            <svg className={`w-4 h-4 transition-transform ${showScript ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {showScript ? 'Hide' : 'Show'} Google Apps Script setup guide
          </button>

          {showScript && (
            <div className="mt-3 space-y-3">
              <div className="bg-surface-50 rounded-xl p-4 text-xs text-surface-600 space-y-2">
                <p className="font-bold text-surface-800">📋 Setup in 3 steps:</p>
                <ol className="list-decimal list-inside space-y-1.5 ml-1">
                  <li>Open your Google Sheet → <strong>Extensions → Apps Script</strong></li>
                  <li>Delete any existing code, paste the script below, and click <strong>Save</strong></li>
                  <li>Click <strong>Deploy → New deployment</strong> → Type: Web App → Execute as: Me → Access: Anyone → Click <strong>Deploy</strong> and copy the URL</li>
                </ol>
              </div>
              <div className="relative">
                <pre className="bg-surface-900 text-green-300 text-xs rounded-xl p-4 overflow-x-auto font-mono leading-relaxed">
                  {APPS_SCRIPT_CODE}
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(APPS_SCRIPT_CODE);
                    showToast('Script copied to clipboard!');
                  }}
                  className="absolute top-3 right-3 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-colors font-medium"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
