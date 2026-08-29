import { ProblemStatement } from '../types';

export const exportToJSON = (items: ProblemStatement[], filename = 'sih2026_software_problem_statements.json') => {
  const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToCSV = (items: ProblemStatement[], filename = 'sih2026_problem_statements.csv') => {
  const headers = ['PS Number', 'Title', 'Category', 'Theme', 'Organization', 'Department', 'Deadline', 'Description'];
  
  const rows = items.map(ps => [
    `"${ps.ps_number || ps.id}"`,
    `"${ps.title.replace(/"/g, '""')}"`,
    `"${ps.category}"`,
    `"${ps.theme}"`,
    `"${ps.organization.replace(/"/g, '""')}"`,
    `"${ps.department.replace(/"/g, '""')}"`,
    `"${ps.deadline}"`,
    `"${ps.description.replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const generateMarkdownPS = (ps: ProblemStatement, teamNote?: string): string => {
  let md = `# [${ps.ps_number || ps.id}] ${ps.title}\n\n`;
  md += `**Category:** ${ps.category}  \n`;
  md += `**Theme:** ${ps.theme}  \n`;
  md += `**Organization:** ${ps.organization}  \n`;
  md += `**Department:** ${ps.department}  \n`;
  md += `**Submission Deadline:** ${ps.deadline}  \n`;
  md += `**Official SIH Reference:** https://sih.gov.in/sih2026PS\n\n`;

  if (ps.tags && ps.tags.length > 0) {
    md += `**Relevant Tech/Tags:** ${ps.tags.join(', ')}\n\n`;
  }

  if (ps.youtube_links && ps.youtube_links.length > 0) {
    md += `**YouTube Reference:** ${ps.youtube_links.map(l => l.url).join(', ')}\n\n`;
  }

  if (ps.dataset_links && ps.dataset_links.length > 0) {
    md += `**Dataset Reference:** ${ps.dataset_links.map(l => l.url).join(', ')}\n\n`;
  }

  md += `## Problem Description\n\n${ps.description}\n\n`;

  if (teamNote) {
    md += `## Team Brainstorming Notes\n\n${teamNote}\n\n`;
  }

  md += `---\n*Exported from SIH 2026 Problem Statement Explorer*\n`;
  return md;
};

export const downloadMarkdown = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};
