# Tasks

> Nota para compilar y comprobar en Windows: usar una ruta con la unidad en mayúscula (`D:\Developement\...`); desde `d:\...` el build termina sin errores pero el HTML sale **sin CSS** (ver CLAUDE.md).

## 1. Dimensiones de las imágenes al compilar

- [x] 1.1 Añadir `blogger.googleusercontent.com` a `image.domains` en `astro.config.mjs`; verificar que `npm run build` sigue generando las 39 páginas.
- [x] 1.2 Crear en `src/lib/` el helper de dimensiones (lee `src/data/obra-dimensiones.json`, mide con `inferRemoteSize` sobre la variante `/s400/` si falta una entrada, la escribe y, si falla, devuelve 4:3 con un aviso que nombra la obra); verificar con un script de Node/Astro que una URL real devuelve ancho y alto enteros y que una URL inválida devuelve la proporción de reserva sin lanzar.
- [x] 1.3 Generar la caché de las 33 obras compilando una vez en local; verificar que `src/data/obra-dimensiones.json` tiene 33 entradas con ancho y alto > 0, y que una segunda compilación con la red desconectada (o la URL de Blogger bloqueada) no intenta descargar nada ni falla.

## 2. Pared de galería en `/obra`

- [x] 2.1 Reescribir `src/pages/obra/index.astro` con tres salas por serie (orden Estructuras, Primeras etapas, Bocetos y dibujos; fecha descendente dentro de cada una; sin sala para series vacías), cada obra como un único enlace con imagen (`alt=""`, `srcset`, `sizes`, proporción en línea) y cartela con título, técnica y dimensiones; verificar en `dist/obra/index.html` que cada una de las 33 obras aparece exactamente una vez, en la sala de su categoría.
- [x] 2.2 Añadir en `Layout.astro` los estilos `.sala`, `.pared` y `.pared-obra` (filas justificadas con `flex`, `aspect-ratio`, relleno final que impide estirar la última fila, sin borde ni sombra ni elevación, color Sage Mist mientras carga) sin modificar `.obra-card` ni `.gallery-grid`; verificar que la home sigue idéntica comparando su HTML y su CSS aplicado con `git diff` y que `impeccable detect` no da hallazgos nuevos.
- [x] 2.3 Revisar `/obra` en 1280×800 con Edge headless (build servido en `D:`), comprobando que `botellas-y-espejo` y una obra vertical se ven enteras, que las filas comparten altura y que la última fila no se estira; dejar anotado el resultado.

## 3. Navegación entre salas y enlaces antiguos

- [x] 3.1 Convertir los chips de filtro en enlaces de ancla a cada sala (`#estructuras`, `#primeras-etapas`, `#bocetos-y-dibujos`) con `scroll-margin-top` bajo la cabecera de 80px y sin el script de filtrado; verificar en el HTML que los enlaces apuntan a `id` existentes y que con JavaScript desactivado (Edge `--disable-javascript` o inspeccionando el HTML) todas las obras están presentes.
- [x] 3.2 Añadir el script mínimo de compatibilidad `?categoria=<serie>` (salta a la sala si coincide; si no, no hace nada); verificar abriendo `/obra?categoria=bocetos-y-dibujos` y `/obra?categoria=otra-cosa` y comprobando el resultado, sin errores en consola.

## 4. Móvil y movimiento reducido

- [x] 4.1 Añadir el comportamiento de ≤640px (una obra por fila a ancho completo y en su proporción) y la altura objetivo de fila para pantallas medias; verificar a 390px de ancho (iframe en Edge headless) que no hay desbordamiento horizontal y que las obras se ven enteras.
- [x] 4.2 Añadir las obras de la pared al reveal existente y a la regla de `prefers-reduced-motion` de `Layout.astro` (fundido corto sin desplazamiento; el salto al ancla sin animación suave bajo movimiento reducido); verificar leyendo el CSS generado que las nuevas clases quedan cubiertas.
- [x] 4.3 Comprobar los extremos de proporción (`botellas-y-espejo`, `invierno`) en 1280×800 y 390 de ancho: ninguna obra se desborda ni supera una altura razonable (`max-height`); dejar anotado el resultado.

## 5. Documentación

- [x] 5.1 Actualizar `DESIGN.md` y `.impeccable/design.json` (componentes Sala y Pared de obras, la regla "sin tarjeta" en el catálogo frente a las tarjetas de la home, cartela bajo la obra); verificar con `impeccable doctor` que no hay desfase.
- [x] 5.2 Documentar en `CLAUDE.md` cómo se regenera la caché de dimensiones al añadir obras o cambiar una imagen (compilar en local, commitear `src/data/obra-dimensiones.json`, borrar la entrada si se reutiliza la URL); verificar siguiendo los pasos tal como están escritos con una obra de prueba temporal.

## 6. Verificación final

- [x] 6.1 Ejecutar `npm run build` desde `D:\Developement\concha-lorente-web` y verificar que termina sin errores, con 39 páginas y la hoja de estilos generada en `dist/_astro/`.
- [x] 6.2 Ejecutar `impeccable detect --json src` y verificar que solo aparecen los hallazgos ya conocidos (Inter documentado y avisos de tamaño de fuente), sin `side-tab` ni otros nuevos.
- [x] 6.3 Recorrer `/obra` (escritorio y 390px), la home y una ficha, confirmando los escenarios de la especificación `obra-catalogo` y que la home y la ficha no cambian; dejar anotado qué no se pudo comprobar visualmente.
  - Comprobado: `/obra` en 1280 y 900 de ancho y en un móvil emulado de 390px (CDP de Edge): sin desbordamiento, 33 obras a 358px de ancho en móvil con desvío de proporción 0,01%, alturas dentro de los topes (máximo 440px en escritorio, 360px en tablet), `botellas-y-espejo` e `invierno` enteras; anclas con el título de sala a 104px bajo la cabecera de 80px; `?categoria=` válido salta y reescribe a `#slug`, valor desconocido no hace nada; sin JavaScript hay 33 obras visibles; movimiento reducido: sin transformación y solo fundido de 0,25s; el HTML de la home, la ficha, Sobre mí, Contacto, Exposiciones y 404 es idéntico al del commit anterior salvo los bloques `<style>`/`<script>` del layout.
  - No comprobado: errores de consola (no se capturaron), lectores de pantalla, el aspecto en navegadores distintos de Edge, y el comportamiento táctil real.
  - Observaciones: algunas filas no llegan al borde derecho cuando ensancharlas pasaría el tope de altura (recogido en la especificación y el diseño); la última fila de cada sala queda a 280px, más baja que las intermedias; los avisos de tamaño de fuente del detector suben de 31 a 34.

## Workflow follow-up

- Revisar el resultado con Concha antes de archivar; archivar el cambio solo cuando esté verificado.
- Abrir, si Concha lo desea, un cambio futuro con frases de presentación por sala.
