"use client";

import { useState, useRef, useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { StarsBackground } from "@/components/ui/stars";
import { FloatingHomeButton } from "@/components/ui/floating-home-button";
import { AnimatePresence, motion } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";

export default function Home() {
  const [showSections, setShowSections] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [initialSection, setInitialSection] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSectionClick = (href: string) => {
    if (isMobile) {
      setInitialSection(href);
      setShowSections(true);
    }
  };

  return (
    <main className="min-h-screen bg-black">
      <ReactLenis root={showSections}>
        <AnimatePresence mode="wait">
          {!showSections ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-screen w-full overflow-hidden"
            >
              <HeroSection onSectionClick={handleSectionClick} />
            </motion.div>
          ) : (
            <UnifiedSections
              initialSection={initialSection}
              onBack={() => {
                setShowSections(false);
                setInitialSection(null);
              }}
            />
          )}
        </AnimatePresence>
      </ReactLenis>
    </main>
  );
}

function UnifiedSections({
  initialSection,
  onBack
}: {
  initialSection: string | null;
  onBack: () => void
}) {
  const lenis = useLenis();
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    "/about": aboutRef,
    "/experience": experienceRef,
    "/projects": projectsRef,
    "/contact": contactRef,
    "/gallery": galleryRef,
  };

  // Scroll to initial section after transition
  useEffect(() => {
    if (initialSection && lenis) {
      const target = sectionRefs[initialSection]?.current;
      if (target) {
        const timeout = setTimeout(() => {
          lenis.scrollTo(target, { offset: 0, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
          // Trigger a resize to handle any layout shifts from mounting
          lenis.resize();
        }, 100);
        return () => clearTimeout(timeout);
      }
    }
  }, [initialSection, lenis]);

  return (
    <motion.div
      key="sections"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen w-full"
    >
      {/* Fixed Background for Sections */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarsBackground className="w-full h-full" />
      </div>

      {/* Floating Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <FloatingHomeButton onClick={onBack} />
      </div>

      {/* Stacked Sections */}
      <div className="relative z-10 w-full flex flex-col">
        <div ref={aboutRef} id="about-section"><AboutSection /></div>
        <div ref={experienceRef} id="experience-section"><ExperienceSection /></div>
        <div ref={projectsRef} id="projects-section"><ProjectsSection /></div>
        <div ref={contactRef} id="contact-section"><ContactSection /></div>
        <div ref={galleryRef} id="gallery-section"><GallerySection /></div>
      </div>
    </motion.div>
  );
}
