# Tasks

## 1. Esquema de contenido

- [x] 1.1 Añadir `disponibilidad` (enum `Disponible` | `Vendida` | `Consultar`, opcional) y `portada` (boolean, opcional) a `src/content.config.ts`; verificar que `npm run build` sigue generando las 39 páginas sin tocar ninguna obra.
- [x] 1.2 Probar el rechazo: poner temporalmente `disponibilidad: Vendido` en una obra y verificar que el build falla con un error que nombra el campo y la obra; revertir el cambio y verificar que el build vuelve a pasar.
- [x] 1.3 Documentar ambos campos en `README.md` (sección "Añadir una nueva obra"): valores permitidos y para qué sirve cada uno; verificar que un ejemplo del README coincide con el esquema.

## 2. Ficha de obra: camino de consulta

- [x] 2.1 Crear un helper en `src/lib/` que construya el enlace `mailto:` (asunto y cuerpo con título, técnica, dimensiones y URL de la ficha, codificados con `encodeURIComponent`); verificar con un script de Node que "Cudillero" y un título con acentos, comillas y "&" producen un enlace que decodifica al texto original.
- [x] 2.2 En `src/pages/obra/[slug].astro`, mostrar la fila "Disponibilidad" en la cartela solo cuando el campo exista; verificar en `dist/` que una obra con el campo la muestra y que una sin él no.
- [x] 2.3 Añadir las acciones al panel de la ficha, entre la cartela y el recuadro `destacada`: "Consultar esta obra" (o "Consultar obra similar" si `Vendida`) y "Ver en Artelista" (`https://www.artelista.com/@conchalorente`, pestaña nueva, `rel="noopener noreferrer"`); verificar en el HTML generado de dos obras (una `Vendida`, otra sin campo) los textos y los `href`.
- [x] 2.4 Mover la definición de botón píldora repetida en `index.astro` y `404.astro` a `src/layouts/Layout.astro` como una única clase compartida, sin cambiar el aspecto actual; verificar que el `grep` de la clase antigua en esas páginas ya no devuelve definiciones duplicadas y que `npm run build` pasa.
- [x] 2.5 Estilar las acciones según DESIGN.md (píldora, Forest Ink sólido la principal, fantasma la secundaria, ≥44px de alto, sin sombra en reposo, sin animación propia) y comprobar el orden de tabulación; verificar con `impeccable detect` sin hallazgos nuevos y revisando el HTML que las acciones preceden a anterior/siguiente.
- [x] 2.6 Revisar la ficha en 1280×800 y 390 de ancho (con una obra de título largo) y comprobar que la acción principal es visible sin desplazarse en escritorio y justo bajo la cartela en móvil; dejar anotado el resultado en esta tarea.
- [x] 2.7 Actualizar `DESIGN.md` y `.impeccable/design.json` con los dos botones y la fila de disponibilidad; verificar con `impeccable doctor` que no hay desfase.

## 3. Home: pintura en la primera vista

- [x] 3.1 En `src/pages/index.astro`, elegir la obra de portada (primera con `portada: true`, o la más reciente) y hacer que la banda "Sobre la artista" use una obra distinta de la portada; verificar en `dist/index.html` que la imagen de portada y la de la banda son distintas, con y sin `portada` en el contenido.
- [x] 3.2 Rehacer la primera vista: título y subtítulo compactos, pintura completa (`object-fit: contain`, `max-height: 70vh`, `eager`, `fetchpriority="high"`, `srcset` 800/1200/1600, espacio reservado con Sage Mist), cartela con el título enlazado a la ficha, cita en línea menor y botón "Ver obra completa"; verificar en `dist/index.html` que el HTML contiene la cartela enlazada y que la cita es idéntica al texto anterior (comparar con `git diff`).
- [x] 3.3 Neutralizar `fadeInUp` de la home con `prefers-reduced-motion` (fundido corto, sin desplazamiento) en el `<style>` de `index.astro`, junto a las animaciones del hero (en `Layout.astro` no gana en especificidad a las reglas con ámbito); verificar leyendo el CSS generado que la animación del hero queda cubierta.
- [x] 3.4 Revisar la home en 1280×800 y 390 de ancho con la obra de portada más apaisada y la más alta del catálogo, comprobando que la pintura aparece entera en la primera pantalla y que el contenido de debajo no salta al cargar; dejar anotado el resultado.
- [x] 3.5 Actualizar `DESIGN.md` (Overview/Components: hero con pintura y cita como línea menor) y `.impeccable/design.json`; verificar con `impeccable doctor`.

## 4. Verificación final

- [x] 4.1 Ejecutar `npm run build` y verificar que termina sin errores con las 39 páginas.
- [x] 4.2 Ejecutar `impeccable detect --json src` y verificar que no aparecen hallazgos distintos de los ya conocidos (Inter documentado y avisos de tamaño de fuente).
- [x] 4.3 Recorrer a mano la ficha de al menos tres obras (sin campo, `Disponible` y `Vendida`) y la home, confirmando los escenarios de ambas especificaciones; dejar anotado qué no se pudo comprobar visualmente.
  - Comprobado: ficha sin campo (Cudillero), `Disponible` (Playa) y `Vendida` (Cudillero) con obras de prueba temporales ya revertidas; `mailto:` decodificado; orden de tabulación en el HTML; home con y sin `portada`, con la obra más apaisada (`botellas-y-espejo`) y una apaisada alta (`invierno`) en 1280×800 y a 390 de ancho (iframe en Edge headless); cita idéntica a la original.
  - No comprobado: que un cliente de correo real abra el `mailto:` con el texto prellenado; el comportamiento con `prefers-reduced-motion` activado en un navegador (solo se verificó el CSS generado); el anillo de foco al tabular (sigue el del navegador); lectores de pantalla.
  - Avisos de tamaño de fuente del detector: suben de 28 a 31 por los tamaños de la nueva primera vista; siguen sin escala documentada en DESIGN.md.

## Workflow follow-up

- Revisar el resultado con la propietaria antes de archivar; archivar el cambio solo cuando esté verificado.
- Abrir un cambio aparte para la rejilla de obras en formato "pared de galería" (decidido en el critique, fuera de este alcance).
