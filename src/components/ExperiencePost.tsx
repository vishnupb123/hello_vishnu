import Post from './Post';
import { Briefcase } from 'lucide-react';

interface ExperiencePostProps {
    role: string;
    company: string;
    period: string;
    description: string;
    image?: string; // Company logo or office pic
}

const ExperiencePost = ({ role, company, period, description, image }: ExperiencePostProps) => {
    const content = (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1 uppercase tracking-wider font-semibold">
                <Briefcase size={14} />
                <span>Career Update</span>
            </div>
            <div className="font-bold text-xl leading-tight text-gray-900">
                {role} @ <span className="text-blue-600">{company}</span>
            </div>
            <div className="text-gray-500 text-sm">{period}</div>
            <p className="mt-2 text-gray-700 leading-relaxed">{description}</p>
            {image && (
                <div className="mt-3 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    <img src={image} alt={company} className="w-full h-48 object-cover" />
                </div>
            )}
        </div>
    );

    return (
        <Post
            avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            name="Vishnu PB"
            handle="vishnupb"
            time="Career History"
            content={content}
        />
    );
};

export default ExperiencePost;
