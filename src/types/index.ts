export interface ExternalLink {
  text: string;
  url: string;
}

export interface ProblemStatement {
  s_no: number | string;
  id: string;
  ps_number: string;
  modal_id: string;
  title: string;
  category: 'Software' | 'Hardware' | string;
  theme: string;
  organization: string;
  department: string;
  description: string;
  submitted_ideas: string;
  deadline: string;
  youtube_links: ExternalLink[];
  dataset_links: ExternalLink[];
  desc_links: ExternalLink[];
  contact_info: string;
  sections?: {
    background: string;
    description: string;
    expected_solution: string;
  };
  tags?: string[];
  stats?: {
    word_count: number;
    read_time_mins: number;
  };
}

export type ViewMode = 'grid' | 'split' | 'table' | 'analytics';

export interface FilterState {
  searchQuery: string;
  category: 'all' | 'Software' | 'Hardware';
  selectedThemes: string[];
  selectedOrgs: string[];
  selectedTags: string[];
  sortBy: 'id_asc' | 'id_desc' | 'title_asc' | 'title_desc' | 'org_asc' | 'length_desc';
  onlyFavorites: boolean;
}
