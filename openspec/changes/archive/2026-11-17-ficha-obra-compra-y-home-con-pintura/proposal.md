# Proposal

## Why

El objetivo del sitio es vender obra original, pero hoy la ficha de cada obra termina en "← Anterior / Siguiente →": no tiene precio ni disponibilidad, ni acción alguna. Quien se enamora de un cuadro tiene que ir a Contacto y reescribir el título a mano, o encontrar por casualidad el enlace pequeño de Artelista del footer (que además usa `http://`). Además, la home abre con 70vh de degradado, nombre y una cita de tres líneas, sin ninguna pintura en la primera vista, contra el principio de PRODUCT.md de que "las pinturas lideran". Origen: critique de Impeccable del 2026-11-17 (`.impeccable/critique/2026-11-17T09-37-10Z__src-pages-index-astro.md`, problemas P1).

## What Changes

**Prioridad 1: camino de consulta en la ficha de obra** (`src/pages/obra/[slug].astro`)
- Botón principal "Consultar esta obra": enlace `mailto:` a la dirección de contacto existente, con asunto y cuerpo prellenados con título, técnica, dimensiones y la URL de la obra.
- Enlace secundario "Ver en Artelista" a la tienda, por `https`.
- Campo opcional `disponibilidad` (`Disponible` / `Vendida` / `Consultar`) en el esquema de obras (`src/content.config.ts`), mostrado en la cartela de la ficha. Al ser opcional, las 33 obras actuales siguen siendo válidas sin tocarlas.

**Prioridad 2: primera vista de la home con una pintura** (`src/pages/index.astro`)
- La primera vista muestra una pintura grande, completa y sin recortar.
- La cita del crítico (texto y atribución idénticos) pasa a una línea menor bajo la pintura.
- La obra mostrada se elige desde el contenido (campo opcional `portada`, con la obra más reciente como respaldo), no por un índice fijo en el código.

**Se conserva** (comportamiento actual que no cambia): breadcrumb, enlace "Volver", navegación anterior/siguiente y recuadro `destacada` de la ficha; el texto y la atribución de la cita; el título "Concha Lorente" y el subtítulo "Pinturas"; la animación de entrada escalonada del hero y el comportamiento con `prefers-reduced-motion`; la galería "Obra reciente" y la banda "Sobre la artista".

**Fuera de alcance**: rediseño de la rejilla de obras a "pared de galería" (decidido, irá en un cambio aparte); migración de imágenes fuera de Blogger; CMS; legibilidad y anillo de foco; página 404 y estado vacío del filtro; precios en euros (no existen en el contenido); cambios en la página de Contacto.

## Capabilities

### New Capabilities
- `obra-consulta`: cómo una persona interesada en una obra concreta la consulta o la compra desde su ficha (acción principal de consulta, enlace a la tienda y disponibilidad visible).
- `home-primera-vista`: qué muestra la home en su primera vista (una pintura grande sin recortar, cita como línea menor) y cómo se elige esa pintura desde el contenido.

### Modified Capabilities
<!-- Ninguna: openspec/specs/ aún no contiene capacidades. -->

## Impact

- Código: `src/pages/obra/[slug].astro`, `src/pages/index.astro`, `src/content.config.ts`; posible helper nuevo en `src/lib/`.
- Contenido: ninguna de las 33 obras necesita cambios; para marcar una obra como vendida o como portada se añadiría una línea al frontmatter de esa obra.
- Documentación: `DESIGN.md` (y `.impeccable/design.json`) deben reflejar los componentes nuevos; `README.md` debe documentar los campos `disponibilidad` y `portada`.
- Sin dependencias nuevas, sin JavaScript de cliente nuevo.
