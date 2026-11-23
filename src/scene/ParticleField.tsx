import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { buildShapes, scatterShape, shapeOffsets, stationScaleFor, unitFor } from './shapes';
import { chapters } from '../data/content';
import { story } from './story';
import { getTheme, onTheme, palette } from '../theme';

const vertex = /* glsl */ `
uniform float uTime;
uniform float uMix;
uniform float uIntro;
uniform float uFrom;
uniform float uTo;
uniform float uSize;
uniform float uMouseStrength;
uniform vec2 uMouse;
uniform vec3 uOffset[8];
uniform float uCalm;
uniform float uStation;
uniform float uUnit;

attribute vec3 aFrom;
attribute vec3 aTo;
attribute vec3 aScatter;
attribute float aRand;

varying float vAlpha;
varying float vAccent;

vec3 rotX(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z); }
vec3 rotY(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z); }
vec3 rotZ(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(c * p.x - s * p.y, s * p.x + c * p.y, p.z); }

// Returns the animated position of a point in shape 'id', and writes a glow amount.
vec3 animate(vec3 p, int id, out float glow) {
  glow = 0.0;
  float t = uTime * uCalm;
  if (id == 0) {
    p.z += sin(p.x * 1.3 + t * 0.8 + aRand * 6.28) * 0.04;
  } else if (id == 1) {
    p = rotY(p, t * 0.12);
    p = rotX(p, 0.38);
    glow = pow(max(0.0, sin(p.y * 2.4 - t * 1.4)), 30.0) * 0.8;
  } else if (id == 2) {
    // Pulses ride the induct belt, then out along each divert lane, like parcels.
    float travel = (p.x + abs(p.z)) / uStation;
    glow = pow(max(0.0, sin(travel * 2.2 - t * 3.0)), 16.0) * step(p.y, 0.05 * uStation) * step(-0.08 * uStation, p.y);
    p = rotY(p, -0.62 + sin(t * 0.12) * 0.06);
    p = rotX(p, 0.62);
  } else if (id == 3) {
    vec2 q = p.xz / uUnit;
    float env = 0.5 + 0.5 * sin(q.x * 2.6 - t * 0.8);
    float carrier = sin(q.x * 9.0 - t * 2.4) * 0.7 + sin(q.x * 23.0 + t * 1.7) * 0.18;
    float falloff = exp(-q.y * q.y * 9.0);
    float h = carrier * env * falloff;
    p.y += h * 0.48 * uUnit;
    glow = smoothstep(0.55, 0.8, h) * 0.85;
    p = rotX(p, 0.32);
    p.x += 0.12 * uUnit;
    p = rotY(p, sin(t * 0.15) * 0.12);
  } else if (id == 4) {
    float r = length(p.xz);
    p = rotY(p, t * 0.55 / (r + 0.25));
    glow = step(0.985, fract(atan(p.z, p.x) * 0.159 + t * 0.1 + aRand * 0.02)) * 0.9;
    p = rotX(p, 1.12);
    p = rotZ(p, 0.22);
  } else if (id == 5) {
    p.x += sin(t * 0.18 + p.y * 0.7 + aRand * 6.28) * 0.18;
    p.y += cos(t * 0.15 + p.x * 0.5) * 0.18;
  } else if (id == 7) {
    p.y += sin(p.x * 0.55 + t * 0.35 + p.z * 3.0) * 0.06 * uUnit;
    glow = pow(max(0.0, sin(p.x * 0.4 - t * 0.6 + p.z * 7.0)), 60.0) * 0.6;
  } else {
    p = rotZ(p, t * 0.06);
    p.xy *= 1.0 + sin(t * 0.9) * 0.012;
    glow = pow(max(0.0, sin(atan(p.y, p.x) * 3.0 - t * 1.2)), 40.0) * 0.7;
  }
  return p + uOffset[id];
}

void main() {
  int fromId = int(uFrom + 0.5);
  int toId = int(uTo + 0.5);
  float gA, gB;
  vec3 a = animate(aFrom, fromId, gA);
  vec3 b = animate(aTo, toId, gB);

  // Staggered morph: each point leaves at a slightly different moment.
  float m = clamp(uMix * 1.35 - aRand * 0.35, 0.0, 1.0);
  m = m * m * (3.0 - 2.0 * m);
  vec3 p = mix(a, b, m);
  float turb = sin(m * 3.14159) * uCalm;
  p += vec3(sin(aRand * 41.0 + uTime * 0.6), cos(aRand * 29.0 + uTime * 0.7), sin(aRand * 17.0 + uTime * 0.5)) * turb * 0.42;

  float intro = clamp(uIntro * 1.4 - aRand * 0.4, 0.0, 1.0);
  intro = 1.0 - pow(1.0 - intro, 3.0);
  p = mix(aScatter, p, intro);

  // Cursor repulsion in the z = 0 plane.
  vec2 d = p.xy - uMouse;
  float dist = length(d);
  p.xy += (d / max(dist, 0.0001)) * uMouseStrength * 0.75 * exp(-dist * dist * 2.2);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.55 + aRand * 0.9) * (10.0 / -mv.z);

  vAccent = max(step(0.986, aRand), mix(gA, gB, m));
  vAlpha = (0.35 + 0.65 * fract(aRand * 13.7)) * intro;
}
`;

