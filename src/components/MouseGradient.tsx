import { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MouseGradient = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 250); // Center the 500px circle
            mouseY.set(e.clientY - 250);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{ x, y }}
            className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 mix-blend-multiply filter blur-3xl opacity-30"
            animate={{
                background: [
                    "radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(255,255,255,0) 60%)",
                    "radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, rgba(255,255,255,0) 60%)",
                    "radial-gradient(circle, rgba(232, 121, 249, 0.4) 0%, rgba(255,255,255,0) 60%)",
                    "radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(255,255,255,0) 60%)",
                ]
            }}
            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    );
};

export default MouseGradient;
