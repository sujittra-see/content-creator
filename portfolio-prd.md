# PRD: Portfolio Website — Third (Aspiring HR Content Creator)

**Version:** 1.0  
**Date:** 2026-05-20  
**Author:** Third + AI Assistant  
**Status:** Ready for Development

---

## 1. Executive Summary

### 1.1 Objective
สร้าง Portfolio Website ส่วนตัวสำหรับสมัครงาน **HR Content Creator (Talent Acquisition Team)** ที่แสดงให้เห็นทักษะ **Graphic Design, Video Production, UX/UI Design, Content Strategy, และ Data-Driven Thinking** ผ่านตัวเว็บไซต์เองและผลงานภายใน

### 1.2 Target Audience
- HR Recruiters / Hiring Managers
- Talent Acquisition Teams
- อาจารย์ / ที่ปรึกษา (สำหรับดูความก้าวหน้า)

### 1.3 Key Message
> *"A Creative Tech Mind for Modern Talent Acquisition — bridging visual storytelling, user-centered design, and data-informed content to connect organizations with the right people."*

### 1.4 Success Criteria
- [ ] โหลดเร็ว (Lighthouse Performance > 90)
- [ ] รองรับ Mobile/Tablet/Desktop สมบูรณ์
- [ ] Scroll ผ่าน 8 Sections ได้อย่างลื่นไหล
- [ ] Recruiter เข้าใจว่าคุณเหมาะกับ HR Content Creator ภายใน 30 วินาที

---

## 2. Tech Stack & Architecture

| Layer | Technology | Justification |
|-------|-----------|---------------|
| **Framework** | Astro 5 (Static Site Generation) | เร็ว, SEO-friendly, ไม่ต้องพึ่ง JS หนัก, เหมาะกับ Content-focused site |
| **Styling** | Tailwind CSS v4 | Mobile-first utility classes, ออกแบบ UI ได้เร็ว, Design System ชัดเจน |
| **Content** | Astro Content Collections (Markdown) | จัดการ Experience, Certificates, Activities เป็นระบบ |
| **Typography** | Playfair Display (Google Fonts) + Inter | Playfair ใช้กับ Heading/Quote (ดู Creative & Professional), Inter ใช้กับ Body |
| **Icons** | Lucide React/Astro | บาง icon ใช้ SVG inline ตามที่เตรียมไว้ |
| **Animation** | CSS Scroll Snap + AOS (Animate On Scroll) | Scroll ทีละ Section + Reveal animation เมื่อเข้า viewport |
| **Image Comparison** | `img-comparison-slider` (Web Component) | Before/After slider สำหรับ Creative Works |
| **Figma Embed** | Standard Figma iframe embed | แสดง Restaurant Search Prototype |
| **Deploy** | GitHub Pages + GitHub Actions CI/CD | ฟรี, อัตโนมัติ, version control |

---

## 3. Design System

### 3.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary** | `#1E3A5F` | Navy Blue — ใช้กับ Header, Primary Button, Heading accents, Links |
| **Secondary** | `#E5E7EB` | Light Gray — ใช้กับ Borders, Background cards รอง, Divider |
| **Background** | `#FFFFFF` | Pure White — พื้นหลักทั้งเว็บ |
| **Accent** | `#8B5CF6` | Electric Purple — ใช้กับ Hover states, Tags, Highlights, Active nav |
| **Text Primary** | `#111827` | Near Black — ข้อความหลัก |
| **Text Muted** | `#6B7280` | Gray — รองรอง, dates, captions |

### 3.2 Typography Scale

| Element | Font | Size (Mobile / Desktop) | Weight |
|---------|------|------------------------|--------|
| Hero Title | Playfair Display | 2.25rem / 4.5rem (36px / 72px) | 700 |
| Section H2 | Playfair Display | 1.875rem / 3rem (30px / 48px) | 700 |
| Card Title | Inter | 1.125rem / 1.25rem | 600 |
| Body | Inter | 1rem / 1.125rem | 400 |
| Caption | Inter | 0.875rem | 400 |
| Quote | Playfair Display | 1.5rem / 2.25rem | 700 |

