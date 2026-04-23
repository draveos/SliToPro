export const CATEGORIES = [
  'minimalist',
  'aqua-glass',
  'promo-bold',
  'ad-banner',
  'editorial-mag',
  'brutalist',
  'bento-grid',
  'corporate-pro',
  'maximalist-collage',
  'y2k-retro',
  'sketchy-hand',
  'luxe-dark-gold',
  'pastel-soft',
  'data-dashboard',
  'pitch-hero',
  'academic-paper',
  'cyberpunk-neon',
  'earth-tone',
  'newsletter-info',
  'korean-modern',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABEL: Record<Category, string> = {
  'minimalist': 'Minimalist',
  'aqua-glass': 'Aqua Glass',
  'promo-bold': 'Promo Bold',
  'ad-banner': 'Ad Banner',
  'editorial-mag': 'Editorial Magazine',
  'brutalist': 'Brutalist',
  'bento-grid': 'Bento Grid',
  'corporate-pro': 'Corporate Pro',
  'maximalist-collage': 'Maximalist Collage',
  'y2k-retro': 'Y2K Retro',
  'sketchy-hand': 'Sketchy Hand-Drawn',
  'luxe-dark-gold': 'Luxe Dark Gold',
  'pastel-soft': 'Pastel Soft',
  'data-dashboard': 'Data Dashboard',
  'pitch-hero': 'Pitch Hero',
  'academic-paper': 'Academic Paper',
  'cyberpunk-neon': 'Cyberpunk Neon',
  'earth-tone': 'Earth Tone',
  'newsletter-info': 'Newsletter Info',
  'korean-modern': 'Korean Modern',
};

export const EXAMPLE_KINDS = ['title', 'content'] as const;
export type ExampleKind = (typeof EXAMPLE_KINDS)[number];

export const EXAMPLE_KIND_LABEL: Record<ExampleKind, string> = {
  title: 'Title slide',
  content: 'Content slide',
};

export interface Palette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
}

export interface Example {
  kind: ExampleKind;
  promptCore: string;
  svg: string;
  layoutNotes?: string;
}

export interface Template {
  id: string;
  slug: string;
  title: string;
  category: Category;
  description: string;
  philosophy: string;
  tags: string[];
  examples: Example[];
  defaultPaletteId: string;
  goodFor: string[];
  avoidFor: string[];
  createdAt: string;
  author: string;
}
