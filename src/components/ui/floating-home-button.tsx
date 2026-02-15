"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

interface FloatingHomeButtonProps {
    onClick?: () => void;
    className?: string;
}

export function FloatingHomeButton({ onClick, className }: FloatingHomeButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            router.push("/");
        }
    };

    return (
        <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={handleClick}
            className={cn(
                "group flex items-center gap-3 transition-all duration-500 ease-out select-none pointer-events-auto",
                className
            )}
            aria-label="Back to Home"
        >
            <div className={cn(
                "relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500 ease-out",
                "backdrop-blur-xl bg-white/5 border border-white/10",
                "shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_8px_32px_0_rgba(0,0,0,0.37)]",
                "group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.1),0_12px_48px_0_rgba(0,0,0,0.45)]",
                "active:scale-95 transition-transform"
            )}>
                <div className="absolute inset-0 rounded-full border border-white/5 opacity-50 transition-opacity group-hover:opacity-100" />
                <ChevronLeft className="relative z-10 h-6 w-6 text-white/50 group-hover:text-white transition-colors" strokeWidth={1.5} />
            </div>

            <div className="flex flex-col items-start">
                <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-white/30 group-hover:text-white/50 transition-colors">
                    Back to
                </span>
                <span className="text-sm font-serif tracking-widest text-white/60 group-hover:text-white transition-colors">
                    HOME
                </span>
            </div>
        </motion.button>
    );
}