### 3.3 Spacing System

- **Section Padding:** `py-20` (80px) บน Mobile, `py-24` (96px) บน Desktop
- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Card Gap:** `gap-6` (24px)
- **Element Spacing:** ใช้ scale ของ Tailwind (4, 6, 8, 12, 16)

### 3.4 Component Primitives

**Primary Button**
- bg: `#1E3A5F`, text: white, rounded: `lg` (8px)
- padding: `px-6 py-3`
- hover: `bg-opacity-90` + `translateY(-2px)` transition
- icon: ซ้ายของข้อความ (SVG 16x16)

**Secondary Button**
- border: 1px `#1E3A5F`, text: `#1E3A5F`, bg: transparent
- hover: `bg-primary/5`

**Card**
- bg: white, rounded: `xl` (12px)
- border: 1px `#E5E7EB`
- shadow: `sm` → hover: `md`
- transition: `all 300ms ease`

**Tag/Badge**
- bg: `#8B5CF6/10`, text: `#8B5CF6`
- rounded: `full`, padding: `px-3 py-1`
- font: `text-xs font-medium`

---

## 4. Page Structure: 8 Sections

> **หลักการ Scroll:** ใช้ **CSS Scroll Snap** (`scroll-snap-type: y mandatory`) บน `<main>` container แต่ละ Section มี `min-h-screen` + `scroll-snap-align: start` เพื่อให้ User scroll 1 ครั้ง = 1 Section พอดี ไม่หลุดกลางๆ ระหว่าง Section

### Section 1: Hero

**Layout:** Full viewport (`min-h-screen`, `flex`, `items-center`)  
**Content Position:** ซ้ายข้อความ + ขวารูปโปรฟาย (บน Desktop), Stack บน Mobile

**Elements:**
- **H1:** "Hello, I'm [Nickname]" (Playfair Display, 4xl-5xl)
- **Name:** บรรทัดถัดไป (text-2xl, text-muted)
- **Title:** "Fourth-year Student in Bachelor of Information Science" *(แก้จาก Senior → Fourth-year ให้ตรงกับ About)*
- **Institution:** "Faculty of Humanities and Social Sciences, Khon Kaen University (KKU)"
- **CTA Group:** 2 ปุ่มแนวนอน
  1. **Primary:** "See What I've Built" → `href="#experience"` (scroll ไป Section 4)
     - Icon: Arrow down (SVG จาก Content เดิม)
  2. **Secondary:** "Download Resume" → External Google Drive (เปิด Tab ใหม่)
     - Icon: Download (SVG จาก Content เดิม)
- **Hero Image:** รูปโปรไฟล์ 1 รูป (`/images/profile-hero.jpg`)
  - Shape: `rounded-2xl` หรือวงรีแบบ soft
  - Size: 300x400px approx, `object-cover`
  - อาจมี border/ring สี Secondary เบาๆ

**Scroll Behavior:** `scroll-snap-align: start` + `snap-start`

---

### Section 2: About Me

**Layout:** 2 Columns (ซ้ายรูป 40%, ขวาข้อความ 60%) → Stack บน Mobile  
**Background:** White (default)

**Elements:**
- **H2:** "About Me" (Playfair Display, 3xl)
- **Lead Text:** ข้อความจาก Prepared Content (text-lg, leading-relaxed)
- **Body:** ข้อความเต็มจาก Prepared Content
- **Key Highlights:** 3 bullet points สรุป (ใช้ Accent color เป็น bullet)
  - Visual Storytelling
  - Audience Understanding
  - Data-Informed Decisions
- **Image:** `/images/profile-about.jpg`
  - Shape: `rounded-xl`, อาจ tilt/rotation เบาๆ หรือ shadow เพื่อความ Creative

**Animation:** AOS `fade-up`, delay 100ms

---

### Section 3: Skills & Expertise

**Layout:** Grid 2x2 (Mobile: 1 column, Tablet: 2 columns)  
**Background:** `#F8FAFC` (slate-50) เพื่อแยก Section ชัดเจน

**Elements:**
- **H2:** "Skills & Expertise"
- **Skill Cards (4+1 items):**

