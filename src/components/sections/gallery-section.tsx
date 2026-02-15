"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function GallerySection({ className }: { className?: string }) {
    return (
        <section className={cn("text-white min-h-screen w-full flex flex-col items-center justify-center relative px-4 py-20", className)}>
            <div className="relative z-10 text-center space-y-6 animate-in fade-in duration-700">
                <h1 className='text-5xl md:text-7xl font-serif font-semibold tracking-tight leading-[120%] bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent'>
                    Gallery
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 font-light font-serif">
                    Coming Soon
                </p>
            </div>
        </section>
    );
}
