/** Tiny shared store for the continuous chapter position (0 … chapters-1). */
type Listener = (pos: number) => void;

let current = 0;
const listeners = new Set<Listener>();

export const story = {
    get: () => current,
    set(pos: number) {
        if (Math.abs(pos - current) < 0.001) return;
        current = pos;
        listeners.forEach((l) => l(pos));
    },
    subscribe(l: Listener) {
        listeners.add(l);
        return () => {
            listeners.delete(l);
        };
    },
};
