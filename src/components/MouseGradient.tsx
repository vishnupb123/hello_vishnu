import { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MouseGradient = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Optimized spring physics for a "snappy" yet fluid feel
    const springConfig = { damping: 35, stiffness: 200, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Updated centering logic to handle different layer sizes
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Primary Large Glow */}
            <motion.div
                style={{
                    x, y,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full mix-blend-soft-light filter blur-[100px] opacity-40"
                animate={{
                    background: [
                        "radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(255,255,255,0) 70%)",
                        "radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, rgba(255,255,255,0) 70%)",
                        "radial-gradient(circle, rgba(232, 121, 249, 0.4) 0%, rgba(255,255,255,0) 70%)",
                        "radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(255,255,255,0) 70%)",
                    ]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Secondary Defined Spotlight */}
            <motion.div
                style={{
                    x, y,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                className="absolute top-0 left-0 w-[200px] h-[200px] rounded-full mix-blend-normal filter blur-[40px] opacity-20"
                animate={{
                    background: [
                        "radial-gradient(circle, rgba(167, 139, 250, 0.6) 0%, rgba(255,255,255,0) 60%)",
                        "radial-gradient(circle, rgba(244, 114, 182, 0.6) 0%, rgba(255,255,255,0) 60%)",
                        "radial-gradient(circle, rgba(96, 165, 250, 0.6) 0%, rgba(255,255,255,0) 60%)",
                        "radial-gradient(circle, rgba(167, 139, 250, 0.6) 0%, rgba(255,255,255,0) 60%)",
                    ]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
};

export default MouseGradient;
