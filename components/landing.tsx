import { Hero } from './hero';

export const Landing = () => {
    return (
        <div
            className="w-full min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: 'url(/background.jpg)' }}
        >
            <Hero />
        </div>
    );
};