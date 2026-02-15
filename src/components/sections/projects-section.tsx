"use client";

import React from "react";
import { ProjectCarousel, Project } from "@/components/ui/project-carousel";
import { cn } from "@/lib/utils";

const projects: Project[] = [
    {
        name: "Sketch2Screen ",
        title: "Full-Stack Web Application",
        description: "An AI-powered collaborative application that allows users with no coding abilities to convert their sketches into production ready code.",
        imageUrl: "/assets/sketch2screen.png",
        githubUrl: "https://github.com/Capstone-Projects-2025-Fall/project-001-sketch2screen",
        liveUrl: "https://sketchtoscreen.onrender.com/",
        technologies: ["Django", "Node.js", "TypeScript", "ReactJS", "Anthropic API"],
    },
    {
        name: "ChefAI",
        title: "Full Stack Web Application",
        description: "ChefAI allows users to search for recipes based on the ingrredients and the quantity of the ingredients they have and is powered by LlAMA for recipe generation and is capable of recognizing your ingredients through images.",
        imageUrl: "/assets/chefai.png",
        githubUrl: "https://github.com/cis3296s25/01-ChefAI?tab=readme-ov-file",
        technologies: ["Django", "Python", "ReactJS", "JavaScript", "SQL"],
    },
    {
        name: "Ticket Reservation Chatbot",
        title: "AI Chatbot",
        description: "A cloud-native chat application using LangChain and AlloyDB AI with Retrieval-Augmented Generation (RAG) for automated reservation, information retrieval of airline tickets",
        imageUrl: "/assets/rag.png",
        githubUrl: "https://github.com/yourusername/project3",
        technologies: ["LangChain", "AlloyDB", "Google Cloud Platform"],
    },
    {
        name: "Kwotes",
        title: "Full Stack Web Application",
        description: "Kwotes is a platform where users can upload their favoritequotes and share them with others. ",
        imageUrl: "/assets/project4.jpg",
        githubUrl: "https://github.com/JetrayProjects/KwotesWebApplication",
        technologies: ["Spring Boot", "Java", "ReactJS", "JavaScript", "SQL"],
    },
];

export function ProjectsSection({ className }: { className?: string }) {
    return (
        <section className={cn("text-white min-h-screen w-full flex flex-col items-center justify-center relative px-4 py-20", className)}>
            <div className="relative z-10 w-full max-w-7xl text-center space-y-12 animate-in fade-in duration-700">
                <div className="mb-16">
                    <h1 className='text-5xl md:text-7xl font-serif font-semibold tracking-tight leading-[120%] bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent mb-6'>
                        Projects
                    </h1>
                </div>
                <ProjectCarousel projects={projects} />
            </div>
        </section>
    );
}
