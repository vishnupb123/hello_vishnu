import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Code2 } from 'lucide-react';
import voiceDiaryImage from '../assets/vDairy-main.png';
import voiceDiaryImage2 from '../assets/Vdiary-dashboard.png';
import voiceDiaryImage3 from '../assets/vDiary-home.png';
import voiceDiaryImage4 from '../assets/vDiary-calendar.png';
import voiceDiaryImage5 from '../assets/vDiary-tasks.png';
import spineSightImage from '../assets/spinesight1.jpeg';
import spineSightImage2 from '../assets/spinesight2.jpeg';
import spineSightImage3 from '../assets/spinesight3.jpeg';
import spineSightImage4 from '../assets/spinesight4.jpeg';
import fakenewsImage from '../assets/fakenews1.jpeg';
import fakenewsImage2 from '../assets/fakenews2.jpeg';
import fakenewsImage3 from '../assets/fakenews3.jpeg';


interface Project {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    tags: string[];
    image: any;
    link: string;
    github?: string;
    tools: string[];
    gallery?: any[];
}

const projects: Project[] = [
    {
        id: '1',
        title: "VoiceDiary AI",
        description: "A digital voice journalling platform which gives your daily mental health score based on your vocal features and text",
        fullDescription: "The core of this platform is built on top of an <span class=\"syntax-keyword\">AI Framework</span> (<span class=\"syntax-fn\">Context-MoDE</span> — Contextual Multi-modal Depression Encoder) which was my final year dissertation of my Masters in <span class=\"syntax-keyword\">Artificial Intelligence</span>. The ContextMode Framework is designed as a dynamic <span class=\"syntax-type\">state-based intelligence layer</span> that governs how the system interprets, reasons, and responds across time. Instead of treating each interaction as an isolated input-output exchange, <span class=\"syntax-fn\">ContextMode</span> continuously determines the user current behavioral and cognitive “mode” based on <span class=\"syntax-string\">longitudinal signals</span>. These modes are not labels or diagnoses; they are internally computed contextual states that shape how the system prioritizes sensitivity, depth, prompting style, and adaptive support. In other words, the framework regulates how the system thinks before deciding what it says. At its core, <span class=\"syntax-fn\">ContextMode</span> operates on structured <span class=\"syntax-keyword\">temporal memory</span>. Each user interaction updates a rolling internal state composed of baseline metrics, drift indicators, volatility measures, and <span class=\"syntax-type\">behavioral trends</span>. Rather than reacting to spikes or anomalies in isolation, the framework compares short-term signals against learned <span class=\"syntax-string\">personal baselines</span>. This allows it to detect meaningful deviations while respecting individual language norms and communication styles. The novelty lies in this <span class=\"syntax-string\">baseline-relative reasoning</span> — sensitivity adapts per user, avoiding rigid global thresholds that often cause overreaction or under-detection in conventional systems. Another defining feature is its strict <span class=\"syntax-type\">temporal integrity</span>. ContextMode ensures that all inferences are <span class=\"syntax-keyword\">forward-consistent</span> — future data never influences past state estimation. State updates follow clearly defined progression rules, making the system suitable for real-world deployment where auditability and reliability are critical. Because it is mode-driven rather than rule-triggered, the framework can gradually transition between support intensities instead of making abrupt behavioral shifts. This results in smoother, more human-like adaptation over time. Ultimately, the <span class=\"syntax-fn\">ContextMode Framework</span> represents a shift from reactive AI to <span class=\"syntax-string\">context-governed adaptive intelligence</span>. It integrates personalization, longitudinal reasoning, and behavioral signal aggregation into a unified <span class=\"syntax-keyword\">state engine</span> that continuously recalibrates system behavior. Its novelty is not in adding more features, but in orchestrating them through a structured, evolving internal context model — enabling a <span class=\"syntax-type\">professional-grade product</span> that grows more precise, stable, and user-aligned with every interaction.",
        tags: ['React', 'TypeScript', 'Tailwind'],
        image: voiceDiaryImage,
        link: "",
        github: "",
        tools: ['React', 'Redux Toolkit', 'Recharts', 'Tailwind CSS', 'Node.js', 'Python', 'PyTorch', 'TensorFlow', 'Hugging Face'],
        gallery: [
            voiceDiaryImage,
            voiceDiaryImage2,
            voiceDiaryImage3,
            voiceDiaryImage4,
            voiceDiaryImage5
        ]
    },
    {
        id: '2',
        title: "Spinesight AI",
        description: "An AI powered platform for early detection of spinal disorders.",
        fullDescription: "<span class=\"syntax-fn\">Spinesight AI</span> is a cutting-edge medical imaging platform designed for the early detection of spinal disorders. Leveraging advanced <span class=\"syntax-keyword\">deep learning algorithms</span>, the system analyzes X-ray images to identify subtle abnormalities that may be missed by the human eye. The platform provides clinicians with <span class=\"syntax-string\">rapid, accurate assessments</span>, highlighting potential issues such as vertebral fractures, degenerative changes, and spinal deformities. By integrating seamlessly with existing <span class=\"syntax-type\">clinical workflows</span>, <span class=\"syntax-fn\">Spinesight AI</span> empowers healthcare professionals to make earlier, more informed decisions, ultimately improving patient outcomes and reducing the long-term impact of spinal conditions.",
        tags: ['Next.js', 'OpenAI', 'Redis', 'Machine Learning', 'Deep Learning'],
        image: spineSightImage,
        link: "https://spinesight-ai-1.onrender.com/",
        github: "https://github.com/vishnupb123/spinesight-ai",
        tools: ['Next.js', 'Socket.io', 'Redis', 'OpenAI API', 'Tailwind CSS', 'Python', 'PyTorch', 'TensorFlow', 'Machine Learning', 'Deep Learning'],
        gallery: [
            spineSightImage,
            spineSightImage2,
            spineSightImage3,
            spineSightImage4
        ]
    },
    {
        id: '3',
        title: "Fakenews AI",
        description: "An AI powered platform for early detection of fake news.",
        fullDescription: "<span class=\"syntax-fn\">Fakenews AI</span> is a cutting-edge platform designed for the early detection of fake news. Leveraging advanced <span class=\"syntax-keyword\">deep learning algorithms</span>, the system analyzes news articles to identify subtle abnormalities that may be missed by the human eye. The platform provides users with <span class=\"syntax-string\">rapid, accurate assessments</span>, highlighting potential issues such as misinformation, disinformation, and propaganda. By integrating seamlessly with existing <span class=\"syntax-type\">news consumption workflows</span>, <span class=\"syntax-fn\">Fakenews AI</span> empowers users to make earlier, more informed decisions, ultimately improving their ability to identify and avoid fake news.",
        tags: ['Gatsby', 'GraphQL', 'React', 'TypeScript', 'Tailwind', 'NLP', 'Deep Learning'],
        image: fakenewsImage,
        link: "",
        github: "https://github.com/vishnupb123/nlp_chatbot",
        tools: ['Gatsby', 'Styled Components', 'GraphQL', 'Netlify', 'Python', 'PyTorch', 'TensorFlow', 'NLP', 'Deep Learning'],
        gallery: [
            fakenewsImage,
            fakenewsImage2,
            fakenewsImage3,
        ]
    }
];

