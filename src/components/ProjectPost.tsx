import Post from './Post';

interface ProjectPostProps {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    link?: string;
    stats?: {
        likes: number;
        reposts: number;
        comments: number;
    };
}

const ProjectPost = ({ title, description, tags, image, link, stats }: ProjectPostProps) => {
    const content = (
        <div className="space-y-3">
            <div>
                <span className="font-bold text-xl text-gray-900">{title}</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{description}</p>

            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="text-blue-600 font-medium hover:underline text-sm">#{tag}</span>
                    ))}
                </div>
            )}

            {image && (
                <div className="mt-3 rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img src={image} alt={title} className="w-full h-auto object-cover" />
                </div>
            )}

            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-blue-600 hover:text-blue-700 hover:underline break-all font-medium"
                >
                    {link}
                </a>
            )}
        </div>
    );

    return (
        <Post
            avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            name="Vishnu PB"
            handle="vishnupb"
            time="Just now"
            content={content}
            stats={stats}
        />
    );
};

export default ProjectPost;
