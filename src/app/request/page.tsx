"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import { FloatingHomeButton } from "@/components/ui/floating-home-button";
import { ChevronRight, Plus, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    secondaryEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
    mobile: z.string().optional(),
    country: z.string().min(1, "Country is required"),
    category: z.string().min(1, "Please select a category"),
    fonts: z.string().min(1, "Please specify your preferred fonts"),
    colors: z.array(z.string().min(1, "Color is required")).min(4, "At least 4 colors are required"),
    about: z.string().min(10, "Please describe what the website is about"),
    websiteName: z.string().min(2, "Website name is required"),
    sections: z.string().min(1, "Please list requested sections"),
    hasMedia: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

const categories = [
    "Portfolio",
    "E-commerce",
    "Blog",
    "Corporate",
    "Landing Page",
    "Educational",
    "Other"
];

export default function RequestPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fonts: "",
            colors: ["#000000", "#ffffff", "#3b82f6", "#10b981"],
            hasMedia: false,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "colors" as never,
    });

    const hasMedia = watch("hasMedia");

    const onSubmit = async (data: FormData) => {
        console.log("Form submitted:", data);
        // Information will be stored via Resend later when user provides API key
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
                <FloatingHomeButton className="fixed top-6 left-6 z-50" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center space-y-8"
                >
                    <div className="flex justify-center">
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                            <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={1.5} />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-4xl font-sans font-bold tracking-tight">Request Sent</h1>
                        <p className="text-white/50 leading-relaxed font-sans text-lg">
                            I've received your website request and will review it shortly.
                            Expect a response within 24-48 hours.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-sm font-sans text-white/30 hover:text-white transition-colors"
                    >
                        Submit another brief
                    </button>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white py-24 px-6 relative font-sans">
            <FloatingHomeButton className="fixed top-6 left-6 z-50" />

            <div className="max-w-3xl mx-auto space-y-16">
                {/* Header */}
                <div className="space-y-4 text-center md:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-sans font-bold tracking-tight"
                    >
                        Project Brief
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/40 font-sans text-lg md:text-xl max-w-xl"
                    >
                        High-end digital solutions tailored to your vision.
                        Provide the technical details below.
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-24">
                    {/* 1. Name */}
                    <Section num="01" title="Full Name">
                        <Input
                            placeholder="Enter your name"
                            {...register("name")}
                            error={errors.name?.message}
                        />
                    </Section>

                    {/* 2. Contact Information */}
                    <Section num="02" title="Contact Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Input
                                title="Primary Email"
                                placeholder="name@domain.com"
                                {...register("email")}
                                error={errors.email?.message}
                            />
                            <Input
                                title="Secondary Email (Optional)"
                                placeholder="Backup email"
                                {...register("secondaryEmail")}
                                error={errors.secondaryEmail?.message}
                            />
                            <Input
                                title="Mobile Number"
                                placeholder="International format"
                                {...register("mobile")}
                                error={errors.mobile?.message}
                            />
                            <Input
                                title="Location"
                                placeholder="Your current country"
                                {...register("country")}
                                error={errors.country?.message}
                            />
                        </div>
                    </Section>

                    {/* 3. Website Category */}
                    <Section num="03" title="Website Category">
                        <div className="relative group">
                            <select
                                {...register("category")}
                                className={cn(
                                    "w-full bg-transparent border-b border-white/10 py-4 text-xl font-sans focus:outline-none focus:border-white/40 transition-colors appearance-none cursor-pointer",
                                    errors.category && "border-red-500/50"
                                )}
                            >
                                <option value="" disabled className="bg-black text-white/40">Choose a project type</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                                ))}
                            </select>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity">
                                <Plus className="w-4 h-4 rotate-45" />
                            </div>
                        </div>
                        {errors.category && <p className="text-red-500/60 text-xs mt-2 font-sans">{errors.category.message}</p>}
                    </Section>

                    {/* 4. Font Style */}
                    <Section num="04" title="Typography">
                        <div className="space-y-6">
                            <p className="text-white/30 text-xs font-sans flex items-center gap-2">
                                Research at <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">Google Fonts</a>
                            </p>
                            <Input
                                placeholder="Specify Font Families (e.g. Inter, Archivo)"
                                {...register("fonts")}
                                error={errors.fonts?.message}
                            />
                        </div>
                    </Section>

                    {/* 5. Website Color Palette */}
                    <Section num="05" title="Color Palette">
                        <div className="space-y-8">
                            <p className="text-white/30 text-xs font-sans flex items-center gap-2">
                                Generate at <a href="https://coolors.co/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">Coolors.co</a>
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="relative group">
                                        <input
                                            type="color"
                                            {...register(`colors.${index}` as const)}
                                            className="w-full h-20 rounded-2xl bg-white/5 border border-white/10 cursor-pointer overflow-hidden ring-offset-black transition-all hover:scale-105 active:scale-95"
                                        />
                                        {index >= 4 && (
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="absolute -top-3 -right-3 bg-white text-black rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                            >
                                                <X className="w-3 h-3" strokeWidth={3} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => append("#000000")}
                                    className="w-full h-20 rounded-2xl border border-dashed border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-white/20 hover:text-white/60 hover:border-white/30"
                                >
                                    <Plus className="w-8 h-8" strokeWidth={1} />
                                </button>
                            </div>
                            {errors.colors && <p className="text-red-500/60 text-xs mt-4 font-sans">{errors.colors.message}</p>}
                        </div>
                    </Section>

                    {/* 6. What is the website about */}
                    <Section num="06" title="Project Vision">
                        <textarea
                            rows={6}
                            placeholder="Describe your core objectives, target audience, and key features..."
                            {...register("about")}
                            className={cn(
                                "w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-lg font-sans placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-all resize-none shadow-inner",
                                errors.about && "border-red-500/20"
                            )}
                        />
                        {errors.about && <p className="text-red-500/60 text-xs mt-3 font-sans">{errors.about.message}</p>}
                    </Section>

                    {/* 7. Website Name & Sections */}
                    <Section num="07" title="Structure">
                        <div className="space-y-12">
                            <Input
                                title="Preferred Project Name"
                                placeholder="Business or personal name"
                                {...register("websiteName")}
                                error={errors.websiteName?.message}
                            />
                            <Input
                                title="Core Page Sections"
                                placeholder="List required sections (e.g. Services, Contact, Gallery)"
                                {...register("sections")}
                                error={errors.sections?.message}
                            />
                        </div>
                    </Section>

                    {/* 8. Checkbox: Media */}
                    <Section num="08" title="Media Assets">
                        <label className="flex items-start gap-5 group cursor-pointer bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/[0.07] transition-all">
                            <div className="relative flex items-center h-7 pt-1">
                                <input
                                    type="checkbox"
                                    {...register("hasMedia")}
                                    className="peer h-7 w-7 rounded-lg border-2 border-white/10 bg-transparent checked:bg-white checked:border-white transition-all appearance-none cursor-pointer"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                                    <ChevronRight className="w-4 h-4 text-black transform rotate-90" strokeWidth={3} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xl font-sans font-medium text-white/70 group-hover:text-white transition-colors">
                                    I have existing photos or videos for the project
                                </span>
                                <AnimatePresence>
                                    {hasMedia && (
                                        <motion.p
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="text-sm text-white/30 font-sans tracking-tight leading-relaxed"
                                        >
                                            Technical Note: We handle file collection via secure transfer. I will reach out personally to sync your assets once the brief is reviewed.
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </label>
                    </Section>

                    {/* Submit Button */}
                    <div className="pt-10">
                        <button
                            type="submit"
                            className="group relative w-full md:w-auto px-16 py-6 bg-white text-black text-xl font-sans font-bold rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                        >
                            <span className="relative z-10 transition-colors">Submit Project Brief</span>
                            <div className="absolute inset-0 bg-neutral-100 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        </button>
                    </div>
                </form>
            </div>

            <footer className="mt-48 max-w-3xl mx-auto border-t border-white/5 pt-12 pb-24 opacity-20 text-[10px] font-sans text-center">
                Lead Intake Protocol — &copy; {new Date().getFullYear()} Sahil Jartare
            </footer>
        </main>
    );
}

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-6 border-b border-white/5 pb-6">
                <span className="text-xs font-mono text-white/20 tracking-widest">{num}</span>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-white/90 tracking-tight leading-none">{title}</h2>
            </div>
            <div className="pl-0 md:pl-10">
                {children}
            </div>
        </div>
    );
}

const Input = React.forwardRef<HTMLInputElement, { title?: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>>(
    ({ title, error, className, ...props }, ref) => (
        <div className="w-full space-y-3">
            {title && <label className="text-xs font-sans text-white/30 font-medium">{title}</label>}
            <input
                ref={ref}
                className={cn(
                    "w-full bg-transparent border-b border-white/10 py-4 text-xl font-sans placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors",
                    error && "border-red-500/30 text-red-400 placeholder:text-red-900",
                    className
                )}
                {...props}
            />
            {error && <p className="text-red-500/60 text-xs mt-2 font-sans">{error}</p>}
        </div>
    )
);
Input.displayName = "Input";
