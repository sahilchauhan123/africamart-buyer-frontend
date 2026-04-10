import { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import DesktopProductDetails from '../../components/DesktopProductDetails';
import Header from '../../components/Header';
import { fetchProductById } from '@/src/lib/api';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductById(slug);

  if (!product) {
    return {
      title: 'Product Not Found | AfricaMart',
      description: 'The requested product could not be found.',
    };
  }

  const title = `${product.title || product.name} | AfricaMart`;
  const description = product.description?.substring(0, 160) || `Buy ${product.title || product.name} at the best price on AfricaMart. Verified suppliers, high quality, and fast shipping.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.image ? [{ url: product.image }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.image ? [product.image] : [],
    }
  };
}

function ProductPageContent({ product }: { product: any }) {
  if (!product) {
    notFound();
  }

  // Generate structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name || product.title,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.supplier || 'AfricaMart',
    },
    offers: {
      '@type': 'Offer',
      price: product.min_price || 0,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://africamart.com/product/${product.title.toLowerCase()}-${product.id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <DesktopProductDetails product={product} />
    </>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await fetchProductById(slug);

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 font-black text-[#0026C0] uppercase tracking-widest text-xs">AfricaMart is loading...</div>}>
      <ProductPageContent product={product} />
    </Suspense>
  );
}