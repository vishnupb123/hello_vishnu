import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { archive, education, experience, flagships, profile, publication, testimonials, toolkit } from '../data/content';
import { Fade, Lines } from './Frame';

const mono = 'font-mono text-[11px] uppercase tracking-[0.22em]';

function Chapter({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
    return (
        <section id={id} data-chapter className={`relative flex min-h-[115svh] items-center px-5 py-32 md:px-8 md:pl-[8vw] ${className}`}>
            {children}
        </section>
    );
}

function Arrow() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="inline-block">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.2" />
        </svg>
    );
}

export function Hero({ ready }: { ready: boolean }) {
    return (
        <section id="top" data-chapter className="relative flex h-[100svh] items-end justify-center px-5 pb-24 md:pb-20">
            <h1 className="sr-only">Vishnu PB, AI engineer and researcher</h1>
            <motion.div
                className="max-w-md text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.4, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <p className="text-[15px] leading-relaxed text-bone/60">
                    I build governed agentic systems, digital twins and multimodal ML, from research to production.
                </p>
                <div className={`${mono} mt-6 text-bone/35`}>Scroll to explore</div>
            </motion.div>
        </section>
    );
}

export function Thesis() {
    return (
        <Chapter id="about">
            <div className="max-w-[46rem] md:w-[50%]">
                <div className={`${mono} mb-8 text-ember`}>Thesis</div>
                <h2 className="font-display text-[clamp(2.6rem,6vw,5.6rem)] leading-[0.98] tracking-[-0.02em] text-bone">
                    <Lines
                        lines={[
                            <>I build systems that</>,
                            <>
                                <em className="text-ember">observe</em>, <em>reason</em>,
                            </>,
                            <>
                                and <em>explain themselves.</em>
                            </>,
                        ]}
                    />
                </h2>
                <Fade delay={0.3} className="mt-12 grid max-w-xl gap-6 text-[15px] leading-relaxed text-bone/60 md:grid-cols-2">
                    <p>
                        I’m currently an L3 Interim Learning Coordinator at Amazon in Dublin. I hold an MSc in Artificial Intelligence and have published research on
                        governing multi-agent systems.
                    </p>
                    <p>
                        I care about evidence over assertion: numbers you can trace, honest evaluation, and a human in the loop for anything that matters. Stamp 1G,
                        open to AI engineering roles.
                    </p>
                </Fade>
            </div>
        </Chapter>
    );
}

export function Flagship({ index }: { index: number }) {
    const f = flagships[index];
    return (
        <Chapter id={f.id}>
            <div className="max-w-[40rem] md:w-[46%]">
                <Fade>
                    <div className={`${mono} flex gap-4 text-bone/50`}>
                        <span className="text-ember">{f.index}</span>
                        <span>{f.kind}</span>
                    </div>
                </Fade>
                <h2 className="mt-6 font-display text-[clamp(3.6rem,10vw,9rem)] italic leading-[0.9] tracking-[-0.03em] text-bone">
                    <Lines lines={[f.name]} />
                </h2>
                <Fade delay={0.15}>
                    <p className="mt-8 text-[17px] leading-relaxed text-bone/70">{f.lede}</p>
                </Fade>
                <Fade delay={0.25}>
                    <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-bone/10 pt-6">
                        {f.figures.map(([v, l]) => (
                            <div key={l}>
                                <dt className="font-display text-4xl text-bone md:text-5xl">{v}</dt>
                                <dd className="mt-2 text-[12px] leading-snug text-bone/45">{l}</dd>
                            </div>
                        ))}
                    </dl>
                </Fade>
                <Fade delay={0.35}>
                    <p className={`${mono} mt-10 leading-loose text-bone/35`}>{f.stack}</p>
                    <div className="mt-8 flex flex-wrap items-center gap-6">
                        <a href={f.href} target="_blank" rel="noreferrer" data-cursor data-cursor-label="Open" className={`${mono} group inline-flex items-center gap-2 text-bone`}>
                            <span className="border-b border-bone/30 pb-1 transition-colors group-hover:border-ember group-hover:text-ember">View source</span>
                            <Arrow />
                        </a>
                        {f.note && <span className="text-[12px] text-bone/35">{f.note}</span>}
                    </div>
                </Fade>
            </div>
        </Chapter>
    );
}

