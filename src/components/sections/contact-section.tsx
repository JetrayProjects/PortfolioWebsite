"use client";

import React from "react";
import { Phone, Linkedin, Github, Download } from "lucide-react";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { cn } from "@/lib/utils";

export function ContactSection({ className }: { className?: string }) {
    return (
        <section className={cn("text-white min-h-screen w-full flex flex-col items-center justify-center relative px-4 py-20", className)}>
            <div className="relative z-10 w-full max-w-4xl text-center space-y-12 animate-in fade-in duration-700">
                <div className="mb-12">
                    <h1 className='text-5xl md:text-7xl font-serif font-semibold tracking-tight leading-[120%] bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent mb-6'>
                        Contact
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-serif">
                        Let's connect and create something amazing together
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <Link
                        href="tel:+12674398595"
                        className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all hover:scale-105 cursor-pointer"
                    >
                        <Phone className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                        <span className="text-lg text-white font-serif">Phone</span>
                    </Link>

                    <Link
                        href="https://www.linkedin.com/in/sahil-jartare"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all hover:scale-105 cursor-pointer"
                    >
                        <Linkedin className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                        <span className="text-lg text-white font-serif">LinkedIn</span>
                    </Link>

                    <Link
                        href="https://github.com/JetrayProjects"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all hover:scale-105 cursor-pointer"
                    >
                        <Github className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                        <span className="text-lg text-white font-serif">GitHub</span>
                    </Link>

                    <Link
                        href="/assets/Sahil-Jartare-Resume-CS.pdf"
                        download
                        className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all hover:scale-105 cursor-pointer"
                    >
                        <Download className="w-5 h-5 text-white group-hover:translate-y-1 transition-transform" />
                        <span className="text-lg text-white font-serif">Resume</span>
                    </Link>
                </div>

                <div className="mt-12 flex justify-center">
                    <Link
                        href="/request"
                    >
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="div"
                            className="bg-black text-white flex items-center space-x-3 px-8 py-3"
                            duration={1.5}
                        >
                            <span className="text-xl font-semibold">
                                Make me a website
                            </span>
                        </HoverBorderGradient>
                    </Link>
                </div>
            </div>
        </section>
    );
}
