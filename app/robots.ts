import type { MetadataRoute } from 'next';

/**
 * Generates robots.txt with rules for all major crawlers,
 * including AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended).
 *
 * Disallows /admin/ and /api/ from all bots — no reason to index those.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://www.takshstudios.com/sitemap.xml',
  };
}
