import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const listeners = new Set<(t: Theme) => void>();

export function getTheme(): Theme {
    return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function apply(t: Theme) {
    document.documentElement.dataset.theme = t;
    try {
        localStorage.setItem('theme', t);
    } catch {
        /* storage unavailable: the choice just won't persist */
    }
    listeners.forEach((l) => l(t));
}

type ViewTransitionDoc = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

/** Switch theme with a circular reveal that grows from (x, y), where supported. */
export function toggleTheme(x: number, y: number) {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
    const doc = document as ViewTransitionDoc;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!doc.startViewTransition || reduced) {
        apply(next);
        return;
    }
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = doc.startViewTransition(() => apply(next));
    vt.ready.then(() => {
        document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
            { duration: 900, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
        );
    });
}

export function onTheme(l: (t: Theme) => void) {
    listeners.add(l);
    return () => {
        listeners.delete(l);
    };
}

export function useTheme() {
    const [t, setT] = useState<Theme>(getTheme);
    useEffect(() => onTheme(setT), []);
    return t;
}

/** Particle palette per theme. */
export const palette = {
    dark: { fg: '#edebe6', accent: '#ff5a1f' },
    light: { fg: '#1a1917', accent: '#d9430c' },
};
