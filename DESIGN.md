---
name: Concha Lorente - Pinturas
description: A painter's portfolio hung like a quiet gallery wall, in sage-tinted light.
colors:
  olive: "#517a3e"
  olive-deep: "#3c5e2c"
  forest-ink: "#1c2b1c"
  moss-grey: "#5b6b52"
  sage-paper: "#f3f7f0"
  sage-line: "#cfe0c8"
  sage-mist: "#e5f0e0"
  wall-white: "#ffffff"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "0.05em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1.3
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "2.5rem"
    fontWeight: 400
    lineHeight: 1.3
  title-sm:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1.3
  quote:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.8
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.7
  body-lead:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 300
    lineHeight: 1.7
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    letterSpacing: "0.1em"
  label-sm:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 500
    letterSpacing: "0.15em"
rounded:
  sm: "8px"
  md: "16px"
  pill: "100px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3rem"
  2xl: "4rem"
  section: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.forest-ink}"
    textColor: "{colors.wall-white}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 2.5rem"
  button-primary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.forest-ink}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.forest-ink}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 2.5rem"
  button-secondary-hover:
    backgroundColor: "{colors.forest-ink}"
    textColor: "{colors.wall-white}"
  chip-filter:
    backgroundColor: "transparent"
    textColor: "{colors.moss-grey}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1.25rem"
  chip-filter-active:
    backgroundColor: "{colors.forest-ink}"
    textColor: "{colors.wall-white}"
  card-obra:
    backgroundColor: "{colors.wall-white}"
    rounded: "{rounded.md}"
    padding: "1.25rem"
  nav-link:
    textColor: "{colors.moss-grey}"
    typography: "{typography.label}"
  nav-link-active:
    textColor: "{colors.forest-ink}"
  header:
    backgroundColor: "{colors.wall-white}"
    height: "80px"
---

# Design System: Concha Lorente - Pinturas

## Overview

**Creative North Star: "The Gallery Wall"**

The site is the exhibition room, not an exhibit. Light walls with a whisper of sage, each painting hung with generous air around it, captions set small and spaced like the cartela beside a frame. Every interface element exists to hold the work at the right distance and then step back. Nothing in the chrome competes with the paintings for colour or attention; the only saturated hue anywhere is a muted olive used for wayfinding.

