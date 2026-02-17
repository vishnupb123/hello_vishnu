import React from 'react';
import Sidebar from './Sidebar';
import MouseGradient from '../components/MouseGradient';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen bg-[var(--soft-bg)] text-[var(--soft-text)] font-sans relative">
            <MouseGradient />
            <Sidebar />
            <main className="flex-1 w-full min-h-screen overflow-hidden relative">
                {children}
            </main>
        </div>
    );
};

export default Layout;
