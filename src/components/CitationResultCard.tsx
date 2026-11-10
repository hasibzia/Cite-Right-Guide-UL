import React, { useState } from 'react';
import { Copy, Check, BookmarkPlus } from 'lucide-react';
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
    <div className="city-card rounded-2xl p-6 sm:p-7 relative transition-all duration-150">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#facc15] text-black text-xs font-black border-2 border-black">
            {result.sourceType}
          </span>
          <span className="text-xs font-bold text-black">
            Times New Roman • Source in Italics
          </span>
        </div>

        {onSaveToBibliography && (
          <button
            onClick={() => onSaveToBibliography(result)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-2 border-black cursor-pointer ${
              isSaved
                ? 'bg-[#facc15] text-black shadow-[2px_2px_0px_#000000]'
                : 'city-btn-white'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-black" />
                <span>Saved to List</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="w-3.5 h-3.5 text-black" />
                <span>Save to List</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Main Reference (Times New Roman, Source in Italics) */}
      <div className="mb-5">
        <div className="text-xs font-extrabold text-black uppercase tracking-wider mb-2">
          Bibliography Reference
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000000]">
          <div
            className="citation-serif select-all leading-relaxed"
            dangerouslySetInnerHTML={{ __html: result.harvardCitation }}
          />
        </div>

        {/* Copy button */}
        <div className="mt-3">
          <button
            onClick={() => copyToClipboard(result.harvardCitationPlain, 'bib')}
            className="city-btn-yellow inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
          >
            {copiedBib ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied Reference!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Reference</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* In-Text Citations (Parenthetical and Narrative) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t-2 border-black">
        {/* Parenthetical */}
        <div className="p-3.5 rounded-xl bg-[#fef08a] border-2 border-black">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-extrabold text-black uppercase tracking-wider">
              Parenthetical
            </span>
            <button
              onClick={() => copyToClipboard(result.inTextCitation, 'inText')}
              className="text-xs font-black text-black hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedInText ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copiedInText ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="font-serif text-sm font-bold text-black select-all">
            {result.inTextCitation}
          </div>
        </div>

        {/* Narrative */}
        <div className="p-3.5 rounded-xl bg-[#fef08a] border-2 border-black">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-extrabold text-black uppercase tracking-wider">
              Narrative
            </span>
            <button
              onClick={() => copyToClipboard(result.narrativeCitation, 'narrative')}
              className="text-xs font-black text-black hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedNarrative ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copiedNarrative ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="font-serif text-sm font-bold text-black select-all">
            {result.narrativeCitation}
          </div>
        </div>
      </div>
    </div>
  );
};
