import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DesktopProductDetails from '../../../components/DesktopProductDetails';
import { fetchProductById, fetchRecommendations } from '@/src/lib/api';

interface ProductPageProps {
  params: Promise<{ id: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const paramsData = await params;
  const id = paramsData.id;
  const product = await fetchProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const title = product.title || product.name;
  const fullTitle = `${title} | Lasomaa`;
  const description = product.description?.substring(0, 160) || `Buy ${title} at the best price on Lasomaa. Verified suppliers, high quality, and fast shipping.`;
  const url = `https://www.lasomaa.com/product/${id}/${paramsData.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      images: product.image ? [{ url: product.image, width: 800, height: 800, alt: fullTitle }] : [],
      type: 'website',
      siteName: 'Lasomaa',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: product.image ? [product.image] : [],
    },
  };
}

export const revalidate = 3600;

function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-')          // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '');     // Remove leading/trailing hyphens
}

export default async function ProductPage({ params }: ProductPageProps) {
  const paramsData = await params;
  const id = paramsData.id;
  
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  const recommendations = await fetchRecommendations(product.title || product.name, product.id);

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title || product.name,
    image: product.images || [product.image],
    description: product.description || `Buy ${product.title || product.name} on Lasomaa`,
    brand: {
      '@type': 'Brand',
      name: product.supplier || 'Lasomaa Verified Supplier',
    },
    offers: {
      '@type': 'Offer',
      price: product.price ? product.price.replace(/[^0-9.]/g, '') : '0',
      priceCurrency: 'USD',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      url: `https://www.lasomaa.com/product/${product.id}/${createSlug(product.name)}`,
      seller: {
        '@type': 'Organization',
        name: product.supplier || 'Lasomaa Marketplace',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DesktopProductDetails product={product} initialRecommendations={recommendations} />
    </>
  );
}