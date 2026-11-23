import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { chapters, profile } from '../data/content';
import { story } from '../scene/story';
import { toggleTheme, useTheme } from '../theme';

/* ---------- Line reveal (observer sits on the unclipped parent) ---------- */

export function Lines({ lines, className = '', delay = 0 }: { lines: ReactNode[]; className?: string; delay?: number }) {
    return (
        <motion.span className={`block ${className}`} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-12% 0px' }}>
            {lines.map((l, i) => (
                <span key={i} className="block overflow-hidden pb-[0.06em]">
                    <motion.span
                        className="block"
                        variants={{ hidden: { y: '105%' }, show: { y: 0 } }}
                        transition={{ duration: 1.1, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {l}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}

export function Fade({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}

/* ---------- Instrument frame: corners, chapter readout, clock ---------- */

function useClock() {
    const fmt = () =>
        new Intl.DateTimeFormat('en-IE', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Europe/Dublin' }).format(new Date());
    const [t, setT] = useState(fmt);
    useEffect(() => {
        const id = setInterval(() => setT(fmt()), 1000);
        return () => clearInterval(id);
    }, []);
    return t;
}

function ThemeToggle() {
    const theme = useTheme();
    const dark = theme === 'dark';
    return (
        <button
            onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                toggleTheme(r.left + r.width / 2, r.top + r.height / 2);
            }}
            data-cursor
            aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
            className="group -my-1 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/70 transition-colors hover:text-bone"
        >
            <span className="relative block h-3.5 w-3.5 overflow-hidden rounded-full border border-current">
                <motion.span
                    className="absolute inset-y-0 left-0 w-1/2 bg-current"
                    animate={{ x: dark ? 0 : '100%' }}
                    transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                />
            </span>
            {dark ? 'Light' : 'Dark'}
        </button>
    );
}

export function HUD({ ready }: { ready: boolean }) {
    const time = useClock();
    const [chapter, setChapter] = useState(0);
    const bar = useRef<HTMLDivElement>(null);

    useEffect(
        () =>
            story.subscribe((pos) => {
                setChapter(Math.round(pos));
                if (bar.current) bar.current.style.transform = `scaleY(${pos / (chapters.length - 1)})`;
            }),
        [],
    );

    const label = 'font-mono text-[10px] uppercase tracking-[0.24em] text-bone/45';
    const show = { opacity: ready ? 1 : 0, transition: 'opacity 1.2s ease 1.4s' };

    return (
        <div aria-hidden={false} className="pointer-events-none fixed inset-0 z-40" style={show}>
            <div className="pointer-events-auto absolute left-5 top-5 md:left-8 md:top-7">
                <a href="#top" data-cursor className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone">
                    {profile.name}
                </a>
                <div className={`${label} mt-1 hidden md:block`}>AI engineer &amp; researcher</div>
            </div>

            <nav className="pointer-events-auto absolute right-5 top-5 flex gap-5 md:right-8 md:top-7 md:gap-7" aria-label="Primary">
                {[
                    ['Work', '#stationos'],
                    ['Research', '#research'],
                    ['Contact', '#contact'],
                ].map(([t, h]) => (
                    <a key={t} href={h} data-cursor className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-bone/70 transition-colors hover:text-ember sm:inline">
                        {t}
                    </a>
                ))}
                <ThemeToggle />
            </nav>

            <div className="absolute bottom-5 left-5 md:bottom-7 md:left-8">
                <div className={label}>
                    <span className="text-ember">{String(chapter + 1).padStart(2, '0')}</span>
                    <span className="mx-2">/</span>
                    {String(chapters.length).padStart(2, '0')}
                    <span className="ml-3 text-bone/80">{chapters[chapter]?.label}</span>
                </div>
            </div>

            <div className={`absolute bottom-5 right-5 text-right md:bottom-7 md:right-8 ${label}`}>
                <div className="hidden md:block">{profile.coords}</div>
                <div className="tabular-nums">Dublin {time}</div>
            </div>

            <div className="absolute right-5 top-1/2 hidden h-28 w-px -translate-y-1/2 bg-bone/10 md:right-8 md:block">
                <div ref={bar} className="h-full w-px origin-top bg-ember" style={{ transform: 'scaleY(0)' }} />
            </div>

            {/* phones: keep the frame legible over scrolling copy */}
            <div className="absolute inset-x-0 top-0 -z-10 h-20 bg-gradient-to-b from-ink to-transparent md:hidden" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-t from-ink to-transparent md:hidden" />

            {/* corner ticks */}
            {['left-2 top-2 border-l border-t', 'right-2 top-2 border-r border-t', 'left-2 bottom-2 border-l border-b', 'right-2 bottom-2 border-r border-b'].map((c) => (
                <span key={c} className={`absolute h-3 w-3 border-bone/25 ${c}`} />
            ))}
        </div>
    );
}

/* ---------- Cursor: precise dot + lagging ring that opens over links ---------- */

export function Cursor() {
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
    const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });
    const [hover, setHover] = useState<string | null>(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return;
        setEnabled(true);
        document.documentElement.classList.add('has-cursor');
        const move = (e: PointerEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
            const t = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [data-cursor]');
            setHover(t ? t.dataset.cursorLabel ?? '' : null);
        };
        window.addEventListener('pointermove', move);
        return () => {
            window.removeEventListener('pointermove', move);
            document.documentElement.classList.remove('has-cursor');
        };
    }, [x, y]);

    if (!enabled) return null;
    return (
        <>
            <motion.div className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember" style={{ x, y }} />
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[99] grid place-items-center rounded-full border mix-blend-difference"
                style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
                animate={{ width: hover !== null ? (hover ? 84 : 54) : 30, height: hover !== null ? (hover ? 84 : 54) : 30, backgroundColor: hover ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0.55)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            >
                {hover && <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black">{hover}</span>}
            </motion.div>
        </>
    );
}

/* ---------- Loader ---------- */

export function Loader({ ready }: { ready: boolean }) {
    const [n, setN] = useState(0);
    const [gone, setGone] = useState(false);
    useEffect(() => {
        let raf = 0;
        const start = performance.now();
        const tick = (t: number) => {
            const p = Math.min(1, (t - start) / 1400);
            setN((v) => Math.max(v, Math.floor((ready ? 1 : 0.86) * p * 100)));
            if (p < 1 || !ready) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [ready]);
    useEffect(() => {
        if (ready && n >= 100) {
            const t = setTimeout(() => setGone(true), 250);
            return () => clearTimeout(t);
        }
    }, [ready, n]);

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-[90] flex items-end justify-between p-5 md:p-8"
            animate={{ opacity: gone ? 0 : 1 }}
            transition={{ duration: 0.8 }}
        >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/50">Assembling</span>
            <span className="font-display text-7xl italic tabular-nums text-bone md:text-9xl">{String(n).padStart(3, '0')}</span>
        </motion.div>
    );
}
