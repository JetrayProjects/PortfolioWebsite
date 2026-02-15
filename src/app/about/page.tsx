import { StarsBackground } from "@/components/ui/stars";
import { AboutSection } from "@/components/sections/about-section";
import { FloatingHomeButton } from "@/components/ui/floating-home-button";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="fixed inset-0 z-0">
                <StarsBackground className="w-full h-full" />
            </div>

            <div className="fixed top-6 left-6 z-50">
                <FloatingHomeButton />
            </div>

            <div className="relative z-10">
                <AboutSection />
            </div>
        </div>
    );
}




