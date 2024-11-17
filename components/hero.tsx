import Link from 'next/link';

interface HeroProps {
    showButton?: boolean;
}

export const Hero = ({ showButton = true }: HeroProps) => {
    return (
        <div className="text-center w-full px-4">
            <h1 className="pb-4 font-extrabold tracking-tight text-transparent 
                text-7xl lg:text-8xl bg-clip-text bg-gradient-to-r 
                from-cyan-400 via-blue-600 to-cyan-500">
                SunScope
            </h1>
            <p className="text-xl text-gray-500 font-medium mb-8">
                A tool to help you visualize sustainable solar solutions.
            </p>
            {showButton && (
                <div className="relative inline-flex">
                    <Link
                        href="/interactive"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Get Started
                    </Link>
                </div>
            )}
        </div>
    );
};