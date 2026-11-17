import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://conchalorente.com',
  image: {
    // Necesario para que `inferRemoteSize` pueda leer las dimensiones de las obras al compilar.
    domains: ['blogger.googleusercontent.com'],
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },
});
