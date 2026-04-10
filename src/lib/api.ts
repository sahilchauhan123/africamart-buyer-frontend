const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://165.232.47.156:4000/api/v1';

export async function fetchProducts(query: string) {
    try {
        const searchQuery = query || '*';
        const res = await fetch(`${API_BASE_URL}/search/unprotected/products?query=${encodeURIComponent(searchQuery)}`, {
            cache: 'no-store' // Ensure it's SSR
        });
        const data = await res.json();
        const products = data.data?.hits?.map((hit: any) => {
            const doc = hit.document;
            const images = doc.picture_url?.map((p: any) => p.img_url) || [];
            return {
                ...doc,
                image: images.length > 0 ? images[0] : null,
                price: doc.min_price ? `₹${doc.min_price}` : 'Price on request',
                unit: doc.unit || 'Piece',
                name: doc.title,
                location: doc.city && doc.country ? `${doc.city}, ${doc.country}` : doc.seller_location || 'India',
                seller_id: doc.seller_id,
            };
        }) || [];
        const facets = data.data?.facet_counts || [];
        return { products, facets };
    } catch (error) {
        console.error("Error fetching products server-side:", error);
        return { products: [], facets: [] };
    }
}

export async function fetchSuggestions(query: string) {
    if (!query) return [];
    try {
        const res = await fetch(`${API_BASE_URL}/search/unprotected/suggestions?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        return data.data?.hits?.map((h: any) => ({ name: h.document.title })) || [];
    } catch (error) {
        console.error("Error fetching suggestions server-side:", error);
        return [];
    }
}

export async function fetchProductById(id: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/search/unprotected/products/${id}`, {
            cache: 'no-store' // Ensure it's SSR
        });
        const data = await res.json();
        if (data.data) {
            const doc = data.data;
            const pictureUrls = doc.picture_url || [];
            const sortedImages = [...pictureUrls]
                .sort((a: any, b: any) => (a.position || 0) - (b.position || 0))
                .map((p: any) => p.img_url);
            const mainImage = sortedImages.length > 0 ? sortedImages[0] : null;

            return {
                id: doc.id,
                name: doc.title,
                title: doc.title,
                price: doc.min_price ? `₹${doc.min_price}` : 'Price on request',
                unit: doc.unit || 'Piece',
                image: mainImage,
                images: sortedImages,
                picture_url: doc.picture_url,
                supplier: doc.seller_name || 'Verified Supplier',
                location: doc.city && doc.country ? `${doc.city}, ${doc.country}` : doc.seller_location || doc.location || 'India',
                rating: 4.5,
                reviews: 12,
                isVerified: doc.is_active ?? true,
                description: doc.description || '',
                category_name: doc.category_name || '',
                category_id: doc.category_id || '',
                category_slug: doc.category_slug || '',
                attributes: doc.attributes || [],
                raw_attributes: doc.raw_attributes || {},
                min_price: doc.min_price,
                max_price: doc.max_price,
                points: doc.points,
                created_at: doc.created_at,
                city: doc.city,
                state: doc.state,
                country: doc.country,
                seller_id: doc.seller_id
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
}

export async function fetchCategories() {
    try {
        const res = await fetch(`${API_BASE_URL}/unprotected/listing/category`, {
            cache: 'no-store'
        });
        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export async function fetchSubCategories(parentId: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/unprotected/listing/sub-category?parent_id=${parentId}`, {
            cache: 'no-store'
        });
        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        return [];
    }
}

export async function fetchSubCategoriesBySlug(parentSlug: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/unprotected/listing/sub-category?parent_slug=${encodeURIComponent(parentSlug)}`, {
            cache: 'no-store'
        });
        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error("Error fetching subcategories by slug:", error);
        return [];
    }
}

export async function fetchCategoryBySlug(slug: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/unprotected/listing/category/details-by-slug?slug=${encodeURIComponent(slug)}`, {
            cache: 'no-store'
        });
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching category by slug:", error);
        return null;
    }
}