| Skill | Icon | Description |
|-------|------|-------------|
| **Photography** | Camera | Basic proficiency in Nikon & Sony cameras, fundamental composition |
| **Photo Editing** | Sliders/Adjust | Nikon & Sony RAW color grading, precise tones, high-quality output |
| **UX/UI Design** | Layers/Figma | User-centered interface design with Figma prototyping |
| **Dashboard & Reporting** | BarChart | Data visualization & insights with Power BI and Excel |
| **Content Creation** *(เพิ่ม)* | PenTool | Strategic content writing & social media engagement for talent attraction |

- **Card Structure:** Icon (40x40, สี Primary) + H3 + Description text-sm

**Animation:** AOS `fade-up`, stagger 100ms ต่อ card

---

### Section 4: Experience

**Layout:** Card Grid (Pattern 8) — แยก Sub-section ชัดเจน  
**Background:** White

**Sub-section 4.1: Professional Experience**
- **H3:** "Professional Experience" (text-xl, font-semibold, สี Primary, มี underline accent หรือ badge)
- **Grid:** 2 columns (Tablet), 3 columns (Desktop), 1 column (Mobile)
- **Cards (4 cards):**

**Card 1: KKU Library — Graphic Design**
- Date: Aug 2025 – Jan 2026
- Role: Graphic Design
- Tags: `#GraphicDesign` `#Branding` `#DigitalMarketing`
- Description: 3-4 bullets จาก Content
- Image: `/images/archi-poster.jpg` (thumbnail)
- Metrics: —

**Card 2: Showcase 8th 2026 — Media Production**
- Date: Aug 2025 – Jan 2026
- Role: Media Production Officer
- Tags: `#VideoProduction` `#Storyboarding` `#ContentStrategy`
- Description: Bullets จาก Content
- Metrics: **3,678 views & 95 likes** (Highlight ด้วยสี Accent)
- Image: Thumbnail จาก video หรือ `/images/showcase-8th.jpg`

**Card 3: iTalk 7 2025 — Public Relations**
- Date: May – Aug 2025
- Role: Public Relations Officer
- Tags: `#ContentWriting` `#SocialMedia` `#PR`
- Description: Bullets จาก Content
- Image: `/images/italk-7.jpg`

**Card 4: MobiLib Gen 4 — Digital Strategist**
- Date: Oct 2024 – Sep 2025
- Role: Digital Strategist · Simulated Enterprise
- Tags: `#DigitalStrategy` `#DataAnalysis` `#PricingStrategy`
- Description: Bullets จาก Content
- Metrics: **75% Photo Booth / 25% Souvenir** (Highlight)
- Image: `/images/mobilib.jpg`

**Sub-section 4.2: Academic Project**
- **H3:** "Academic Project" (แยกชัดเจนจาก Professional)
- **Grid:** 1 card ที่อาจกว้างกว่าปกติ (lg:col-span-2 หรือ max-w-2xl)

**Card 5: Restaurant Search Platform · KKU**
- Date: May 2025 – Feb 2026
- Role: UX/UI Designer & Prototype Developer
- Tags: `#UXUI` `#Figma` `#UserResearch` `#Prototype`
- Description: Bullets จาก Content
- **Figma Embed:** iframe แสดง prototype (ใช้ Public Embed URL จาก Figma)
- หรือ Link button: "View Figma Prototype" → เปิด Figma ใน Tab ใหม่
- Image: `/images/restaurant-ux.jpg`

**Card Component Spec:**
```html
<article class="card">
  <figure><img src="..." alt="..." /></figure>
  <div class="card-body">
    <div class="card-meta">
      <span class="date">Aug 2025 – Jan 2026</span>
      <span class="role">Graphic Design</span>
    </div>
    <h3>Organization Name</h3>
    <div class="tags">
      <span class="tag">#GraphicDesign</span>
    </div>
    <ul class="description">
      <li>Bullet point...</li>
    </ul>
    <div class="metrics">3,678 views...</div>
  </div>
</article>
```

---

### Section 5: Recognitions & Certificates

