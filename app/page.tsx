import DesktopHome from './components/DesktopHome';
import { fetchProducts, fetchCategories } from '@/src/lib/api';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lasomaa | Marketplace for Africa',
  description: 'Africa first marketplace for African businesses, manufacturers, suppliers and buyers connect with each other',
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
  // Fetch initial featured products and categories for ISR
  const [productResult, initialCategories] = await Promise.all([
    fetchProducts(''),
    fetchCategories()
  ]);

  const initialProducts = productResult.products;
  const initialFacets = productResult.facets;

  return (
    <main>
      <DesktopHome
        initialProducts={initialProducts}
        initialFacets={initialFacets}
        initialCategories={initialCategories}
      />
    </main>
  );
}
