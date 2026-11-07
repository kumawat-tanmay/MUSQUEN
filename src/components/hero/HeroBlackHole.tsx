"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// -----------------------------------------------------------------------------
// BLACKBODY LOOKUP TABLE (Planck Law -> CIE 1931 -> sRGB)
// Matches Interstellar Gargantua thermal radiation & Doppler shifts
// -----------------------------------------------------------------------------
function createBlackbodyLUT(n = 256, T0 = 1000, T1 = 40000) {
  const g = (x: number, mu: number, s1: number, s2: number) => {
    const t = (x - mu) / (x < mu ? s1 : s2);
    return Math.exp(-0.5 * t * t);
  };
  const xb = (l: number) =>
    1.056 * g(l, 599.8, 37.9, 31.0) +
    0.362 * g(l, 442.0, 16.0, 26.7) -
    0.065 * g(l, 501.1, 20.4, 26.2);
  const yb = (l: number) =>
    0.821 * g(l, 568.8, 46.9, 40.5) + 0.286 * g(l, 530.9, 16.3, 31.1);
  const zb = (l: number) =>
    1.217 * g(l, 437.0, 11.8, 36.0) + 0.681 * g(l, 459.0, 26.0, 13.8);

  const data = new Uint8Array(n * 4);
  for (let i = 0; i < n; i++) {
    const T = T0 * Math.pow(T1 / T0, i / (n - 1));
    let X = 0,
      Y = 0,
      Z = 0;
    for (let l = 380; l <= 780; l += 5) {
      const m = l * 1e-9;
      const B = 1 / (Math.pow(m, 5) * (Math.exp(1.4388e-2 / (m * T)) - 1));
      X += B * xb(l);
      Y += B * yb(l);
      Z += B * zb(l);
    }
    const r = Math.max(0, 3.2406 * X - 1.5372 * Y - 0.4986 * Z);
    const gg = Math.max(0, -0.9689 * X + 1.8758 * Y + 0.0415 * Z);
    const b = Math.max(0, 0.0557 * X - 0.204 * Y + 1.057 * Z);
    const mx = Math.max(r, gg, b) || 1;
    data.set(
      [
        Math.round((r / mx) * 255),
        Math.round((gg / mx) * 255),
        Math.round((b / mx) * 255),
        255,
      ],
      i * 4
    );
  }
  const texture = new THREE.DataTexture(data, n, 1, THREE.RGBAFormat);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

// -----------------------------------------------------------------------------
// RELATIVISTIC SCHWARZSCHILD GEODESIC SHADER (HIGH-PERFORMANCE 60+ FPS ENGINE)
// 1. Pure jet-black shadow (No central Einstein ring)
// 2. Real-time moving cosmic particles & sparks
// 3. Radiant celestial light in the upper-right sky
// 4. Optimized fast ray-marching & 2-octave plasma noise
// -----------------------------------------------------------------------------
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec2 uRes;
  uniform float uTime;
  uniform vec3 uCam, uRight, uUp, uFwd;
  uniform float uTanHalf, uRcam, uMaxSteps;
  uniform float uDisk, uAccretion, uTmax;
  uniform sampler2D uBB;

  varying vec2 vUv;

  // --- Fast Simplex Noise 3D for High-Performance Plasma Strands ---
  vec4 permute4(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx, x2 = x0 - i2 + C.yyy, x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute4(permute4(permute4(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    vec3 ns = (1.0 / 7.0) * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy), b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0, s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy, a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x), p1 = vec3(a0.zw, h.y), p2 = vec3(a1.xy, h.z), p3 = vec3(a1.zw, h.w);
    vec4 nr = 1.79284291400159 - 0.85373472095314 * vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3));
    p0 *= nr.x; p1 *= nr.y; p2 *= nr.z; p3 *= nr.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  // Fast 2-octave plasma noise (eliminates unnecessary loop unrolling on mobile/integrated GPUs)
  float fbmDisk(vec3 p) {
    return snoise(p) * 0.65 + snoise(p * 2.05 + 11.7) * 0.35;
  }

  float hash13(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.zyx + 31.32);
    return fract((p.x + p.y) * p.z);
  }

  vec3 hash33(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yxz + 33.33);
    return fract((p.xxy + p.yxx) * p.zyx);
  }

  vec3 blackbody(float T) {
    float u = (log(clamp(T, 1000.0, 40000.0)) - 6.9078) / 3.6889;
    return texture2D(uBB, vec2(u, 0.5)).rgb;
  }

  // --- Dynamic Sky with Real-Time Moving Cosmic Particles & Nebular Dust ---
  vec3 sky(vec3 d) {
    vec3 col = vec3(0.0);

    // 1. Procedural Background Stars (Optimized Single Grid Pass)
    float sc = 76.0;
    vec3 p = d * sc, id = floor(p), f = fract(p) - 0.5;
    float hh = hash13(id + 17.0);
    if (hh > 0.88) {
      vec3 o = (hash33(id) - 0.5) * 0.5;
      float dd = length(f - o);
      float mag = pow(hash13(id * 1.7 + 3.1), 7.0) * 8.0 + 0.35;
      col += blackbody(mix(3400.0, 12000.0, pow(hash13(id + 9.1), 1.5))) *
             mag * exp(-dd * dd * 90.0);
    }

    // 2. REAL-TIME MOVING COSMIC PARTICLES & SPARK DRIFT
    for (int k = 0; k < 2; k++) {
      float speed = 0.28 + float(k) * 0.20;
      vec3 pMove = d * (36.0 + float(k) * 22.0);
      pMove.x += uTime * speed * 0.75;
      pMove.y += sin(uTime * 0.35 + float(k) * 1.5) * 0.6;
      pMove.z += uTime * speed * 0.45;
      vec3 idM = floor(pMove);
      vec3 fM = fract(pMove) - 0.5;
      float hM = hash13(idM + float(k) * 43.1);
      if (hM > 0.90) {
        vec3 oM = (hash33(idM) - 0.5) * 0.45;
        float ddM = length(fM - oM);
        float pulse = 0.75 + 0.25 * sin(uTime * 4.2 + hM * 20.0);
        col += vec3(1.0, 0.96, 0.88) * exp(-ddM * ddM * 125.0) * pulse * 1.5;
      }
    }

    // 3. Galactic Nebular Dust Band (Streamlined Noise)
    vec3 bn = normalize(vec3(0.25, 0.9, -0.35));
    float b = dot(d, bn);
    float band = exp(-b * b * 11.0);
    float n1 = snoise(d * 2.4 + 3.0) * 0.7 + snoise(d * 4.9 + 7.1) * 0.3;
    float dust = smoothstep(0.1, 0.5, snoise(d * 3.8 + 1.3));
    col += band * (vec3(0.25, 0.35, 0.55) * max(n1 + 0.45, 0.0) * 0.08 +
                   vec3(0.55, 0.32, 0.22) * 0.05) * (1.0 - 0.75 * dust);

    // 4. Glowing Celestial Light Source in Upper-Right Sky (Matching Image)
    vec3 lightDir = normalize(vec3(0.65, 0.38, -0.75));
    float lightDot = max(dot(d, lightDir), 0.0);
    col += vec3(1.0, 0.92, 0.82) * pow(lightDot, 12.0) * 1.8;
    col += vec3(0.9, 0.75, 0.55) * pow(lightDot, 3.5) * 0.45;

    return col;
  }

  // --- Thin Novikov–Thorne Accretion Disk Shader ---
  vec4 diskShade(vec3 hp, vec3 rayDir) {
    float r = length(hp.xz);
    float x = r / 3.0; // r / r_ISCO
    float prof = x > 1.0 ? pow(x, -0.75) * pow(1.0 - inversesqrt(x), 0.25) / 0.488 : 0.0;
    float inner = smoothstep(2.35, 3.05, r);
    float pr = max(prof, 0.35 * inner * (1.0 - step(3.0, r)));
    float edge = smoothstep(14.5, 8.5, r);

    // Active differential Keplerian rotation (real-time plasma swirl)
    float phi = atan(hp.z, hp.x);
    float om = sqrt(0.5 / (r * r * r));
    float lr = log(r);
    const float P = 24.0;
    float ta = mod(uTime * 1.4, P);
    float tb = mod(uTime * 1.4 + 0.5 * P, P);
    float wa = 1.0 - abs(2.0 * ta / P - 1.0);
    float sa = phi - om * ta * 3.0;
    float sb = phi - om * tb * 3.0 + 2.1;
    float n = mix(
      fbmDisk(vec3(cos(sb) * 2.2, sin(sb) * 2.2, lr * 7.0 + 13.0)),
      fbmDisk(vec3(cos(sa) * 2.2, sin(sa) * 2.2, lr * 7.0)),
      wa
    );
    float dens = clamp(0.55 + 0.85 * n, 0.0, 1.0);

    // Doppler beaming + Gravitational Redshift
    float beta = min(sqrt(0.5 / max(r - 1.0, 0.02)), 0.95);
    float gam = inversesqrt(1.0 - beta * beta);
    vec3 ephi = normalize(vec3(-hp.z, 0.0, hp.x));
    float g = sqrt(max(1.0 - 1.0 / r, 0.001) / (1.0 - 1.0 / uRcam)) /
              (gam * (1.0 - beta * dot(ephi, -rayDir)));

    vec3 bb = blackbody(uTmax * pr * g);
    // Incandescent white/cream light spectrum
    float L = pow(g, 3.0) * (pow(pr, 3.2) * (0.6 + 0.95 * dens) * uAccretion * 1.35);
    float alpha = (0.28 + 0.72 * dens) * inner * edge * 0.95 * uDisk;

    return vec4(bb * L, clamp(alpha, 0.0, 0.96));
  }

  // --- ACES Film Tone Mapping (Cinematic Highlights & Inky Shadows) ---
  vec3 ACESFilm(vec3 x) {
    float a = 2.51;
    float b = 0.03;
    float c = 2.43;
    float d = 0.59;
    float e = 0.14;
    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
  }

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
    vec3 vel = normalize(uFwd + uTanHalf * (p.x * uRight + p.y * uUp));
    vec3 pos = uCam;

    vec3 Lm = cross(pos, vel);
    float h2 = dot(Lm, Lm);

    vec3 col = vec3(0.0);
    float T = 1.0;
    int state = 0;

    // High-performance adaptive ray marching loop (capped at 54 steps for buttery 60+ FPS)
    for (int i = 0; i < 54; i++) {
      if (float(i) >= uMaxSteps) break;

      float r2 = dot(pos, pos);
      float r = sqrt(r2);

      // Adaptive geodesic step size
      float dt = clamp(0.065 * r * sqrt(r), 0.018, 0.28 * r);

      vec3 prev = pos;
      vec3 vh = vel - 0.75 * dt * h2 * pos / (r2 * r2 * r);
      pos += dt * vh;
      float q2 = dot(pos, pos);
      float q = sqrt(q2);
      vel = vh - 0.75 * dt * h2 * pos / (q2 * q2 * q);

      // Captured by Event Horizon (r_s = 1.0) -> PURE JET BLACK SHADOW (NO WHITE RING!)
      if (q < 1.0) {
        state = 2;
        break;
      }

      // Crossed Accretion Disk Plane (y = 0)
      if (uDisk > 0.001 && prev.y * pos.y < 0.0) {
        vec3 hp = mix(prev, pos, prev.y / (prev.y - pos.y));
        float rd = length(hp.xz);
        if (rd > 2.3 && rd < 14.5) {
          vec4 d = diskShade(hp, normalize(vel));
          col += T * d.rgb * d.a;
          T *= 1.0 - d.a;
          if (T < 0.02) {
            state = 3;
            break;
          }
        }
      }

      // Escaped to space
      if (q > 42.0 && dot(pos, vel) > 0.0) {
        state = 1;
        break;
      }
    }

    if (state == 1 || (state == 0 && length(pos) > 4.0)) {
      col += T * sky(normalize(vel));
    }

    // Apply ACES Filmic Tone Curve with Radiant High Dynamic Range
    vec3 mapped = ACESFilm(col * 1.15);

    // Subtle edge vignette
    vec2 uv = gl_FragCoord.xy / uRes;
    float vig = smoothstep(1.35, 0.45, length(uv - 0.5));
    mapped *= vig;

    gl_FragColor = vec4(mapped, 1.0);
  }
