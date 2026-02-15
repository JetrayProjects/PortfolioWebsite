'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const routes = [
    '/',
    '/about',
    '/experience',
    '/projects',
    '/gallery',
    '/contact'
];

export function NavigationArrows() {
    const pathname = usePathname();
    const router = useRouter();
    const [isHovered, setIsHovered] = useState<'left' | 'right' | null>(null);

    const currentIndex = routes.indexOf(pathname);
    const prevRoute = currentIndex > 0 ? routes[currentIndex - 1] : null;
    const nextRoute = currentIndex < routes.length - 1 ? routes[currentIndex + 1] : null;

    // Handle keyboard navigation
    useEffect(() => {
        // Disable on home page
        if (pathname === '/') return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' && prevRoute) {
                router.push(prevRoute);
            } else if (e.key === 'ArrowRight' && nextRoute) {
                router.push(nextRoute);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [pathname, prevRoute, nextRoute, router]);

    // Don't show on home page
    if (pathname === '/') return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-between px-4 md:px-12">
            {/* Left Liquid Glass Button */}
            <div className="pointer-events-auto">
                {prevRoute && (
                    <button
                        onClick={() => router.push(prevRoute)}
                        onMouseEnter={() => setIsHovered('left')}
                        onMouseLeave={() => setIsHovered(null)}
                        className="group flex items-center gap-4 transition-all duration-500 ease-out select-none"
                        aria-label="Previous section"
                    >
                        <div className={cn(
                            "relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-500 ease-out",
                            // Glass Morphism Styles
                            "backdrop-blur-xl bg-white/5 border border-white/10",
                            "shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_8px_32px_0_rgba(0,0,0,0.37)]",
                            // Hover Effects
                            "group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-110 group-hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.1),0_8px_32px_0_rgba(255,255,255,0.1)]"
                        )}>
                            {/* Inner Specular Highlight (Optional for extra 'wet' look) */}
                            <div className="absolute inset-2 rounded-full border border-white/5 opacity-50 group-hover:opacity-100 transition-opacity" />

                            <ChevronLeft className={cn(
                                "relative z-10 h-8 w-8 text-white/50 transition-all duration-500",
                                "group-hover:text-white group-hover:-translate-x-1"
                            )} strokeWidth={1.5} />
                        </div>

                        {/* Label - Slides in */}
                        <span className={cn(
                            "hidden text-lg font-serif tracking-wider text-white/80 opacity-0 transition-all duration-500 md:block",
                            isHovered === 'left' ? "opacity-100 translate-x-0 blur-none" : "-translate-x-8 blur-sm"
                        )}>
                            {prevRoute === '/' ? 'Home' : prevRoute.slice(1).charAt(0).toUpperCase() + prevRoute.slice(2)}
                        </span>
                    </button>
                )}
            </div>

            {/* Right Liquid Glass Button */}
            <div className="pointer-events-auto">
                {nextRoute && (
                    <button
                        onClick={() => router.push(nextRoute)}
                        onMouseEnter={() => setIsHovered('right')}
                        onMouseLeave={() => setIsHovered(null)}
                        className="group flex flex-row-reverse items-center gap-4 transition-all duration-500 ease-out select-none"
                        aria-label="Next section"
                    >
                        <div className={cn(
                            "relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-500 ease-out",
                            // Glass Morphism Styles
                            "backdrop-blur-xl bg-white/5 border border-white/10",
                            "shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_8px_32px_0_rgba(0,0,0,0.37)]",
                            // Hover Effects
                            "group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-110 group-hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.1),0_8px_32px_0_rgba(255,255,255,0.1)]"
                        )}>
                            {/* Inner Specular Highlight */}
                            <div className="absolute inset-2 rounded-full border border-white/5 opacity-50 group-hover:opacity-100 transition-opacity" />

                            <ChevronRight className={cn(
                                "relative z-10 h-8 w-8 text-white/50 transition-all duration-500",
                                "group-hover:text-white group-hover:translate-x-1"
                            )} strokeWidth={1.5} />
                        </div>

                        {/* Label - Slides in */}
                        <span className={cn(
                            "hidden text-lg font-serif tracking-wider text-white/80 opacity-0 transition-all duration-500 md:block",
                            isHovered === 'right' ? "opacity-100 translate-x-0 blur-none" : "translate-x-8 blur-sm"
                        )}>
                            {nextRoute.slice(1).charAt(0).toUpperCase() + nextRoute.slice(2)}
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}
