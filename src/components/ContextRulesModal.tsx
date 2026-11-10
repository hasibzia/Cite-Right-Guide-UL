import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  RotateCcw,
  Save,
  SlidersHorizontal,
  FileCheck,
  Check,
  BookOpen,
} from 'lucide-react';
import { ReferenceContextRule, UniversityBlueprint } from '../types';
import { DEFAULT_CONTEXT_RULES, DEFAULT_BLUEPRINT } from '../defaultRules';

interface ContextRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  blueprint: UniversityBlueprint;
  onSaveBlueprint: (updatedBlueprint: UniversityBlueprint) => void;
}

export const ContextRulesModal: React.FC<ContextRulesModalProps> = ({
  isOpen,
  onClose,
  blueprint,
  onSaveBlueprint,
}) => {
  const [rules, setRules] = useState<ReferenceContextRule[]>(blueprint.rules);
  const [institutionName, setInstitutionName] = useState(blueprint.institutionName);
  const [generalInstructions, setGeneralInstructions] = useState(
    blueprint.generalInstructions
  );

  const [isAddingNew, setIsAddingNew] = useState(false);

  // New rule state
  const [newCategory, setNewCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newExemplarInput, setNewExemplarInput] = useState('');
  const [newExemplarOutput, setNewExemplarOutput] = useState('');
  const [newExemplarInText, setNewExemplarInText] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const [savedFeedback, setSavedFeedback] = useState(false);

  if (!isOpen) return null;

  const handleResetToDefault = () => {
    if (
      window.confirm(
        'Reset all reference exemplars and guidelines back to the standard University of Limerick (Cite It Right) Harvard format?'
      )
    ) {
      setRules(DEFAULT_CONTEXT_RULES);
      setInstitutionName(DEFAULT_BLUEPRINT.institutionName);
      setGeneralInstructions(DEFAULT_BLUEPRINT.generalInstructions);
    }
  };

  const handleAddNewRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim() || !newExemplarOutput.trim()) {
      alert('Please provide at least a category and the desired Harvard output format.');
      return;
    }

    const createdRule: ReferenceContextRule = {
      id: 'custom-' + Date.now(),
      category: newCategory.trim(),
      sourceDescription: newDescription.trim() || 'Custom University of Limerick reference exemplar',
      exemplarInput: newExemplarInput.trim() || 'Author, Year, Title, Journal/Publisher/URL',
      exemplarOutput: newExemplarOutput.trim(),
      exemplarInText: newExemplarInText.trim() || '(Author Year)',
      notes: newNotes.trim() || 'University of Limerick Harvard rule',
      isCustom: true,
    };

    setRules([createdRule, ...rules]);
    setIsAddingNew(false);
    setNewCategory('');
    setNewDescription('');
    setNewExemplarInput('');
    setNewExemplarOutput('');
    setNewExemplarInText('');
    setNewNotes('');
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  const handleSaveAll = () => {
    const updated: UniversityBlueprint = {
      ...blueprint,
      institutionName: institutionName.trim() || 'University of Limerick',
      generalInstructions: generalInstructions.trim(),
      rules: rules,
    };
    onSaveBlueprint(updated);
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0071e3] text-white flex items-center justify-center shadow-xs">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                University of Limerick Context & Exemplar Rules
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Feed and train the formatter with the exact reference models approved by UL
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Subtle Institutional Info */}
          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-100 text-xs text-blue-900 space-y-1">
            <p className="font-semibold text-blue-950">
              Active Context Training:
            </p>
            <p className="text-blue-800 leading-relaxed font-normal">
              These exemplars train the formatter to strictly output single quotes for paper titles, italics for journal/source names in Times New Roman, direct Volume(Issue) numbering, and &lsquo;available: URL [accessed DD Mon YYYY].&rsquo;.
            </p>
          </div>

          {/* Profile Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                University Specification
              </label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                placeholder="University of Limerick"
                className="apple-input w-full px-3.5 py-2 rounded-xl text-sm font-medium text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Authority Guideline Standard
              </label>
              <div className="flex items-center gap-2 h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Cite It Right (Glucksman Library, University of Limerick)</span>
              </div>
            </div>
          </div>

          {/* Prompt Instructions */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Specific Department Formatting Instructions
            </label>
            <textarea
              rows={4}
              value={generalInstructions}
              onChange={(e) => setGeneralInstructions(e.target.value)}
              className="apple-input w-full px-3.5 py-2.5 rounded-xl text-xs leading-relaxed text-slate-800 font-mono"
              placeholder="Specify punctuation, volume formatting, author layout..."
            />
          </div>

          {/* Active Rules List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0071e3]" />
                  Learned Reference Exemplars ({rules.length})
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  Reference pairs fed into the formatting engine
                </p>
              </div>

              {!isAddingNew && (
                <button
                  type="button"
                  onClick={() => setIsAddingNew(true)}
                  className="btn-apple-primary flex items-center gap-1 px-3 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Exemplar
                </button>
              )}
            </div>

            {/* Add New Exemplar Form */}
            {isAddingNew && (
              <form
                onSubmit={handleAddNewRule}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Add New Reference Exemplar
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Category *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Journal Article, Book, Conference Paper"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="apple-input w-full px-3 py-1.5 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Source Description
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Peer-reviewed journal paper in ScienceDirect"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      className="apple-input w-full px-3 py-1.5 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Sample Raw User Input
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shahrubudin et al, 2019, 3D printing..."
                    value={newExemplarInput}
                    onChange={(e) => setNewExemplarInput(e.target.value)}
                    className="apple-input w-full px-3 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Desired UL Output * (Use &lt;em&gt;Journal/Source&lt;/em&gt; for italics)
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. Author, A. (2024) ‘Paper title’, <em>Journal Name</em>, 1(1), 10–20, available: URL [accessed 10 Nov 2026]."
                    value={newExemplarOutput}
                    onChange={(e) => setNewExemplarOutput(e.target.value)}
                    className="apple-input w-full px-3 py-1.5 rounded-lg text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      In-Text Citation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. (Author 2024)"
                      value={newExemplarInText}
                      onChange={(e) => setNewExemplarInText(e.target.value)}
                      className="apple-input w-full px-3 py-1.5 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Single quotes for title, italics for journal"
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      className="apple-input w-full px-3 py-1.5 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-apple-primary w-full py-2 text-xs font-semibold cursor-pointer"
                >
                  Save Exemplar to Context
                </button>
              </form>
            )}

            {/* List of rules */}
            <div className="space-y-2.5">
              {rules.map((rule, idx) => (
                <div
                  key={rule.id}
                  className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-blue-300 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-800">
                        {rule.category}
                      </span>
                      {rule.isCustom && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                          Custom
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleDeleteRule(rule.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete rule"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <div
                      dangerouslySetInnerHTML={{ __html: rule.exemplarOutput }}
                      className="citation-serif text-xs leading-relaxed"
                    />
                  </div>

                  <div className="text-[11px] text-slate-500 flex flex-wrap gap-x-4">
                    <span>In-text: <strong className="text-slate-700">{rule.exemplarInText}</strong></span>
                    {rule.notes && <span>Rule: {rule.notes}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/90">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to UL Standard
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-apple-secondary px-4 py-1.5 rounded-full text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="btn-apple-primary flex items-center gap-1.5 px-5 py-1.5 text-xs font-semibold cursor-pointer"
            >
              {savedFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-200" />
                  Saved & Applied!
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  Save & Apply Context
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
