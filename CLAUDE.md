# CLAUDE.md — Concha Lorente web

Portfolio de la pintora Concha Lorente (migrado desde Blogspot). Astro 5 estático + Content Collections (Markdown). Sin CMS por ahora.

## Idioma
- Habla con el usuario en **español**. Contenido del sitio en español.
- Código, commits y nombres técnicos: como ya está en el repo (código en inglés/español mixto; no renombres por renombrar).

## Comandos
- `npm run dev` (http://localhost:4321) · `npm run build` (genera `dist/`) · `npm run preview`
- No hay tests ni linter: la verificación mínima es `npm run build` sin errores.
- **Windows:** ejecuta el build/preview desde una ruta con la unidad en MAYÚSCULA (`D:\Developement\...`). Desde `d:\...` (minúscula, como la abre a veces la shell) `npm run build` termina sin errores pero genera el HTML **sin CSS**. Comprueba que `dist/_astro/*.css` existe tras compilar.

## Estructura
- `src/content/obras/*.md` — una obra por archivo; schema en `src/content.config.ts`.
- `src/layouts/Layout.astro` — header, footer y CSS global.
- `src/pages/` — index, obra/, exposiciones, contacto, 404.

## Reglas
- No rompas las URLs limpias de las obras ni el schema sin migrar todos los `.md`.
- Imágenes: hoy remotas (Blogger). No asumas que son locales.
- Sin JS de cliente salvo necesidad clara; el sitio es estático a propósito.
- No hagas commit ni push salvo que el usuario lo pida.

## Flujo de trabajo
- **OpenSpec** para cambios no triviales: `/opsx:propose "idea"` → `/opsx:apply` → `/opsx:archive`. `/opsx:explore` para pensar antes. Config en `openspec/config.yaml`.
- **Impeccable** para todo trabajo de diseño/UI (skill global `impeccable`). Contexto en `PRODUCT.md` y `DESIGN.md` (raíz); si no existen, inicializar primero.
- **Codegraph** (MCP global) para explorar código antes de editar.

## Catálogo `/obra` y caché de dimensiones
- `/obra` cuelga las obras en filas justificadas y necesita la proporción real de cada imagen. Se mide al compilar (`src/lib/dimensiones.ts`) y se guarda en `src/data/obra-dimensiones.json`, que **se versiona**: con la caché completa el build no usa la red.
- **Al añadir una obra o cambiar la URL de su imagen:** compila en local (`npm run build`, desde `D:\...` en mayúscula), comprueba que `src/data/obra-dimensiones.json` ha cambiado y commitéalo junto con la obra.
- **Si reutilizas la misma URL para otra imagen distinta:** borra su entrada del JSON y vuelve a compilar; la clave es la URL y, si no cambia, se seguiría usando la proporción antigua.
- Si la entrada falta en Vercel, se mide al vuelo (build más lento) y no se guarda. Si no se puede medir, la obra se coloca en 4:3 y el build avisa con su título (`[dimensiones] No se pudo medir…`).
