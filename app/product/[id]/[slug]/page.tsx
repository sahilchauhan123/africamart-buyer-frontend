import { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import DesktopProductDetails from '../../../components/DesktopProductDetails';
import Header from '../../../components/Header';
import { fetchProductById } from '@/src/lib/api';

interface ProductPageProps {
  params: Promise<{ id: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  console.log("id : ", id)
  const product = await fetchProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found | Lasomaa',
      description: 'The requested product could not be found.',
    };
  }

  const title = `${product.title || product.name} | Lasomaa`;
  const description = product.description?.substring(0, 160) || `Buy ${product.title || product.name} at the best price on Lasomaa. Verified suppliers, high quality, and fast shipping.`;

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
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.supplier || 'Supplier Name Not Available',
    },
    offers: {
      '@type': 'Offer',
      price: product.min_price || 0,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://Lasomaa.com/product/${product.id}/${createSlug(product.title)}`,
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
  const { id } = await params;
  const product = await fetchProductById(id);

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 font-black text-[#0026C0] uppercase tracking-widest text-xs">Lasomaa is loading...</div>}>
      <ProductPageContent product={product} />
    </Suspense>
  );
}