The mood is serene and luminous, classical and literary, natural and discreet. Cormorant Garamond carries the literary register (the critic's quote in italic, titles in light serif), while a light-weight Inter keeps information quiet. The palette is entirely derived from one green family, so the site reads as a single calm surface whose tints shift only to separate wall, frame and caption. Density is low: wide section padding, centred page heroes, narrow reading columns.

The one confirmed rejection: the site must never look like a blog template. No post-list chronology, no sidebar widgets, no Blogspot residue. Works are presented as a collection, not as a feed.

**Key Characteristics:**
- One green family for everything: sage paper, forest ink, moss captions, olive wayfinding.
- Serif for voice (titles, quote), light sans for information (captions, metadata, navigation).
- Small uppercase labels with wide tracking (0.1–0.4em) as the cartela voice.
- Flat at rest; hairline sage borders define frames; lift appears only on hover.
- Soft geometry: 16px frames, pill-shaped actions and filters.
- Unhurried motion: content rises into place with a gentle fade.

## Colors

A monochrome green system: sage-tinted neutrals for the wall, a deep green-black for ink, and a single muted olive for wayfinding.

### Primary
- **Olive** (`olive`): the only accent. Used for text links, category labels on cards and detail pages, exhibition dates, formation years, the active-nav underline. Always text or a thin line, never a fill.
- **Deep Olive** (`olive-deep`): hover state for olive links. Exists only as a response to interaction.

### Neutral
- **Forest Ink** (`forest-ink`): body and heading text, and the fill of the primary pill button and the active filter chip. It doubles as the "solid" colour of the system: the darkest, most decisive element on any screen.
- **Moss Grey** (`moss-grey`): secondary text: subtitles, captions, technique lines, metadata terms, footer, inactive navigation and filters.
- **Sage Paper** (`sage-paper`): the page background, the wall itself.
- **Wall White** (`wall-white`): raised surfaces that hold content: sticky header, artwork cards, the image frame on detail pages, the "Sobre la artista" band on the home page, breadcrumbs bar, mobile menu.
- **Sage Line** (`sage-line`): every hairline border and divider (cards, header, footer, exhibition rows, filter chips), and the oversized 404 numeral.
- **Sage Mist** (`sage-mist`): the mat behind images while they load (card image areas, the home about-image).

Sage Mist is also the matte around the home hero painting and the highlight-callout background. In CSS it is `--color-mist`; every light sage tint in the site resolves to it, so there are no stray one-off greens.

### Named Rules
**The Olive Whisper Rule.** Olive is wayfinding, not decoration. It appears as text or a 2px line, never as a background fill or a large area, so the paintings stay the only colour event on the page.

**The One Family Rule.** Every colour in the chrome comes from the sage/olive/forest family. A new hue, a pure grey or a saturated tint is a break in the wall.

## Typography

**Display Font:** Cormorant Garamond (with Georgia, serif)
**Body Font:** Inter (with -apple-system, BlinkMacSystemFont, sans-serif)

**Character:** A literary serif in light weights paired with a whisper-weight sans. The serif speaks (names, titles, the critic); the sans informs (captions, metadata, navigation) and stays out of the way.

### Hierarchy
- **Display** (`display`): the artist's name on the home hero only, a compact line above the painting. Drops to 2rem at ≤768px.
- **Headline** (`headline`): page-hero titles (Obra, Exposiciones, Contacto, Sobre mí). Drops to 2rem at ≤768px.
- **Title** (`title`): section titles, the "Sobre la artista" heading and the artwork name on its detail page. Drops to 1.8rem at ≤768px. Bio sections use a 1.8rem variant with a hairline underline.
- **Title Small** (`title-sm`): artwork names on cards. Exhibition venues use a close 1.15rem variant.
- **Quote** (`quote`), always italic: the critic's quote on the home hero, set as a small supporting line (1rem) below the painting. Its text and attribution never change. The attribution switches to Inter at 0.8rem in moss grey.
- **Body** (`body`): running text. Body weight is 300 site-wide; 400 is reserved for links that need a touch more presence and for navigation.
- **Body Lead** (`body-lead`): page-hero intros, bio paragraphs, about-preview text. Reading columns are capped at 600–800px.
- **Label** (`label`), uppercase: main navigation. Buttons and filter chips use the same voice at 0.8rem (0.15em tracking on buttons, 0.05em on chips).
- **Label Small** (`label-sm`), uppercase: category tags and metadata terms (0.65–0.75rem, tracking 0.1–0.15em, weight 500). The hero subtitle "Pinturas" and logo subtitle push tracking to 0.3–0.4em.

### Named Rules
**The Cartela Rule.** Information about a work (category, technique, dimensions, date) is set small, in sans, uppercase or moss grey, like a wall label. The serif is never used for metadata.

**The Light Hand Rule.** Weights stay light: serif at 300–400, sans at 300 for body. Bold does not exist in this system; emphasis comes from size, case and tracking.

## Layout

A centred, single-column-of-intent layout inside a 1200px container with 2rem side gutters (1rem at ≤480px). Page heroes are centred with 4rem top padding; home sections breathe with 5rem vertical padding. Reading content narrows to 600px (contact), 700px (bio) or 800px (exhibitions) and stays centred.

The gallery is an auto-filling grid of cards at a 300px minimum column width with 2rem gaps (1rem at ≤480px), collapsing to one column at ≤640px. The artwork detail page splits 1.2fr image / 0.8fr information with a 4rem gap, stacking at ≤768px. The home "Sobre la artista" band is a 1:1 text/image split, also stacking at ≤768px. Exhibitions are a date/venue two-column list (200px date column) that stacks at ≤640px.

Interactive targets are at least 44px tall on nav links, filter chips and the menu toggle. Header is sticky, 80px tall, white, with a hairline bottom border; at ≤768px the navigation collapses behind a three-line toggle into a dropdown panel.

Breakpoints in use: 768px (navigation and two-column splits collapse), 640px (gallery and exhibition rows go single-column), 480px (gutters tighten).

### Named Rules
**The Air Around the Frame Rule.** Spacing steps up generously (1rem → 2rem → 3rem → 5rem); when in doubt, add air rather than another element. The wall is mostly empty on purpose.

## Elevation & Depth

Flat at rest, lifted on hover. Depth is conveyed by tonal layering (white frames on sage paper) and 1px sage hairlines, not by shadows. Shadows appear only as a response to interaction or for a floating overlay.

### Shadow Vocabulary
- **Hover lift** (`--shadow-lift`: `box-shadow: 0 20px 50px rgba(0,0,0,0.1)` with `translateY(-6px)`): artwork cards on hover, as if the frame comes off the wall toward the viewer.
- **Menu drop** (`--shadow-menu`: `box-shadow: 0 8px 24px rgba(0,0,0,0.08)`): the mobile navigation panel, the only element that floats over content.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to state (hover) or for a true overlay (mobile menu). No resting drop shadows on cards, images or sections.

## Shapes

Softly rounded, never sharp, never bubbly. Frames (cards, the detail image, the about-image, the mobile menu's lower corners) use the 16px radius; small inset elements (collaboration thumbnail, highlight callout) use 8px. Every action and filter is a full pill. Borders are always 1px Sage Line; the only thicker strokes are the 2px pill-button border, and the 2px active-nav underline.

## Components

### Buttons
Refined and restrained: present but discreet, like the cartela beside a painting.
- **Shape:** full pill (`rounded.pill`) with a 2px Forest Ink border, at least 44px tall. One shared `.btn` / `.btn-secondary` definition in the global layout serves the home, the artwork page and the 404.
- **Primary:** Forest Ink fill, Wall White text, uppercase label voice at 0.8rem with 0.15em tracking (`button-primary`).
- **Hover:** inverts to a transparent fill with Forest Ink text over 0.3s ease.
- **Secondary / Ghost:** transparent with Forest Ink text and border; fills with Forest Ink on hover (`button-secondary`). Used for "Ver todas las obras" below the gallery, "Ver en Artelista" and the 404's "Volver al inicio".
- **Focus:** no dedicated focus style exists yet; the browser default outline applies. A "Saltar al contenido" skip link (forest-ink pill) appears at the top-left on keyboard focus.

### Chips
- **Style:** category filters above the gallery: transparent pill with a 1px Sage Line border, Moss Grey uppercase text at 0.8rem / 0.05em (`chip-filter`).
- **State:** hover and active invert to a Forest Ink fill with Wall White text (`chip-filter-active`). Active state follows the `?categoria=` query parameter.

### Cards / Containers
- **Corner Style:** gently rounded frame (`rounded.md`), image clipped inside.
- **Background:** Wall White, with the image area on a Sage Mist mat at a fixed 4:3 ratio, image `object-fit: cover`.
- **Shadow Strategy:** flat at rest; Hover Lift on hover (see Elevation & Depth), with the image zooming to 1.03 over 0.5s.
- **Border:** 1px Sage Line.
- **Internal Padding:** 1.25rem around the caption block: title in `title-sm`, technique and dimensions in 0.8rem Moss Grey, category in olive `label-sm`.

### Navigation
- **Desktop:** uppercase Inter labels (`label`) in Moss Grey, 2rem apart, with a transparent 2px bottom border. Hover and current page turn Forest Ink with an Olive underline.
- **Mobile (≤768px):** three-line toggle (24×2px Forest Ink bars) opens a white dropdown panel under the header with Menu Drop shadow and 16px lower corners; links stack 1rem apart.
- **Logo:** the name in Cormorant at 1.5rem with 0.05em tracking, over "PINTURAS" in 0.7rem Inter with 0.3em tracking.
- **Breadcrumbs (artwork detail):** a white bar with hairline border; 0.8rem Moss Grey links, Sage Line "›" separators, current item in Forest Ink weight 500, truncated at 260px.

### Hero Painting
The first thing on the home page is the work itself: the artist's name and "Pinturas" as a compact line, then one painting in a fixed-height frame (`min(58vh, 520px)`, 16px radius, 1px Sage Line border) shown whole (`object-fit: contain`) on a Sage Mist matte, so any proportion fits and the space is reserved before the image loads. A cartela below carries the title (Cormorant, linking to the work) and technique and size (small Moss Grey sans). The critic's quote and the "Ver obra completa" pill follow, below the painting. The painting is chosen from content (`portada: true`, else the most recent work).

### Highlight Callout
For a work's award or selection note (`destacada`): Sage Mist panel with a 1px Sage Line border, 8px corners and italic 0.9rem Moss Grey text. No accent stripe: it reads as a quiet wall label, not an alert.

### Artwork Metadata
A two-column definition list: uppercase `label-sm` terms in Moss Grey, 0.95rem values in Forest Ink, 0.5rem × 1.5rem gaps. Technique, dimensions and date are always present; "Disponibilidad" (Disponible / Vendida / Consultar) appears as a fourth row only when the artwork defines it. Followed by the artwork actions, then previous/next links in olive separated by a hairline rule.

### Artwork Actions
The path from seeing a painting to enquiring about it, directly under the metadata. A stacked pair at most 22rem wide: a primary pill "Consultar esta obra" (a `mailto:` prefilled with title, technique, dimensions and the page address; "Consultar obra similar" when the work is sold) over a ghost pill "Ver en Artelista" (opens the shop in a new tab). No motion of their own and no resting shadow.

### Exhibition Row
A date/venue pair: date in olive at 0.85rem weight 500, venue in Cormorant at 1.15rem, address in Moss Grey, optional italic olive note and an underlined olive "Ver exposición en YouTube →" link. Rows are separated by Sage Line hairlines.

### Motion
Gentle and unhurried, all on the CSS `ease` curve. The home hero rises in sequence (name, subtitle, painting, quote, button) with `fadeInUp` over 0.9s, staggered at 0.05s, 0.22s, 0.4s, 0.6s and 0.75s. Cards, section titles, bio sections, exhibition rows and the about block fade up 24px over 0.65s as they enter the viewport, cards staggered by column (0.12s steps). Interaction transitions are 0.2s for links and navigation and 0.3s for buttons and cards. Under `prefers-reduced-motion: reduce` the translate, smooth scrolling, stagger delays and image zoom are removed and only a 0.25s opacity fade remains, so state changes still register.

## Do's and Don'ts

### Do:
- **Do** keep every chrome colour inside the sage/olive/forest family; the paintings are the only colour events.
- **Do** use olive only as text or thin rules (2px) for wayfinding: links, categories, dates, active states.
- **Do** set artwork metadata like a wall label: small sans, uppercase with wide tracking (0.1–0.15em), Moss Grey.
- **Do** frame images in Wall White with a 1px Sage Line border and a 16px radius, on a Sage Mist mat while loading.
- **Do** keep surfaces flat at rest and reserve shadows for hover lift and the mobile menu overlay.
- **Do** make actions and filters full pills with a Forest Ink fill or border.

### Don't:
- **Don't** make it look like a blog template: no post-list chronology, no sidebar widgets, no Blogspot-style archive or date headers driving the layout.
- **Don't** use bold weights; hierarchy comes from size, case and tracking.
- **Don't** fill large areas or buttons with olive; Forest Ink is the solid colour.
- **Don't** add resting drop shadows to cards, images or sections.
- **Don't** introduce sharp square corners on interactive elements.
- **Don't** set metadata or captions in the serif; Cormorant is for names, titles and quotes.