`;

// -----------------------------------------------------------------------------
// COMPONENT: HERO BLACK HOLE (100% FIXED PERSPECTIVE - ZERO MOUSE INTERFERENCE)
// -----------------------------------------------------------------------------
export default function HeroBlackHole() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Internal Render Scale (0.75) for 60+ FPS high-performance ray marching
    // Upscaled cleanly by hardware bilinear GPU filtering
    const RENDER_SCALE = 0.75;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      powerPreference: "high-performance",
      alpha: false,
    });
    renderer.setPixelRatio(1);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const bbTexture = createBlackbodyLUT(256, 1000, 40000);

    // Completely Fixed Perspective (Matching Reference Image Perfectly)
    const LOCKED_R = 14.2;
    const LOCKED_ELEVATION = 0.135; // ~7.7° elevation
    const LOCKED_AZ = 0.0; // Strictly centered

    const UP = new THREE.Vector3(0, 1, 0);
    const ce = Math.cos(LOCKED_ELEVATION);
    const camPos = new THREE.Vector3(
      LOCKED_R * ce * Math.sin(LOCKED_AZ),
      LOCKED_R * Math.sin(LOCKED_ELEVATION),
      LOCKED_R * ce * Math.cos(LOCKED_AZ)
    );
    const fwd = camPos.clone().multiplyScalar(-1).normalize();
    const right = new THREE.Vector3().crossVectors(fwd, UP).normalize();
    const up = new THREE.Vector3().crossVectors(right, fwd).normalize();

    const uniforms = {
      uRes: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      uTime: { value: 0 },
      uCam: { value: camPos },
      uRight: { value: right },
      uUp: { value: up },
      uFwd: { value: fwd },
      uTanHalf: { value: Math.tan(THREE.MathUtils.degToRad(25)) },
      uRcam: { value: LOCKED_R },
      uMaxSteps: { value: 54 },
      uDisk: { value: 1.0 },
      uAccretion: { value: 1.0 },
      uTmax: { value: 5600 },
      uBB: { value: bbTexture },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    quad.frustumCulled = false;
    scene.add(quad);

    let inView = true;

    // Universal Aspect Ratio & Screen Adapter
    // Keeps the accretion disk and lensed arcs perfectly framed across ALL screens
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const rw = Math.max(320, Math.round(w * RENDER_SCALE));
      const rh = Math.max(240, Math.round(h * RENDER_SCALE));

      renderer.setSize(rw, rh, false);
      uniforms.uRes.value.set(rw, rh);

      const aspect = w / h;
      const verticalTan = Math.tan(THREE.MathUtils.degToRad(25));
      const minHorizontalTan = Math.tan(THREE.MathUtils.degToRad(29));

      uniforms.uTanHalf.value = Math.max(
        verticalTan,
        minHorizontalTan / Math.max(aspect, 0.45)
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Viewport Visibility Observer (0% GPU when scrolled away)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inView = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Render loop - ONLY updates internal plasma & spark time, camera is 100% FIXED
    let animId: number;

    const render = (timeMs: number) => {
      animId = requestAnimationFrame(render);
      if (!inView) return;

      uniforms.uTime.value = timeMs * 0.001;
      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      quad.geometry.dispose();
      material.dispose();
      bbTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-screen bg-black overflow-hidden select-none pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />
    </div>
  );
}
