import React, { useRef, useState } from "react";

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
    children,
    className = "",
    spotlightColor = "rgba(255, 255, 255, 0.25)"
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Spotlight position
        setPosition({ x, y });

        // Tilt calculation
        // Calculate center of card
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate distance from center (-1 to 1 range approx)
        // We divide by width/height to get normalized values
        const rotateX = ((y - centerY) / centerY) * -10; // Increased to 10deg
        const rotateY = ((x - centerX) / centerX) * 10;  // Increased to 10deg

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md ${className}`}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                // Add smooth transition for transform only when leaving, so it snaps back.
                // During move, we want instant updates (no transition).
                transition: opacity === 0 ? 'transform 0.5s ease-out, opacity 0.3s' : 'opacity 0.3s',
                willChange: 'transform'
            }}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
};

export default SpotlightCard;