**Layout:** Grid 5 columns (Desktop), 3 columns (Tablet), 2 columns (Mobile)  
**Background:** `#F8FAFC`

**Elements:**
- **H2:** "Recognitions & Certificates"
- **Grid:** 5 รูป (`/images/cert-1.jpg` ถึง `cert-5.jpg`)
- **Image Spec:** `aspect-[4/3]`, `object-cover`, `rounded-lg`, `hover:scale-105 transition`
- **Caption:** ชื่อ certificate ใต้รูป (text-sm, text-muted)
- **Interaction:** Click → เปิด Lightbox (ใช้ `<dialog>` element หรือ external library ง่ายๆ) หรือ link ไปรูปขนาดเต็ม

**Animation:** AOS `fade-up`, stagger 80ms

---

### Section 6: Activities & Involvement

**Layout:** Grid 5 columns (เหมือน Section 5) หรือ Masonry ถ้ารูปไม่เท่ากัน  
**Background:** White

**Elements:**
- **H2:** "Activities & Involvement"
- **Grid:** 5 รูป (`/images/activity-1.jpg` ถึง `activity-5.jpg`)
- **Image Spec:** เหมือน Section 5 แต่อาจใช้ `aspect-square` หรือ `aspect-[3/4]` ถ้าเป็นรูป portrait
- **Caption:** ชื่อกิจกรรม + ปี (ถ้ามี)

---

### Section 7: Creative Works

**Layout:** Grid 2x2 (Desktop), 1 column (Mobile)  
**Background:** `#F8FAFC`

**Elements:**
- **H2:** "Creative Works" (ใช้ Font Playfair Display, style เดียวกับที่เตรียมไว้)
- **Grid:** 4 Slider Items

**Slider Component (img-comparison-slider):**
ใช้ Web Component `img-comparison-slider` โดย:
- ติดตั้ง: `npm install img-comparison-slider`
- Import ใน Astro: `<script>import 'img-comparison-slider';</script>` (client:only)

**Item 1: Portrait Skin Tone Correction**
- Before: `/images/DSC04801.jpg`
- After: `/images/DSC04801-1.jpg`
- Caption: "Portrait Skin Tone Correction"

**Item 2: Portrait Red Lanterns**
- Before: `/images/DSC09156.jpg`
- After: `/images/DSC09156-1.jpg`
- Caption: "Portrait Red Lanterns"

**Item 3: Landscape Highlight Recovery**
- Before: `/images/DSC00908.jpg`
- After: `/images/DSC00908-1.jpg`
- Caption: "Landscape Highlight Recovery"

**Item 4: Cinematic Color Grading**
- Before: `/images/DSC07085.jpg`
- After: `/images/DSC07085-1.jpg`
- Caption: "Cinematic Color Grading"

**Slider Styling:**
- Container: `rounded-xl overflow-hidden shadow-md`
- Labels: "BEFORE" / "AFTER" (ตัวอักษรขาว, bg-black/50, มุมซ้ายบน/ขวาบน)
- Caption: ใต้ slider, text-center, font-medium

**Accessibility:**
- `aria-label="Before and after image comparison"`
- `role="slider"`
- Keyboard navigable (tabindex="0")

---

### Section 8: Closing & Contact

**Layout:** Centered, `min-h-[80vh]`, เน้น whitespace  
**Background:** Primary (`#1E3A5F`) หรือ Gradient จาก Primary → Darker Navy  
**Text Color:** White

**Elements:**

**Quote Block:**
- **Quote Mark:** " (Playfair Display, 6xl, สี Accent/White อ่อน)
- **Quote Text:** "Every experience holds value." (Playfair Display, 2xl-3xl, italic)
- **Author:** "— Sujittra Seelabut · Eve" (text-sm, tracking-wide)

**Contact Block:** (อยู่ใต้ Quote, มี divider บางๆ คั่น)
- **H3:** "Let's Connect" (หรือ "Get In Touch")
- **Contact Items:**
  - **Email:** `your.email@example.com` (mailto link)
  - **Phone:** `+66 XXX XXX XXXX` (tel link)
  - **Location:** Khon Kaen, Thailand (ใช้ Map Pin icon)