export function Research() {
    const p = publication;
    return (
        <Chapter id="research">
            <div className="max-w-[42rem] md:w-[48%]">
                <Fade>
                    <div className={`${mono} flex flex-wrap gap-4 text-bone/50`}>
                        <span className="text-ember">03</span>
                        <span>Published research · 2026</span>
                    </div>
                </Fade>
                <h2 className="mt-6 font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.02] tracking-[-0.02em] text-bone">
                    <Lines lines={[<>Charter Coherence Protocol</>, <em className="text-bone/60">Eliminating context rot in long-running multi-agent systems</em>]} />
                </h2>
                <Fade delay={0.15}>
                    <p className="mt-8 text-[16px] leading-relaxed text-bone/65">{p.summary}</p>
                </Fade>
                <Fade delay={0.25}>
                    <div className="mt-12 flex items-end gap-5 border-t border-bone/10 pt-6">
                        <span className="font-display text-6xl leading-none text-bone/40 line-through decoration-1 md:text-7xl">{p.result[0]}</span>
                        <span className="pb-2 text-bone/40">→</span>
                        <span className="font-display text-7xl italic leading-none text-ember md:text-8xl">{p.result[1]}</span>
                    </div>
                    <p className="mt-3 text-[12px] text-bone/45">{p.resultLabel}</p>
                </Fade>
                <Fade delay={0.35}>
                    <div className="mt-10 space-y-1 text-[13px] text-bone/50">
                        <p className="italic">{p.venue}</p>
                        <p>{p.details}</p>
                        <p>{p.role}</p>
                    </div>
                    <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor
                        data-cursor-label="Read"
                        className={`${mono} group mt-8 inline-flex items-center gap-2 text-bone`}
                    >
                        <span className="border-b border-bone/30 pb-1 transition-colors group-hover:border-ember group-hover:text-ember">DOI {p.doi}</span>
                        <Arrow />
                    </a>
                </Fade>
            </div>
        </Chapter>
    );
}

