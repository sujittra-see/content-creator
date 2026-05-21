export interface NavigationItem {
  id: string;
  label: string;
  href: `#${string}`;
}

export const navigation: NavigationItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'certificates', label: 'Certificates', href: '#certificates' },
  { id: 'activities', label: 'Activities', href: '#activities' },
  { id: 'works', label: 'Works', href: '#works' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];
