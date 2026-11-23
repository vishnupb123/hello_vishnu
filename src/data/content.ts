import voiceDiary from '../assets/vDairy-main.png';
import spine from '../assets/spinesight1.jpeg';
import fake from '../assets/fakenews1.jpeg';
import saleem from '../assets/saleem.jpeg';
import aswinjith from '../assets/Aswinjith.jpeg';
import aswin from '../assets/Aswin.png';
import adarsh from '../assets/Adarsh.jpeg';
import najmudheen from '../assets/Najmudheen.jpeg';

export const profile = {
    name: 'Vishnu PB',
    fullName: 'Vishnu Pookkattukunnath Baburaj',
    email: 'vishnupbofficial@gmail.com',
    phone: '+353 89 416 4860',
    phoneHref: 'tel:+353894164860',
    github: 'https://github.com/vishnupb123',
    linkedin: 'https://www.linkedin.com/in/vishnupb2001/',
    location: 'Dublin, Ireland',
    coords: '53.35°N  6.26°W',
};

/** Particle shapes, in the order the scene generates them. */
export const SHAPE = { name: 0, sphere: 1, station: 2, wave: 3, rings: 4, field: 5, portal: 6, strata: 7 } as const;

export const chapters = [
    { id: 'top', label: 'Index', shape: SHAPE.name },
    { id: 'about', label: 'Thesis', shape: SHAPE.sphere },
    { id: 'stationos', label: 'StationOS', shape: SHAPE.station },
    { id: 'continuum', label: 'Continuum', shape: SHAPE.wave },
    { id: 'research', label: 'Research', shape: SHAPE.rings },
    { id: 'archive', label: 'Archive', shape: SHAPE.field },
    { id: 'journey', label: 'Journey', shape: SHAPE.strata },
    { id: 'voices', label: 'Voices', shape: SHAPE.field },
    { id: 'contact', label: 'Contact', shape: SHAPE.portal },
];

export const flagships = [
    {
        id: 'stationos',
        index: '01',
        name: 'StationOS',
        kind: 'Logistics operations intelligence',
        lede: 'A delivery station modelled as a living, capacity-constrained system. A simulated operating day runs live while five governed AI agents detect risk, test mitigations in a digital twin, and wait for a human before acting.',
        figures: [
            ['0.857', 'ROC-AUC on held-out risk, after removing a leaking feature'],
            ['5', 'specialist agents under RBAC approval'],
            ['320+', 'backend tests'],
        ],
        stack: 'Python · FastAPI · SimPy · PostgreSQL · DuckDB · dbt · PPO · Ollama · OpenTelemetry · React',
        href: 'https://github.com/vishnupb123/logisticstationOS',
        note: 'Fictional station, synthetic data, not affiliated with any employer.',
    },
    {
        id: 'continuum',
        index: '02',
        name: 'Continuum',
        kind: 'Context-aware multimodal voice journaling',
        lede: 'My MSc dissertation, Context-MoDE, engineered into a platform. Voice becomes local transcripts, acoustic features, WavLM and MPNet embeddings, then a gated multimodal fusion that reads each person against their own baseline.',
        figures: [
            ['620+', 'automated tests'],
            ['M0→M4', 'milestones shipped'],
            ['0', 'clinical diagnoses, by design'],
        ],
        stack: 'Next.js · FastAPI · Celery · Redis · PostgreSQL · pgvector · faster-whisper · WavLM · Sentence-Transformers',
        href: 'https://github.com/vishnupb123/continuum',
    },
];

export const publication = {
    title: 'Charter Coherence Protocol: Eliminating Context Rot in Long-Running Autonomous Multi-Agent Enterprise Systems',
    venue: 'International Journal of Advanced Research in Science and Technology',
    details: 'Vol. 15, Issue 9 · pp. 2681–2695 · 2026',
    authors: 'G. Jeyaraj, J. Joseph Raj, J. S, V. Pookkattukunnath Baburaj',
    role: 'Co-author · Independent researcher, Ireland',
    summary:
        'LLM agents forget their rules as runs grow longer. We call this decay context rot. CCP treats each governing clause as signed, versioned authority: locked into the context window, refreshed by a TCP-style AIMD controller, gated at every tool call, and handed between agents with a three-way handshake.',
    result: ['60–79%', '0'],
    resultLabel: 'tool-executed rule violations, baseline → CCP, in every scenario',
    doi: '10.62226/ijarst20260929',
    href: 'https://doi.org/10.62226/ijarst20260929',
};

export const archive = [
    {
        name: 'VoiceDiary AI',
        kind: 'Affective computing',
        detail: 'Daily wellbeing from vocal features and language, built on Context-MoDE',
        image: voiceDiary,
    },
    {
        name: 'Spinesight AI',
        kind: 'Medical imaging',
        detail: 'Deep-learning X-ray analysis for early detection of spinal disorders',
        image: spine,
        href: 'https://spinesight-ai-1.onrender.com/',
    },
    {
        name: 'Fakenews AI',
        kind: 'NLP',
        detail: 'Models that flag misinformation, disinformation and propaganda',
        image: fake,
        href: 'https://github.com/vishnupb123/nlp_chatbot',
    },
];

