    export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white flex justify-center">
        {/* Figma想定：幅393px */}
        <div className="w-full max-w-98.25 min-h-screen px-7.5">
            {children}
        </div>
        </div>
    );
    }
