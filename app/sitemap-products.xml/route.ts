import { NextResponse } from 'next/server';
import { createSlug } from '@/src/lib/utils';
import { getApiBaseUrl } from '@/src/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = 'https://www.lasomaa.com';
  let products: any[] = [];

  try {
    const internalUrl = getApiBaseUrl();
    console.log("[Sitemap] Fetching products from internal API...");
    const res = await fetch(`${internalUrl}/search/unprotected/products?query=*&limit=250`, {
      cache: 'no-store'
    });

    console.log("[Sitemap Products] Response status:", res.status);
    if (res.ok) {
      const data = await res.json();
      const hits = data.data?.hits || [];
      console.log("[Sitemap Products] Hits count:", hits.length);
      products = hits.map((hit: any) => ({
        id: hit.document.id,
        title: hit.document.title
      }));
    } else {
      console.log("[Sitemap Products] Non-ok status:", res.status, res.statusText);
    }
  } catch (e: any) {
    console.error("[Sitemap Products] Exception:", e?.message);
  }

  const urls = products.map((prod: any) => {
    const title = prod.title || 'product';
    const slug = createSlug(title);
    return `
  <url>
    <loc>${baseUrl}/product/${prod.id}/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

