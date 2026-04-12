import { defineCollection, z } from 'astro:content';

const obras = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    tecnica: z.string(),
    dimensiones: z.string(),
    fecha: z.date(),
    categoria: z.enum(['ESTRUCTURAS', 'BOCETOS Y DIBUJOS', 'PRIMERAS ETAPAS']),
    imagen: z.string(),
    destacada: z.string().optional(),
    orden: z.number().optional(),
  }),
});

export const collections = { obras };
