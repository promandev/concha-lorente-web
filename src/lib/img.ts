// Las imágenes siguen alojadas en Blogger (googleusercontent), que sirve cualquier
// tamaño sustituyendo el segmento /s1600/ de la URL. Cuando se migren a local,
// basta con reescribir estas dos funciones.

const SIZE_SEGMENT = /\/s\d+\//;

/** URL de la imagen al ancho pedido (px). Si no es de Blogger, la devuelve igual. */
export function imgAt(url: string, width: number): string {
  return SIZE_SEGMENT.test(url) ? url.replace(SIZE_SEGMENT, `/s${width}/`) : url;
}

/** Atributo srcset con varios anchos. */
export function imgSrcset(url: string, widths: number[] = [400, 800, 1200]): string | undefined {
  if (!SIZE_SEGMENT.test(url)) return undefined;
  return widths.map((w) => `${imgAt(url, w)} ${w}w`).join(', ');
}
