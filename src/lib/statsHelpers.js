// ─── Statistics Helper Functions ─────────────────────────────────────────────

/**
 * Calculate the arithmetic mean of an array of numbers.
 */
export function average(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((sum, v) => sum + v, 0) / arr.length;
}

/**
 * Round a number to n decimal places.
 */
export function round(num, decimals = 2) {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Count occurrences of each value in an array.
 * Returns an object: { value: count }
 */
export function countBy(arr) {
  const counts = {};
  arr.forEach((v) => {
    counts[v] = (counts[v] || 0) + 1;
  });
  return counts;
}

/**
 * Group an array of objects by a key.
 * Returns: { keyValue: [items] }
 */
export function groupBy(arr, key) {
  const groups = {};
  arr.forEach((item) => {
    const k = item[key];
    if (!groups[k]) groups[k] = [];
    groups[k].push(item);
  });
  return groups;
}

/**
 * Calculate the Likert distribution for a given item key across all responses.
 * Returns: { 1: count, 2: count, 3: count, 4: count, 5: count }
 */
export function likertDistribution(responses, key) {
  const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  responses.forEach((r) => {
    const val = r[key];
    if (val >= 1 && val <= 5) {
      dist[val]++;
    }
  });
  return dist;
}

/**
 * Calculate the average score for a specific item key across all responses.
 */
export function itemAverage(responses, key) {
  const vals = responses.map((r) => r[key]).filter((v) => v != null);
  return average(vals);
}

/**
 * Calculate the average score for a dimension (array of item keys) across all responses.
 */
export function dimensionAverage(responses, keys) {
  if (!responses.length) return 0;
  const allVals = [];
  responses.forEach((r) => {
    keys.forEach((k) => {
      if (r[k] != null) allVals.push(r[k]);
    });
  });
  return average(allVals);
}

/**
 * Group responses by date (YYYY-MM-DD) from submitted_at.
 * Returns sorted array of { date, count }.
 */
export function responsesPerDay(responses) {
  const groups = {};
  responses.forEach((r) => {
    const date = r.submitted_at ? r.submitted_at.slice(0, 10) : 'Unknown';
    groups[date] = (groups[date] || 0) + 1;
  });
  return Object.entries(groups)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Generate CSV content from responses.
 */
export function generateCSV(responses, columns, headers) {
  const headerRow = headers.join(',');
  const rows = responses.map((r) =>
    columns.map((col) => {
      const val = r[col];
      if (val == null) return '';
      const str = String(val);
      // Escape commas and quotes
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }).join(',')
  );
  return [headerRow, ...rows].join('\n');
}

/**
 * Download a string as a file.
 */
export function downloadFile(content, filename, mimeType = 'text/csv') {
  const blob = new Blob(['\uFEFF' + content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Chart color palette.
 */
export const COLORS = [
  '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
  '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6',
  '#06b6d4', '#3b82f6',
];

export const LIKERT_COLORS = {
  1: '#ef4444',
  2: '#f97316',
  3: '#eab308',
  4: '#22c55e',
  5: '#16a34a',
};
