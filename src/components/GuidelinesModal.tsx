import React from 'react';
import { X, FileText, Download, CheckCircle2, Award, Calendar, ExternalLink } from 'lucide-react';

interface GuidelinesModalProps {
  onClose: () => void;
}

export const GuidelinesModal: React.FC<GuidelinesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                SIH 2026 Guidelines & Presentation Templates
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official documents, templates, and essential instructions for Smart India Hackathon 2026.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          
          {/* Download Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://sih.gov.in/letters/2026/SIH%202026%20Guidelines.pdf"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 hover:border-brand-400 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-brand-600 text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-brand-950 dark:text-brand-200">SIH 2026 Guidelines</div>
                  <div className="text-[11px] text-brand-600 dark:text-brand-400">Official College / Student Guide (PDF)</div>
                </div>
              </div>
              <Download className="w-4 h-4 text-brand-600 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="https://sih.gov.in/letters/2026/SIH2026-IDEA-Presentation-Format.pptx"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 hover:border-amber-400 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-600 text-white">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-amber-950 dark:text-amber-200">Idea PPT Template</div>
                  <div className="text-[11px] text-amber-600 dark:text-amber-400">Mandatory Presentation Format (PPTX)</div>
                </div>
              </div>
              <Download className="w-4 h-4 text-amber-600 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Key Guidelines Summary */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Key Submission Rules & Team Formation</span>
            </h3>
            <ul className="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-300">
              <li><strong>Team Size:</strong> Each team must consist of exactly 6 members, including at least 1 female member.</li>
              <li><strong>Internal College Screening:</strong> Teams must be nominated by their College/University SPOC after an internal hackathon round.</li>
              <li><strong>Idea Submission Deadline:</strong> <strong>20 September 2026</strong>.</li>
              <li><strong>Presentation Format:</strong> Maximum 5-slide PPT strictly adhering to the official SIH template format.</li>
              <li><strong>Evaluation Criteria:</strong> Novelty & innovation of idea, technical feasibility, practicality of implementation, clarity of architecture, and potential societal/commercial impact.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white transition-colors"
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  );
};
