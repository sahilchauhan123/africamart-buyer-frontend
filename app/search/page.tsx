import { fetchProducts } from '@/src/lib/api';
import DesktopHome from '../components/DesktopHome';
import { Metadata } from 'next';

type SearchParams = { [key: string]: string | string[] | undefined };

export async function generateMetadata(
    { params, searchParams }: { params: any, searchParams: Promise<SearchParams> }
): Promise<Metadata> {
    const q = (await searchParams).q as string || '';
    return {
        title: q ? `Search Results for "${q}" | Lasomaa` : 'Search Products | Lasomaa',
        description: `Explore the best quality products matching your search query for ${q} on Lasomaa's global B2B marketplace.`,
    }
}

export default async function SearchResultsPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;
    const query = typeof params.q === 'string' ? params.q : '';
    const result = query ? await fetchProducts(query) : { products: [], facets: [] };
    const products = result.products;
    const facets = result.facets;

    return (
        <DesktopHome
            initialSearchQuery={query}
            initialProducts={products}
            initialFacets={facets}
        />
    );
}

export const dynamic = 'force-dynamic';
