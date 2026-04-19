export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
export const MESSAGING_BASE_URL = `${API_BASE_URL}/messaging/protected`;
export const MESSAGING_WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000/api/v1/messaging/ws';

export async function buyerLogin(phone_no: string, password?: string) {
    const res = await fetch(`${API_BASE_URL}/auth/buyer/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_no, password }),
    });
    return res;
}

export async function buyerCheckNumber(phone_no: string) {
    const res = await fetch(`${API_BASE_URL}/auth/buyer/number-exists?phone_no=${encodeURIComponent(phone_no)}`, {
        credentials: 'include'
    });
    return res;
}

export async function buyerSendOtp(full_name: string, email: string, phone_no: string, password?: string) {
    const res = await fetch(`${API_BASE_URL}/auth/buyer/registration/sendotp`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name, email, phone_no, password }),
    });
    return res;
}

export async function buyerSubmitOtp(phone_no: string, otp: number) {
    const res = await fetch(`${API_BASE_URL}/auth/buyer/registration/submitotp`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_no, otp }),
    });
    return res;
}

export async function buyerSubmitLead(seller_id: number, product_id: string, quantity: string) {
    const res = await fetch(`${API_BASE_URL}/leads/buyer/leads`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seller_id, product_id, quantity }),
    });
    return res;
}

export async function buyerLogout() {
    const res = await fetch(`${API_BASE_URL}/auth/buyer/logout`, {
        method: 'GET',
        credentials: 'include'
    });
    return res;
}

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
                location: doc.city && doc.country ? `${doc.city}, ${doc.country}` : doc.seller_address || 'India',
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
                seller_id: doc.seller_id,
                seller_address: doc.seller_address,
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

export async function searchProducts(query: string, selectedAttributes: string[] = []) {
    let url = `${API_BASE_URL}/search/unprotected/products?query=${encodeURIComponent(query)}`;

    // Add attribute filters
    selectedAttributes.forEach(attr => {
        url += `&filters[attributes]=${encodeURIComponent(attr)}`;
    });

    const res = await fetch(url);
    return res;
}

export async function fetchBuyerLeads() {
    const res = await fetch(`${API_BASE_URL}/leads/buyer/leads`, {
        method: 'GET',
        credentials: 'include'
    });
    return res;
}

// Messaging Endpoints
export const fetchConversations = () => fetch(`${MESSAGING_BASE_URL}/conversations`, { credentials: 'include' });
export const fetchMessages = (convID: string) => fetch(`${MESSAGING_BASE_URL}/conversations/${convID}/messages`, { credentials: 'include' });
export const sendChatMessage = (sellerID: number, content: string) => fetch(`${API_BASE_URL}/messaging/protected/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seller_id: sellerID, content }),
    credentials: 'include'
});

export async function fetchRecommendations(categoryId: string) {
    if (!categoryId) return [];
    try {
        const res = await fetch(`${API_BASE_URL}/search/unprotected/recommendations?categoryID=${encodeURIComponent(categoryId)}`, {
            cache: 'no-store'
        });
        const data = await res.json();

        // Handle Typesense response structure
        const hits = data.data?.hits || [];
        return hits.map((hit: any) => {
            const doc = hit.document;
            const images = doc.picture_url?.map((p: any) => p.img_url) || [];
            return {
                ...doc,
                image: images.length > 0 ? images[0] : null,
                price: doc.min_price ? `₹${doc.min_price}` : 'Price on request',
                unit: doc.unit || 'Piece',
                name: doc.title,
                location: doc.city && doc.country ? `${doc.city}, ${doc.country}` : doc.seller_address || doc.seller_location || 'India',
                seller_id: doc.seller_id,
            };
        });
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return [];
    }
}
