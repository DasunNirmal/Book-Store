import { useEffect, useState } from "react";

// Reads a CSS media query and keeps it in sync when the screen size changes
export const useMediaQuery = (query: string): boolean => {
    const getMatch = () =>
        typeof window !== 'undefined' && typeof window.matchMedia === 'function'
            ? window.matchMedia(query).matches
            : false;

    const [matches, setMatches] = useState<boolean>(getMatch);

    useEffect(() => {
        if (typeof window.matchMedia !== 'function') return;
        const media = window.matchMedia(query);
        const onChange = () => setMatches(media.matches);
        onChange();
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, [query]);

    return matches;
};

// Below this width the app switches to the mobile layout (top bar + circular menu)
export const MOBILE_QUERY = '(max-width: 1023px)';
