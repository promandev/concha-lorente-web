# Design

## Context

Sitio Astro 5 estático; las obras son Markdown con esquema Zod en `src/content.config.ts` y las imágenes siguen en Blogger (ver `src/lib/img.ts`, que ya genera `srcset`). La ficha ([slug].astro) es hoy: breadcrumb, enlace "Volver", imagen y panel con categoría, `h1`, lista de metadatos, recuadro `destacada` y navegación anterior/siguiente. La home abre con `.hero` de 70vh centrado (nombre, subtítulo, cita, botón) y la animación `fadeInUp` escalonada, definida en `index.astro` y **no cubierta** por la regla `prefers-reduced-motion` de `Layout.astro`, que solo afecta a los elementos de scroll-reveal. Motivación y alcance: ver proposal.md.

## Goals / Non-Goals

**Goals:**
- La ficha ofrece una acción de consulta con datos prellenados, un enlace a la tienda y la disponibilidad, sin JavaScript nuevo.
- La home pone una pintura entera en la primera vista, con la cita como apoyo.
- Todo se edita desde el frontmatter de las obras, sin tocar código.

**Non-Goals:**
- Formulario de contacto, backend, carrito o precios.
- Cambiar el catálogo, la rejilla o la página de Contacto.
- Migrar las imágenes de Blogger.

## Decisions

**1. La consulta es un `mailto:` con asunto y cuerpo codificados.**
Es lo que ya usa Contacto, no necesita backend ni JS y funciona con el cliente de correo del visitante. Se construye con `encodeURIComponent` (espacios como `%20`, no `+`) para que acentos, comillas y "&" lleguen intactos. El cuerpo incluye título, técnica, dimensiones y la URL de la ficha, tomada de `Astro.url`/`Astro.site`.
*Alternativas:* formulario con Resend (fuera de alcance, requiere backend y la propietaria no lo mantendría); enlace a `/contacto?obra=…` (añade un paso y una página que leería el parámetro con JS).

**2. `disponibilidad` y `portada` son campos opcionales en el esquema.**
`z.enum(['Disponible','Vendida','Consultar']).optional()` y `z.boolean().optional()`. Opcionales para que las 33 obras sigan válidas; un enum cerrado hace que un error tipográfico falle el build con un mensaje claro (cubre la edición por una persona no técnica). Se evita añadir precios porque el contenido no los tiene y no se inventan.
*Alternativa:* campo libre de texto: más flexible, pero permitiría "vendido/Vendido/sold" y rompería la lógica del botón.

**3. El botón cambia con `Vendida`.**
Con `Vendida`, la acción principal es "Consultar obra similar" y el asunto lo dice, en vez de ocultarla, porque una obra vendida sigue siendo una oportunidad de venta para trabajos parecidos. *Alternativa:* ocultar la acción en obras vendidas, que deja un callejón sin salida otra vez.

**4. Composición de la acción en la ficha.**
El panel de información pasa a: categoría → título → cartela (con la fila de disponibilidad) → **acciones** → recuadro `destacada` → anterior/siguiente. Así la acción queda visible sin desplazarse en escritorio y justo bajo la cartela en móvil (donde la imagen va primero). Estilo según DESIGN.md: píldora con relleno Forest Ink para la principal; la secundaria como píldora fantasma (mismo patrón que `button-secondary`). Los dos botones comparten una clase con la definición que hoy está repetida en `index.astro` y `404.astro`; se mueve a `Layout.astro` para tener una sola fuente.

**5. Home: pintura al frente, sin recorte.**
Estructura de la primera vista, de arriba abajo: título y subtítulo compactos, la pintura con `max-height: 70vh` y `object-fit: contain` sobre el fondo, cartela (título enlazado a la ficha), la cita en una línea menor (≈1rem, cursiva Cormorant) y el botón "Ver obra completa". La obra se elige en la propia página de Astro: primera con `portada: true`, o la más reciente. Esto sustituye al índice fijo (`obrasOrdenadas[2]`) que la banda "Sobre la artista" usa hoy; esa banda **se queda como está** salvo que debe elegir una obra distinta de la portada para no repetirla.
*Alternativa:* hero a dos columnas (texto a un lado, obra al otro). Descartada: en móvil volvería a poner el texto antes que la pintura.

**6. Carga y layout sin saltos.**
La imagen de portada va `eager`, `fetchpriority="high"` y con `srcset` de `imgSrcset` (anchos 800/1200/1600). Como no se conoce la proporción de cada cuadro (la cadena `dimensiones` no indica la orientación de forma fiable), el contenedor reserva un `min-height` con el color Sage Mist, y el resto de la página queda por debajo del pliegue para que la carga no lo desplace.

**7. Movimiento.**
La entrada de la primera vista conserva el `fadeInUp` actual. Se neutraliza con una regla `prefers-reduced-motion` en el propio `<style>` de `index.astro` (sin desplazamiento, solo un fundido de 0.25s), porque hoy no está cubierta. Va junto a las animaciones y no en `Layout.astro` porque una regla global no gana en especificidad a las reglas con ámbito del componente sin recurrir a `!important`. En móvil la animación es la misma y no hay interacciones al pasar el ratón en las acciones nuevas.

## Risks / Trade-offs

- **Un cliente de correo no configurado no abre nada con `mailto:`** → el correo visible sigue en Contacto; se deja el texto "Consultar esta obra" y, como segunda vía, el enlace a la tienda.
- **Cuerpo del `mailto:` muy largo en la URL** → se limita a cinco líneas cortas; no se incluye la descripción de `destacada`.
- **Un cuadro muy apaisado o muy alto cambia el aspecto de la portada** → `max-height: 70vh` con `object-fit: contain` y `min-height` reservado; se revisa en 1280×800 y en 390 de ancho con las obras más extremas del catálogo.
- **Host canónico del sitio** (`astro.config.mjs` usa `https://conchalorente.com`, PRODUCT.md habla de `www.conchalorente.com`) → la URL del correo se construye desde `site`; si el host canónico es otro, el enlace de la ficha dentro del correo apuntaría al host equivocado hasta corregir la configuración.
- **La hero actual con la cita deja de ser el primer elemento** → la cita no cambia ni de texto ni de atribución y sigue dentro de la primera vista.

## Open Questions

- ¿El host canónico es `conchalorente.com` o `www.conchalorente.com`? Solo afecta a la URL incluida en el cuerpo del correo y se corrige en `astro.config.mjs` sin tocar nada más.
- Resuelta durante el diseño: `http://` y `https://conchalorente.artelista.com` responden con un 301 a `https://www.artelista.com/@conchalorente` (comprobado el 2026-11-17). El enlace de la ficha usa esa URL final. Contacto y el footer siguen enlazando la dirección antigua; unificarlos queda fuera de este cambio.
