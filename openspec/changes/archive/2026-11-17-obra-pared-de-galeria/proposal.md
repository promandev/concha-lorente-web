# Proposal

## Why

El catálogo `/obra` recorta todas las pinturas a 4:3 dentro de tarjetas blancas con elevación al pasar el ratón. Borra justo lo que define a un cuadro, su formato (hay obras desde muy apaisadas, como `botellas-y-espejo`, hasta verticales), y es el patrón de tienda o blog que DESIGN.md dice rechazar. Además mezcla las tres series por fecha, así que 20 obras de Estructuras, 10 de Primeras etapas y 3 de Bocetos no tienen presencia propia. Origen: critique de Impeccable del 2026-11-17 (problema "la rejilla es de tarjetas, no una pared de galería") y brief confirmado con `/impeccable shape`.

## What Changes

- `/obra` pasa a **tres salas seguidas**, una por serie (Estructuras, Primeras etapas, Bocetos y dibujos), cada una con su título.
- Dentro de cada sala, las obras se cuelgan en **filas justificadas**: las piezas de una fila comparten altura y cada una ocupa el ancho que le da su proporción, sin recorte. Sin marco de tarjeta, sin borde blanco redondeado y sin elevación al pasar el ratón; cada obra lleva debajo una cartela pequeña.
- Los **chips de filtro** pasan a ser saltos a cada sala (anclas, funcionan sin JavaScript). Los enlaces antiguos `/obra?categoria=<serie>` siguen funcionando: llevan a la sala correspondiente.
- Las **proporciones se leen al compilar** desde las imágenes de Blogger (el ancho y el alto reales) y se guardan en una caché versionada en el repositorio, para que el build no dependa de la red una vez rellena.
- Se retira el filtrado por JavaScript de la página, que ocultaba tarjetas.

**Se conserva:** la ficha de cada obra y su URL limpia; el orden por fecha dentro de cada serie; la categoría de cada obra; el menú, la paleta y la tipografía; las cartelas con título, técnica y dimensiones; la animación de entrada suave (con su variante de movimiento reducido).

**Fuera de alcance:**
- La rejilla "Obra reciente" de la home y su primera tarjeta duplicada de la portada (la home no cambia).
- La ficha de obra y su navegación anterior/siguiente (sigue ordenada por fecha entre series).
- Frases de presentación de cada sala: no existen en el contenido y no se inventan; queda para un cambio futuro si Concha las escribe.
- Tamaño relativo real de las obras por centímetros (las medidas del contenido no indican la orientación).
- Legibilidad, anillo de foco y escala tipográfica; migración de imágenes de Blogger; CMS.

## Capabilities

### New Capabilities
- `obra-catalogo`: cómo se presenta el catálogo de obras: salas por serie, obras en su proporción natural sin recortes ni marcos, navegación entre salas y compatibilidad con los enlaces antiguos de filtro.

### Modified Capabilities
<!-- Ninguna: el catálogo hoy no tiene spec principal; las capacidades existentes (obra-consulta, home-primera-vista) no cambian. -->

## Impact

- Código: `src/pages/obra/index.astro` (reescritura), `src/layouts/Layout.astro` (estilos de la pared y del filtro; retirar los de tarjeta que solo usaba el catálogo, sin tocar los que usa la home), `src/lib/` (helper de dimensiones), `astro.config.mjs` (dominio de imágenes permitido), `package.json` solo si se añade un script.
- Datos: nuevo archivo de caché de dimensiones (`src/data/`), a versionar.
- Documentación: `DESIGN.md` y `.impeccable/design.json` (componentes nuevos y la regla de "sin tarjeta" en el catálogo), `CLAUDE.md` (cómo regenerar la caché al añadir obras).
- Sin dependencias nuevas; el catálogo deja de usar JavaScript de cliente salvo el salto desde enlaces antiguos.
