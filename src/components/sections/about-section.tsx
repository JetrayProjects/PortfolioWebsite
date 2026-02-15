"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function AboutSection({ className }: { className?: string }) {
    return (
        <section className={cn("min-h-screen flex items-center justify-center py-20 px-8", className)}>
            <div className="max-w-2xl w-full space-y-8 animate-in fade-in duration-700 slide-in-from-bottom-10">
                <h1 className="text-5xl md:text-7xl font-serif mb-8 text-center bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                    About Me
                </h1>

                <div className="space-y-6 text-xl leading-relaxed text-gray-300 font-serif">
                    <p>
                        I’m Sahil Jartare, a Computer Science and Economics double major at Temple University who enjoys building things that sit at the intersection of AI, data, and real-world problem solving. I’ve worked on projects ranging from Vision Transformers and VQGAN models for spatial reasoning research to full-stack web apps using React, Django, and Spring Boot.
                    </p>

                    <p>
                        I like turning complex ideas into practical tools—whether that’s analyzing transportation crash data to uncover safety patterns, building collaborative AI apps that convert sketches into code, or designing pipelines that process large image datasets for behavioral insights. Along the way, I’ve developed a strong foundation in Python, JavaScript, and cloud platforms like GCP and AWS, while also gaining experience working in research and internship settings.
                    </p>

                    <p>
                        Outside of tech, I enjoy exploring languages and cultures—I’m fluent in English, speak Hindi and Marathi natively, and have advanced proficiency in Japanese (JLPT N2). I’m always excited to work on projects that combine technology, creativity, and global impact, and I’m currently looking for opportunities where I can grow as an engineer by contributing to meaningful, user focused products.
                    </p>
                </div>
            </div>
        </section>
    );
}
