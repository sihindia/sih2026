import React from 'react';
import { ProblemStatement } from '../types';
import { 
  X, 
  Activity, 
  BookOpen, 
  FolderTree, 
  FileCode, 
  Folder, 
  File, 
  Copy, 
  Check, 
  Download, 
  Terminal, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  Play
} from 'lucide-react';
import { copyToClipboard, downloadMarkdown } from '../utils/export';
import { getSeoFriendlyAppUrl } from '../utils/seo';
import { DynamicDomainApp } from './DynamicDomainApp';
import { generateProjectFileStructure, ProjectFile } from '../utils/projectFileTree';

interface FullAppRunnerProps {
  ps: ProblemStatement;
  onClose: () => void;
}

export const FullAppRunner: React.FC<FullAppRunnerProps> = ({ ps, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<'app' | 'tutorial' | 'codebase'>('app');
  const psId = ps.ps_number || `SIH${ps.id}`;
  const directAppUrl = getSeoFriendlyAppUrl(ps);
  const [copiedDirectUrl, setCopiedDirectUrl] = React.useState(false);

  const handleCopyDirectUrl = () => {
    copyToClipboard(directAppUrl);
    setCopiedDirectUrl(true);
    setTimeout(() => setCopiedDirectUrl(false), 2000);
  };

  const { tree, tutorial } = React.useMemo(() => generateProjectFileStructure(ps), [ps]);

  // Selected file in the codebase viewer
  const [selectedFile, setSelectedFile] = React.useState<ProjectFile>(() => {
    // Default to main.py or App.tsx
    const backend = tree.find(t => t.name === 'backend');
    if (backend && backend.children && backend.children.length > 0) {
      return backend.children[0];
    }
    return tree[0];
  });

  const [copiedCode, setCopiedCode] = React.useState(false);
  const [copiedStepIndex, setCopiedStepIndex] = React.useState<number | null>(null);
  const [expandedFolders, setExpandedFolders] = React.useState<Record<string, boolean>>({
    'backend': true,
    'frontend': true,
    'frontend/src': true,
    'database': true
  });

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const handleCopyCode = () => {
    if (selectedFile?.content) {
      copyToClipboard(selectedFile.content);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleDownloadFile = () => {
    if (selectedFile?.content) {
      downloadMarkdown(selectedFile.content, selectedFile.name);
    }
  };

  const handleCopyStepCommands = (commands: string[], idx: number) => {
    copyToClipboard(commands.join('\n'));
    setCopiedStepIndex(idx);
    setTimeout(() => setCopiedStepIndex(null), 2000);
  };

  // Recursive tree rendering
  const renderTree = (files: ProjectFile[], depth = 0) => {
    return (
      <div className="space-y-0.5">
        {files.map((item) => {
          if (item.type === 'folder') {
            const isExpanded = expandedFolders[item.path] ?? true;
            return (
              <div key={item.path}>
                <button
                  onClick={() => toggleFolder(item.path)}
                  style={{ paddingLeft: `${depth * 12 + 8}px` }}
                  className="w-full flex items-center gap-1.5 py-1 px-2 rounded-lg text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                >
                  {isExpanded ? <ChevronDown className="w-3.5 h-3.5 opacity-60" /> : <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                  <Folder className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                  <span className="font-mono">{item.name}</span>
                </button>
                {isExpanded && item.children && renderTree(item.children, depth + 1)}
              </div>
            );
          }

          const isSelected = selectedFile?.path === item.path;
          return (
            <button
              key={item.path}
              onClick={() => setSelectedFile(item)}
              style={{ paddingLeft: `${depth * 12 + 22}px` }}
              className={`w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-left text-xs font-mono transition-all ${
                isSelected
                  ? 'bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 font-bold border border-brand-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-500' : 'text-slate-400'}`} />
              <span className="truncate">{item.name}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-7xl h-[95vh] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-brand-500/20">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                  {psId}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Product Workspace
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate max-w-2xl mt-0.5">
                {ps.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyDirectUrl}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
              title="Copy Direct Shareable Live URL"
            >
              {copiedDirectUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-brand-500" />}
              <span className="hidden sm:inline">{copiedDirectUrl ? 'URL Copied!' : 'Copy Live URL'}</span>
            </button>

            <a
              href={`/?app=${psId}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              title="Launch standalone full-window application"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Launch Standalone Window</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Streamlined Tabs */}
        <div className="bg-slate-100 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto shrink-0 text-xs font-bold">
          <button
            onClick={() => setActiveTab('app')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'app'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-500" />
            <span>⚡ Live Working Application</span>
          </button>

          <button
            onClick={() => setActiveTab('tutorial')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'tutorial'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>📖 Step-by-Step Setup Tutorial</span>
          </button>

          <button
            onClick={() => setActiveTab('codebase')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'codebase'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FolderTree className="w-4 h-4 text-amber-500" />
            <span>📁 Project Files & Folder Structure</span>
          </button>
        </div>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/50">
          
          {/* TAB 1: LIVE WORKING APPLICATION */}
          {activeTab === 'app' && (
            <div className="space-y-6">
              <DynamicDomainApp ps={ps} />
            </div>
          )}

          {/* TAB 2: STEP-BY-STEP SETUP TUTORIAL */}
          {activeTab === 'tutorial' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              
              {/* Top Banner */}
              <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white p-6 rounded-3xl shadow-xl space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Individual Standalone Setup</span>
                </div>
                <h3 className="text-xl font-black">How to Run & Deploy this Project Locally</h3>
                <p className="text-xs text-brand-100 leading-relaxed">
                  Step-by-step instructions to initialize the backend, frontend, database, and free-tier hosting for <strong>{psId}</strong>.
                </p>
              </div>

              {/* Prerequisites */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Prerequisites (100% Free Tools)</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  {tutorial.prerequisites.map((p, i) => (
                    <li key={i} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {tutorial.steps.map((step, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-brand-600 text-white font-black text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{step.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{step.description}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopyStepCommands(step.commands, idx)}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-950 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
                      >
                        {copiedStepIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedStepIndex === idx ? 'Copied!' : 'Copy Commands'}</span>
                      </button>
                    </div>

                    <div className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-xs overflow-x-auto">
                      <pre className="whitespace-pre-wrap">{step.commands.join('\n')}</pre>
                    </div>
                  </div>
                ))}
              </div>

              {/* Environment Variables Table */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Environment Configuration (.env)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 uppercase font-bold">
                        <th className="py-2.5 px-3">Variable</th>
                        <th className="py-2.5 px-3">Description</th>
                        <th className="py-2.5 px-3">Default / Sample Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      {tutorial.envVariables.map((env, i) => (
                        <tr key={i}>
                          <td className="py-2.5 px-3 font-mono font-bold text-brand-600 dark:text-brand-400">{env.key}</td>
                          <td className="py-2.5 px-3">{env.description}</td>
                          <td className="py-2.5 px-3 font-mono text-slate-500 truncate max-w-xs">{env.defaultValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: PROJECT FILES & FOLDER STRUCTURE */}
          {activeTab === 'codebase' && (
            <div className="h-[75vh] flex flex-col md:flex-row rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              
              {/* Left Pane: File Tree Explorer */}
              <div className="w-full md:w-72 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
                <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <FolderTree className="w-3.5 h-3.5 text-brand-500" />
                    <span>Project Tree</span>
                  </span>
                  <span className="text-[10px] font-mono bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-400">
                    Standalone
                  </span>
                </div>

                <div className="p-3 overflow-y-auto flex-1">
                  {renderTree(tree)}
                </div>
              </div>

              {/* Right Pane: Code Viewer */}
              <div className="flex-1 flex flex-col bg-slate-950 text-slate-200 overflow-hidden">
                
                {/* Code Header */}
                <div className="p-3.5 border-b border-slate-800 bg-slate-900 flex items-center justify-between gap-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-brand-400" />
                    <span className="font-mono text-xs font-bold text-slate-200">{selectedFile?.path}</span>
                    {selectedFile?.language && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {selectedFile.language}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                    </button>

                    <button
                      onClick={handleDownloadFile}
                      className="px-3 py-1 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download File</span>
                    </button>
                  </div>
                </div>

                {/* Code Editor Preview */}
                <div className="p-4 overflow-y-auto flex-1 font-mono text-xs leading-relaxed">
                  <pre className="whitespace-pre-wrap">{selectedFile?.content || '// Select a file to view code'}</pre>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span>Powered by <strong>Flugelsoft Labs Free-Stack Architecture</strong></span>
            <span>•</span>
            <span>Standalone Project Architecture Ready</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white transition-colors"
          >
            Close Workspace
          </button>
        </div>

      </div>
    </div>
  );
};
