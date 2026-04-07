
export interface BannerSlide {
  id: number;
  image: string;
  alt: string;
}

export interface AboutBlock {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  icon: string;
  link: string;
}

export interface StatItem {
  id: number;
  icon: string;
  number: number;
  suffix?: string;
  label: string;
  delay: number;
}

export interface Category {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  link: string;
  featured?: boolean;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
}

export interface NavigationItem {
  id: number;
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface Language {
  code: string;
  label: string;
  flag: string;
}

export interface LogoData {
  header: string;
  footer: string;
  favicon: string;
  qrCode: string;
}

export interface BackgroundImages {
  stats: string;
  footer: string;
  video: string;
  statsImage: string;
}

export interface VideoData {
  thumbnail: string;
  youtubeId: string;
  title: string;
  subtitle: string;
}

export interface ContactInfo {
  address: string;
  addressHCM: string;
  phone: string;
  email: string;
  facebook: string;
  youtube: string;
  linkedin: string;
}
