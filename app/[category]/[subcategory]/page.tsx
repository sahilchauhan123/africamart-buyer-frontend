import { Metadata } from 'next';
import SubCategoryPage from '../../components/SubCategoryPage';

interface SubCategoryPageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

export async function generateMetadata({ params }: SubCategoryPageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  return {
    title: `${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} | ${category} | AfricaMart`,
    description: `Browse ${subcategory} in ${category} category on AfricaMart.`,
  };
}

export const revalidate = 3600; // ISR

export default async function SubCategoryPageComponent({ params }: SubCategoryPageProps) {
  const { category, subcategory } = await params;
  // Fetch subcategory data
  return <SubCategoryPage categoryName={category} onBack={() => {}} onSubCategoryClick={() => {}} />;
}