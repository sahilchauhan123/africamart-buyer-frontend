import DesktopHome from './components/DesktopHome';
import { fetchProducts } from '@/src/lib/api';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lasomaa | Leading Global B2B Marketplace for Africa',
  description: 'Connect with over 10,000+ verified African and global manufacturers. Source industrial machinery, grains, and agricultural products across the continent.',
  keywords: 'Africa B2B, African manufacturers, African exporters, B2B marketplace, Africa trade',
  openGraph: {
    title: 'Lasomaa | The Ultimate African B2B Marketplace',
    description: 'Grow your business by connecting with thousands of verified suppliers across the African continent.',
    url: 'https://Lasomaa.com',
    siteName: 'Lasomaa',
    type: 'website',
  },
};

export const revalidate = 3600; // ISR: Revalidate every hour

export default async function Home() {
  // Fetch initial featured products for ISR
  const result = await fetchProducts('');
  const initialProducts = result.products;
  const initialFacets = result.facets;

  return (
    <main>
      <DesktopHome initialProducts={initialProducts} initialFacets={initialFacets} />
    </main>
  );
}
