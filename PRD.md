# Product Requirements Document (PRD)
## Hardcover Reading Widget

**Version:** 1.0  
**Platform:** Next.js 15 + TypeScript + Tailwind CSS  
**Purpose:** Display a user's currently reading book from Hardcover, including cover image, title, author, reading progress, and themed visual presentation.

---

# 1. Overview

The Hardcover Reading Widget is a reusable component that fetches a user's currently reading book from the Hardcover API and displays it as a visually appealing card.

The widget should:

- Automatically update when reading progress changes.
- Support multiple visual themes.
- Be embeddable in portfolios, personal websites, blogs, and dashboards.
- Be SEO-friendly.
- Have excellent mobile responsiveness.
- Cache API responses for performance.

---

# 2. Goals

### Primary Goals

- Fetch user's current book.
- Display cover image.
- Display title.
- Display author.
- Display reading progress.
- Show completion percentage.
- Support custom themes.

### Secondary Goals

- Reading statistics.
- Hover animations.
- Reading streak display.
- Multiple book support.
- Goodreads-style showcase.

---

# 3. User Flow

```txt
Visitor Opens Website
         │
         ▼
Reading Widget Loads
         │
         ▼
Fetch Data From Hardcover API
         │
         ▼
Find "Currently Reading" Book
         │
         ▼
Transform Response
         │
         ▼
Render Theme Card
         │
         ▼
Display Progress
```

---

# 4. Architecture

```txt
Hardcover API
      │
      ▼
Server Action
      │
      ▼
Data Transformation Layer
      │
      ▼
Theme Engine
      │
      ▼
Reading Card Component
      │
      ▼
User Interface
```

---

# 5. Tech Stack

### Framework

```txt
Next.js 15
```

### Language

```txt
TypeScript
```

### Styling

```txt
Tailwind CSS v4
```

### API

```txt
Hardcover GraphQL API
```

### Image Handling

```txt
next/image
```

### Animations

```txt
Framer Motion
```

---

# 6. Project Structure

```txt
src
│
├── app
│   ├── api
│   │   └── hardcover
│   │       └── route.ts
│   │
│   └── page.tsx
│
├── components
│   ├── reading-card
│   │   ├── reading-card.tsx
│   │   ├── progress-bar.tsx
│   │   ├── reading-cover.tsx
│   │   └── reading-stats.tsx
│
├── services
│   └── hardcover.ts
│
├── lib
│   └── utils.ts
│
├── types
│   └── hardcover.ts
│
└── themes
    ├── lotm.ts
    ├── rdr2.ts
    ├── cyber.ts
    └── minimal.ts
```

---

# 7. Hardcover Integration

## Authentication

User generates:

```txt
Hardcover API Token
```

Store in:

```env
HARDCOVER_API_KEY=
```

---

## API Layer

Create:

```txt
services/hardcover.ts
```

Responsibilities:

- Authenticate request.
- Fetch reading data.
- Handle errors.
- Transform API response.

---

# 8. Data Model

## Book

```ts
type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  progress: number;
  totalPages: number;
  percentage: number;
};
```

---

# 9. Data Fetching Process

## Step 1

User visits page.

```txt
/home
```

---

## Step 2

Server component executes.

```txt
ReadingWidget
```

---

## Step 3

Fetch Hardcover API.

```txt
POST GraphQL Query
```

---

## Step 4

Receive response.

```txt
Currently Reading Book
```

---

## Step 5

Normalize data.

```txt
title
cover
author
progress
totalPages
```

---

## Step 6

Pass data to UI.

---

# 10. Theme System

Every theme exports:

```ts
type Theme = {
  background: string;
  accent: string;
  text: string;
  border: string;
};
```

---

# 11. Theme 1: LOTM

Inspired by:

- Tarot Club
- Fool Pathway
- Ancient Mysticism

Visuals:

```txt
Dark Black
Gold Borders
Tarot Symbols
Ancient Glow
```

Colors:

```txt
#0B0A08
#D4AF37
#F5E6B8
```

Features:

- Gold hover glow
- Tarot border corners
- Mystical animations

---

# 12. Theme 2: RDR2

Inspired by:

- Arthur Morgan
- Outlaw Posters
- Western Style

Visuals:

```txt
Dark Red
Black
Grunge Texture
```

Colors:

```txt
#120909
#B22222
#F5E6C8
```

Features:

- Distressed border
- Paper texture
- Western typography

---

# 13. Theme 3: Cyber

Matches your preferred aesthetic.

Visuals:

```txt
Neon Blue
Dark Background
Glass Effect
```

Colors:

```txt
#050816
#00E5FF
#FFFFFF
```

Features:

- Glow effect
- Scan line animation
- Glass morphism

---

# 14. Card Layout

```txt
┌─────────────────────────────┐
│ CURRENTLY READING           │
├─────────────────────────────┤
│                             │
│ [BOOK COVER]                │
│                             │
│ Lord of the Mysteries       │
│                             │
│ Author Name                 │
│                             │
│ ████████████░░░░░░░░░░      │
│                             │
│ 975 / 1432 Pages            │
│                             │
│ 68% Complete                │
│                             │
└─────────────────────────────┘
```

---

# 15. Responsive Design

## Mobile

```txt
Cover
Title
Author
Progress
```

Vertical Layout

---

## Desktop

```txt
Cover | Content
```

Horizontal Layout

---

# 16. Loading State

Before API returns:

```txt
Skeleton Cover
Skeleton Title
Skeleton Progress
```

---

# 17. Error Handling

### API Down

Show:

```txt
Currently Reading

Unable to load reading data.
```

### Missing Cover

Fallback:

```txt
Default Book Illustration
```

---

# 18. Caching Strategy

Use:

```txt
revalidate = 3600
```

Updates every:

```txt
1 hour
```

Benefits:

- Faster loading
- Less API usage

---

# 19. Future Enhancements

### v2

- Reading streaks
- Reading goals
- Recently finished books
- Favorite books
- Reading history timeline

### v3

- Multiple providers

```txt
Hardcover
Goodreads
StoryGraph
AniList
```

### v4

- Reading dashboard
- Analytics
- Heatmap
- Monthly stats

---

# 20. Final Deliverable

The completed widget should provide:

✅ Current book title  
✅ Cover image  
✅ Author name  
✅ Progress tracking  
✅ Percentage complete  
✅ Responsive design  
✅ Theme support (LOTM, RDR2, Cyber, Minimal)  
✅ Server-side fetching  
✅ Cached API requests  
✅ Reusable Next.js component  
✅ Portfolio-ready showcase widget

This architecture keeps the widget modular, scalable, and easy to extend with future reading-related features.