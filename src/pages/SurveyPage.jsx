import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { demographicQuestions, sectionBDimensions, sectionCDimensions, uiStrings } from '../lib/surveyData';
import ProgressBar from '../components/survey/ProgressBar';
import SectionA from '../components/survey/SectionA';
import SectionB from '../components/survey/SectionB';
import SectionC from '../components/survey/SectionC';
import ThankYou from '../components/survey/ThankYou';

const TOTAL_STEPS = 3;

function initAnswers() {
  const a = {};
  demographicQuestions.forEach((q) => (a[q.key] = ''));
  sectionBDimensions.forEach((dim) => dim.items.forEach((item) => (a[item.key] = null)));
  sectionCDimensions.forEach((dim) => dim.items.forEach((item) => (a[item.key] = null)));
  return a;
}

export default function SurveyPage() {
  const [lang, setLang] = useState(() => localStorage.getItem('survey_lang') || 'fr');
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState(initAnswers);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem('survey_lang', lang);
  }, [lang]);

  const t = (key) => uiStrings[key][lang];

  function handleChange(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setError('');
  }

  function validateStep() {
    if (step === 1) {
      const missing = demographicQuestions.some((q) => !answers[q.key]);
      return !missing;
    }
    if (step === 2) {
      const missing = sectionBDimensions
        .flatMap((d) => d.items)
        .some((item) => answers[item.key] == null);
      return !missing;
    }
    if (step === 3) {
      const missing = sectionCDimensions
        .flatMap((d) => d.items)
        .some((item) => answers[item.key] == null);
      return !missing;
    }
    return true;
  }

  function handleNext() {
    if (!validateStep()) {
      setError(t('required'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setError('');
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleBack() {
    setError('');
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit() {
    if (!validateStep()) {
      setError(t('required'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSubmitting(true);
    setError('');

    const payload = {
      lang,
      genre: answers.genre,
      age_group: answers.age_group,
      education: answers.education,
      job_position: answers.job_position,
      exp_crm: answers.exp_crm,
      exp_bi: answers.exp_bi,
      exp_cegid: answers.exp_cegid,
    };

    // Add B1–B20
    sectionBDimensions.flatMap((d) => d.items).forEach(({ key }) => {
      payload[key] = answers[key];
    });

    // Add C1–C16
    sectionCDimensions.flatMap((d) => d.items).forEach(({ key }) => {
      payload[key] = answers[key];
    });

    const { error: supaErr } = await supabase.from('responses').insert([payload]);
    setSubmitting(false);

    if (supaErr) {
      setError(lang === 'fr'
        ? `Erreur lors de l'envoi: ${supaErr.message}`
        : `Submission error: ${supaErr.message}`);
    } else {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleReset() {
    setAnswers(initAnswers());
    setStep(1);
    setSubmitted(false);
    setError('');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-surface-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-primary-950/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-white text-xs font-bold leading-none">BI & CRM Survey</p>
              <p className="text-primary-300 text-[10px] leading-none mt-0.5">Tradifoot Algérie</p>
            </div>
          </div>
          {/* Language Toggle */}
          <button
            onClick={() => setLang((l) => (l === 'fr' ? 'en' : 'fr'))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
            aria-label="Toggle language"
          >
            <span className="text-base leading-none">{lang === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
            <span className="uppercase tracking-wide text-xs">{lang === 'fr' ? 'FR' : 'EN'}</span>
            <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Title Card */}
        {!submitted && (
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {t('surveyTitle')}
            </h1>
            <p className="text-primary-300 text-sm mt-1">{t('surveySubtitle')}</p>
          </div>
        )}

        {/* Survey Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 overflow-hidden">
          <div className="p-5 sm:p-8">
            {submitted ? (
              <ThankYou lang={lang} onReset={handleReset} />
            ) : (
              <>
                {/* Progress */}
                <ProgressBar step={step} totalSteps={TOTAL_STEPS} lang={lang} />

                {/* Step Content */}
                <div className="mt-6">
                  {step === 1 && (
                    <SectionA answers={answers} onChange={handleChange} lang={lang} error={error} />
                  )}
                  {step === 2 && (
                    <SectionB answers={answers} onChange={handleChange} lang={lang} error={error} />
                  )}
                  {step === 3 && (
                    <SectionC answers={answers} onChange={handleChange} lang={lang} error={error} />
                  )}
                </div>

                {/* Navigation */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-surface-100">
                  {step > 1 && (
                    <button
                      onClick={handleBack}
                      className="flex-1 py-3.5 rounded-xl border-2 border-surface-300 text-surface-700 font-semibold hover:bg-surface-50 transition-colors active:scale-95"
                    >
                      ← {t('back')}
                    </button>
                  )}
                  {step < TOTAL_STEPS ? (
                    <button
                      onClick={handleNext}
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold hover:from-primary-700 hover:to-primary-600 transition-all active:scale-95 shadow-lg shadow-primary-200"
                    >
                      {t('next')} →
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold hover:from-green-700 hover:to-emerald-600 transition-all active:scale-95 shadow-lg shadow-green-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          {t('submitting')}
                        </span>
                      ) : (
                        `✓ ${t('submit')}`
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-primary-400 text-xs mt-6">
          {lang === 'fr'
            ? 'Vos données sont anonymes et utilisées uniquement à des fins académiques.'
            : 'Your data is anonymous and used for academic purposes only.'}
        </p>
      </main>
    </div>
  );
}
