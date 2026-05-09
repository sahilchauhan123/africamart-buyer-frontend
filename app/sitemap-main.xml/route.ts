import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.lasomaa.com';
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/categories</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/search</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
