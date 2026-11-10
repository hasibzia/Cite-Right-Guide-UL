import React, { useState } from 'react';
import {
  BookMarked,
  Copy,
  Check,
  Download,
  Trash2,
  ArrowUpDown,
} from 'lucide-react';
import { FormattedReferenceResult } from '../types';

interface BibliographyListProps {
  items: FormattedReferenceResult[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export const BibliographyList: React.FC<BibliographyListProps> = ({
  items,
  onRemoveItem,
  onClearAll,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);

  if (items.length === 0) return null;

  // University of Limerick Harvard style requires alphabetical sorting by primary author surname
  const sortedItems = [...items].sort((a, b) =>
    a.harvardCitationPlain.localeCompare(b.harvardCitationPlain)
  );

  const handleCopyAll = async () => {
    try {
      const fullBibText = sortedItems
        .map((item) => item.harvardCitationPlain)
        .join('\n\n');
      await navigator.clipboard.writeText(fullBibText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (e) {
      console.error('Failed to copy all', e);
    }
  };

  const handleDownload = () => {
    const fullBibText = `UNIVERSITY OF LIMERICK REFERENCE LIST (HARVARD CITE IT RIGHT)\n\n` +
      sortedItems.map((item) => item.harvardCitationPlain).join('\n\n');
    const blob = new Blob([fullBibText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'university_of_limerick_references.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="apple-card rounded-2xl p-6 sm:p-7 relative mt-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm">
            <BookMarked className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Your Reference List ({items.length})
            </h3>
            <p className="text-xs text-slate-500 font-normal flex items-center gap-1.5">
              <ArrowUpDown className="w-3 h-3 text-[#0071e3]" />
              Alphabetized by author surname according to University of Limerick Harvard rules
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAll}
            className="btn-apple-secondary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied All!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Entire List</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="btn-apple-secondary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
            title="Download reference list as plain text file"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export .txt</span>
          </button>

          <button
            onClick={onClearAll}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Clear list"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bibliography entries rendered in Times New Roman with italics */}
      <div className="space-y-3">
        {sortedItems.map((item, index) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start justify-between gap-4 group hover:border-blue-300 transition-all"
          >
            <div className="flex items-start gap-3">
              <span className="text-xs font-semibold text-slate-400 shrink-0 mt-0.5 w-5 text-right font-mono">
                {index + 1}.
              </span>
              <div
                className="citation-serif leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.harvardCitation }}
              />
            </div>

            <button
              onClick={() => onRemoveItem(item.id)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 opacity-60 group-hover:opacity-100 transition-opacity shrink-0"
              title="Remove from list"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
