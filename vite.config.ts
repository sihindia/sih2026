import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'resend-api-middleware',
      configureServer(server) {
        server.middlewares.use('/api/contact-resend', async (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body);
                const response = await fetch('https://api.resend.com/emails', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY || ''}`
                  },
                  body: JSON.stringify({
                    from: 'SIH2026 Portal <onboarding@resend.dev>',
                    to: ['sih2026@flugelsoft.com'],
                    subject: parsed.subject || 'SIH 2026 Support Inquiry',
                    html: parsed.html || '<p>No content</p>'
                  })
                });
                const data = await response.json();
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              } catch (e: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: e.message }));
              }
            });
          } else {
            res.statusCode = 405;
            res.end();
          }
        });
      }
    }
  ],
  server: {
    port: 5180,
    strictPort: true,
    host: true
  }
});