const ProjectsPage = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const openModal = (id: string) => {
        setSelectedId(id);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 md:p-16 max-w-7xl mx-auto min-h-screen"
        >
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 tracking-tight font-sans">
                My Work
            </h1>
            <p className="text-gray-600 mb-12 text-lg max-w-2xl">
                A selection of my favorite projects, ranging from web applications to creative experiments.
            </p>

            {/* Project Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <motion.div
                        layoutId={project.id}
                        key={project.id}
                        onClick={() => openModal(project.id)}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 group aspect-square flex flex-col"
                    >
                        <div className="flex-1 overflow-hidden relative">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-fit group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="bg-white/90 text-gray-900 px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">View Project</span>
                            </div>
                        </div>
                        <div className="p-6 bg-white relative z-10">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                            <p className="text-gray-500 text-sm line-clamp-1">{project.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Large Grid Modal */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 md:p-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />

                        {/* Modal */}
                        <motion.div
                            layoutId={selectedId}
                            className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 text-gray-900 z-50 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {(() => {
                                const project = projects.find(p => p.id === selectedId)!;
                                const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

                                return (
                                    <>
                                        {/* Left: Project Gallery Grid */}
                                        <div className="md:w-3/5 overflow-y-auto p-4 md:p-8 bg-gray-50 order-1 md:order-1 custom-scrollbar">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {images.map((img, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="aspect-video rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 group/gallery"
                                                    >
                                                        <img
                                                            src={img}
                                                            alt={`${project.title} gallery ${idx + 1}`}
                                                            className="w-full h-full object-cover group-hover/gallery:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right: Details */}
                                        <div className="md:w-2/5 p-8 md:p-12 overflow-y-auto custom-scrollbar order-2 md:order-2 bg-white">
                                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">{project.title}</h2>

                                            <div className="flex flex-wrap gap-3 mb-8">
                                                {project.link && (
                                                    <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-lg font-bold hover:opacity-90 transition-opacity text-sm">
                                                        <ExternalLink size={16} /> Live Demo
                                                    </a>
                                                )}
                                                {project.github && (
                                                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2 border border-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors text-sm">
                                                        <Github size={16} /> Source
                                                    </a>
                                                )}
                                            </div>

                                            <p
                                                className="text-gray-600 text-sm leading-relaxed mb-10 text-justify"
                                                dangerouslySetInnerHTML={{ __html: project.fullDescription }}
                                            />

                                            <div className="mb-6">
                                                <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                                                    <Code2 size={20} className="text-blue-500" /> Technologies
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tools.map(tool => (
                                                        <span
                                                            key={tool}
                                                            className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-gray-200"
                                                        >
                                                            {tool}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProjectsPage;
