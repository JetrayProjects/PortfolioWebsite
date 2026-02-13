"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "motion/react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
const sections = [
    { title: "About", href: "/about" },
    { title: "Experience", href: "/experience" },
    { title: "Projects", href: "/projects" },
    { title: "Gallery", href: "/gallery" },
    { title: "Contact", href: "/contact" },
];

export function HeroSection() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const imageRef = useRef<HTMLDivElement>(null);


    // Smooth mouse movement
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Animate values for smoothness
            animate(mouseX, e.clientX, { type: "tween", ease: "backOut", duration: 0.2 });
            animate(mouseY, e.clientY, { type: "tween", ease: "backOut", duration: 0.2 });

            // Simple parallax for image
            if (imageRef.current) {
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                // Calculate percentage from center (-1 to 1)
                const xPct = (e.clientX / windowWidth - 0.5) * 2;
                const yPct = (e.clientY / windowHeight - 0.5) * 2;

                // Move opposite to mouse for depth effect
                const moveX = xPct * -10; // Max 20px movement
                const moveY = yPct * -10;

                imageRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Mask gradient based on mouse position
    const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

    return (
        <div className="relative w-full h-screen overflow-hidden bg-neutral-950">
            {/* Background Layer: Beams (Always visible but dimmed?) */}
            {/* Actually user said: "On top of this background my image will be... reveal sections" */}
            {/* So Background is base. */}
            <div className="absolute inset-0 z-0">
                <BeamsBackground intensity="medium" className="h-full">
                    {/* Empty children for background */}
                    <></>
                </BeamsBackground>
            </div>


            {/* Content Layer: Sections (Hidden by default, revealed by mask) */}
            {/* We duplicate the content. One layer is "HiddenState" (maybe outlines?), one is "VisibleState" (masked). */}
            {/* Or simply: The sections are ONLY visible via mask. Base is empty/beams. */}

            <motion.div
                className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
                style={{ maskImage, WebkitMaskImage: maskImage }}
            >
                {/* Visible Content inside Spotlight */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 p-12 max-w-6xl w-full items-center justify-items-center pointer-events-auto">
                    {/* Positioning sections around the center image */}
                    {/* Top Row */}
                    <SectionButton title="About" href="/about" className="col-start-1 md:col-start-1 translate-y-[-5rem]" />
                    <SectionButton title="Experience" href="/experience" className="col-start-2 md:col-start-2 -translate-y-24 md:-translate-y-[15rem]" />
                    <SectionButton title="Projects" href="/projects" className="col-start-1 md:col-start-3 translate-y-[-5rem]" />

                    {/* Middle Row (Gap for Image) */}
                    {/* We can use CSS Grid to leave center empty or just absolute pos */}

                    {/* Bottom Row */}
                    <SectionButton title="Gallery" href="/gallery" className="col-start-1 md:col-start-0 translate-y-0" />
                    <SectionButton title="Contact" href="/contact" className="col-start-2 md:col-start-3 translate-y-0" />
                </div>
            </motion.div>

            {/* Center Image (Always Visible, Z-Index higher than background but maybe independent of mask?) */}
            {/* "Image in center... Image when hovered over reveals appropriate sections" */}
            {/* Construct:
                Center: Image.
                Around: Data.
                Data is hidden.
                Hovering Image -> Enables "Reveal Mode"?
                Or simpler: Data is always "there" but masked. 
                I'll keep the Mask always active for now, as "reveal at pointer" implies direct control.
            */}

            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                <div className="relative w-80 h-80 md:w-[30rem] md:h-[30rem] rounded-full overflow-hidden border-4 border-white/10 shadow-2xl transition-transform duration-100 ease-out">
                    {/* Profile Image with Parallax */}
                    <div
                        ref={imageRef}
                        className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)]"
                    >
                        <Image
                            src="/assets/GraduatePhoto.jpg"
                            alt="Profile"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Hint text if needed */}
            <div className="absolute bottom-10 left-0 right-0 text-center text-white/30 text-sm z-10 pointer-events-none">
                Move cursor to explore
            </div>
        </div>
    );
}



// ... (existing code)

function SectionButton({ title, href = "#", className }: { title: string, href?: string, className?: string }) {
    return (
        <Link
            href={href}
            className={cn(
                "group relative flex items-center justify-center w-40 h-40 md:w-56 md:h-56 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300",
                className
            )}
        >
            <span className="text-xl md:text-3xl font-serif text-white tracking-wider group-hover:scale-110 transition-transform duration-300">
                {title}
            </span>
        </Link>
    )
}
