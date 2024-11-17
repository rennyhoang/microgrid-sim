import Link from 'next/link';

interface HeroProps {
    showButton?: boolean;
}

export const Hero = ({ showButton = true }: HeroProps) => {
    return (
        <div className="text-center w-full px-4">
            <h1 className="pb-4 font-extrabold tracking-tight text-transparent 
                text-7xl lg:text-8xl bg-clip-text bg-gradient-to-r 
                from-cyan-300 via-blue-500 to-cyan-400">
                SunScope
            </h1>
            <p className="text-xl text-blue-650 font-bold mb-8">
                A tool to help you visualize sustainable solar solutions.
            </p>
            {showButton && (
                <div className="relative inline-flex">
                    <Link
                        href="/interactive"
                        className="px-4 py-1 text-medium font-medium inline-flex items-center justify-center border rounded-full text-blue-300 hover:text-white bg-transparent hover:bg-blue-700 transition duration-150 ease-in-out w-full group border-slate-100/40"                    >
                        Get Started
                    </Link>
                </div>
            )}
        </div>
    );
};