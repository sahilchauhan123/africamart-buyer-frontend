import { Metadata } from 'next';

interface SellerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SellerPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} | Seller Profile | AfricaMart`,
    description: `View ${slug}'s profile and products on AfricaMart.`,
  };
}

export const revalidate = 3600; // ISR

export default async function SellerPage({ params }: SellerPageProps) {
  const { slug } = await params;
  // Fetch seller data
  return <div>Seller: {slug}</div>;
}