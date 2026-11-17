// Proporción (ancho/alto) real de cada imagen de obra, necesaria para colgarlas
// en filas justificadas sin recortarlas ni provocar saltos de layout.
//
// Se mide al compilar con `inferRemoteSize` de Astro (solo lee el principio del
// archivo) y se guarda en `src/data/obra-dimensiones.json`, que se versiona: una
// vez rellena, el build no necesita red. Las medidas se toman sobre la variante
// pequeña (/s400/) de Blogger, que conserva la proporción de la original; por eso
// el JSON guarda proporciones útiles, no los píxeles reales de la imagen grande.
import fs from 'node:fs';
import path from 'node:path';
import { inferRemoteSize } from 'astro:assets';
import { imgAt } from './img';

export interface Dimensiones {
  width: number;
  height: number;
}

/** Proporción de reserva (4:3) cuando una imagen no se puede medir. */
export const DIMENSIONES_RESERVA: Dimensiones = { width: 4, height: 3 };

const CACHE_FILE = path.join(process.cwd(), 'src', 'data', 'obra-dimensiones.json');

let cache: Record<string, Dimensiones> | null = null;
const enCurso = new Map<string, Promise<Dimensiones>>();

function leerCache(): Record<string, Dimensiones> {
  if (cache) return cache;
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  } catch {
    cache = {};
  }
  return cache!;
}

function guardarCache() {
  try {
    const ordenado = Object.fromEntries(Object.entries(leerCache()).sort(([a], [b]) => a.localeCompare(b)));
    fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(ordenado, null, 2) + '\n');
  } catch {
    // Sistema de archivos de solo lectura (p. ej. CI): se mide en cada build, no pasa nada.
  }
}

/**
 * Devuelve las dimensiones de una imagen de obra. Usa la caché; si falta, la mide y la
 * guarda; si no se puede medir, devuelve la proporción de reserva y avisa con `etiqueta`.
 */
export function getDimensiones(url: string, etiqueta = url): Promise<Dimensiones> {
  const guardada = leerCache()[url];
  if (guardada) return Promise.resolve(guardada);

  const previa = enCurso.get(url);
  if (previa) return previa;

  const medicion = (async () => {
    try {
      const { width, height } = await inferRemoteSize(imgAt(url, 400));
      if (!width || !height) throw new Error('dimensiones vacías');
      leerCache()[url] = { width, height };
      guardarCache();
      return { width, height };
    } catch (error) {
      console.warn(`[dimensiones] No se pudo medir la imagen de «${etiqueta}»; se usa ${DIMENSIONES_RESERVA.width}:${DIMENSIONES_RESERVA.height}. ${(error as Error).message}`);
      return DIMENSIONES_RESERVA;
    }
  })();
  enCurso.set(url, medicion);
  return medicion;
}
