'use client';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

export interface ExperienceData {
    employer: string;        // Name of Employer
    position: string;        // Position at company
    role?: string;          // Optional: Role type (e.g., "Full-time", "Part-time", "Internship")
    date: string;           // Date of job (e.g., "Jan 2023 - Present")
    description: string;    // Job description
    image?: string;         // Optional: Company logo or relevant image
    color: string;          // Card background color
}

interface ExperienceCardProps {
    i: number;
    employer: string;
    position: string;
    role?: string;
    date: string;
    description: string;
    image?: string;
    color: string;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

export const ExperienceCard = ({
    i,
    employer,
    position,
    role,
    date,
    description,
    image,
    color,
    progress,
    range,
    targetScale,
}: ExperienceCardProps) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start'],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div
            ref={container}
            className='h-screen flex items-center justify-center sticky top-0'
            style={{ zIndex: i + 1 }}
        >
            <motion.div
                style={{
                    backgroundColor: color,
                    scale,
                    top: `calc(-5vh + ${i * 25}px)`,
                }}
                className={cn(
                    "flex flex-col relative w-[85%] md:w-[80%] max-w-4xl rounded-2xl p-8 md:p-12 origin-top shadow-2xl border border-white/10 backdrop-blur-sm",
                    "h-[500px] md:h-[500px]" // Revert to fixed height if preferred, but keeping it somewhat responsive
                )}
            >
                {/* Header: Employer and Date */}
                <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                    <h2 className='text-3xl md:text-4xl font-serif font-semibold text-white'>{employer}</h2>
                    <span className='text-sm md:text-base text-white/70 font-light whitespace-nowrap ml-4'>{date}</span>
                </div>

                {/* Position */}
                <h3 className='text-xl md:text-2xl text-white/80 mb-6 font-light'>
                    {position}
                    {role && <span className='text-sm ml-2 text-white/50'>({role})</span>}
                </h3>

                {/* Content Area: Description and Image */}
                <div className="flex flex-col md:flex-row h-full gap-8 overflow-hidden">
                    {/* Description */}
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <ul className='text-base md:text-lg leading-relaxed text-white/80 font-light list-disc list-inside space-y-2'>
                            {description.split('\n').filter(line => line.trim()).map((line, idx) => (
                                <li key={idx}>{line.replace(/^-\s*/, '').trim()}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Image (Optional) */}
                    {image && (
                        <div className="relative w-full md:w-[40%] h-48 md:h-full rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
                            <motion.div
                                className="w-full h-full"
                                style={{ scale: imageScale }}
                            >
                                <img
                                    src={image}
                                    alt={`${employer} logo`}
                                    className='absolute inset-0 w-full h-full object-cover'
                                />
                            </motion.div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

interface ExperienceStackProps {
    experiences: ExperienceData[];
    children?: React.ReactNode;
}

export function ExperienceStack({ experiences, children }: ExperienceStackProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    return (
        <main className='bg-transparent w-full' ref={container}>
            {children}

            <section className='text-white w-full bg-transparent flex flex-col items-center relative'>
                {experiences.map((experience, i) => {
                    const targetScale = 1 - (experiences.length - i) * 0.05;
                    const step = 1 / experiences.length;
                    const startRange = i * step;

                    return (
                        <ExperienceCard
                            key={`exp_${i}`}
                            i={i}
                            employer={experience.employer}
                            position={experience.position}
                            role={experience.role}
                            date={experience.date}
                            description={experience.description}
                            image={experience.image}
                            color={experience.color}
                            progress={scrollYProgress}
                            range={[startRange, 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </section>
        </main>
    );
}
