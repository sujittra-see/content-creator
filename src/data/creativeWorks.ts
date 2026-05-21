export interface CreativeWorkItem {
  title: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
}

export const creativeWorks: CreativeWorkItem[] = [
  {
    title: 'Portrait Skin Tone Correction',
    beforeImage: '/images/DSC04801.jpg',
    afterImage: '/images/DSC04801-1.jpg',
    beforeAlt: 'Original portrait photo before skin tone correction',
    afterAlt: 'Edited portrait photo after skin tone correction',
  },
  {
    title: 'Portrait Red Lanterns',
    beforeImage: '/images/DSC09156.jpg',
    afterImage: '/images/DSC09156-1.jpg',
    beforeAlt: 'Original portrait with red lanterns before editing',
    afterAlt: 'Edited portrait with red lanterns after color grading',
  },
  {
    title: 'Landscape Highlight Recovery',
    beforeImage: '/images/DSC00908.jpg',
    afterImage: '/images/DSC00908-1.jpg',
    beforeAlt: 'Original landscape photo before highlight recovery',
    afterAlt: 'Edited landscape photo after highlight recovery',
  },
  {
    title: 'Cinematic Color Grading',
    beforeImage: '/images/DSC07085.jpg',
    afterImage: '/images/DSC07085-1.jpg',
    beforeAlt: 'Original photo before cinematic color grading',
    afterAlt: 'Edited photo after cinematic color grading',
  },
];
