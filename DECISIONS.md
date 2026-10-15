# DECISIONS.md

A running log of every non-obvious design or architecture decision.

---

## 2026-10-09 — UI Enhancement Pass (Steps 1–6)

### Step 1 — Layout System

**Container width raised from 900px → 1200px**
`max-w-[900px]` left a ~600px dead zone on a 1536px screen. 1200px with 40px gutters on wide viewports fills the canvas without over-stretching prose. Body text still caps at `max-w-[56ch]` or `max-w-[70ch]` inside each section so lines never exceed ~70 characters.

**`.container-wide` utility class in `globals.css`**
Rather than repeating `max-w-[1200px] mx-auto px-6 md:px-10` on every element, one class in the global CSS ensures all sections — header, hero, main content, footer — align on the same column. Changing the width means one edit.

**Section vertical rhythm: `py-16 lg:py-24`**
That gives 64px on mobile (≈5 baseline units of 12px) and 96px on desktop, matching the spec. `hr` dividers are kept between sections so the rhythm is visible on fast scroll.

**`page.tsx` marked `"use client"`**
CursorGlow and CommandPalette are interactive client components mounted at the page root. Next.js App Router allows Server Components to import Client Components, but since we want CommandPalette's keyboard listener active immediately, and the page orchestrates client-side global state (palette open/closed), making page.tsx a client boundary was simpler than trying to pass a server-rendered shell around it.

---

### Step 2 — Hero

**Fonts switched: Manrope → Inter → JetBrains Mono**
Bricolage Grotesque and Hanken Grotesk were elegant but lacked Manrope's geometric boldness at display sizes. JetBrains Mono is the standard for developer portfolios and is immediately recognisable as code.

**Two-column grid: `lg:grid-cols-[3fr_2fr]`**
60/40 split gives the name and CTAs visual priority while the code window fills the right half with meaning. At smaller breakpoints the columns stack: code window appears below the copy, which is the correct reading order.

**Particle canvas: `requestAnimationFrame` + `visibilitychange`**
Using a raw canvas instead of a library (e.g. particles.js) means zero extra dependency weight. `document.hidden` check inside the RAF loop pauses drawing when the tab is not visible — this saves CPU for background tabs and is a prerequisite for a good Lighthouse score. `prefers-reduced-motion` guard removes the canvas entirely for users with vestibular disorders.

**Typewriter: custom hook, no library**
A simple `setInterval` with three states (typing / paused / deleting) is <30 lines and avoids a dependency. `aria-live="polite"` on the paragraph announces changes to screen readers without interrupting other content.

**Code window: lines reveal at 200 ms intervals**
Sequential line-by-line reveal gives the illusion of the code being typed in real time. The interval is slightly slower than a fast typist so it reads as deliberate, not frantic.

**Stats strip: count-up on `IntersectionObserver`**
Counting starts only when the strip enters the viewport (threshold 0.3). This ensures the animation is seen rather than having already completed when a user lands mid-page. Numbers are kept accurate to the CV — no inflation.

**Marquee: CSS animation, pause-on-hover**
Pure CSS `animation: marquee 28s linear infinite` with `animation-play-state: paused` on hover. Doubling the items array (`[...TECH_NAMES, ...TECH_NAMES]`) makes the loop seamless — when the first copy scrolls off the left, the second copy has already started. The `marquee-wrap:hover` selector pauses the animation. `aria-hidden="true"` on the scrolling track prevents screen readers from reading a doubled list; the section itself has a descriptive `aria-label`.

---

### Step 3 — Work Section

**`role="tablist"` / `role="tab"` / `role="tabpanel"` semantics**
The ARIA tab pattern is the correct semantic for a two-column project explorer. Arrow-key navigation is implemented with a `keydown` listener on the `tablist` container — this matches the WAI-ARIA Authoring Practices Guide (APG) for composite widgets.

**Architecture diagram: clickable nodes only, no stock diagrams**
SVG flow connectors use `stroke-dasharray: 8 4` with a `stroke-dashoffset` animation to simulate moving data. Node explanations are drawn only from sentences in `data.ts` bullets — the spec explicitly prohibits invented facts.

**SpotlightCard: CSS custom properties for glow centre**
`--mouse-x` and `--mouse-y` are set on the card element via `onMouseMove` and consumed by the `::before` pseudo-element `radial-gradient`. This avoids React state updates on every mouse event, giving smooth 60 fps without re-renders.

**Sticky selector stops at `top-24`**
The header is `~56px` tall. `top-24` (96px) gives 40px breathing room below the header so the selector doesn't overlap.

---

### Step 4 — Skills, Training, Proof, Education, Contact

