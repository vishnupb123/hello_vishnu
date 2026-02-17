import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import saleem from "../assets/saleem.jpeg"
import aswin from "../assets/Aswinjith.jpeg"
import aswin2 from "../assets/Aswin.png"
import adarsh from "../assets/Adarsh.jpeg"
import najmudheen from "../assets/Najmudheen.jpeg"

const testimonials = [
    {
        id: 1,
        name: "Saleem P O",
        role: "Founder and CEO of Lifosis Digital Systems",
        content: "I had the pleasure of managing Vishnu during his time as a <span class=\"syntax-type\">Software Developer</span>, and he stood out for his sharp <span class=\"syntax-fn\">problem-solving skills</span> and strong technical expertise. He quickly understood challenges and delivered effective solutions, making him a reliable and impactful team member.Beyond his own contributions, Vishnu was excellent at teaching and mentoring others, especially interns in <span class=\"syntax-keyword\">AI technologies</span>, where his ability to simplify complex concepts made a big impact. His curiosity for <span class=\"syntax-keyword\">new technologies</span> and willingness to share knowledge make him a true asset to any team.",
        image: saleem
    },
    {
        id: 2,
        name: "Aswinjith KS",
        role: "Software Engineer",
        content: "I have had the pleasure of working with Vishnu, a highly skilled <span class=\"syntax-type\">Software Engineer</span> with deep expertise in <span class=\"syntax-fn\">React, Node.js, databases, and DevOps</span>. He consistently demonstrates strong <span class=\"syntax-fn\">problem-solving abilities</span>, professionalism, and a commitment to delivering high-quality solutions. highly recommend Vishnu, an exceptional Software Engineer with strong expertise in React, Node.js, databases, and DevOps. He consistently delivers <span class=\"syntax-string\">scalable and reliable solutions</span>, collaborates effectively within teams, and demonstrates a high level of professionalism and technical excellence.",
        image: aswin
    },
    {
        id: 3,
        name: "Aswin Parakkal",
        role: "Data Scientist",
        content: "Vishnu is a highly skilled and dedicated <span class=\"syntax-type\">software engineer</span> with a strong foundation in <span class=\"syntax-fn\">full-stack development</span>. His ability to quickly grasp <span class=\"syntax-keyword\">new concepts</span> and apply them effectively makes him a valuable asset to any team. He is a great collaborator and always willing to help others. I highly recommend Vishnu for any <span class=\"syntax-type\">software engineering</span> role.",
        image: aswin2
    },
    {
        id: 4,
        name: "Adarsh Lohithakshan",
        role: "Fullstack Developer",
        content: "Vishnu is a highly skilled and dedicated <span class=\"syntax-type\">software engineer</span> with a strong foundation in <span class=\"syntax-fn\">full-stack development</span>. His ability to quickly grasp <span class=\"syntax-keyword\">new concepts</span> and apply them effectively makes him a valuable asset to any team. He is a great collaborator and always willing to help others. I highly recommend Vishnu for any <span class=\"syntax-type\">software engineering</span> role.",
        image: adarsh
    },
    {
        id: 5,
        name: "Najmudheen M",
        role: "Software Engineer",
        content: "Vishnu is a highly skilled and dedicated <span class=\"syntax-type\">software engineer</span> with a strong foundation in <span class=\"syntax-fn\">full-stack development</span>. His ability to quickly grasp <span class=\"syntax-keyword\">new concepts</span> and apply them effectively makes him a valuable asset to any team. He is a great collaborator and always willing to help others. I highly recommend Vishnu for any <span class=\"syntax-type\">software engineering</span> role.",
        image: najmudheen
    }
];

// Split testimonials for two rows
const row1 = [...testimonials.slice(0, 3), ...testimonials.slice(0, 3)];
const row2 = [...testimonials.slice(3), testimonials[0], ...testimonials.slice(3), testimonials[0]];

const TestimonialsPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen w-full max-w-full flex flex-col justify-center overflow-x-hidden py-8 relative"
        >
            {/* Background Blobs */}
            <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--soft-blue)] rounded-full blur-[120px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[var(--soft-pink)] rounded-full blur-[120px]"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
            </div>

            <div className="w-full flex flex-col items-start text-left mb-6 px-8 md:px-16 relative z-10">
                <h1 className="text-3xl md:text-4xl font-black mb-2 text-gray-900 font-sans tracking-tight">Kind Words</h1>
                <p className="text-gray-600 text-base max-w-2xl">
                    Don't just take my word for it. Here's what others have to say about working with me.
                </p>
            </div>

            <div className="space-y-3">
                {/* Row 1: Fast Scroll */}
                <div className="relative w-full overflow-hidden">
                    <div className="flex gap-4 w-max animate-scroll hover:[animation-play-state:paused] py-2 px-8">
                        {row1.map((item, idx) => (
                            <TestimonialCard key={`row1-${item.id}-${idx}`} item={item} />
                        ))}
                    </div>
                </div>

                {/* Row 2: Slow Scroll */}
                <div className="relative w-full overflow-hidden">
                    <div className="flex gap-4 w-max animate-scroll-slow hover:[animation-play-state:paused] py-2 px-8">
                        {row2.map((item, idx) => (
                            <TestimonialCard key={`row2-${item.id}-${idx}`} item={item} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Fade Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[var(--soft-bg)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[var(--soft-bg)] to-transparent z-10 pointer-events-none" />
        </motion.div>
    );
};

const TestimonialCard = ({ item }: { item: any }) => (
    <div className="min-w-[280px] max-w-[420px] flex-shrink-0 bg-white/60 backdrop-blur-xl border border-white/50 p-5 rounded-3xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="min-w-0">
                <h3 className="text-base font-bold text-gray-900 truncate">{item.name}</h3>
                <p className="text-xs text-gray-500 font-medium truncate">{item.role}</p>
            </div>
            <Quote size={16} className="ml-auto flex-shrink-0 text-gray-300 group-hover:text-blue-400 transition-colors" />
        </div>
        <p
            className="text-gray-700 text-sm leading-snug italic"
            dangerouslySetInnerHTML={{ __html: `"${item.content}"` }}
        />
    </div>
);

export default TestimonialsPage;
