export interface NavigationItem {
  id: string;
  label: string;
  href: `#${string}`;
}

export interface ExperienceEntry {
  title: string;
  role: string;
  category: 'professional' | 'academic';
  dateRange: string;
  tags: string[];
  tools?: string[] | undefined;
  metrics?: string | undefined;
  image?: string | undefined;
  featured?: boolean | undefined;
  order: number;
  figmaEmbedUrl?: string | undefined;
  externalUrl?: string | undefined;
}

export interface CertificateEntry {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

export interface ImageGalleryItem {
  title: string;
  year?: string;
  image: string;
  alt: string;
}

export interface CreativeWorkItem {
  title: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
}

export interface SkillItem {
  title: string;
  description: string;
  icon: string;
}