**Skills chip-project mapping: manually curated**
Only skills that appear in the CV project bullets are mapped to projects. Skills not in any project (e.g. NumPy, Scikit-learn) show a "not tied to a listed project" message when clicked rather than false mappings.

**Training: two-column interior (`1fr auto`)**
Bullets prose on the left uses all available width (good for readability); tech chips on the right are naturally narrow so `auto` is appropriate. Using `sm:grid-cols-[1fr_auto]` means on mobile they stack vertically (bullets first, chips below).

**Contact: radial glow via inline `background` style**
The glow centre tracks `--gx`/`--gy` CSS custom properties set in `onMouseMove`. These feed directly into an inline `background` style using `radial-gradient(… at var(--gx, 50%) var(--gy, 50%) …)`. Because the style string is computed in CSS (not JavaScript), there is no re-render on mousemove — the browser re-paints the gradient directly.

**Education timeline: cards instead of bare text**
Each entry is a `<article>` card with a subtle border. The score is surfaced in an accent-coloured pill so it stands out at a glance, which recruiters scan for. The connector `minHeight: 3rem` prevents the line from disappearing between taller cards.

---

### Step 5 — Global Interactions

**ScrollProgress: direct DOM mutation, passive listener**
`bar.style.width` is set directly inside a `{ passive: true }` scroll listener to avoid React re-renders on every scroll tick. No state, no re-render — just a paint.

**CursorGlow: `pointer: fine` guard**
The glow activates only for `window.matchMedia("(pointer: fine)")` — i.e. desktop with a mouse. This prevents the glow persisting in an odd last position on touch devices.

**CommandPalette: custom DOM event `open-palette`**
The Header fires `window.dispatchEvent(new CustomEvent("open-palette"))` when Quick Jump is clicked. The palette listens for this event in a `useEffect`. This avoids prop-drilling an `onOpen` callback through the page → header → palette chain and keeps the components decoupled.

**CommandPalette focus trap: `role="dialog"` + `aria-modal="true"`**
This combination instructs screen readers to restrict navigation to the dialog content. The `combobox` role on the input with `aria-controls`, `aria-expanded`, and `aria-activedescendant` gives screen readers the full combobox pattern, announcing the active item as the user arrows through results.

---

### Step 6 — Visual Polish

**Dark palette: `#080D18` background**
Darker than the previous `#0F1626`, this creates stronger contrast against the `#0F1829` card colour and makes the gradient text and amber accents vibrate visually.

**`.eyebrow` class: `font-mono uppercase tracking-widest`**
Mono uppercase labels above section headings create a visual rhythm that ties the code-window aesthetic to the overall design. They are `aria-hidden`-safe (they're decorative labelling, not headings) and use `color: var(--accent)` for immediate orange-amber brand colour.

**`gradient-text`: `linear-gradient(135deg, #F5B83D, #F97316)`**
Amber-to-orange diagonal gradient on "Sharma" in the hero gives the name warmth and memorability. Implemented with `-webkit-background-clip: text` which is universally supported in modern browsers.

**16px border-radius on cards**
Increased from 14px to 16px to match rounded-[16px] across all cards. The extra 2px smoothness is visible at high DPI.

**Hover: 3px lift (`hover:-translate-y-[3px]`)**
Increased from the previous 2px for a more tactile feel. Combined with `transition-transform duration-150 ease-out` this feels snappy, not sluggish.

---

## Previous decisions (pre-enhancement pass)

- **`next/font` over `@import` Google Fonts**: next/font loads fonts at build time from Google's CDN with automatic subsetting, adds `font-display: swap`, and injects preload links without manual `<link>` tags. This avoids FOUT in production.
- **`ThemeScript` inline script**: The inline script runs synchronously before React hydration to avoid the flash of wrong theme. It reads localStorage and applies the class before the first paint.
- **`data.ts` as single source of truth**: All CV text lives in one file. Components import from it and never hardcode text. This makes updates to the CV text a one-file change.
- **`SHOW_PHONE` boolean**: Allows the phone number to be hidden globally without touching JSX. A common need when sharing a portfolio publicly versus submitting to a recruiter.
- **`IntersectionObserver` for active nav pill**: Using a separate observer per section (with `rootMargin: "-30% 0px -60% 0px"`) means only the section that is centred in the viewport activates its pill. Using a single observer with one threshold is less precise on tall sections.
- **`color-mix(in srgb, var(--bg) 85%, transparent)` for header blur**: `color-mix` is the CSS-native way to produce a semi-transparent version of a CSS variable colour without hardcoding rgba values. This means the header background tracks theme changes automatically.
