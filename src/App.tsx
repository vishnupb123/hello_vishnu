import { Component, Suspense, lazy, useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';
import { Cursor, HUD, Loader } from './components/Frame';
import { Archive, Contact, Flagship, Hero, Journey, Research, Thesis, Voices } from './components/Sections';

const ParticleField = lazy(() => import('./scene/ParticleField'));

class SceneBoundary extends Component<{ children: ReactNode; onFail: () => void }, { failed: boolean }> {
    state = { failed: false };
    static getDerivedStateFromError() {
        return { failed: true };
    }
    componentDidCatch() {
        this.props.onFail();
    }
    render() {
        return this.state.failed ? null : this.props.children;
    }
}

function hasWebGL() {
    try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {
        return false;
    }
}

/** Old multi-page URLs (/about, /projects…) scroll to the matching chapter. */
const legacy: Record<string, string> = { '/about': 'about', '/projects': 'stationos', '/testimonials': 'voices', '/contact': 'contact' };

export default function App() {
    const [webgl] = useState(hasWebGL);
    const [ready, setReady] = useState(!webgl);
    const markReady = useCallback(() => setReady(true), []);

    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const lenis = reduced ? null : new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
        let raf = 0;
        const loop = (t: number) => {
            lenis?.raf(t);
            raf = requestAnimationFrame(loop);
        };
        if (lenis) raf = requestAnimationFrame(loop);

        const go = (id: string) => {
            const el = document.getElementById(id);
            if (!el) return;
            if (lenis) lenis.scrollTo(el, { duration: 2.2 });
            else el.scrollIntoView();
        };
        const onClick = (e: MouseEvent) => {
            const a = (e.target as HTMLElement).closest('a');
            const href = a?.getAttribute('href');
            if (!href?.startsWith('#')) return;
            e.preventDefault();
            go(href.slice(1));
            history.replaceState(null, '', href);
        };
        document.addEventListener('click', onClick);

        const target = legacy[window.location.pathname.replace(/\/$/, '')];
        let t: ReturnType<typeof setTimeout> | undefined;
        if (target) {
            history.replaceState(null, '', `/#${target}`);
            t = setTimeout(() => go(target), 1800);
        }

        return () => {
            cancelAnimationFrame(raf);
            lenis?.destroy();
            document.removeEventListener('click', onClick);
            if (t) clearTimeout(t);
        };
    }, []);

    return (
        <>
            {webgl && (
                <SceneBoundary onFail={markReady}>
                    <Suspense fallback={null}>
                        <ParticleField onReady={markReady} />
                    </Suspense>
                </SceneBoundary>
            )}
            <Loader ready={ready} />
            <HUD ready={ready} />
            <Cursor />
            <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[5]" />
            <main className="relative z-10">
                <Hero ready={ready} />
                <Thesis />
                <Flagship index={0} />
                <Flagship index={1} />
                <Research />
                <Archive />
                <Journey />
                <Voices />
                <Contact />
            </main>
        </>
    );
}
