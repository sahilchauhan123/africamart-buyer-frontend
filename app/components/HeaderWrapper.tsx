'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function HeaderWrapper() {
    const pathname = usePathname();
    
    // Pages where we DON'T want the global header
    const noHeaderPages = ['/login', '/signup'];
    
    if (noHeaderPages.includes(pathname)) {
        return null;
    }

    return <Header />;
}