- **Social Links:** (ถ้ามี) LinkedIn, GitHub, Instagram — ใช้ Icon buttons วงกลม
- **CTA:** "Download Resume" (Secondary button style บน bg dark)

**Footer:** อยู่ติดกับ Section 8 หรือเป็นส่วนหนึ่งของ Section 8
- Copyright: © 2026 Third. All rights reserved.
- Built with Astro + Tailwind (เล็กๆ เป็น signature)

---

## 5. Navigation & Header

### 5.1 Sticky Header

**Behavior:**
- Position: `fixed top-0 left-0 right-0 z-50`
- Background: `bg-white/90 backdrop-blur-md` (Glassmorphism เบาๆ)
- Border bottom: 1px `#E5E7EB` เมื่อ scroll ผ่าน Hero
- Height: `h-16` (64px)

**Content:**
- **Left:** Logo/Name "Third" (Playfair Display, bold, text-primary) + Tagline เล็กๆ "HR Content Creator"
- **Right:** Nav Links (Desktop)
  - About
  - Skills
  - Experience
  - Certificates
  - Activities
  - Works
  - Contact

**Mobile (< md):**
- Hamburger Menu (Icon: 3 lines)
- Menu Overlay: Full screen หรือ Slide from right
- Links เรียงแนวตั้ง ขนาดใหญ่

### 5.2 Active State / Scroll Spy

- ใช้ **Intersection Observer** ตรวจจับว่า Section ไหนอยู่ใน viewport
- Nav link ที่ตรงกับ Section ปัจจุบัน: สี Accent (`#8B5CF6`) + underline
- Smooth scroll เมื่อ click nav link: `scroll-behavior: smooth` + offset สำหรับ sticky header (64px)

---

## 6. Scroll Behavior Specification

### 6.1 CSS Scroll Snap

```css
/* บน <main> หรือ wrapper */
.scroll-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

section {
  scroll-snap-align: start;
  min-height: 100vh;
  /* ยกเว้น Section 8 อาจจะ min-h-[80vh] */
}
```

**ข้อควรระวัง:**
- บน Mobile: ถ้า Content ยาวเกิน viewport (เช่น Experience มี 5 cards) ให้ใช้ `min-h-[100dvh]` และทำให้ Card ไม่ใหญ่เกิน
- ถ้า Section ไหน content เยอะจริงๆ (เช่น Experience) อาจใช้ `scroll-snap-align: start` แต่ไม่บังคับ `min-h-screen` ให้พอดี — แต่ผู้ใช้ต้องการให้ scroll ทีละ section ดังนั้นต้องออกแบบให้ Content พอดีกับจอ หรือใช้ `overflow-y: auto` ภายใน Section ที่จำเป็น

**ทางเลือก:** ใช้ **JavaScript Smooth Scroll** แทน CSS Snap เพื่อควบคุมได้มากกว่า (เช่น library `lenis` หรือ custom wheel event) แต่เพื่อความเรียบง่าย แนะนำ **CSS Scroll Snap** ก่อน

### 6.2 Animation on Scroll

- **Library:** AOS (Animate On Scroll) หรือ CSS `@keyframes` + Intersection Observer
- **Effect:** `fade-up` (translateY 30px → 0 + opacity 0 → 1)
- **Duration:** 600ms
- **Easing:** `ease-out`
- **Stagger:** 100ms ระหว่าง elements ในกลุ่มเดียวกัน (เช่น Cards, Skill items)

---

## 7. Content Management (Astro Content Collections)

### 7.1 Schema Definition

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const experiences = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),           // ชื่อองค์กร/โปรเจกต์
    role: z.string(),            // ตำแหน่ง
    category: z.enum(['professional', 'academic']),
    dateRange: z.string(),       // เช่น "Aug 2025 – Jan 2026"
    tags: z.array(z.string()),   // ['GraphicDesign', 'Branding']
    tools: z.array(z.string()).optional(),
    metrics: z.string().optional(), // "3,678 views & 95 likes"
    image: z.string(),           // path รูป thumbnail
    featured: z.boolean().default(false),
    order: z.number(),           // เรียงลำดับ
  }),
});

