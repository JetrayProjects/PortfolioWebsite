"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Github,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Project {
    name: string;
    title: string;
    description: string;
    imageUrl: string;
    githubUrl?: string;
    liveUrl?: string;
    technologies?: string[];
}

export interface ProjectCarouselProps {
    projects: Project[];
    className?: string;
}

export function ProjectCarousel({ projects, className }: ProjectCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () =>
        setCurrentIndex((index) => (index + 1) % projects.length);
    const handlePrevious = () =>
        setCurrentIndex(
            (index) => (index - 1 + projects.length) % projects.length
        );

    const currentProject = projects[currentIndex];

    return (
        <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
            {/* Desktop layout */}
            <div className='hidden md:flex relative items-center'>
                {/* Project Image */}
                <div className='w-[470px] h-[470px] rounded-3xl overflow-hidden bg-gray-200 dark:bg-neutral-800 flex-shrink-0 border border-white/10'>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentProject.imageUrl}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className='w-full h-full'
                        >
                            {currentProject.liveUrl ? (
                                <Link
                                    href={currentProject.liveUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='block w-full h-full cursor-pointer hover:opacity-90 transition-opacity'
                                >
                                    <Image
                                        src={currentProject.imageUrl}
                                        alt={currentProject.name}
                                        width={470}
                                        height={470}
                                        className='w-full h-full object-cover'
                                        draggable={false}
                                        priority
                                    />
                                </Link>
                            ) : (
                                <Image
                                    src={currentProject.imageUrl}
                                    alt={currentProject.name}
                                    width={470}
                                    height={470}
                                    className='w-full h-full object-cover'
                                    draggable={false}
                                    priority
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Card */}
                <div className='bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl p-8 ml-[-80px] z-10 max-w-xl flex-1'>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentProject.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <div className='mb-6'>
                                <h2 className='text-2xl font-bold text-white mb-2'>
                                    {currentProject.name}
                                </h2>

                                <p className='text-sm font-medium text-gray-400'>
                                    {currentProject.title}
                                </p>
                            </div>

                            <p className='text-white/80 text-base leading-relaxed mb-6'>
                                {currentProject.description}
                            </p>

                            {/* Technologies */}
                            {currentProject.technologies && currentProject.technologies.length > 0 && (
                                <div className='mb-6'>
                                    <div className='flex flex-wrap gap-2 justify-center'>
                                        {currentProject.technologies.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className='px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full border border-white/20'
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Links */}
                            <div className='flex space-x-4 justify-center'>
                                {currentProject.githubUrl && (
                                    <Link
                                        href={currentProject.githubUrl}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all hover:scale-105 cursor-pointer'
                                        aria-label='GitHub Repository'
                                    >
                                        <Github className='w-5 h-5 text-white' />
                                        <span className='text-sm text-white font-medium'>GitHub</span>
                                    </Link>
                                )}
                                {currentProject.liveUrl && (
                                    <Link
                                        href={currentProject.liveUrl}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all hover:scale-105 cursor-pointer'
                                        aria-label='Live Demo'
                                    >
                                        <ExternalLink className='w-5 h-5 text-white' />
                                        <span className='text-sm text-white font-medium'>Live Demo</span>
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile layout */}
            <div className='md:hidden max-w-sm mx-auto text-center bg-transparent'>
                {/* Project Image */}
                <div className='w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-3xl overflow-hidden mb-6 border border-white/10'>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentProject.imageUrl}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className='w-full h-full'
                        >
                            {currentProject.liveUrl ? (
                                <Link
                                    href={currentProject.liveUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='block w-full h-full cursor-pointer hover:opacity-90 transition-opacity'
                                >
                                    <Image
                                        src={currentProject.imageUrl}
                                        alt={currentProject.name}
                                        width={400}
                                        height={400}
                                        className='w-full h-full object-cover'
                                        draggable={false}
                                        priority
                                    />
                                </Link>
                            ) : (
                                <Image
                                    src={currentProject.imageUrl}
                                    alt={currentProject.name}
                                    width={400}
                                    height={400}
                                    className='w-full h-full object-cover'
                                    draggable={false}
                                    priority
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Card content */}
                <div className='px-4'>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentProject.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <h2 className='text-xl font-bold text-white mb-2'>
                                {currentProject.name}
                            </h2>

                            <p className='text-sm font-medium text-gray-400 mb-4'>
                                {currentProject.title}
                            </p>

                            <p className='text-white/80 text-sm leading-relaxed mb-4'>
                                {currentProject.description}
                            </p>

                            {/* Technologies */}
                            {currentProject.technologies && currentProject.technologies.length > 0 && (
                                <div className='mb-6'>
                                    <div className='flex flex-wrap gap-2 justify-center'>
                                        {currentProject.technologies.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className='px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full border border-white/20'
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Links */}
                            <div className='flex justify-center space-x-4'>
                                {currentProject.githubUrl && (
                                    <Link
                                        href={currentProject.githubUrl}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all cursor-pointer'
                                        aria-label='GitHub Repository'
                                    >
                                        <Github className='w-4 h-4 text-white' />
                                        <span className='text-xs text-white font-medium'>GitHub</span>
                                    </Link>
                                )}
                                {currentProject.liveUrl && (
                                    <Link
                                        href={currentProject.liveUrl}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all cursor-pointer'
                                        aria-label='Live Demo'
                                    >
                                        <ExternalLink className='w-4 h-4 text-white' />
                                        <span className='text-xs text-white font-medium'>Live</span>
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom navigation */}
            <div className='flex justify-center items-center gap-6 mt-8'>
                {/* Previous */}
                <button
                    onClick={handlePrevious}
                    aria-label='Previous project'
                    className='w-12 h-12 rounded-full bg-white/10 border border-white/20 shadow-md flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer'
                >
                    <ChevronLeft className='w-6 h-6 text-white' />
                </button>

                {/* Dots */}
                <div className='flex gap-2'>
                    {projects.map((_, projectIndex) => (
                        <button
                            key={projectIndex}
                            onClick={() => setCurrentIndex(projectIndex)}
                            className={cn(
                                "w-3 h-3 rounded-full transition-colors cursor-pointer",
                                projectIndex === currentIndex
                                    ? "bg-white"
                                    : "bg-white/40"
                            )}
                            aria-label={`Go to project ${projectIndex + 1}`}
                        />
                    ))}
                </div>

                {/* Next */}
                <button
                    onClick={handleNext}
                    aria-label='Next project'
                    className='w-12 h-12 rounded-full bg-white/10 border border-white/20 shadow-md flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer'
                >
                    <ChevronRight className='w-6 h-6 text-white' />
                </button>
            </div>
        </div>
    );
}
