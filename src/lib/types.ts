export const STYLES = [
  'editorial',
  'brutalist',
  'bento',
  'minimal-corporate',
  'maximalist',
] as const;

export const USE_CASES = [
  'pitch',
  'business',
  'academic',
  'education',
  'portfolio',
  'data',
  'product',
] as const;

export type Style = (typeof STYLES)[number];
export type UseCase = (typeof USE_CASES)[number];

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
}

export interface Typography {
  heading: string;
  body: string;
}

export interface Template {
  id: string;
  title: string;
  slug: string;
  style: Style;
  useCase: UseCase;
  previewImage: string;
  description: string;
  tags: string[];
  colorPalette: ColorPalette;
  typography: Typography;
  layoutNotes: string;
  promptCore: string;
  goodFor: string[];
  avoidFor: string[];
  createdAt: string;
  author: string;
}

export const STYLE_LABEL: Record<Style, string> = {
  editorial: 'Editorial',
  brutalist: 'Brutalist',
  bento: 'Bento',
  'minimal-corporate': 'Minimal Corporate',
  maximalist: 'Maximalist',
};

export const USE_CASE_LABEL: Record<UseCase, string> = {
  pitch: 'Pitch',
  business: 'Business',
  academic: 'Academic',
  education: 'Education',
  portfolio: 'Portfolio',
  data: 'Data',
  product: 'Product',
};
