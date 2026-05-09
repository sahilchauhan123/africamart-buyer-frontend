export const createSlug = (name: string) => {
    if (!name) return "";
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-')         // Replace spaces with hyphens
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
};
