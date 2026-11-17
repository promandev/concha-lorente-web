# Concha Lorente - Pinturas

Sitio web de la pintora Concha Lorente. Migrado desde [concha-lorente.blogspot.com](https://concha-lorente.blogspot.com/).

## Tecnología

- **[Astro](https://astro.build/)** - Framework de generación estática
- **Content Collections** - Contenido administrable via archivos Markdown
- Sin JavaScript en el cliente (excepto el toggle del menú móvil)

## Requisitos

- [Node.js](https://nodejs.org/) v18 o superior

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

El servidor de desarrollo se abrirá en `http://localhost:4321`

## Build para producción

```bash
npm run build
```

Los archivos estáticos se generarán en la carpeta `dist/`.

## Estructura del proyecto

```
src/
├── content/
│   └── obras/          ← Cada pintura es un archivo .md
│       ├── pensamientos.md
│       ├── cudillero.md
│       └── ...
├── layouts/
│   └── Layout.astro    ← Layout principal (header, footer, CSS)
├── pages/
│   ├── index.astro     ← Página de inicio
│   ├── obra/
│   │   ├── index.astro ← Galería con filtro por categoría
│   │   └── [slug].astro← Detalle de cada obra
│   ├── sobre-mi.astro
│   ├── exposiciones.astro
│   ├── contacto.astro
│   └── 404.astro
└── content.config.ts   ← Esquema de las colecciones de contenido
```

## Añadir una nueva obra

Crea un archivo `.md` en `src/content/obras/` con este formato:

```md
---
titulo: "Nombre de la obra"
tecnica: "Técnica mixta sobre lienzo"
dimensiones: "50x50"
fecha: 2024-01-15
categoria: "ESTRUCTURAS"
imagen: "https://url-de-la-imagen.jpg"
destacada: "Texto opcional sobre premios o selecciones"
disponibilidad: "Disponible"   # opcional: Disponible, Vendida o Consultar
portada: true                  # opcional: usar esta obra como imagen principal de la portada
---
```

Las categorías disponibles son: `ESTRUCTURAS`, `BOCETOS Y DIBUJOS`, `PRIMERAS ETAPAS`.

- `disponibilidad` (opcional) se muestra en la ficha de la obra. Valores permitidos: `Disponible`, `Vendida`, `Consultar`. Si una obra es `Vendida`, el botón de la ficha pasa a "Consultar obra similar". Si se escribe otro valor, el sitio no se construye y avisa de qué obra y qué campo falla.
- `portada` (opcional) marca la obra que aparece grande al abrir la web. Si ninguna obra la define, se usa la más reciente. Conviene marcar solo una.

## Futuro: CMS

Para administrar el contenido desde una interfaz web, se puede integrar:
- [Decap CMS](https://decapcms.org/) (antes Netlify CMS) - gratis, se conecta directo a Git
- [Tina CMS](https://tina.io/) - edición visual en tiempo real
- [Keystatic](https://keystatic.com/) - CMS basado en archivos

Cualquiera de estos se integra con la estructura actual sin cambios.
