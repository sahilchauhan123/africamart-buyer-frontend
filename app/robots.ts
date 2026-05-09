import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.lasomaa.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/login/', '/signup/', '/chat/'],
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-main.xml`,
      `${baseUrl}/sitemap-categories.xml`,
      `${baseUrl}/sitemap-products.xml`,
    ],
  }
}
