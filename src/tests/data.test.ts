import { describe, it, expect } from 'vitest';
import { navigation } from '../data/navigation';
import { skills } from '../data/skills';
import { activities } from '../data/activities';
import { creativeWorks } from '../data/creativeWorks';

describe('Navigation Data', () => {
  const sectionIds = ['about', 'skills', 'experience', 'certificates', 'activities', 'works', 'contact'];

  it('contains all required sections', () => {
    const navIds = navigation.map((n) => n.id);
    for (const id of sectionIds) {
      expect(navIds).toContain(id);
    }
  });

  it('all hrefs start with # and match ids', () => {
    for (const item of navigation) {
      expect(item.href).toBe(`#${item.id}`);
    }
  });

  it('has unique ids', () => {
    const ids = navigation.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every item has a label', () => {
    for (const item of navigation) {
      expect(item.label.length).toBeGreaterThan(0);
    }
  });
});

describe('Skills Data', () => {
  it('has at least 4 skills', () => {
    expect(skills.length).toBeGreaterThanOrEqual(4);
  });

  it('every skill has title and description', () => {
    for (const skill of skills) {
      expect(skill.title.length).toBeGreaterThan(0);
      expect(skill.description.length).toBeGreaterThan(0);
    }
  });

  it('every skill has a valid icon key', () => {
    const validIcons = ['camera', 'sliders', 'layers', 'bar-chart', 'pen-tool'];
    for (const skill of skills) {
      expect(validIcons).toContain(skill.icon);
    }
  });
});

describe('Activities Data', () => {
  it('has at least 4 activities', () => {
    expect(activities.length).toBeGreaterThanOrEqual(4);
  });

  it('every activity has alt text', () => {
    for (const item of activities) {
      expect(item.alt.length).toBeGreaterThan(0);
    }
  });

  it('every activity has a title', () => {
    for (const item of activities) {
      expect(item.title.length).toBeGreaterThan(0);
    }
  });

  it('every activity has an image path', () => {
    for (const item of activities) {
      expect(item.image).toMatch(/^\/images\//);
    }
  });
});

describe('Creative Works Data', () => {
  it('has exactly 4 creative works', () => {
    expect(creativeWorks.length).toBe(4);
  });

  it('every work has before and after images', () => {
    for (const work of creativeWorks) {
      expect(work.beforeImage.length).toBeGreaterThan(0);
      expect(work.afterImage.length).toBeGreaterThan(0);
      expect(work.beforeImage).not.toBe(work.afterImage);
    }
  });

  it('every work has alt text for both images', () => {
    for (const work of creativeWorks) {
      expect(work.beforeAlt.length).toBeGreaterThan(0);
      expect(work.afterAlt.length).toBeGreaterThan(0);
    }
  });

  it('every work has a title', () => {
    for (const work of creativeWorks) {
      expect(work.title.length).toBeGreaterThan(0);
    }
  });
});
