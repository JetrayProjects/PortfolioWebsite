"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, animate, useTime, useTransform } from "motion/react";
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

export function HeroSection({ onSectionClick }: { onSectionClick?: (href: string) => void }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const imageRef = useRef<HTMLDivElement>(null);
    const [radius, setRadius] = useState(340);
    const [isMobile, setIsMobile] = useState(false);

    // Shared time-based rotation for synchronized animations
    const time = useTime();
    const rotate = useTransform(time, [0, 60000], [0, 360], { clamp: false });

    // Handle Responsive Radius and Mobile State
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            // Sync breakpoint with Home (1024px) for unified scroll logic
            const mobile = width < 1024;
            setIsMobile(mobile);

            // Calculate fluid radius based on image size to prevent overlap
            const vmin = Math.min(width, window.innerHeight);
            const imageSize = Math.max(160, Math.min(480, vmin * 0.40));
            const imageRadius = imageSize / 2;
            const buttonRadiusBuffer = width < 640 ? 40 : 60;

            let newRadius = imageRadius + buttonRadiusBuffer;

            if (width >= 1024) {
                newRadius = 340;
            } else if (width >= 640) {
                newRadius = Math.max(newRadius, 220);
            } else {
                newRadius = Math.max(newRadius, 130);
            }

            setRadius(newRadius);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Smooth mouse movement
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            animate(mouseX, e.clientX, { type: "tween", ease: "backOut", duration: 0.2 });
            animate(mouseY, e.clientY, { type: "tween", ease: "backOut", duration: 0.2 });

            if (imageRef.current) {
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                const xPct = (e.clientX / windowWidth - 0.5) * 2;
                const yPct = (e.clientY / windowHeight - 0.5) * 2;
                const moveX = xPct * -10;
                const moveY = yPct * -10;
                imageRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Mask gradient - Only on desktop
    const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

    return (
        <div className="relative w-full h-screen overflow-hidden bg-neutral-950">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <BeamsBackground intensity="medium" className="h-full">
                    <></>
                </BeamsBackground>
            </div>

            {/* Content Layer: Sections */}

            {/* Desktop Layer: Only visible on lg+ (1024px) */}
            <motion.div
                className="hidden lg:flex absolute inset-0 z-40 items-center justify-center pointer-events-none"
                style={{ maskImage, WebkitMaskImage: maskImage }}
            >
                <RotatingButtons rotate={rotate} radius={radius} onSectionClick={onSectionClick} isMobileView={isMobile} />
            </motion.div>

            {/* Mobile/Tablet Layer: Visible below lg (1024px) */}
            <div className="lg:hidden absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                <RotatingButtons rotate={rotate} radius={radius} onSectionClick={onSectionClick} isMobileView={isMobile} />
            </div>

            {/* Center Image */}
            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                <div className="relative w-[40vmin] h-[40vmin] max-w-[30rem] max-h-[30rem] min-w-[160px] min-h-[160px] rounded-full overflow-hidden border-4 border-white/10 shadow-2xl transition-all duration-300 ease-out">
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

            {/* Hint text */}
            <div className="absolute bottom-10 left-0 right-0 text-center text-white/30 text-sm z-10 pointer-events-none uppercase tracking-[0.2em]">
                {isMobile ? "Tap to explore" : "Hover to reveal"}
            </div>
        </div>
    );
}

function RotatingButtons({
    rotate,
    radius,
    onSectionClick,
    isMobileView
}: {
    rotate: import("motion/react").MotionValue<number>;
    radius: number;
    onSectionClick?: (href: string) => void;
    isMobileView: boolean;
}) {
    return (
        <motion.div
            className="relative w-full h-full flex items-center justify-center pointer-events-auto"
            style={{ rotate }}
        >
            {sections.map((section, i) => {
                const angle = (i / sections.length) * 2 * Math.PI - Math.PI / 2;

                return (
                    <div
                        key={section.title}
                        className="absolute"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(-50%, -50%)`,
                        }}
                    >
                        <motion.div
                            style={{
                                x: `${Math.cos(angle) * radius}px`,
                                y: `${Math.sin(angle) * radius}px`,
                            }}
                            transition={{ type: "spring", stiffness: 60, damping: 20 }}
                        >
                            <SectionButton
                                title={section.title}
                                href={section.href}
                                rotate={rotate}
                                onClick={onSectionClick}
                                isMobileView={isMobileView}
                                className="w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44"
                                textClassName="text-[10px] sm:text-base md:text-xl lg:text-2xl"
                            />
                        </motion.div>
                    </div>
                );
            })}
        </motion.div>
    );
}

function SectionButton({
    title,
    href = "#",
    className,
    textClassName,
    rotate,
    onClick,
    isMobileView
}: {
    title: string;
    href?: string;
    className?: string;
    textClassName?: string;
    rotate: import("motion/react").MotionValue<number>;
    onClick?: (href: string) => void;
    isMobileView: boolean;
}) {
    const counterRotate = useTransform(rotate, (value) => -value);

    const handleClick = (e: React.MouseEvent) => {
        // ONLY prevent default and use unified scroll if we are in mobile view
        if (isMobileView && onClick) {
            e.preventDefault();
            onClick(href);
        }
        // Otherwise (desktop), let the Link behave normally and navigate to the separate page
    };

    return (
        <motion.div style={{ rotate: counterRotate }}>
            <Link
                href={href}
                onClick={handleClick}
                className={cn(
                    "group relative flex items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300",
                    className
                )}
            >
                <span className={cn(
                    "font-serif text-white tracking-wider group-hover:scale-110 transition-transform duration-300",
                    textClassName
                )}>
                    {title}
                </span>
            </Link>
        </motion.div>
    )
}

