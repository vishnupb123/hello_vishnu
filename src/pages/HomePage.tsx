import { motion, useScroll, useTransform } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const HomePage = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-center min-h-screen px-8 md:px-16 relative overflow-hidden"
        >
            {/* Parallax Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[var(--soft-blue)] rounded-full blur-[100px] opacity-40 mix-blend-multiply"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[var(--soft-purple)] rounded-full blur-[100px] opacity-40 mix-blend-multiply"
                />
            </div>

            {/* Main Content Card with Glassmorphism */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="glass-panel p-10 md:p-16 rounded-3xl max-w-4xl shadow-sm hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-500 border border-white/60 relative z-10 group"
            >
                <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-lg rotate-12 group-hover:rotate-6 transition-transform duration-500">
                    <Sparkles className="text-yellow-400" size={32} />
                </div>

                <motion.h2
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl font-semibold text-gray-500 mb-2 tracking-wide uppercase"
                >
                    Hello, I'm
                </motion.h2>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl md:text-8xl font-black text-gray-900 mb-6 tracking-tight leading-[0.9]"
                >
                    Vishnu PB<span className="text-blue-500">.</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-xl text-gray-600 max-w-2xl leading-relaxed mb-10 font-medium"
                >
                    Available to work full-time in <span className="syntax-string">Ireland</span> (<span className="syntax-keyword">Stamp 1G</span>) <br />
                    <span className="text-gray-500 text-lg font-normal">
                        <span className="syntax-type">Software developer</span> with hands-on experience delivering <span className="syntax-string">production-ready full-stack systems</span> and <span className="syntax-keyword">applied AI solutions</span> across enterprise software, <span className="syntax-fn">VoIP platforms</span>, <span className="syntax-fn">ERP systems</span>, and <span className="syntax-keyword">healthcare-focused AI research</span>. Known for rapid onboarding, ownership in high-pressure environments, and shipping <span className="syntax-string">high-impact solutions</span> end-to-end.
                    </span>
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-4"
                >
                    <NavLink
                        to="/projects"
                        className="px-8 py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 group/btn"
                    >
                        View Projects
                        <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="px-8 py-4 rounded-xl bg-white text-gray-900 font-bold border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                        About Me
                    </NavLink>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default HomePage;
