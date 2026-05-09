import { NextResponse } from 'next/server';
import { fetchProducts } from '@/src/lib/api';

export async function GET() {
  const baseUrl = 'https://www.lasomaa.com';
  let products: any[] = [];
  
  try {
    const result = await fetchProducts('');
    products = result.products || [];
  } catch (e) {
    console.error("Failed to fetch products for sitemap", e);
  }

  const urls = products.map((prod: any) => `
  <url>
    <loc>${baseUrl}/product/${prod.id}/${prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/&/g, '&amp;')}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