const fragment = /* glsl */ `
uniform float uOpacity;
uniform vec3 uAccent;
uniform vec3 uColor;
uniform float uLight;
varying float vAlpha;
varying float vAccent;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, mix(0.05, 0.25, uLight), d);
  vec3 col = mix(uColor, uAccent, clamp(vAccent, 0.0, 1.0));
  // Additive glow on dark; plain ink dots on paper.
  float alpha = a * vAlpha * uOpacity * mix(1.0 + vAccent * 0.5, 0.62 + vAccent * 0.3, uLight);
  gl_FragColor = vec4(col, alpha);
}
`;

function worldSize(camera: THREE.PerspectiveCamera, aspect: number) {
    const h = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    return { worldW: h * aspect, worldH: h };
}

/** Reads the [data-chapter] sections and returns a continuous chapter position. */
function readChapterPosition() {
    const els = document.querySelectorAll<HTMLElement>('[data-chapter]');
    const vh = window.innerHeight;
    const centers: number[] = [];
    els.forEach((el) => {
        const r = el.getBoundingClientRect();
        centers.push(r.top + r.height / 2 - vh / 2);
    });
    if (!centers.length || centers[0] >= 0) return 0;
    for (let i = 0; i < centers.length - 1; i++) {
        if (centers[i] <= 0 && centers[i + 1] > 0) {
            return i + -centers[i] / (centers[i + 1] - centers[i]);
        }
    }
    return centers.length - 1;
}