export const experience = [
    {
        role: 'L3 Interim Learning Coordinator',
        org: 'Amazon',
        where: 'Dublin, Ireland',
        period: 'Present',
        points: ['Coordinating learning and training for associates across the site.'],
    },
    {
        role: 'Independent Researcher',
        org: 'Self-directed',
        where: 'Ireland',
        period: '2026',
        points: [
            'Co-authored the Charter Coherence Protocol (IJARST, Vol. 15, Issue 9) on keeping long-running multi-agent LLM systems inside their governing rules.',
            'Built StationOS and Continuum end to end: digital twins, governed agents, multimodal ML pipelines.',
        ],
    },
    {
        role: 'FC Associate',
        org: 'Amazon',
        where: 'Dublin, Ireland',
        period: '2025',
        points: [
            'Worked inside a highly data-driven, KPI-focused operation built on efficiency metrics and structured workflows.',
            'Built discipline, accountability and attention to detail in a fast-paced environment, and the operational awareness that informs my systems work.',
        ],
    },
    {
        role: 'Full Stack Developer',
        org: 'Freston Analytics Pvt. Ltd.',
        where: '',
        period: '2023 – 2024',
        points: [
            'Offered a full-time role at double the salary after a six-month internship.',
            'Explored new technologies, including real-time features with Peer.js, and contributed to multiple projects across two teams at once.',
            'Mentored newly joined interns through their first months, and planned delivery in Jira.',
        ],
    },
    {
        role: 'Frontend Developer Intern',
        org: 'Freston Analytics Pvt. Ltd.',
        where: '',
        period: '2022 – 2023',
        points: [
            'Built 10+ responsive React applications from Figma mockups, lifting customer satisfaction by 20%.',
            'Raised Jest coverage to 85%, cutting regression issues by 25%.',
            'Led a 3-person team to deliver an HR management MVP in 6 weeks.',
            'Cut page load times by 15% through state management and modular design.',
        ],
    },
];

export const education = [
    { role: 'MSc Artificial Intelligence', org: 'Dublin Business School', where: 'Second Class Honours', period: '2026' },
    { role: 'BSc Computer Science', org: 'University of Calicut', where: 'First Class Honours', period: '2022' },
];

export const toolkit =
    'Python, TypeScript, PyTorch, TensorFlow, scikit-learn, Hugging Face, Whisper, WavLM, agent orchestration, RAG, LLM evaluation, FastAPI, Node.js, PostgreSQL, Redis, DuckDB, dbt, Celery, React, Next.js, Three.js, Docker, Kubernetes, AWS, GitHub Actions.';

export const testimonials = [
    {
        text: 'I had the pleasure of managing Vishnu during his time as a Software Developer, and he stood out for his sharp problem-solving skills and strong technical expertise. He quickly understood challenges and delivered effective solutions, making him a reliable and impactful team member. Beyond his own contributions, Vishnu was excellent at teaching and mentoring others, especially interns in AI technologies, where his ability to simplify complex concepts made a big impact.',
        by: 'Saleem P O',
        role: 'Founder & CEO, Lifosis Digital Systems',
        image: saleem,
    },
    {
        text: 'I have had the pleasure of working with Vishnu, a highly skilled Software Engineer with deep expertise in React, Node.js, databases, and DevOps. He consistently demonstrates strong problem-solving abilities, professionalism, and a commitment to delivering high-quality solutions.',
        by: 'Aswinjith KS',
        role: 'Software Engineer',
        image: aswinjith,
    },
    {
        text: 'Vishnu is a highly skilled and dedicated software engineer with a strong foundation in full-stack development. His ability to quickly grasp new concepts and apply them effectively makes him a valuable asset to any team. He is a great collaborator and always willing to help others.',
        by: 'Aswin Parakkal',
        role: 'Data Scientist',
        image: aswin,
    },
    {
        text: 'Vishnu is a highly skilled and dedicated software engineer with a strong foundation in full-stack development. His ability to quickly grasp new concepts and apply them effectively makes him a valuable asset to any team. He is a great collaborator and always willing to help others.',
        by: 'Adarsh Lohithakshan',
        role: 'Full-Stack Developer',
        image: adarsh,
    },
    {
        text: 'Vishnu is a highly skilled and dedicated software engineer with a strong foundation in full-stack development. His ability to quickly grasp new concepts and apply them effectively makes him a valuable asset to any team. He is a great collaborator and always willing to help others.',
        by: 'Najmudheen M',
        role: 'Software Engineer',
        image: najmudheen,
    },
];
