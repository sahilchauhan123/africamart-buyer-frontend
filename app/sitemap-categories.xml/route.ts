import { NextResponse } from 'next/server';
import { fetchCategories, fetchSubCategories } from '@/src/lib/api';

export async function GET() {
  const baseUrl = 'https://www.lasomaa.com';
  let categories: any[] = [];
  
  try {
    const topCategories = await fetchCategories();
    
    // Fetch sub-categories for all top-level categories
    const subCategoryPromises = topCategories.map((cat: any) => fetchSubCategories(cat.id));
    const subCategoriesResults = await Promise.all(subCategoryPromises);
    const allSubCategories = subCategoriesResults.flat();

    // Combine both top-level and sub-categories
    categories = [...topCategories, ...allSubCategories];
  } catch (e) {
    console.error("Failed to fetch categories for sitemap", e);
  }

  const urls = categories.map((cat: any) => `
  <url>
    <loc>${baseUrl}/categories/${cat.slug.replace(/&/g, '&amp;')}</loc>
    <changefreq>weekly</changefreq>
    <priority>${cat.parent_id ? '0.7' : '0.8'}</priority>
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
