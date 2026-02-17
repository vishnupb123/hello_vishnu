import { MessageCircle, Heart, Repeat, Share } from 'lucide-react';

interface PostProps {
    avatar: string;
    name: string;
    handle: string;
    time: string;
    content: React.ReactNode;
    stats?: {
        comments: number;
        reposts: number;
        likes: number;
    };
}

const Post = ({ avatar, name, handle, time, content, stats }: PostProps) => {
    return (
        <div className="flex gap-4 p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
            {/* Avatar Column */}
            <div className="flex-shrink-0">
                <img
                    src={avatar}
                    alt={name}
                    className="w-12 h-12 rounded-full border border-gray-200"
                />
            </div>

            {/* Content Column */}
            <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">{name}</span>
                    <span className="text-gray-500">@{handle}</span>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-500 hover:underline cursor-pointer">{time}</span>
                </div>

                {/* Main Content */}
                <div className="text-gray-800 text-lg mb-3">
                    {content}
                </div>

                {/* Interaction Actions */}
                <div className="flex justify-between max-w-md text-gray-400 mt-4">
                    <button className="flex items-center gap-2 hover:text-blue-500 group transition-colors">
                        <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                            <MessageCircle size={18} />
                        </div>
                        <span className="text-sm">{stats?.comments || 0}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-green-500 group transition-colors">
                        <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                            <Repeat size={18} />
                        </div>
                        <span className="text-sm">{stats?.reposts || 0}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-pink-500 group transition-colors">
                        <div className="p-2 rounded-full group-hover:bg-pink-50 transition-colors">
                            <Heart size={18} />
                        </div>
                        <span className="text-sm">{stats?.likes || 0}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-500 group transition-colors">
                        <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                            <Share size={18} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Post;
