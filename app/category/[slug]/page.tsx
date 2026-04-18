import { Metadata } from 'next';
import CategoriesPage from '../../components/CategoriesPage';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} | Lasomaa`,
    description: `Explore ${slug} products on Lasomaa's B2B marketplace.`,
  };
}

export const revalidate = 3600; // ISR

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  // Fetch category data if needed
  return (
    <CategoriesPage
      onBack={() => { }}
      onNavigate={() => { }}
      onOpenMenu={() => { }}
      onOpenSearch={() => { }}
      onCategoryClick={() => { }}
    />
  );
}