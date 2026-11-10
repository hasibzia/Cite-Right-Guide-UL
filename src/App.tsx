import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Clipboard,
  RotateCcw,
  BookOpen,
  Check,
  AlertCircle,
  BookmarkCheck,
} from 'lucide-react';
import { Header } from './components/Header';
import { ContextRulesModal } from './components/ContextRulesModal';
import { CitationResultCard } from './components/CitationResultCard';
import { BibliographyList } from './components/BibliographyList';
import { Footer } from './components/Footer';
import {
  UniversityBlueprint,
  FormattedReferenceResult,
  FormatResponsePayload,
} from './types';
import { DEFAULT_BLUEPRINT, QUICK_INPUT_SAMPLES } from './defaultRules';

const LOCAL_STORAGE_BLUEPRINT_KEY = 'citeright_ul_blueprint_v2';
const LOCAL_STORAGE_BIBLIOGRAPHY_KEY = 'citeright_ul_bibliography_v2';

export default function App() {
  const [blueprint, setBlueprint] = useState<UniversityBlueprint>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BLUEPRINT_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load blueprint from localStorage', e);
    }
    return DEFAULT_BLUEPRINT;
  });

  const [savedBibliography, setSavedBibliography] = useState<FormattedReferenceResult[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BIBLIOGRAPHY_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load bibliography from localStorage', e);
    }
    return [];
  });

  const [isContextModalOpen, setIsContextModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<FormattedReferenceResult[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Save blueprint changes
  const handleSaveBlueprint = (updated: UniversityBlueprint) => {
    setBlueprint(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_BLUEPRINT_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Save bibliography to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BIBLIOGRAPHY_KEY, JSON.stringify(savedBibliography));
    } catch (e) {
      console.error(e);
    }
  }, [savedBibliography]);

  // Handle reference submission
  const handleSubmitReference = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/format-reference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rawInput: inputText.trim(),
          customRules: blueprint.rules,
          universityGuidelines: blueprint.generalInstructions,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data: FormatResponsePayload = await response.json();

      if (data.results && data.results.length > 0) {
        setResults(data.results);
      } else {
        setErrorMsg('Could not parse reference. Please verify your input text.');
      }
    } catch (err: any) {
      console.error('Formatting error:', err);
      setErrorMsg('An error occurred while formatting your reference. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
      }
    } catch (e) {
      console.error('Clipboard access not granted', e);
    }
  };

  const handleAddToBibliography = (item: FormattedReferenceResult) => {
    if (savedBibliography.some((b) => b.id === item.id || b.harvardCitationPlain === item.harvardCitationPlain)) {
      return;
    }
    setSavedBibliography((prev) => [item, ...prev]);
  };

  const handleRemoveFromBibliography = (id: string) => {
    setSavedBibliography((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearBibliography = () => {
    if (window.confirm('Clear all references from your saved bibliography list?')) {
      setSavedBibliography([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top subtle Apple-style accent border with blue, purple, and yellow */}
      <div className="h-1 w-full bg-gradient-to-r from-[#0071e3] via-[#8b5cf6] to-[#facc15]" />

      {/* Main Header */}
      <Header
        onOpenContextSettings={() => setIsContextModalOpen(true)}
        activeRuleCount={blueprint.rules.length}
        collegeName={blueprint.institutionName}
      />

      {/* Main Single-Input Focused Application Body */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pb-8 space-y-7">
        {/* The One Focused Input Card */}
        <div className="apple-card rounded-2xl p-6 sm:p-8 relative">
          <form onSubmit={handleSubmitReference} className="space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="referenceInput"
                className="text-sm font-semibold text-[#1d1d1f] flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#0071e3]" />
                <span>Input Reference</span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePasteClipboard}
                  className="btn-apple-secondary flex items-center gap-1.5 px-3 py-1 rounded-full text-xs cursor-pointer"
                  title="Paste from clipboard"
                >
                  <Clipboard className="w-3.5 h-3.5 text-slate-500" />
                  <span>Paste</span>
                </button>
                {inputText && (
                  <button
                    type="button"
                    onClick={() => {
                      setInputText('');
                      setResults([]);
                    }}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    title="Clear input"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Single clean input box for the student/user */}
            <div className="relative">
              <textarea
                id="referenceInput"
                rows={4}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste any reference or details here (e.g. N. Shahrubudin, T. C. Lee and R. Ramlan, 2019, An overview on 3D printing technology, Procedia Manufacturing 35(35), 1286-1296)..."
                className="apple-input w-full p-4 rounded-xl text-sm sm:text-base text-slate-800 placeholder:text-slate-400 font-normal resize-y min-h-[110px]"
              />
            </div>

            {/* Quick Exemplar Inputs (including 3D Printing UL references) */}
            <div className="pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Try an example reference:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_INPUT_SAMPLES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputText(sample.text);
                    }}
                    className="btn-apple-secondary px-3 py-1.5 rounded-full text-xs text-slate-700 hover:text-[#0071e3] hover:border-blue-400 cursor-pointer"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-normal flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                <span>Format: <strong>University of Limerick Harvard (Cite It Right)</strong></span>
              </div>

              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="btn-apple-primary w-full sm:w-auto px-7 py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Formatting to UL Standard...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Harvard Citation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <p className="font-medium">{errorMsg}</p>
          </div>
        )}

        {/* Formatted Citation Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Formatted Citation</span>
              </h2>
              <span className="text-xs font-medium text-slate-500">
                Source in Times New Roman italics
              </span>
            </div>

            <div className="space-y-4">
              {results.map((result) => (
                <CitationResultCard
                  key={result.id}
                  result={result}
                  onSaveToBibliography={handleAddToBibliography}
                  isSaved={savedBibliography.some(
                    (b) => b.id === result.id || b.harvardCitationPlain === result.harvardCitationPlain
                  )}
                />
              ))}
            </div>
          </div>
        )}

        {/* Saved Reference List Section */}
        <BibliographyList
          items={savedBibliography}
          onRemoveItem={handleRemoveFromBibliography}
          onClearAll={handleClearBibliography}
        />
      </main>

      {/* University Context Rules & Learning Modal */}
      <ContextRulesModal
        isOpen={isContextModalOpen}
        onClose={() => setIsContextModalOpen(false)}
        blueprint={blueprint}
        onSaveBlueprint={handleSaveBlueprint}
      />

      {/* Yellow bottom section with disclaimers */}
      <Footer />
    </div>
  );
}
