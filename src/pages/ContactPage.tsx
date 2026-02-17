import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';

const ContactPage = () => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');

        // Simulate API call
        setTimeout(() => {
            setFormState('success');
            // Reset after 3 seconds
            setTimeout(() => setFormState('idle'), 3000);
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 md:p-16 max-w-6xl mx-auto min-h-screen flex flex-col justify-center relative"
        >
            {/* Background Blobs matching Home */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--soft-blue)] rounded-full blur-[100px] opacity-30 mix-blend-multiply"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--soft-purple)] rounded-full blur-[100px] opacity-30 mix-blend-multiply"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
                {/* Contact Info */}
                <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-6xl md:text-8xl font-black mb-8 text-gray-900 leading-[1.1] tracking-tight font-calligraphy">
                        Let's work <br /> <span className="syntax-keyword">together</span>.
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 leading-relaxed font-medium">
                        Have a project in mind? I'd love to hear about it.
                        Let's build something <span className="syntax-string">amazing</span> together.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-[var(--soft-blue)] flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <Mail size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Email</p>
                                <p className="text-xl font-bold text-gray-900">vishnupbofficial@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-[var(--soft-purple)] flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <Phone size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Phone</p>
                                <p className="text-xl font-bold text-gray-900">+353-894164860</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-[var(--soft-pink)] flex items-center justify-center text-pink-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Location</p>
                                <p className="text-xl font-bold text-gray-900"><span className="syntax-string">Dublin, Ireland</span></p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/50 relative overflow-hidden group hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all"
                >
                    <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white transition-all outline-none font-medium"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white transition-all outline-none font-medium"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Message</label>
                            <textarea
                                id="message"
                                rows={4}
                                required
                                className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white transition-all outline-none resize-none font-medium"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={formState !== 'idle'}
                            className={`w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group ${formState === 'success' ? 'bg-green-500 text-white' : 'bg-gray-900 text-white hover:bg-gray-800'
                                }`}
                        >
                            {formState === 'idle' && (
                                <>
                                    Send Message
                                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                            {formState === 'submitting' && (
                                <Loader2 size={18} className="animate-spin" />
                            )}
                            {formState === 'success' && (
                                <>
                                    Message Sent!
                                    <CheckCircle size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ContactPage;
