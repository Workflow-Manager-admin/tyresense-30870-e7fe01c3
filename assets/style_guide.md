# Porsche Menu Sample Style Guide

This document describes the extracted design system—layout, color palette, typography, structure, and components—from the supplied Porsche menu sample image. Use this style guide to restyle individual tyre brand pages for visual and structural consistency.

---

## 1. Layout

- **Overall Structure**
  - Two main columns:
    - **Left Sidebar (Navigation & Filters):** Fixed width (approx. 22–25%), light background.
    - **Main Content Area:** Fills remaining space, displays overview headline, model cards grid, and subtle header separation.
  - **Header Bar:** Very slim, spans full width, includes central logo/brand name.

- **Key Page Regions**
  - **Header (Top):**
    - Center-aligned, contains "PORSCHE" logo/brand (uppercase, spaced).
    - Pale background, slightly darker than page background.
  - **Sidebar (Left):**
    - Contains vertical menu, filters (radio buttons, dropdowns, etc.), with clear group labels. Spacing between groups.
    - "Back" text link at the top; filter action button at the bottom (full-width, outlined).
  - **Main Area:**
    - **Title & Breadcrumb:** "Model overview" headline, left-aligned.
    - **Category Title & Options:** E.g., "911 Carrera Models" above the cards.
    - **Content Grid:** 3 columns (cards), evenly spaced, responsive down to 1 or 2 on small screens.
    - **Cards:** White background, subtle shadow or border, product image (car), title, meta info, 2 prominent CTA buttons.

- **Spacing:**
  - Large outer margins (around page and sidebar).
  - Consistent padding inside cards (approx. 1.5–2rem).
  - Cards separated by moderate horizontal & vertical gaps (min 2rem).
  - Clear vertical rhythm—ample whitespace within and between sections.

---

## 2. Color Palette

- **Primary Background:** 
  - `--bg-canvas: #f5f6f7`   (very light cool gray)
- **Header Background:**
  - `--header-bg: #edeef0`   (slightly darker than page)
- **Sidebar Background:**
  - `--sidebar-bg: #ffffff`  (white)
- **Card Background:**
  - `--card-bg: #ffffff`     (white)
- **Primary Text:**
  - `--text-primary: #111216`  (almost black)
- **Secondary Text:**
  - `--text-secondary: #5d6266` (cool medium gray)
- **Accent/Highlight:**
  - `--accent: #000000` (pure black for buttons/CTAs)
- **Border/Lines:**
  - `--border: #cfd2d6`  (very light gray, for card and field edges)
- **Button Secondary (Outline):**
  - Border uses `--accent`, text is black, background is white (on "Configure" for example).

---

## 3. Typography

- **Font Family:** 
  - `Helvetica Neue, Arial, sans-serif` (assumed from visual appearance)

- **Heading 1 (Page Title / Major Section):**
  - Font size: 2rem (~32px)
  - Weight: 700 (bold)
  - Letter spacing: Near default, no transform
  - Color: `--text-primary`

- **Navigation/Menu/Labels:**
  - Font size: 1rem–1.125rem (~16–18px)
  - Weight: 400–500 (regular-medium)
  - Color: `--text-secondary` (filters & nav), black for selected

- **Model Titles / Card Headings:**
  - Font size: 1.125rem (~18px)
  - Weight: 600 (semi-bold)
  - Color: `--text-primary`

- **Body / Details / Meta info:**
  - Font size: 1rem (~16px)
  - Weight: 400
  - Color: `--text-secondary`
  - Data values (like "3.4 s", "400 hp") may appear slightly bolder.

- **CTAs / Buttons:**
  - Font size: 1rem (~16px)
  - Weight: 600
  - Text-transform: uppercase on primary, normal on secondary
  - Color: primary = white on black, secondary = black on white with black border.

---

## 4. Navigation & Page Structure

- **Header:**
  - Center name/logo ("PORSCHE") at top.
- **Sidebar:**
  - Fixed left, top "Back" link, list of menu/check/radio fields by category.
  - At least one prominent filter/action button (outlined).

- **Content Area:**
  - Section heading ("Model overview"), category headline, grid of cards.
  - Grid structure is the visual focal point.
  - Sorting or count controls may be top-right above the grid.

- **Cards:**
  - Each has: model image (large), model name, quick tech spec summary, 2 action buttons ("Configure" = primary dark, "Compare" = secondary outlined).

---

## 5. Interactive Elements

- **Buttons:**
  - Primary: Black background, white text, uppercase, slightly rounded (border-radius: ~0.375rem)
  - Secondary: Outlined, black border, white background, black text.

- **Sidebar Filters:**
  - Radio buttons (circular, black when selected).
  - Dropdown fields (simple, right arrow icon).
  - "Back" is a text link with underline on hover.

- **Cards:**
  - Hover/focus: May add slight elevation or shadow on card/container.

---

## 6. Responsive Design

- **Desktop (shown):**
  - 3-column grid; sidebar is visible vertically at left.
- **Tablet/Mobile (expected):**
  - Cards stack to 1–2 columns.
  - Sidebar becomes collapsible or jumps above content.

---

## 7. Example Page Structure

```text
|-- Header (center: "PORSCHE")
|-- Main Layout (flex: row)
    |-- Sidebar (fixed, left-aligned, filters+back)
    |-- Main Content (flex: column)
        |-- Page Title ("Model overview")
        |-- Model Category ("911 Carrera Models")
        |-- Grid (3 columns on desktop)
            |-- Model Card
                |-- Image
                |-- Model Name
                |-- Details block (facts/specs)
                |-- 2 Buttons ("Configure", "Compare")
```

---

**Use this guide for any restyling or component development for tyre brand pages to ensure a consistent look and feel with the Porsche menu sample.**
