import React, { useState, useEffect } from 'react';
import {
  Clipboard,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Header } from './components/Header';
import { CitationResultCard } from './components/CitationResultCard';
import { BibliographyList } from './components/BibliographyList';
import { Footer } from './components/Footer';
import { FormattedReferenceResult } from './types';
import { formatULHarvardReference } from './utils/ulHarvardFormatter';

const LOCAL_STORAGE_BIBLIOGRAPHY_KEY = 'city_ul_bibliography_v3';

export default function App() {
  const [savedBibliography, setSavedBibliography] = useState<FormattedReferenceResult[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BIBLIOGRAPHY_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load bibliography from localStorage', e);
    }
    return [];
  });

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<FormattedReferenceResult[]>([]);

  // Save bibliography to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BIBLIOGRAPHY_KEY, JSON.stringify(savedBibliography));
    } catch (e) {
      console.error(e);
    }
  }, [savedBibliography]);

  // Handle reference submission with resilient client-fallback for Vercel
  const handleSubmitReference = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);

    try {
      let formattedResults: FormattedReferenceResult[] = [];

      try {
        const response = await fetch('/api/format-reference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rawInput: inputText.trim(),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            formattedResults = data.results;
          }
        }
      } catch (networkError) {
        // Log network issue gracefully
        console.warn('API route unavailable on current host, using local UL Harvard engine', networkError);
      }

      // If backend was unreachable or Vercel deployed without serverless handler,
      // seamlessly format using the built-in University of Limerick engine
      if (formattedResults.length === 0) {
        const localFormatted = formatULHarvardReference(inputText.trim());
        formattedResults = [localFormatted];
      }

      setResults(formattedResults);
    } catch (err: any) {
      console.error('Formatting error:', err);
      // Even in the rarest error, guarantee an output
      const fallbackResult = formatULHarvardReference(inputText.trim());
      setResults([fallbackResult]);
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
    <div className="min-h-screen flex flex-col bg-white text-black font-[var(--font-google-sans)] selection:bg-[#facc15] selection:text-black">
      {/* Top Black Accent Bar */}
      <div className="h-2 w-full bg-black" />

      {/* Header */}
      <Header />

      {/* Main Single-Input Focused Application Body */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pb-8 space-y-6">
        {/* The One Focused Input Card */}
        <div className="city-card rounded-2xl p-6 sm:p-8 relative">
          <form onSubmit={handleSubmitReference} className="space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="referenceInput"
                className="text-base font-black text-black flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-black" />
                <span>Reference Input</span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePasteClipboard}
                  className="city-btn-white flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold cursor-pointer"
                  title="Paste from clipboard"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  <span>Paste</span>
                </button>
                {inputText && (
                  <button
                    type="button"
                    onClick={() => {
                      setInputText('');
                      setResults([]);
                    }}
                    className="p-1 rounded-lg border border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                    title="Clear input"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Single input place for the user */}
            <div className="relative">
              <textarea
                id="referenceInput"
                rows={5}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your reference here to make UL referencing..."
                className="city-input w-full p-4 rounded-xl text-base font-medium resize-y min-h-[130px] placeholder:text-neutral-400"
              />
            </div>

            {/* Main Action Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="city-btn-yellow w-full sm:w-auto px-8 py-3.5 rounded-xl text-black font-black text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Formatting...</span>
                  </>
                ) : (
                  <>
                    <span>Make UL Reference</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Formatted Citation Results */}
        {results.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-base font-black text-black flex items-center gap-2">
                <Check className="w-4 h-4 text-black" />
                <span>UL Formatted Reference</span>
              </h2>
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

      {/* Yellow bottom section with guides and disclaimer */}
      <Footer />
    </div>
  );
}
