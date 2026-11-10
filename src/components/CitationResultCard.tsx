import React, { useState } from 'react';
import {
  Copy,
  Check,
  BookmarkPlus,
  BookOpen,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { FormattedReferenceResult } from '../types';

interface CitationResultCardProps {
  result: FormattedReferenceResult;
  onSaveToBibliography?: (item: FormattedReferenceResult) => void;
  isSaved?: boolean;
}

export const CitationResultCard: React.FC<CitationResultCardProps> = ({
  result,
  onSaveToBibliography,
  isSaved = false,
}) => {
  const [copiedBib, setCopiedBib] = useState(false);
  const [copiedInText, setCopiedInText] = useState(false);
  const [copiedNarrative, setCopiedNarrative] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const copyToClipboard = async (text: string, type: 'bib' | 'inText' | 'narrative') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'bib') {
        setCopiedBib(true);
        setTimeout(() => setCopiedBib(false), 2000);
      } else if (type === 'inText') {
        setCopiedInText(true);
        setTimeout(() => setCopiedInText(false), 2000);
      } else if (type === 'narrative') {
        setCopiedNarrative(true);
        setTimeout(() => setCopiedNarrative(false), 2000);
      }
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  return (
    <div className="apple-card rounded-2xl p-6 sm:p-7 relative transition-all duration-200">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          {/* Subtle blue & purple badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/80">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            {result.sourceType}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-semibold border border-purple-200/80">
            University of Limerick Standard
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-medium border border-amber-200">
            Times New Roman • Italics
          </span>
        </div>

        {onSaveToBibliography && (
          <button
            onClick={() => onSaveToBibliography(result)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isSaved
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                : 'btn-apple-secondary'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Saved to Reference List
              </>
            ) : (
              <>
                <BookmarkPlus className="w-3.5 h-3.5 text-[#0071e3]" />
                Add to Reference List
              </>
            )}
          </button>
        )}
      </div>

      {/* Main Academic Citation formatted in Times New Roman with italics for source */}
      <div className="mb-5">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Bibliography Reference (Times New Roman)
        </div>
        
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div
            className="citation-serif select-all leading-relaxed"
            dangerouslySetInnerHTML={{ __html: result.harvardCitation }}
          />
        </div>

        {/* Copy actions */}
        <div className="flex flex-wrap items-center gap-2 mt-2.5">
          <button
            onClick={() => copyToClipboard(result.harvardCitationPlain, 'bib')}
            className="btn-apple-secondary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
          >
            {copiedBib ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Reference</span>
              </>
            )}
          </button>
          <span className="text-[11px] text-slate-400">
            Source in italics per UL Cite It Right guidelines
          </span>
        </div>
      </div>

      {/* In-Text Citations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* Parenthetical */}
        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Parenthetical In-Text
            </span>
            <button
              onClick={() => copyToClipboard(result.inTextCitation, 'inText')}
              className="text-[11px] font-semibold text-[#0071e3] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedInText ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="font-serif text-sm font-semibold text-slate-900 select-all">
            {result.inTextCitation}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Example: ...investigated in recent studies {result.inTextCitation}.
          </div>
        </div>

        {/* Narrative */}
        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Narrative In-Text
            </span>
            <button
              onClick={() => copyToClipboard(result.narrativeCitation, 'narrative')}
              className="text-[11px] font-semibold text-[#0071e3] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedNarrative ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="font-serif text-sm font-semibold text-slate-900 select-all">
            {result.narrativeCitation}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Example: As observed by {result.narrativeCitation}, development continues.
          </div>
        </div>
      </div>

      {/* Accordion for Reference Anatomy */}
      <div className="pt-2 border-t border-slate-100">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-between w-full text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-1 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#0071e3]" />
            Reference Details & UL Verification Checks
          </span>
          {showDetails ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {showDetails && (
          <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-slate-600">
              {result.metadata.authors && result.metadata.authors.length > 0 && (
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase">
                    Author(s)
                  </span>
                  <span className="font-medium text-slate-800">
                    {result.metadata.authors.join('; ')}
                  </span>
                </div>
              )}
              {result.metadata.year && (
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase">
                    Year
                  </span>
                  <span className="font-medium text-slate-800">
                    {result.metadata.year}
                  </span>
                </div>
              )}
              {result.metadata.title && (
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 sm:col-span-2 md:col-span-1">
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase">
                    Article Title
                  </span>
                  <span className="font-medium text-slate-800 truncate block">
                    {result.metadata.title}
                  </span>
                </div>
              )}
              {result.metadata.publisherOrUrl && (
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 sm:col-span-2">
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase">
                    Journal / Source / URL
                  </span>
                  <span className="font-medium text-slate-800 break-all block">
                    {result.metadata.publisherOrUrl}
                  </span>
                </div>
              )}
            </div>

            {result.formattingNotes && result.formattingNotes.length > 0 && (
              <div className="pt-2">
                <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Applied University of Limerick Rules
                </span>
                <ul className="space-y-1">
                  {result.formattingNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
