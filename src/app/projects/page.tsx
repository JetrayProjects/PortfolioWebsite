import { StarsBackground } from "@/components/ui/stars";
import { ProjectsSection } from "@/components/sections/projects-section";
import { FloatingHomeButton } from "@/components/ui/floating-home-button";

export default function ProjectsPage() {
    return (
        <div className="relative min-h-screen bg-black text-white">
            <div className="fixed inset-0 z-0">
                <StarsBackground className="w-full h-full" />
            </div>

            <div className="fixed top-6 left-6 z-50">
                <FloatingHomeButton />
            </div>

            <div className="relative z-10">
                <ProjectsSection />
            </div>
        </div>
    );
}




