import React, { useState } from 'react';
import { BookMarked, Copy, Check, Download, Trash2 } from 'lucide-react';
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
    const fullBibText = `UNIVERSITY OF LIMERICK REFERENCE LIST (HARVARD)\n\n` +
      sortedItems.map((item) => item.harvardCitationPlain).join('\n\n');
    const blob = new Blob([fullBibText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ul_references.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="city-card rounded-2xl p-6 sm:p-7 relative mt-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#facc15] text-black border-2 border-black flex items-center justify-center font-bold">
            <BookMarked className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-black">
              Reference List ({items.length})
            </h3>
            <p className="text-xs text-black font-semibold">
              Alphabetized by author surname
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAll}
            className="city-btn-yellow flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedAll ? 'Copied All!' : 'Copy All'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="city-btn-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
            title="Download reference list as text file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export .txt</span>
          </button>

          <button
            onClick={onClearAll}
            className="p-1.5 rounded-lg border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
            title="Clear list"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bibliography entries */}
      <div className="space-y-3">
        {sortedItems.map((item, index) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-white border-2 border-black flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <span className="text-xs font-black text-black shrink-0 mt-0.5 w-5 text-right font-mono">
                {index + 1}.
              </span>
              <div
                className="citation-serif leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.harvardCitation }}
              />
            </div>

            <button
              onClick={() => onRemoveItem(item.id)}
              className="p-1.5 rounded-lg border border-black hover:bg-black hover:text-white transition-colors shrink-0"
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
