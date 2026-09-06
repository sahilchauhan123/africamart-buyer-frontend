import { API_BASE_URL, getApiBaseUrl } from '@/src/lib/api';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  let categories: any[] = [];
  const internalUrl = getApiBaseUrl();

  try {
    const res = await fetch(`${internalUrl}/unprotected/listing/category`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      const topCategories = data.data || [];

      // Fetch sub-categories for all top-level categories
      const subCategoryPromises = topCategories.map(async (cat: any) => {
        try {
          const subRes = await fetch(`${internalUrl}/unprotected/listing/sub-category?parent_id=${cat.id}`, { cache: 'no-store' });
          if (subRes.ok) {
            const subData = await subRes.json();
            return subData.data || [];
          }
        } catch (e) {
          console.error(`[Sitemap Categories] Error fetching subcategories for ${cat.id}`, e);
        }
        return [];
      });

      const subCategoriesResults = await Promise.all(subCategoryPromises);
      const allSubCategories = subCategoriesResults.flat();

      // Combine both top-level and sub-categories
      categories = [...topCategories, ...allSubCategories];
      console.log("[Sitemap Categories] Total categories count:", categories.length);
    }
  } catch (e) {
    console.error("[Sitemap Categories] Failed to fetch categories for sitemap", e);
  }

  const urls = categories.map((cat: any) => {
    const slugStr = cat.slug ? String(cat.slug).replace(/&/g, '&amp;') : '';
    if (!slugStr) return '';
    return `
  <url>
    <loc>${baseUrl}/categories/${slugStr}</loc>
    <changefreq>weekly</changefreq>
    <priority>${cat.parent_id ? '0.7' : '0.8'}</priority>
  </url>`;
  }).filter(Boolean).join('');

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

