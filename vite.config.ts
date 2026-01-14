import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    publicDir: 'public',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      {
        name: 'file-system-api',
        configureServer(server) {
          server.middlewares.use('/api/save-post', async (req, res, next) => {
            if (req.method !== 'POST') return next();

            const chunks = [];
            req.on('data', chunk => chunks.push(chunk));
            req.on('end', async () => {
              try {
                const body = JSON.parse(Buffer.concat(chunks).toString());
                const { filename, content } = body;

                if (!filename || !content) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Missing filename or content' }));
                  return;
                }

                const fs = await import('fs');
                const path = await import('path');
                const filePath = path.resolve(__dirname, 'src/content/blog', filename);

                // Ensure directory exists
                const dir = path.dirname(filePath);
                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir, { recursive: true });
                }

                fs.writeFileSync(filePath, content, 'utf-8');

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, message: 'Saved successfully' }));
              } catch (e) {
                console.error(e);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Failed to save file' }));
                return;
              }
            });
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
