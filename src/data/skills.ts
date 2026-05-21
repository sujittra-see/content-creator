export interface SkillItem {
  title: string;
  description: string;
  icon: string;
}

export const skills: SkillItem[] = [
  {
    title: 'Photography',
    description: 'Basic proficiency in Nikon & Sony cameras, fundamental composition',
    icon: 'camera',
  },
  {
    title: 'Photo Editing',
    description: 'Nikon & Sony RAW color grading, precise tones, high-quality output',
    icon: 'sliders',
  },
  {
    title: 'UX/UI Design',
    description: 'User-centered interface design with Figma prototyping',
    icon: 'layers',
  },
  {
    title: 'Dashboard & Reporting',
    description: 'Data visualization & insights with Power BI and Excel',
    icon: 'bar-chart',
  },
  {
    title: 'Content Creation',
    description: 'Strategic content writing & social media engagement for talent attraction',
    icon: 'pen-tool',
  },
];
