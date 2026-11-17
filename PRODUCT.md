# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences, confirmed by the owner:
- **Buyers and collectors:** look at the work and either get in touch or go to the Artelista shop to buy original pieces. This is the primary audience.
- **Galleries, curators and critics:** assess Concha's trajectory (exhibition history, critical quotes) to consider inviting her to exhibit.
- **Other painters and art enthusiasts:** discover and follow her style.

## Product Purpose

Portfolio website of Concha Lorente, a Madrid-born painter (mixed media, geometric synthesis, abstract compositions). It presents her work, her biography and exhibition record, and how to contact her or buy. Success is selling original work.

## Positioning

A painter's own site, migrated from the Blogspot blog, with the work organised into three series (ESTRUCTURAS, BOCETOS Y DIBUJOS, PRIMERAS ETAPAS) and backed by critical commentary and a long exhibition record (1997-2017).

## Operating Context

- Content is currently edited as Markdown files in the repo (one file per artwork). The long-term intent is that Concha, who is not technical, edits content herself; Pablo manages the repo in the meantime. A CMS (Decap, Tina or Keystatic) is under consideration, not decided.
- The production domain already exists: www.conchalorente.com.
- Artwork images are still hosted on Blogger (blogger.googleusercontent.com); moving them is pending.

## Capabilities and Constraints

- Astro 5, fully static, no client JS except the mobile menu toggle.
- Routes: `/`, `/obra`, `/obra/[slug]` (clean URLs, no `.md`), `/sobre-mi`, `/exposiciones`, `/contacto`, 404.
- Artwork schema: title, technique, dimensions, date, category (closed set of three), image, optional award/selection note, optional order.
- Purchase happens off-site at conchalorente.artelista.com; contact is by email.
- Language: Spanish.
- Undecided: CMS choice, where images will live, hosting/deploy details.

## Brand Commitments

- Name: "Concha Lorente - Pinturas".
- Existing critical quote on the home hero (Antonio Granados Valdés) is part of the identity and must not be altered.

## Evidence on Hand

- 30+ artworks with technique, dimensions and dates in `src/content/obras/`.
- Exhibition history 1997-2017 in `src/pages/exposiciones.astro`, including juried salons and certámenes.
- A critic's quote; a YouTube video of one exhibition (2014).
- No testimonials, sales figures or press clippings beyond these; do not invent any.

## Product Principles

- The paintings lead; the interface recedes.
- Selling is the success metric: the path from seeing a piece to contacting or buying must always be obvious.
- Credibility for galleries and critics comes from the real record (exhibitions, quotes), shown plainly.
- Content must stay maintainable by a non-technical owner.
- Keep the site static and light; do not add complexity the content does not need.
