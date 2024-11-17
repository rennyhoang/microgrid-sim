import React from 'react';

const Particles = () => {
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/background.jpg)' }}
            ></div>
            <div className="absolute inset-0 bg-white opacity-50"></div>
            <div className="relative z-10 text-center">
                <h1 className="pb-4 font-extrabold tracking-tight text-transparent 
                    text-7xl lg:text-8xl bg-clip-text bg-gradient-to-r 
                    from-cyan-400 via-blue-600 to-cyan-500">
                    SunScope
                </h1>
                <p className="text-xl text-gray-500 font-medium mb-8">
                    A tool to help you visualize sustainable solar solutions.
                </p>
                <div className="relative inline-flex">
                    <a
                        href="/interactive"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Particles;