export function Archive() {
    const [hover, setHover] = useState<number | null>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 180, damping: 22 });
    const sy = useSpring(y, { stiffness: 180, damping: 22 });

    return (
        <section id="archive" data-chapter className="relative px-5 py-40 md:px-[8vw]">
            <div className="mx-auto max-w-5xl">
                <Fade>
                    <div className={`${mono} text-ember`}>Archive</div>
                </Fade>

                <div className="mt-10" onPointerMove={(e) => (x.set(e.clientX), y.set(e.clientY))} onPointerLeave={() => setHover(null)}>
                    {archive.map((p, i) => {
                        const Tag = p.href ? 'a' : 'div';
                        return (
                            <Fade key={p.name} delay={i * 0.06}>
                                <Tag
                                    {...(p.href ? { href: p.href, target: '_blank', rel: 'noreferrer' } : {})}
                                    data-cursor
                                    data-cursor-label={p.href ? 'Open' : 'View'}
                                    onPointerEnter={() => setHover(i)}
                                    className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-bone/10 py-6 md:grid-cols-[1.3fr_1fr_auto] md:py-8"
                                >
                                    <span className="font-display text-[clamp(2rem,5vw,4.2rem)] leading-none text-bone transition-all duration-500 group-hover:translate-x-3 group-hover:italic group-hover:text-ember">
                                        {p.name}
                                    </span>
                                    <span className="hidden text-[14px] text-bone/45 md:block">{p.detail}</span>
                                    <span className={`${mono} text-bone/40`}>{p.kind}</span>
                                </Tag>
                            </Fade>
                        );
                    })}
                    <div className="border-t border-bone/10" />
                </div>

                <AnimatePresence>
                    {hover !== null && (
                        <motion.div
                            className="pointer-events-none fixed left-0 top-0 z-30 hidden w-[340px] overflow-hidden md:block"
                            style={{ x: sx, y: sy, translateX: '24px', translateY: '-50%' }}
                            initial={{ clipPath: 'inset(50% 0 50% 0)', opacity: 0 }}
                            animate={{ clipPath: 'inset(0% 0 0% 0)', opacity: 1 }}
                            exit={{ clipPath: 'inset(50% 0 50% 0)', opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <AnimatePresence mode="popLayout">
                                <motion.img
                                    key={hover}
                                    src={archive[hover].image}
                                    alt=""
                                    className="aspect-[4/3] w-full object-cover grayscale-[35%]"
                                    initial={{ scale: 1.15, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}

export function Journey() {
    const [open, setOpen] = useState(0);
    return (
        <section id="journey" data-chapter className="relative px-5 py-40 md:px-[8vw]">
            <div className="mx-auto max-w-5xl">
                <Fade>
                    <div className={`${mono} text-ember`}>Journey</div>
                    <h2 className="mt-6 max-w-2xl font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1] tracking-[-0.02em] text-bone">
                        Where I’ve worked, <em className="text-bone/55">and what it taught me.</em>
                    </h2>
                </Fade>

                <ol className="mt-16">
                    {experience.map((e, i) => {
                        const isOpen = open === i;
                        return (
                            <Fade key={`${e.role}${e.period}`} delay={i * 0.05}>
                                <li className="border-t border-bone/10">
                                    <button
                                        onClick={() => setOpen(isOpen ? -1 : i)}
                                        aria-expanded={isOpen}
                                        data-cursor
                                        data-cursor-label={isOpen ? 'Close' : 'Open'}
                                        className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-7 text-left md:grid-cols-[8rem_1fr_auto]"
                                    >
                                        <span className={`${mono} order-3 col-span-2 text-bone/40 md:order-none md:col-span-1`}>{e.period}</span>
                                        <span>
                                            <span className="block font-display text-[clamp(1.6rem,3vw,2.5rem)] leading-tight text-bone transition-colors duration-500 group-hover:text-ember">
                                                {e.role}
                                            </span>
                                            <span className="mt-1 block text-[14px] text-bone/50">
                                                {e.org}
                                                {e.where && ` · ${e.where}`}
                                            </span>
                                        </span>
                                        <span className="relative h-3 w-3 self-center" aria-hidden>
                                            <span className="absolute left-0 top-1/2 h-px w-3 bg-bone/60" />
                                            <motion.span
                                                className="absolute left-0 top-1/2 h-px w-3 bg-bone/60"
                                                animate={{ rotate: isOpen ? 0 : 90 }}
                                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            />
                                        </span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <ul className="space-y-3 pb-9 md:pl-[9.5rem]">
                                                    {e.points.map((pt) => (
                                                        <li key={pt} className="flex max-w-2xl gap-4 text-[15px] leading-relaxed text-bone/65">
                                                            <span className="mt-[0.7em] h-px w-4 shrink-0 bg-ember" />
                                                            {pt}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            </Fade>
                        );
                    })}
                    <li className="border-t border-bone/10" aria-hidden />
                </ol>

                <div className="mt-32 grid gap-16 md:grid-cols-[8rem_1fr] md:gap-x-6">
                    <Fade>
                        <div className={`${mono} text-bone/50`}>Education</div>
                    </Fade>
                    <div className="space-y-10">
                        {education.map((e, i) => (
                            <Fade key={e.role} delay={i * 0.08}>
                                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                                    <span className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] text-bone">{e.role}</span>
                                    <span className={`${mono} text-bone/40`}>{e.period}</span>
                                </div>
                                <div className="mt-1 text-[14px] text-bone/50">
                                    {e.org} · {e.where}
                                </div>
                            </Fade>
                        ))}
                    </div>
                    <Fade>
                        <div className={`${mono} text-bone/50`}>Toolkit</div>
                    </Fade>
                    <Fade>
                        <p className="max-w-2xl text-[15px] leading-[1.9] text-bone/55">{toolkit}</p>
                    </Fade>
                </div>
            </div>
        </section>
    );
}

export function Voices() {
    const [i, setI] = useState(0);
    const [paused, setPaused] = useState(false);
    const t = testimonials[i];
    const go = (d: number) => setI((v) => (v + d + testimonials.length) % testimonials.length);

    useEffect(() => {
        if (paused) return;
        const id = setTimeout(() => go(1), 9000);
        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i, paused]);

    return (
        <section id="voices" data-chapter className="relative flex min-h-[110svh] items-center px-5 py-40 md:px-[8vw]">
            <div className="mx-auto w-full max-w-5xl" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
                <Fade>
                    <div className={`${mono} flex items-center justify-between text-bone/50`}>
                        <span className="text-ember">Kind words</span>
                        <span className="tabular-nums">
                            {String(i + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                        </span>
                    </div>
                </Fade>

                <div className="relative mt-12 min-h-[22rem] md:min-h-[19rem]">
                    <AnimatePresence mode="wait">
                        <motion.figure
                            key={i}
                            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                            exit={{ opacity: 0, filter: 'blur(8px)', y: -12 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <blockquote className="font-display text-[clamp(1.5rem,2.7vw,2.4rem)] leading-[1.28] tracking-[-0.01em] text-bone/90">
                                <span className="text-ember">“</span>
                                {t.text}
                                <span className="text-ember">”</span>
                            </blockquote>
                            <figcaption className="mt-10 flex items-center gap-4">
                                <img src={t.image} alt="" className="h-11 w-11 rounded-full object-cover grayscale" />
                                <span>
                                    <span className="block text-[15px] text-bone">{t.by}</span>
                                    <span className="block text-[13px] text-bone/45">{t.role}</span>
                                </span>
                            </figcaption>
                        </motion.figure>
                    </AnimatePresence>
                </div>

                <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-bone/10 pt-6">
                    {testimonials.map((x, k) => (
                        <button
                            key={x.by}
                            onClick={() => setI(k)}
                            data-cursor
                            className={`relative pb-2 text-[13px] transition-colors ${k === i ? 'text-bone' : 'text-bone/35 hover:text-bone/70'}`}
                        >
                            {x.by}
                            {k === i && (
                                <motion.span layoutId="voice-underline" className="absolute inset-x-0 bottom-0 h-px bg-ember" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                            )}
                            {k === i && !paused && (
                                <motion.span
                                    key={`p${i}`}
                                    className="absolute bottom-0 left-0 h-px bg-bone/40"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 9, ease: 'linear' }}
                                />
                            )}
                        </button>
                    ))}
                    <span className="ml-auto flex gap-2">
                        {[
                            ['Previous', -1, 'M8 2L4 6l4 4'],
                            ['Next', 1, 'M4 2l4 4-4 4'],
                        ].map(([label, d, path]) => (
                            <button
                                key={label as string}
                                onClick={() => go(d as number)}
                                aria-label={label as string}
                                data-cursor
                                className="grid h-10 w-10 place-items-center rounded-full border border-bone/15 text-bone/70 transition-colors hover:border-ember hover:text-ember"
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                                    <path d={path as string} stroke="currentColor" strokeWidth="1.2" />
                                </svg>
                            </button>
                        ))}
                    </span>
                </div>
            </div>
        </section>
    );
}

export function Contact() {
    return (
        <section id="contact" data-chapter className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 py-32 text-center">
            <Fade>
                <div className={`${mono} text-bone/50`}>Open to full-time roles · Stamp 1G · {profile.location}</div>
            </Fade>
            <h2 className="mt-8 font-display text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.92] tracking-[-0.03em] text-bone">
                <Lines lines={[<>Let’s build</>, <em className="text-ember">what’s next.</em>]} />
            </h2>
            <Fade delay={0.3}>
                <a
                    href={`mailto:${profile.email}`}
                    data-cursor
                    data-cursor-label="Write"
                    className="mt-12 inline-block border-b border-bone/25 pb-1 font-display text-2xl italic text-bone transition-colors hover:border-ember hover:text-ember md:text-4xl"
                >
                    {profile.email}
                </a>
                <div className={`${mono} mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-bone/55`}>
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor className="hover:text-ember">
                        LinkedIn
                    </a>
                    <a href={profile.github} target="_blank" rel="noreferrer" data-cursor className="hover:text-ember">
                        GitHub
                    </a>
                    <a href={profile.phoneHref} data-cursor className="hover:text-ember">
                        {profile.phone}
                    </a>
                </div>
            </Fade>
            <div className={`${mono} absolute bottom-16 left-0 right-0 text-center text-bone/25 md:bottom-7`}>
                © {new Date().getFullYear()} {profile.fullName}
            </div>
        </section>
    );
}
