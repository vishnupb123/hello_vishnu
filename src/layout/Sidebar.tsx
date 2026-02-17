import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import profile from "../assets/profile.jpeg"

const Sidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Projects', path: '/projects' },
        { label: 'Testimonials', path: '/testimonials' },
        { label: 'Contact', path: '/contact' },
    ];

    const sidebarContent = (
        <div className="flex flex-col h-full p-8">
            {/* Avatar & Header */}
            <div className="flex flex-col items-center mb-12">
                <motion.div
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4 cursor-default"
                >
                    <img
                        src={profile}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Vishnu PB</h2>
                <p className="text-sm text-gray-500 font-medium">Full Stack Developer & AI/ML Engineer</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) => `
                            px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-between group
                            ${isActive
                                ? 'bg-gray-900 text-white shadow-lg scale-105'
                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                            }
                        `}
                    >
                        {item.label}
                        <motion.div
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                            className="h-0.5 bg-current rounded-full"
                        />
                    </NavLink>
                ))}
            </nav>

            {/* Footer & Actions */}
            <div className="mt-auto flex justify-between items-center pt-8 border-t border-gray-50">
                <a
                    href="mailto:hello@vishnupb.com"
                    className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors"
                >
                    Available for hire
                </a>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Hamburger Button */}
            <div className="md:hidden fixed top-4 right-4 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-3 bg-white rounded-full shadow-lg text-gray-900 border border-gray-100"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-80 h-screen sticky top-0 bg-[var(--soft-bg)] border-r border-gray-200/50 shadow-[10px_0_30px_rgba(0,0,0,0.02)] z-40">
                {sidebarContent}
            </aside>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 bg-[var(--soft-bg)] md:hidden"
                    >
                        {sidebarContent}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
