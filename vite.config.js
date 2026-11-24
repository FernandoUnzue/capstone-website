import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En `npm run dev` sirve /api/contact con la misma función que usa Vercel en producción.
const devApi = {
  name: 'dev-api',
  configureServer(server) {
    server.middlewares.use('/api/contact', async (req, res) => {
      const { default: handler } = await server.ssrLoadModule('/api/contact.js');
      handler(req, res);
    });
  },
};

export default defineConfig({
  plugins: [react(), devApi],
  // JS/CSS con hash en /_app (caché inmutable); /assets queda para imágenes y video de public/.
  build: { assetsDir: '_app', assetsInlineLimit: 0 },
});
