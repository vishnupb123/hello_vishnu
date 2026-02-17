import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExperiencePost from '../components/ExperiencePost';
import { Layout, Server, Terminal, Brain, Code } from 'lucide-react';
import Freston from "../assets/download (1).jpeg"
import Amazon from "../assets/1766676118071.jpeg"


// Brand Icons Helper Component
const BrandIcon = ({ name, color }: { name: string; color: string }) => {
    // Simple mapping for demonstration. In a real app, use simple-icons or explicit SVGs
    // Using Lucide icons or text fallback for simplicity where specific SVGs aren't available without a library
    return (
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs ${color} shadow-md`}>
            {name.substring(0, 2).toUpperCase()}
        </div>
    );
};

const AboutPage = () => {
    const [activeTab, setActiveTab] = useState('who-am-i');

    const tabs = [
        { id: 'who-am-i', label: 'Who am I' },
        { id: 'skills', label: 'Skills' },
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
    ];

    const philosophyCards = [
        { title: "Philosophy", content: "Simplicity is the ultimate sophistication.", color: "bg-[var(--soft-blue)]" },
        { title: "Interests", content: "UI/UX Design, Open Source, AI, and Traveling.", color: "bg-[var(--soft-purple)]" },
        { title: "Goal", content: "To build software that empowers people.", color: "bg-[var(--soft-pink)]" }
    ];

    const skills = [
        {
            category: "Languages",
            icon: Code,
            items: [
                { name: "Python", color: "bg-red-600" },
                { name: "Java", color: "bg-orange-600" },
                { name: "C++", color: "bg-green-600" },
                { name: "C", color: "bg-purple-600" },
                { name: "JavaScript", color: "bg-blue-600" },
                { name: "TypeScript", color: "bg-green-600" },
                { name: "HTML", color: "bg-purple-600" },
                { name: "Julia", color: "bg-purple-600" },
            ]
        },
        {
            category: "Frontend",
            icon: Layout,
            items: [
                { name: "React.js", color: "bg-blue-500" },
                { name: "TypeScript", color: "bg-blue-600" },
                { name: "Tailwind CSS", color: "bg-cyan-500" },
                { name: "Next.js", color: "bg-black" },
                { name: "Framer", color: "bg-pink-500" },
                { name: "Redux", color: "bg-purple-500" },
                { name: "SaSS", color: "bg-pink-500" },
                { name: "Bootstrap", color: "bg-purple-500" },
                { name: "Material UI", color: "bg-blue-500" }
            ]
        },
        {
            category: "Backend",
            icon: Server,
            items: [
                { name: "Node.js", color: "bg-green-600" },
                { name: "Express.js", color: "bg-gray-600" },
                { name: "Redis", color: "bg-red-600" },
                { name: "MongoDB", color: "bg-green-600" },
                { name: "MySQL", color: "bg-blue-800" },
                { name: "Flask", color: "bg-green-600" },
                { name: "Django", color: "bg-green-600" },
                { name: "Spring Boot", color: "bg-green-600" },
                { name: "REST API", color: "bg-green-600" }
            ]
        },
        {
            category: "AI/ML",
            icon: Brain,
            items: [
                { name: "TensorFlow", color: "bg-red-600" },
                { name: "PyTorch", color: "bg-orange-600" },
                { name: "Scikit-learn", color: "bg-green-600" },
                { name: "Keras", color: "bg-purple-600" },
                { name: "Pandas", color: "bg-blue-600" },
                { name: "NumPy", color: "bg-green-600" },
                { name: "Matplotlib", color: "bg-purple-600" },
                { name: "Seaborn", color: "bg-blue-600" },
                { name: "OpenCV", color: "bg-green-600" },
            ]
        },
        {
            category: "Tools",
            icon: Terminal,
            items: [
                { name: "Git", color: "bg-orange-600" },
                { name: "Docker", color: "bg-blue-500" },
                { name: "Kubernetes", color: "bg-blue-500" },
                { name: "AWS", color: "bg-yellow-600" },
                { name: "Figma", color: "bg-purple-600" },
                { name: 'Adobe XD', color: 'bg-purple-600' },
                { name: "Vercel", color: "bg-black" },
                { name: 'Jest', color: 'bg-purple-600' },
                { name: 'Enzyme', color: 'bg-purple-600' },
            ]
        }


    ];

    return (
        <div className="h-screen flex flex-col pt-8 md:pt-16 pb-0 overflow-hidden">
            {/* Sticky Header Section */}
            <div className="px-8 md:px-16 flex-shrink-0 z-20 bg-[var(--soft-bg)]/80 backdrop-blur-md transition-colors duration-300">
                <h1 className="text-4xl md:text-6xl font-black mb-8 text-gray-900 tracking-tight">About Me</h1>

                {/* Custom Tab Switcher */}
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-gray-900 text-white shadow-lg scale-105'
                                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-8 md:px-16 pb-20 custom-scrollbar">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="py-8 max-w-5xl mx-auto"
                    >
                        {activeTab === 'who-am-i' && (
                            <div className="space-y-12">
                                <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
                                    <p className="text-xl md:text-2xl font-light text-gray-800">
                                        Hi there! I'm <span className="syntax-fn">Vishnu</span>. <br /><br />
                                        <span className="font-medium text-gray-500">
                                            I am an <span className="syntax-keyword">Artificial Intelligence</span> graduate and <span className="syntax-type">Full Stack Developer</span> with a strong interest in <span className="syntax-keyword">Artificial Intelligence</span>, <span className="syntax-keyword">Data Analytics</span>, and building <span className="syntax-string">intelligent, scalable systems</span>. My technical foundation lies in the <span className="syntax-fn">MERN stack</span> and <span className="syntax-fn">Next.js</span>, complemented by hands-on experience in <span className="syntax-type">machine learning</span>, <span className="syntax-type">data processing</span>, and problem-solving through real-world projects.<br /><br />
                                        </span>
                                        <span className="font-medium text-gray-500">
                                            I build <span className="syntax-string">digital products</span> that are as functional as they are beautiful. I enjoy transforming complex problems into <span className="syntax-string">structured, data-driven solutions</span>. Whether it is developing web applications, building <span className="syntax-keyword">predictive models</span>, or analyzing datasets for meaningful insights, I focus on creating solutions that are both <span className="syntax-type">technically sound</span> and practically impactful.
                                        </span>
                                    </p>
                                </div>

                                {/* Drag/Slide Carousel */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Snapshot</h3>
                                    <motion.div
                                        className="flex gap-6 overflow-hidden cursor-grab active:cursor-grabbing pb-10"
                                    >
                                        <motion.div
                                            drag="x"
                                            dragConstraints={{ right: 0, left: -400 }}
                                            className="flex gap-6"
                                        >
                                            {philosophyCards.map((card, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
                                                    className={`min-w-[280px] p-8 rounded-3xl ${card.color} border border-white/50 shadow-sm flex flex-col justify-around h-56 relative overflow-hidden group`}
                                                >
                                                    {/* Decorative circle */}
                                                    <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/20 blur-2xl group-hover:scale-150 transition-transform duration-500" />

                                                    <h3 className="font-bold text-gray-900 text-xl relative z-10">{card.title}</h3>
                                                    <p className="text-gray-700 font-medium relative z-10">{card.content}</p>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </motion.div>
                                </div>
                                <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
                                    <p className="text-xl md:text-2xl font-light text-gray-800">

                                        <span className="font-medium text-gray-500">
                                            Over time, I have developed strong <span className="syntax-keyword">analytical thinking</span>, adaptability, and a <span className="syntax-type">continuous learning mindset</span>. My experience working across <span className="syntax-string">software development</span>, <span className="syntax-keyword">machine learning</span>, and <span className="syntax-fn">IoT projects</span> has strengthened my ability to understand systems holistically — from <span className="syntax-type">backend logic</span> and <span className="syntax-type">data pipelines</span> to user-facing interfaces.<br /><br />
                                            I am particularly interested in leveraging <span className="syntax-keyword">AI</span> and <span className="syntax-keyword">data analytics</span> to solve real-world challenges in areas such as <span className="syntax-string">energy systems</span>, <span className="syntax-fn">optimization</span>, <span className="syntax-fn">automation</span>, and intelligent decision-making.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'skills' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {skills.map((group) => {
                                    const Icon = group.icon;
                                    return (
                                        <motion.div
                                            key={group.category}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            whileHover={{ y: -5 }}
                                            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow group"
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                                                    <Icon size={24} className="text-gray-900 group-hover:text-white transition-colors duration-300" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">{group.category}</h3>
                                            </div>

                                            <div className="grid grid-cols-3 gap-3">
                                                {group.items.map((skill) => (
                                                    <motion.div
                                                        key={skill.name}
                                                        whileHover={{ scale: 1.1 }}
                                                        className="flex flex-col items-center gap-2"
                                                    >
                                                        <BrandIcon name={skill.name} color={skill.color} />
                                                        <span className="text-xs font-medium text-gray-600">{skill.name}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}

                        {activeTab === 'experience' && (
                            <div className="space-y-6 max-w-3xl">
                                <ExperiencePost
                                    role="FC Associate"
                                    company="Amazon Ireland"
                                    period="2025"
                                    description="My part-time role as an FC Associate at Amazon Dublin is relevant because it has given me direct exposure to working within a highly data-driven and performance-oriented operational environment. Amazon’s systems rely heavily on efficiency metrics, process optimization, and structured workflows, which align closely with principles used in IT and data analysis. Through this experience, I have developed strong discipline, attention to detail, accountability, and the ability to work effectively in fast-paced, KPI-focused settings. It has strengthened my systems thinking and operational awareness, which I believe are valuable foundations for contributing to data-driven decision-making and analytical roles."
                                    image={Amazon}
                                />
                                <ExperiencePost
                                    role="Full Stack Developer"
                                    company="Freston Analytics Pvt. Ltd."
                                    period="2023 - 2024"
                                    description="Seeing my excellent performance as an intern, I was offered a full-time position as a software developer upon completing my six-month internship, with a doubled salary. This transition provided me with opportunities to work on innovative concepts and explore new technologies, including the Peer.js library. I had the chance to contribute to multiple projects simultaneously, which honed my time management skills as I coordinated efforts between two different teams. In addition to my development responsibilities, I took on the role of mentoring newly joined interns, guiding them through their initial stages and helping them integrate into the company. My experience also extended to using Jira for project management, where I developed strong organizational and planning skills, ensuring efficient workflow and successful project delivery."
                                    image={Freston}
                                />
                                <ExperiencePost
                                    role="Frontend Developer Intern"
                                    company="Freston Analytics Pvt. Ltd."
                                    period="2022 - 2023"
                                    description="Built 10+ responsive applications from Figma mockups using React.js, boosting customer satisfaction by 20%. Increased Jest test coverage to 85%, reducing regression issues by 25%. Led a 3-member team to deliver an HR management MVP in 6 weeks, streamlining HR workflows. Enhanced front-end performance through state management and modular design, reducing page load times by 15%."
                                />
                            </div>
                        )}

                        {activeTab === 'education' && (
                            <div className="space-y-8">
                                <div className="border-l-2 border-gray-200 pl-6 py-2 relative">
                                    <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-gray-900 border-4 border-white shadow-sm"></div>
                                    <h3 className="text-2xl font-bold text-gray-900">Master of Science in Artificial Intelligence</h3>
                                    <p className="text-gray-500 font-medium mb-4">Dublin Business School • 2025 - 2026 • Second Class Honours (Completed)</p>
                                    <p className="text-gray-600 leading-relaxed">
                                        During my MSc in Artificial Intelligence at Dublin Business School, I developed a strong foundation in machine learning, data analytics, statistical modeling, and intelligent systems design. The programme combined theoretical depth with practical implementation, allowing me to work extensively with real-world datasets and modern AI tools. For my dissertation, I focused on applying machine learning techniques to solve a data-driven problem, where I was responsible for the complete pipeline including data preprocessing, feature engineering, model selection, evaluation, and performance optimization. In addition to my dissertation, I completed several projects involving supervised and unsupervised learning, predictive analytics, and data visualization, strengthening my ability to translate complex data into meaningful insights. This academic experience has equipped me with both the technical expertise and analytical mindset required to design, evaluate, and deploy intelligent systems effectively.
                                    </p>
                                </div>
                                <div className="border-l-2 border-gray-200 pl-6 py-2 relative">
                                    <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-gray-900 border-4 border-white shadow-sm"></div>
                                    <h3 className="text-2xl font-bold text-gray-900">Bachelor of Science in Computer Science</h3>
                                    <p className="text-gray-500 font-medium mb-4">University of Calicut • 2019 - 2022 • First Class Honours (Completed)</p>
                                    <p className="text-gray-600 leading-relaxed">
                                        I completed my Bachelor of Science in Computer Science from University of Calicut, where I built a solid foundation in core computing principles, programming, and system design. The programme covered key areas such as data structures, algorithms, database management systems, operating systems, computer networks, and software engineering. During this time, I developed strong problem-solving and logical reasoning skills through academic projects and practical lab work. My coursework also introduced me to programming in multiple languages and the fundamentals of data handling and system architecture, which later became the foundation for my transition into Artificial Intelligence and full stack development. This degree strengthened my analytical thinking and provided the technical base upon which I have continued to build my expertise in AI, data analytics, and scalable application development.
                                    </p>
                                </div>
                            </div>

                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AboutPage;
