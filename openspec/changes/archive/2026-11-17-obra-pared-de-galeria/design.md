# Design

## Context

`src/pages/obra/index.astro` pinta las 33 obras en `.gallery-grid` con `.obra-card` (4:3, `object-fit: cover`, borde, elevación al pasar el ratón; estilos globales en `Layout.astro`) y las filtra en cliente con un script que oculta tarjetas según `?categoria=`. Esos mismos estilos de tarjeta los usa también la home ("Obra reciente"), que **no cambia**. Las imágenes son URLs de Blogger con segmento `/s1600/`; `src/lib/img.ts` ya genera `srcset`. Las dimensiones del contenido (`"81x60"`) no indican la orientación, así que no sirven para colocar las obras. Astro 5.18 expone `inferRemoteSize` en `astro:assets`, que lee el ancho y el alto leyendo solo el principio del archivo, pero solo con dominios declarados en `image.domains`. Ver proposal.md para la motivación y los límites.

## Goals / Non-Goals

**Goals:**
- Obras enteras, en su proporción, sin saltos de layout y sin JavaScript para colocarlas.
- Salas por serie y saltos entre ellas con anclas.
- Build determinista: la caché de dimensiones se versiona y los fallos de red no rompen el build.

**Non-Goals:**
- Tocar la home, la ficha, la navegación anterior/siguiente o la paleta y la tipografía.
- Textos de presentación de las salas, tamaño relativo real por centímetros, migración de imágenes, CMS.

## Decisions

**1. Filas justificadas solo con CSS (flex), no con JavaScript.**
Cada obra es un elemento flex con `flex: <proporción> 1 calc(<proporción> * var(--altura-fila))` y `aspect-ratio: <proporción>`; la proporción (ancho/alto) la escribe el HTML como variable en línea. Las filas se parten solas y los elementos crecen hasta rellenar el ancho, de modo que las piezas de una fila comparten altura. Un pseudo-elemento final con `flex-grow` grande evita que la última fila se estire. La altura objetivo de fila baja en pantallas medias y en ≤640px el contenedor pasa a una columna.
*Alternativas:* maquetación en JavaScript (parpadeo y dependencia del cliente, contra el criterio de sitio estático); columnas tipo masonry (dejan huecos y no alinean alturas, lo descartado en el brief); `grid` con filas fijas (obliga a recortar).

**2. Las proporciones salen de `inferRemoteSize` al compilar, con caché versionada.**
Un helper en `src/lib/` devuelve `{width, height}` por URL de imagen: primero busca en `src/data/obra-dimensiones.json` (clave = URL canónica de la obra); si falta, mide la imagen con `inferRemoteSize` sobre la variante `/s400/` (mismo formato, descarga pequeña) y escribe la entrada si el sistema de archivos lo permite. Hay que añadir `blogger.googleusercontent.com` a `image.domains` en `astro.config.mjs`. El archivo de caché **se commitea**: así el build de Vercel no depende de la red ni de Blogger una vez rellena. Si una medición falla, se usa una proporción neutra (4:3), se avisa con el nombre de la obra y el build continúa. En la compilación de Vercel una entrada nueva se mide pero no se persiste, y por eso conviene compilar una vez en local y commitear la caché al añadir obras.
*Alternativas:* campo `ancho/alto` en cada obra (la propietaria no técnica tendría que rellenarlo); esperar a migrar las imágenes al repo (más lento y deja el catálogo como está).

**3. Estructura de la página.**
`/obra` = cabecera de página existente → navegación de salas (tres enlaces de ancla con los chips actuales) → tres `<section>` con `id` por serie (`estructuras`, `primeras-etapas`, `bocetos-y-dibujos`), cada una con un `h2` y su pared. Las series y su orden salen de una lista única en la página (la misma que ya relaciona slug y categoría), no del contenido; una serie sin obras no genera sala. Se mantiene el orden por fecha descendente dentro de cada sala. `scroll-margin-top` deja el título de sala bajo la cabecera fija de 80px.

**4. Compatibilidad `?categoria=`.**
Un script en línea de pocas líneas lee el parámetro: si coincide con el `id` de una sala, lleva a ella (`scrollIntoView` sin animación brusca; sin animación bajo movimiento reducido); si no, no hace nada. Sin JavaScript el enlace antiguo simplemente abre el catálogo desde el principio, que sigue siendo correcto. Se retira el resto del script de filtrado.

**5. Cada obra es un único enlace con cartela.**
El enlace envuelve imagen y cartela; la imagen lleva `alt=""` porque la cartela (título, técnica y dimensiones) ya nombra la obra, y así un lector de pantalla no la anuncia dos veces. El objetivo táctil es la obra entera (>44px). Se conserva `srcset` con `sizes` calculado por obra a partir de la altura objetivo de fila (el ancho esperado es la proporción por esa altura, acotado), y `loading="eager"` con `fetchpriority` solo para las primeras de la primera sala.

**6. Estilos.**
Se añade un bloque propio (`.sala`, `.pared`, `.pared-obra`) y se **dejan intactos** `.obra-card` y `.gallery-grid`, que usa la home; solo se retiran del catálogo. El reveal con fundido existente se aplica a las obras de la pared añadiendo su clase a la lista del observador y a la regla `prefers-reduced-motion` ya presente en `Layout.astro`. Sin sombras en reposo ni al pasar el ratón, como el resto del sistema (DESIGN.md: "Flat-By-Default"); el marco con borde se retira del catálogo.

**7. Movimiento y móvil.**
La entrada de cada obra es el fundido de 0.65s con desplazamiento de 24px que ya usan las tarjetas; con `prefers-reduced-motion` pasa a un fundido de 0.25s sin desplazamiento. En ≤640px las obras van a ancho completo, una por fila, en su proporción (sin altura de fila fija); el desplazamiento al ancla no usa animación suave bajo movimiento reducido.

## Risks / Trade-offs

- **La caché de dimensiones queda desfasada si se cambia una imagen** → la clave es la URL; cambiar la URL provoca una medición nueva, y reutilizar la misma URL con otra imagen es un caso que se documenta en CLAUDE.md (borrar la entrada).
- **Una fila de pocas obras puede crecer demasiado** → el `flex-grow` reparte el espacio sobrante de la fila; se acota con un `max-width` por obra derivado de una altura máxima (440px en escritorio, 360px en pantallas medias). Una fila que necesitaría más queda alineada a la izquierda sin llegar al borde; con las 33 obras reales ocurre en pocas filas y se acepta frente a obras desproporcionadas. La altura base de fila es 280px (220px en pantallas medias) y es la que conserva la última fila de cada sala.
- **Cambia la jerarquía visual de `/obra`** (sin tarjetas) → se alinea con DESIGN.md, que se actualiza, y la home mantiene tarjetas; se señala la diferencia en la documentación para que no parezca una incoherencia.
- **El build depende de la red solo para obras nuevas** → en Vercel una medición fallida degrada a 4:3 con aviso en lugar de romper.
- **Un valor de `?categoria=` en la barra del navegador sin salto con JavaScript desactivado** → aceptable, se abre el catálogo entero.

## Open Questions

- ¿Quieres que Concha pueda escribir en el futuro una frase de presentación por sala? Hoy no existe el contenido y no se muestra nada; añadirlo después no cambia lo especificado aquí.
- ¿Merece la pena escalar las obras por sus centímetros reales? Hoy se descarta; se reabre si las medidas del contenido pasan a indicar la orientación.
