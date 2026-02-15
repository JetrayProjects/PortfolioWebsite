"use client";

import React from "react";
import { ExperienceStack, ExperienceData } from "@/components/ui/experience-card";
import { cn } from "@/lib/utils";

const experiences: ExperienceData[] = [
    {
        employer: "Temple University",
        position: "AI Research Scholar",
        role: "Apprenticeship",
        date: "May 2025 - December 2025",
        description: `- Implemented a Vision Transformer (ViT) + Vector Quantized General Adversarial Network (VQGAN) to solve Jigsaw puzzles with the goal of improving spatial reasoning capabilities of VLMs
- Finetuned model to improve accuracy and precision by 20% by introducing patch masking at inference
- Designed automated pipelines for executing code on Modal.com cloud service`,
        color: "#18181B",
    },
    {
        employer: "Manzanita K.K",
        position: "Data Science Intern",
        role: "Internship",
        date: "June 2024 - August 2024",
        description: `- Developed an automated Instagram scraper in Python using Selenium library to extract public user information
- Finetuned and optimized AI models like YOLO, NLPconnect and Salesforce BLIP to analyze 1200+ images for user behavior insights
- Designed automated data pipelines, integrating Pandas, NumPy, PIL, Matplotlib, improving dataset processing efficiency`,
        color: "#27272A",
    },
    {
        employer: "Temple University",
        position: "Peer Tutor",
        role: "Part-time",
        date: "September 2024 - December 2025",
        description: "Dedicated to supporting students in resolving queries related to Computer and Information Science courses, including C, Java, Python, Data Structures and Algorithms, and Calculus, among others.",
        color: "#3F3F46",
    },
    {
        employer: "Project Destined",
        position: "Real Estate Private Equity Intern ",
        role: "Internship",
        date: "July 2025 - August 2025",
        description: "Participating in a 5-week real estate private equity training program, where I will be underwriting three multifamily deals in both team and individual settings, culminating in a private equity investment competition.",
        color: "#52525B",
    },
    {
        employer: "Temple University Japan",
        position: "Java and C Tutor",
        role: "Part-time",
        date: "January 2022 - December 2022",
        description: "- Guided students regarding any queries regarding their assignments and solved doubts related to understanding the programming knowledge.\n Assisted students in understanding the fundamentals of Java and C programming languages, including syntax, data structures, and algorithms.",
        color: "#71717A",
    },
];

export function ExperienceSection({ className }: { className?: string }) {
    return (
        <section className={cn("relative z-10", className)}>
            <ExperienceStack experiences={experiences}>
                <div className='text-white h-screen w-full flex items-center justify-center relative'>
                    <div className="relative z-10 max-w-4xl px-8 text-center space-y-6 animate-in fade-in duration-700">
                        <h1 className='text-5xl md:text-7xl font-serif font-semibold tracking-tight leading-[120%] bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent'>
                            Experience
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-serif">
                            Scroll down to explore my professional journey
                        </p>
                    </div>
                </div>
            </ExperienceStack>
        </section>
    );
}
