
const SkillsWidget = () => {
    const skills = [
        "React", "TypeScript", "Node.js", "Tailwind CSS", "Next.js",
        "GraphQL", "PostgreSQL", "Docker", "AWS", "Figma"
    ];

    return (
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="font-bold text-xl mb-6 text-gray-900">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className="bg-gray-50 text-gray-700 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition cursor-default font-medium"
                    >
                        {skill}
                    </span>
                ))}
            </div>
            <div className="mt-8">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gray-700 to-gray-900 w-[85%]"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium uppercase tracking-wide">
                    <span>Frontend</span>
                    <span>Backend</span>
                    <span>DevOps</span>
                </div>
            </div>
        </div>
    );
};

export default SkillsWidget;
