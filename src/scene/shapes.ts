/**
 * Point-cloud targets for the morphing particle field. Every shape has exactly
 * `n` points, centred on the origin; the shader animates and positions them.
 */

export function mulberry32(seed: number) {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

type Rand = () => number;

/** Sample a word rendered in the display serif. Returns points fitted to `width` world units. */
function nameShape(n: number, width: number, rand: Rand, label: string) {
    const W = 1800;
    const H = 640;
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const ctx = c.getContext('2d', { willReadFrequently: true })!;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `italic 400 470px "Instrument Serif", "Times New Roman", serif`;
    const scaleFont = Math.min(1, (W * 0.94) / ctx.measureText(label).width);
    ctx.font = `italic 400 ${Math.floor(470 * scaleFont)}px "Instrument Serif", "Times New Roman", serif`;
    ctx.fillText(label, W / 2, H / 2);

    const data = ctx.getImageData(0, 0, W, H).data;
    const px: number[] = [];
    let minX = W, maxX = 0, minY = H, maxY = 0;
    for (let y = 0; y < H; y += 2) {
        for (let x = 0; x < W; x += 2) {
            if (data[(y * W + x) * 4 + 3] > 140) {
                px.push(x, y);
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }
    const out = new Float32Array(n * 3);
    const count = px.length / 2;
    if (count === 0) return out;
    const s = width / (maxX - minX);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    for (let i = 0; i < n; i++) {
        const k = Math.floor(rand() * count) * 2;
        out[i * 3] = (px[k] - cx + (rand() - 0.5) * 2) * s;
        out[i * 3 + 1] = -(px[k + 1] - cy + (rand() - 0.5) * 2) * s;
        out[i * 3 + 2] = (rand() - 0.5) * 0.18;
    }
    return out;
}

function sphereShape(n: number, r: number, rand: Rand) {
    const out = new Float32Array(n * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const shell = Math.floor(n * 0.78);
    for (let i = 0; i < n; i++) {
        let x: number, y: number, z: number;
        if (i < shell) {
            // Latitude bands: a fibonacci sphere whose points cluster on rings.
            const yy = 1 - (i / (shell - 1)) * 2;
            const band = Math.round(yy * 18) / 18;
            const yv = band + (yy - band) * 0.25;
            const rr = Math.sqrt(Math.max(0, 1 - yv * yv));
            const th = golden * i;
            x = Math.cos(th) * rr;
            y = yv;
            z = Math.sin(th) * rr;
            const k = r * (1 + (rand() - 0.5) * 0.015);
            x *= k;
            y *= k;
            z *= k;
        } else {
            // Inner nucleus.
            const u = rand();
            const v = rand();
            const th = u * Math.PI * 2;
            const ph = Math.acos(2 * v - 1);
            const rr = r * 0.32 * Math.cbrt(rand());
            x = rr * Math.sin(ph) * Math.cos(th);
            y = rr * Math.sin(ph) * Math.sin(th);
            z = rr * Math.cos(ph);
        }
        out.set([x, y, z], i * 3);
    }
    return out;
}

/** A sort line seen from above: induct belt, divert lanes, stow racks, floor grid. */
function stationShape(n: number, scale: number, rand: Rand) {
    const out = new Float32Array(n * 3);
    const lanesX = [-2.2, -0.9, 0.4, 1.7];
    const segs: [number, number, number, number, number][] = []; // x1,z1,x2,z2,weight
    segs.push([-3.6, 0, 2.6, 0, 6]); // induct belt
    lanesX.forEach((x) => {
        segs.push([x, 0.15, x, 1.7, 2.2]);
        segs.push([x, -0.15, x, -1.7, 2.2]);
        // racks (rectangles at lane ends)
        for (const side of [1, -1]) {
            const z0 = side * 1.85;
            const z1 = side * 2.35;
            segs.push([x - 0.35, z0, x + 0.35, z0, 0.6]);
            segs.push([x - 0.35, z1, x + 0.35, z1, 0.6]);
            segs.push([x - 0.35, z0, x - 0.35, z1, 0.4]);
            segs.push([x + 0.35, z0, x + 0.35, z1, 0.4]);
        }
    });
    const total = segs.reduce((a, s) => a + s[4], 0);
    const lineCount = Math.floor(n * 0.8);
    let idx = 0;
    segs.forEach((s) => {
        const k = Math.round((s[4] / total) * lineCount);
        for (let j = 0; j < k && idx < lineCount; j++, idx++) {
            const t = rand();
            const x = s[0] + (s[2] - s[0]) * t + (rand() - 0.5) * 0.06;
            const z = s[1] + (s[3] - s[1]) * t + (rand() - 0.5) * 0.06;
            const y = (rand() - 0.5) * 0.05 + (Math.abs(z) > 1.8 ? rand() * 0.5 : 0); // racks have height
            out.set([x * scale, y * scale, z * scale], idx * 3);
        }
    });
    // Floor grid dots.
    for (; idx < n; idx++) {
        const gx = Math.round((rand() * 8 - 4) * 2) / 2;
        const gz = Math.round((rand() * 6 - 3) * 2) / 2;
        out.set([(gx + (rand() - 0.5) * 0.03) * scale, -0.12 * scale, (gz + (rand() - 0.5) * 0.03) * scale], idx * 3);
    }
    return out;
}

/** A flat grid in the xz-plane; the shader raises it into a travelling voice signal. */
function waveShape(n: number, w: number, d: number) {
    const out = new Float32Array(n * 3);
    const cols = Math.round(Math.sqrt(n * (w / d)));
    const rows = Math.ceil(n / cols);
    for (let i = 0; i < n; i++) {
        const c = i % cols;
        const r = Math.floor(i / cols);
        out.set([(c / (cols - 1) - 0.5) * w, 0, (r / Math.max(1, rows - 1) - 0.5) * d], i * 3);
    }
    return out;
}

/** Concentric orbits in the xz-plane: clauses held in coherent rotation. */
function ringsShape(n: number, r: number, rand: Rand) {
    const out = new Float32Array(n * 3);
    const rings = 9;
    for (let i = 0; i < n; i++) {
        const k = i % rings;
        const rr = r * (0.22 + (k / (rings - 1)) * 0.78);
        const th = rand() * Math.PI * 2;
        const thick = k === rings - 1 ? 0.012 : 0.02;
        out.set(
            [Math.cos(th) * rr + (rand() - 0.5) * thick * r, (rand() - 0.5) * 0.02 * r, Math.sin(th) * rr + (rand() - 0.5) * thick * r],
            i * 3,
        );
    }
    return out;
}

function fieldShape(n: number, w: number, h: number, rand: Rand) {
    const out = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
        out.set([(rand() - 0.5) * w, (rand() - 0.5) * h, (rand() - 0.5) * 4 - 1.5], i * 3);
    }
    return out;
}

/** Horizontal strata: a calm timeline of layered lines. */
function strataShape(n: number, w: number, h: number, rand: Rand) {
    const out = new Float32Array(n * 3);
    const lines = 9;
    for (let i = 0; i < n; i++) {
        const k = i % lines;
        const y = (k / (lines - 1) - 0.5) * h;
        const x = (rand() - 0.5) * w;
        out.set([x, y + (rand() - 0.5) * 0.012 * h, -1 - k * 0.15 + (rand() - 0.5) * 0.1], i * 3);
    }
    return out;
}

function portalShape(n: number, r: number, rand: Rand) {
    const out = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
        const th = rand() * Math.PI * 2;
        const halo = rand() < 0.18;
        const rr = halo ? r * (1 + Math.pow(rand(), 2) * 0.6) : r * (1 + (rand() - 0.5) * 0.025);
        out.set([Math.cos(th) * rr, Math.sin(th) * rr, (rand() - 0.5) * (halo ? 0.6 : 0.05)], i * 3);
    }
    return out;
}

export type Layout = { worldW: number; worldH: number; mobile: boolean };

export const unitFor = ({ worldW, worldH, mobile }: Layout) => Math.min(worldW * (mobile ? 0.42 : 0.24), worldH * 0.36);
export const stationScaleFor = (l: Layout) => unitFor(l) * (l.mobile ? 0.3 : 0.29);

export function buildShapes(n: number, layout: Layout) {
    const { worldW, worldH, mobile } = layout;
    const rand = mulberry32(2001);
    const unit = unitFor(layout);
    return [
        nameShape(n, worldW * (mobile ? 0.84 : 0.58), rand, 'Vishnu'),
        sphereShape(n, unit, rand),
        stationShape(n, stationScaleFor(layout), rand),
        waveShape(n, unit * (mobile ? 2.3 : 1.95), unit * 0.55),
        ringsShape(n, unit * 0.92, rand),
        fieldShape(n, worldW * 1.3, worldH * 1.3, rand),
        portalShape(n, mobile ? unit * 0.95 : worldH * 0.43, rand),
        strataShape(n, worldW * 1.25, worldH * 0.9, rand),
    ];
}

export function scatterShape(n: number, w: number, h: number) {
    const rand = mulberry32(77);
    const out = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
        const a = rand() * Math.PI * 2;
        const r = Math.sqrt(rand()) * Math.max(w, h) * 0.9;
        out.set([Math.cos(a) * r, Math.sin(a) * r, (rand() - 0.5) * 8], i * 3);
    }
    return out;
}

/** Where each shape sits on screen (desktop shapes sit beside the copy). */
export function shapeOffsets({ worldW, worldH, mobile }: Layout): [number, number, number][] {
    const side = mobile ? 0 : worldW * 0.2;
    const up = mobile ? worldH * 0.14 : 0;
    return [
        [0, mobile ? worldH * 0.05 : worldH * 0.02, 0],
        [side, up, 0],
        [side, up, 0],
        [side, up, 0],
        [side, up, 0],
        [0, 0, 0],
        [0, mobile ? worldH * 0.12 : 0, 0],
        [0, 0, 0],
    ];
}
