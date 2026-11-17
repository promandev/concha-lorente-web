// Enlaces de consulta y compra de la ficha de obra.

export const CONTACT_EMAIL = 'conlogon@gmail.com';
export const TIENDA_URL = 'https://www.artelista.com/@conchalorente';

interface ConsultaObra {
  titulo: string;
  tecnica: string;
  dimensiones: string;
  /** Dirección web completa de la ficha. */
  url: string;
  /** Si la obra está vendida, la consulta es por una obra similar. */
  vendida?: boolean;
}

/** Enlace mailto con asunto y cuerpo prellenados. Usa %20 (no +) para los espacios. */
export function consultaMailto({ titulo, tecnica, dimensiones, url, vendida = false }: ConsultaObra): string {
  const asunto = vendida
    ? `Consulta sobre una obra similar a «${titulo}»`
    : `Consulta sobre «${titulo}»`;
  const cuerpo = [
    'Hola Concha:',
    '',
    vendida ? `Me interesa una obra similar a «${titulo}».` : `Me interesa la obra «${titulo}».`,
    `${tecnica}, ${dimensiones} cm`,
    url,
    '',
    'Gracias.',
  ].join('\n');
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}