const certificates = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    image: z.string(),
  }),
});

export const collections = { experiences, certificates };
```

### 7.2 File Structure

```
src/content/
├── experiences/
│   ├── kku-library-archi.md
│   ├── showcase-8th.md
│   ├── italk-7.md
│   ├── mobilib-gen4.md
│   └── restaurant-platform.md
└── certificates/
    ├── cert-1.md
    ├── cert-2.md
    ├── cert-3.md
    ├── cert-4.md
    └── cert-5.md
```

**Note:** Activities และ Creative Works อาจไม่ต้องใช้ Content Collections เพราะเป็นรูปภาพล้วน แต่ถ้าต้องการ caption แยกก็สามารถทำ Collections เพิ่มได้

---

## 8. Assets & File Structure

### 8.1 Image Assets (`public/images/`)

| Filename | Description | Used In |
|----------|-------------|---------|
| `profile-hero.jpg` | รูปโปรไฟล์ Hero | Section 1 |
| `profile-about.jpg` | รูปโปรไฟล์ About | Section 2 |
| `archi-poster.jpg` | ผลงาน Archi | Section 4 Card 1 |
| `showcase-8th.jpg` | Thumbnail video/กิจกรรม | Section 4 Card 2 |
| `italk-7.jpg` | กิจกรรม iTalk | Section 4 Card 3 |
| `mobilib.jpg` | กิจกรรม MobiLib | Section 4 Card 4 |
| `restaurant-ux.jpg` | Screenshot Figma/UX | Section 4 Card 5 |
| `cert-1.jpg` ถึง `cert-5.jpg` | ใบประกาศ | Section 5 |
| `activity-1.jpg` ถึง `activity-5.jpg` | รูปกิจกรรม | Section 6 |
| `DSC04801.jpg`, `DSC04801-1.jpg` | Before/After 1 | Section 7 |
| `DSC09156.jpg`, `DSC09156-1.jpg` | Before/After 2 | Section 7 |
| `DSC00908.jpg`, `DSC00908-1.jpg` | Before/After 3 | Section 7 |
| `DSC07085.jpg`, `DSC07085-1.jpg` | Before/After 4 | Section 7 |

### 8.2 Figma Prototype
- ใช้ **Standard Figma Embed** (ไม่ใช่ snippet HTML ที่ซับซ้อน)
- URL Format: `https://www.figma.com/embed?embed_host=astra&url=YOUR_FIGMA_FILE_URL`
- หรือใช้ `<iframe>` จาก Share > Embed ใน Figma
- ขนาด: `width="100%" height="450px"` (ภายใน Card หรือ Modal)

---

## 9. Responsive Breakpoints

| Breakpoint | Width | Grid Columns | Font Scale |
|------------|-------|--------------|------------|
| Mobile | < 640px | 1 | Base |
| Tablet | 640–1024px | 2 | Base |
| Desktop | > 1024px | 3–5 | Large |

**Key Responsive Adjustments:**
- Hero: Stack แนวตั้ง (รูปบน หรือ ล่าง)
- About: Stack แนวตั้ง (รูปบน ข้อความล่าง)
- Experience Cards: 1 → 2 → 3 columns
- Certificates/Activities: 2 → 3 → 5 columns
- Creative Works: 1 → 2 columns
- Nav: Hamburger บน Mobile

---

## 10. Accessibility (a11y)

- **Semantic HTML:** ใช้ `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<figure>`, `<figcaption>`, `<dialog>` ตาม Semantic HTML ที่คุณศึกษามา
- **Alt Text:** ทุกรูปต้องมี alt ที่อธิบายเนื้อหา ไม่ใช่แค่ชื่อไฟล์
- **Focus States:** ทุก interactive element (links, buttons, sliders) ต้องมี `focus:ring-2 focus:ring-accent`
- **Color Contrast:** ตรวจสอบว่า Text บน Background ผ่าน WCAG AA (4.5:1)
- **Reduced Motion:** รองรับ `prefers-reduced-motion` (ปิด Animation ถ้าผู้ใช้ตั้งค่าไว้)
- **Keyboard Navigation:** สามารถ Tab ผ่านทุก Section ได้

