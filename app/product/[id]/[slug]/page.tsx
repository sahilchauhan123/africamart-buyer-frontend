import { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import DesktopProductDetails from '../../../components/DesktopProductDetails';
import Header from '../../../components/Header';
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
      title: 'Product Not Found | Lasomaa',
    };
  }

  const title = `${product.title || product.name} | Lasomaa`;
  const description = product.description?.substring(0, 160) || `Buy ${product.title || product.name} at the best price on Lasomaa. Verified suppliers, high quality, and fast shipping.`;
  const url = `https://lasomaa.com/product/${id}/${paramsData.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: product.image ? [{ url: product.image, width: 800, height: 800, alt: title }] : [],
      type: 'website',
      siteName: 'Lasomaa',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.image ? [product.image] : [],
    }
  };
}

function ProductPageContent({ product, recommendations }: { product: any, recommendations: any[] }) {
  if (!product) {
    notFound();
  }

  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .trim()
      .replace(/\s+/g, '-')         // Replace spaces with hyphens
      .replace(/-+/g, '-')          // Replace multiple hyphens with single
      .replace(/^-+|-+$/g, '');     // Remove leading/trailing hyphens
  };

  // Generate structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name || product.title,
    image: product.image,
    description: product.description || `High quality ${product.name} from verified suppliers on Lasomaa.`,
    sku: `LS-${product.id}`,
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
      url: `https://lasomaa.com/product/${product.id}/${createSlug(product.name)}`,
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
      <Header />
      <DesktopProductDetails product={product} initialRecommendations={recommendations} />
    </>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await fetchProductById(id);
  const recommendations = product ? await fetchRecommendations(product.name, product.id) : [];

  return (
    <ProductPageContent product={product} recommendations={recommendations} />
  );
}