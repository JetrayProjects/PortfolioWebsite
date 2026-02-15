import { StarsBackground } from "@/components/ui/stars";
import { GallerySection } from "@/components/sections/gallery-section";
import { FloatingHomeButton } from "@/components/ui/floating-home-button";

export default function GalleryPage() {
    return (
        <div className="relative min-h-screen bg-black text-white">
            <div className="fixed inset-0 z-0">
                <StarsBackground className="w-full h-full" />
            </div>

            <div className="fixed top-6 left-6 z-50">
                <FloatingHomeButton />
            </div>

            <div className="relative z-10">
                <GallerySection />
            </div>
        </div>
    );
}