---

## 11. SEO & Meta

```html
<title>Third | HR Content Creator & UX/UI Designer</title>
<meta name="description" content="Portfolio of Third, a fourth-year Information Science student specializing in HR Content Creation, UX/UI Design, and Visual Storytelling.">
<meta property="og:title" content="Third | HR Content Creator">
<meta property="og:description" content="Creative tech mind for modern talent acquisition.">
<meta property="og:image" content="/images/profile-hero.jpg">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

**Structured Data (JSON-LD):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Third",
  "jobTitle": "Aspiring HR Content Creator",
  "alumniOf": "Khon Kaen University",
  "url": "https://yourusername.github.io",
  "sameAs": ["https://linkedin.com/in/..."]
}
```

---

## 12. Deployment & CI/CD

### 12.1 GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 12.2 Astro Config

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://yourusername.github.io',
  base: '/your-repo-name/', // ถ้า repo ไม่ใช่ user.github.io
  output: 'static',
});
```

---

## 13. Open Questions & Assumptions

| # | Assumption | ถ้าเปลี่ยนต้องปรับ |
|---|-----------|-------------------|
| 1 | รูปทั้งหมดอยู่ใน `public/images/` และมีขนาดเหมาะสม (ไม่เกิน 500KB ต่อรูป) | ต้อง optimize หรือใช้ Astro Image |
| 2 | Figma Prototype เป็น Public/Shareable | ถ้า Private ต้องใช้ Screenshot แทน |
| 3 | ไม่มี Backend — Contact ใช้ `mailto:` หรือแสดงข้อมูลอย่างเดียว | ถ้าต้องการ Form ต้องใช้ Formspree/Netlify Forms |
| 4 | รูป Before/After มีคู่ครบ 4 คู่ | ถ้าไม่ครบต้องปรับ Grid |
| 5 | Google Drive Resume Link ใช้งานได้ | ถ้าเปลี่ยนเป็น PDF ใน repo ต้องวางใน `public/` |

---

## 14. Next Steps / Development Milestones

| Phase | Task | Estimated Time |
|-------|------|----------------|
| **1** | Setup Astro + Tailwind + GitHub Repo + Actions | 30 min |
| **2** | Build BaseLayout + Sticky Header + Nav + Scroll Snap | 1–2 hrs |
| **3** | Build Section 1 (Hero) + Section 2 (About) | 1–2 hrs |
| **4** | Build Section 3 (Skills) + Section 4 (Experience with Collections) | 2–3 hrs |
| **5** | Build Section 5 (Certificates) + Section 6 (Activities) | 1 hr |
| **6** | Build Section 7 (Creative Works + img-comparison-slider) | 1–2 hrs |
| **7** | Build Section 8 (Quote + Contact) + Footer | 1 hr |
| **8** | Responsive Testing + Animation (AOS) + Polish | 2 hrs |
| **9** | SEO + Accessibility Check + Lighthouse | 1 hr |
| **10** | Deploy + Domain/Path Check | 30 min |

**Total:** ~12–16 ชั่วโมง (ถ้าทำต่อเนื่อง)

---

## 15. Appendix: Content Corrections from Original

| Original | Correction | Reason |
|----------|-----------|--------|
| Hero: "Senior Student" | **"Fourth-year Student"** | ให้ตรงกับ About Me Section |
| Skills: 4 items | **เพิ่ม "Content Creation & Writing"** | ตรงกับตำแหน่ง HR Content Creator มากที่สุด |
| Figma snippet | **ใช้ Figma Public Embed iframe** | Snippet ที่ให้มาเป็น Dev Mode output ใช้งานจริงไม่ได้ |

---

**PRD นี้พร้อมใช้พัฒนาได้เลย** ถ้าคุณเห็นด้วยกับทุกส่วน เราสามารถเริ่มลงมือเขียนโค้ด **Phase 1–3 ก่อน** ได้ทันที หรือถ้าอยากปรับตรงไหน (เช่น สี, layout, หรือเพิ่ม section) บอกได้เลย!
