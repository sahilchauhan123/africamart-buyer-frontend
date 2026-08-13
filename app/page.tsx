import DesktopHome from './components/DesktopHome';
import { fetchProducts, fetchCategories } from '@/src/lib/api';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'B2B Marketplace for India',
  description: 'The premier marketplace for Indian businesses, manufacturers, and suppliers to connect and trade globally.',
  alternates: {
    canonical: 'https://lasomaa.com',
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