function Points({ count, reduced, onReady }: { count: number; reduced: boolean; onReady: () => void }) {
    const { camera, size, gl } = useThree();
    const geom = useRef<THREE.BufferGeometry>(null!);
    const material = useRef<THREE.ShaderMaterial>(null!);
    const [fontReady, setFontReady] = useState(false);
    const pair = useRef<[number, number]>([-1, -1]);
    const mouse = useRef({ x: 0, y: 0, strength: 0, last: 0 });
    const introStart = useRef<number | null>(null);

    useEffect(() => {
        let alive = true;
        const fallback = setTimeout(() => alive && setFontReady(true), 2500);
        document.fonts
            .load('italic 400 120px "Instrument Serif"')
            .catch(() => undefined)
            .finally(() => {
                clearTimeout(fallback);
                if (alive) setFontReady(true);
            });
        return () => {
            alive = false;
            clearTimeout(fallback);
        };
    }, []);

    const layout = useMemo(() => {
        const { worldW, worldH } = worldSize(camera as THREE.PerspectiveCamera, size.width / size.height);
        return { worldW, worldH, mobile: size.width < 768 };
    }, [camera, size.width, size.height]);

    const shapes = useMemo(() => (fontReady ? buildShapes(count, layout) : null), [fontReady, count, layout]);
    const offsets = useMemo(() => shapeOffsets(layout).map((o) => new THREE.Vector3(...o)), [layout]);

    const attrs = useMemo(() => {
        const rand = new Float32Array(count);
        for (let i = 0; i < count; i++) rand[i] = Math.random();
        return {
            from: new Float32Array(count * 3),
            to: new Float32Array(count * 3),
            scatter: scatterShape(count, layout.worldW, layout.worldH),
            rand,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMix: { value: 0 },
            uIntro: { value: 0 },
            uFrom: { value: 0 },
            uTo: { value: 0 },
            uSize: { value: 2.4 },
            uMouse: { value: new THREE.Vector2(99, 99) },
            uMouseStrength: { value: 0 },
            uOffset: { value: Array.from({ length: 8 }, () => new THREE.Vector3()) },
            uOpacity: { value: 1 },
            uCalm: { value: reduced ? 0.15 : 1 },
            uStation: { value: 1 },
            uUnit: { value: 1 },
            uAccent: { value: new THREE.Color(palette[getTheme()].accent) },
            uColor: { value: new THREE.Color(palette[getTheme()].fg) },
            uLight: { value: getTheme() === 'light' ? 1 : 0 },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    useEffect(() => {
        uniforms.uOffset.value = offsets;
        uniforms.uStation.value = stationScaleFor(layout);
        uniforms.uUnit.value = unitFor(layout);
        uniforms.uSize.value = (layout.mobile ? 1.9 : 2.2) * gl.getPixelRatio();
        pair.current = [-1, -1]; // force attribute refresh after a resize
    }, [offsets, layout, gl, uniforms]);

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = -(e.clientY / window.innerHeight) * 2 + 1;
            mouse.current.x = (nx * layout.worldW) / 2;
            mouse.current.y = (ny * layout.worldH) / 2;
            mouse.current.last = performance.now();
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
    }, [layout]);

    useEffect(
        () =>
            onTheme((t) => {
                uniforms.uColor.value.set(palette[t].fg);
                uniforms.uAccent.value.set(palette[t].accent);
                uniforms.uLight.value = t === 'light' ? 1 : 0;
                if (material.current) {
                    material.current.blending = t === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending;
                    material.current.needsUpdate = true;
                }
            }),
        [uniforms],
    );

    useFrame((state, delta) => {
        if (!shapes || !geom.current) return;
        const u = uniforms;
        u.uTime.value += Math.min(delta, 0.05);

        if (introStart.current === null) {
            introStart.current = state.clock.elapsedTime;
            onReady();
        }
        const introT = (state.clock.elapsedTime - introStart.current) / (reduced ? 0.6 : 2.6);
        u.uIntro.value = Math.min(1, introT);

        const pos = readChapterPosition();
        const i = Math.min(Math.floor(pos), chapters.length - 1);
        const j = Math.min(i + 1, chapters.length - 1);
        const frac = pos - i;
        const from = chapters[i].shape;
        const to = chapters[j].shape;
        // Hold each shape while its section is read; morph in the middle of the scroll between them.
        const mix = THREE.MathUtils.smoothstep(frac, 0.18, 0.82);
        story.set(pos);

        if (pair.current[0] !== from || pair.current[1] !== to) {
            pair.current = [from, to];
            (geom.current.getAttribute('aFrom') as THREE.BufferAttribute).copyArray(shapes[from]).needsUpdate = true;
            (geom.current.getAttribute('aTo') as THREE.BufferAttribute).copyArray(shapes[to]).needsUpdate = true;
            u.uFrom.value = from;
            u.uTo.value = to;
        }
        u.uMix.value = mix;

        const active = performance.now() - mouse.current.last < 1200 && !reduced;
        mouse.current.strength = THREE.MathUtils.lerp(mouse.current.strength, active ? 1 : 0, 0.06);
        u.uMouseStrength.value = mouse.current.strength;
        u.uMouse.value.set(mouse.current.x, mouse.current.y);

        // Dim behind long-form copy: the archive starfield, and every shape on phones.
        const quiet = (s: number) => s === 5 || s === 7;
        const fieldW = (quiet(from) ? 1 - mix : 0) + (quiet(to) ? mix : 0);
        const target = (layout.mobile && pos > 0.5 ? 0.32 : 1) * (1 - 0.62 * fieldW);
        u.uOpacity.value = THREE.MathUtils.lerp(u.uOpacity.value, target, 0.08);

        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.25, 0.03);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.18, 0.03);
        state.camera.lookAt(0, 0, 0);
    });

    if (!shapes) return null;
    return (
        <points frustumCulled={false}>
            <bufferGeometry ref={geom}>
                <bufferAttribute attach="attributes-position" count={count} array={attrs.from} itemSize={3} />
                <bufferAttribute attach="attributes-aFrom" count={count} array={attrs.from} itemSize={3} />
                <bufferAttribute attach="attributes-aTo" count={count} array={attrs.to} itemSize={3} />
                <bufferAttribute attach="attributes-aScatter" count={count} array={attrs.scatter} itemSize={3} />
                <bufferAttribute attach="attributes-aRand" count={count} array={attrs.rand} itemSize={1} />
            </bufferGeometry>
            <shaderMaterial
                ref={material}
                vertexShader={vertex}
                fragmentShader={fragment}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={getTheme() === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function ParticleField({ onReady }: { onReady: () => void }) {
    const [config] = useState(() => {
        const mobile = window.innerWidth < 768;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        return { count: mobile ? 7000 : 16000, reduced };
    });
    return (
        <Canvas
            style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}
            dpr={[1, 1.75]}
            camera={{ position: [0, 0, 10], fov: 35 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        >
            <Points count={config.count} reduced={config.reduced} onReady={onReady} />
        </Canvas>
    );
}
