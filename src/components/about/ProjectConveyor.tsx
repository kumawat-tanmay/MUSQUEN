"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { reelSlides, ReelSlide } from "@/data/reelSlides";

export interface ProjectConveyorHandle {
  setPresent: (val: number) => void;
  setScrollOffset: (val: number | null) => void;
  resize: (width?: number, height?: number) => void;
  getCanvas: () => HTMLCanvasElement | null;
}

interface ProjectConveyorProps {
  initialPresent?: number;
  className?: string;
}

function wrap(value: number, period: number) {
  return ((value % period) + period) % period;
}

interface MotionState {
  offset: number;
  velocity: number;
  present: number;
  targetPresent: number;
  pointerX: number;
  pointerY: number;
  parallaxX: number;
  parallaxY: number;
}

function advanceMotion(
  state: MotionState,
  frames: number,
  count: number,
  reduced: boolean
) {
  const decay = Math.pow(0.94, frames);
  state.offset = wrap(
    state.offset + (reduced ? 0 : (state.velocity * 0.94 * (1 - decay)) / 0.06),
    count
  );
  state.velocity = reduced ? 0 : state.velocity * decay;
  state.present +=
    (state.targetPresent - state.present) * (reduced ? 1 : 1 - Math.pow(0.93, frames));
  const smoothing = 1 - Math.pow(0.968, frames);
  state.parallaxX = reduced
    ? 0
    : state.parallaxX + (state.pointerX - state.parallaxX) * smoothing;
  state.parallaxY = reduced
    ? 0
    : state.parallaxY + (state.pointerY - state.parallaxY) * smoothing;
}

function conveyorPoint(t: number) {
  const half = 2.9,
    radius = 1.02,
    straight = half * 2,
    arc = Math.PI * radius;
  let distance = wrap(t, 1) * (straight * 2 + arc * 2);
  if (distance < straight)
    return { y: -half + distance, z: radius, ny: 0, nz: 1 };
  distance -= straight;
  if (distance < arc) {
    const angle = Math.PI / 2 - distance / radius;
    return {
      y: half + Math.cos(angle) * radius,
      z: Math.sin(angle) * radius,
      ny: Math.cos(angle),
      nz: Math.sin(angle),
    };
  }
  distance -= arc;
  if (distance < straight)
    return { y: half - distance, z: -radius, ny: 0, nz: -1 };
  distance -= straight;
  const angle = -Math.PI / 2 - distance / radius;
  return {
    y: -half + Math.cos(angle) * radius,
    z: Math.sin(angle) * radius,
    ny: Math.cos(angle),
    nz: Math.sin(angle),
  };
}

function buildConveyorGeometry(count: number, segments = 256) {
  const positions: number[] = [];
  const uvs: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  const step = 1 / segments;
  const width = 1.4;

  for (let i = 0; i <= segments; i++) {
    const t = i * step;
    const pt = conveyorPoint(t);
    positions.push(-width, pt.y, pt.z);
    uvs.push(0, t * count);
    normals.push(pt.ny, pt.nz);

    positions.push(width, pt.y, pt.z);
    uvs.push(1, t * count);
    normals.push(pt.ny, pt.nz);
  }

  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    const b = a + 1;
    const c = a + 2;
    const d = a + 3;
    indices.push(a, b, c);
    indices.push(b, d, c);
  }

  const packed: number[] = [];
  const vertexCount = positions.length / 3;
  for (let i = 0; i < vertexCount; i++) {
    packed.push(
      positions[i * 3],
      positions[i * 3 + 1],
      positions[i * 3 + 2],
      uvs[i * 2],
      uvs[i * 2 + 1],
      normals[i * 2],
      normals[i * 2 + 1]
    );
  }

  return {
    vertices: new Float32Array(packed),
    indices: new Uint16Array(indices),
  };
}

const vsSource = `
  attribute vec3 position;
  attribute vec2 uv;
  attribute vec2 normalYZ;

  uniform vec3 rotation;
  uniform vec3 rig;
  uniform vec3 translation;
  uniform vec3 camera;
  uniform vec3 target;
  uniform float aspect;
  uniform float offset;

  varying vec2 vUv;
  varying float vShade;

  mat4 eulerYXZ(vec3 r) {
    float cx = cos(r.x), sx = sin(r.x);
    float cy = cos(r.y), sy = sin(r.y);
    float cz = cos(r.z), sz = sin(r.z);
    return mat4(
      cy * cz + sy * sx * sz,  cx * sz, -sy * cz + cy * sx * sz, 0.0,
     -cy * sz + sy * sx * cz,  cx * cz,  sy * sz + cy * sx * cz, 0.0,
      sy * cx,                -sx,       cy * cx,                0.0,
      0.0,                     0.0,      0.0,                    1.0
    );
  }

  mat4 lookAt(vec3 eye, vec3 center, vec3 up) {
    vec3 z = normalize(eye - center);
    vec3 x = normalize(cross(up, z));
    vec3 y = cross(z, x);
    return mat4(
      x.x, y.x, z.x, 0.0,
      x.y, y.y, z.y, 0.0,
      x.z, y.z, z.z, 0.0,
     -dot(x, eye), -dot(y, eye), -dot(z, eye), 1.0
    );
  }

  mat4 perspective(float fovy, float asp, float near, float far) {
    float f = 1.0 / tan(fovy / 2.0);
    return mat4(
      f / asp, 0.0, 0.0, 0.0,
      0.0, f, 0.0, 0.0,
      0.0, 0.0, (far + near) / (near - far), -1.0,
      0.0, 0.0, (2.0 * far * near) / (near - far), 0.0
    );
  }

  void main() {
    vUv = vec2(uv.x, uv.y - offset);
    mat4 model = eulerYXZ(rig) * mat4(
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      translation.x, translation.y, translation.z, 1.0
    ) * eulerYXZ(rotation);

    vec4 worldPos = model * vec4(position, 1.0);
    mat4 view = lookAt(camera, target, vec3(0.0, 1.0, 0.0));
    mat4 proj = perspective(0.68, aspect, 0.1, 100.0);
    gl_Position = proj * view * worldPos;

    vec3 normal = normalize((model * vec4(0.0, normalYZ.x, normalYZ.y, 0.0)).xyz);
    vShade = clamp(dot(normal, normalize(vec3(0.4, 0.8, 1.0))), 0.22, 1.0);
  }
`;

const fsSource = `
  precision mediump float;

  varying vec2 vUv;
  varying float vShade;

  uniform sampler2D atlas;
  uniform float count;
  uniform float picking;
  uniform vec2 grid;
  uniform vec2 atlasSize;

  void main() {
    float slot = floor(mod(vUv.y, count));
    if (picking > 0.5) {
      float id = slot + 1.0;
      gl_FragColor = vec4(id / 255.0, 0.0, 0.0, 1.0);
      return;
    }

    float col = mod(slot, grid.x);
    float row = floor(slot / grid.x);
    vec2 tile = vec2(fract(vUv.x), fract(vUv.y));

    // Pad tile edges slightly to prevent texture bleeding
    tile = clamp(tile, 0.015, 0.985);
    vec2 atlasUv = (vec2(col, row) + tile) / grid;
    vec4 color = texture2D(atlas, atlasUv);

    // Dark luxury contrast grading
    vec3 graded = color.rgb * vShade;
    gl_FragColor = vec4(graded, color.a);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createConveyor(
  canvas: HTMLCanvasElement,
  images: (HTMLImageElement | null)[],
  projects: ReelSlide[]
) {
  const gl = canvas.getContext("webgl", {
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
    preserveDrawingBuffer: false,
  });

  if (!gl) return null;

  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  gl.useProgram(program);
  const geometry = buildConveyorGeometry(projects.length);
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, geometry.vertices, gl.STATIC_DRAW);

  const posLoc = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 28, 0);

  const uvLoc = gl.getAttribLocation(program, "uv");
  gl.enableVertexAttribArray(uvLoc);
  gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 28, 12);

  const normLoc = gl.getAttribLocation(program, "normalYZ");
  gl.enableVertexAttribArray(normLoc);
  gl.vertexAttribPointer(normLoc, 2, gl.FLOAT, false, 28, 20);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);

  const columns = Math.ceil(Math.sqrt(projects.length * 0.75));
  const rows = Math.ceil(projects.length / columns);
  const maxSize = Math.min(4096, gl.getParameter(gl.MAX_TEXTURE_SIZE));
  const tileWidth =
    Math.floor(Math.min(1200, maxSize / columns, (maxSize / rows) * (4 / 3)) / 4) * 4;
  const tileHeight = tileWidth * 0.75;

  const atlas = document.createElement("canvas");
  atlas.width = columns * tileWidth;
  atlas.height = rows * tileHeight;
  const ctx = atlas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#0c100e";
    ctx.fillRect(0, 0, atlas.width, atlas.height);
    images.forEach((image, index) => {
      const x = (index % columns) * tileWidth;
      const y = Math.floor(index / columns) * tileHeight;
      if (image && image.complete && image.naturalWidth > 0) {
        const scale = Math.min(
          tileWidth / image.naturalWidth,
          tileHeight / image.naturalHeight
        );
        const width = image.naturalWidth * scale;
        const height = image.naturalHeight * scale;
        ctx.drawImage(
          image,
          x + (tileWidth - width) / 2,
          y + (tileHeight - height) / 2,
          width,
          height
        );
      } else {
        ctx.fillStyle = "#141a17";
        ctx.fillRect(x + 10, y + 10, tileWidth - 20, tileHeight - 20);
        ctx.fillStyle = "#57957E";
        ctx.font = `bold ${tileWidth / 22}px sans-serif`;
        ctx.fillText(projects[index]?.title || "Project", x + 30, y + tileHeight / 2);
      }
    });
  }

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);

  const locs: Record<string, WebGLUniformLocation | null> = {};
  [
    "rotation",
    "rig",
    "translation",
    "camera",
    "target",
    "aspect",
    "offset",
    "count",
    "picking",
    "grid",
    "atlasSize",
  ].forEach((name) => {
    locs[name] = gl.getUniformLocation(program, name);
  });

  if (locs.count) gl.uniform1f(locs.count, projects.length);
  if (locs.grid) gl.uniform2f(locs.grid, columns, rows);
  if (locs.atlasSize) gl.uniform2f(locs.atlasSize, atlas.width, atlas.height);

  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 0);

  let viewportWidth = 1,
    viewportHeight = 1;
  const pixel = new Uint8Array(4);

  function draw(state: MotionState, picking = false) {
    if (!gl) return;
    const ease = state.present * state.present * (3 - 2 * state.present);
    const fade = 1 - ease;
    const x = state.parallaxX * fade;
    const y = state.parallaxY * fade;
    const zoom = Math.max(1, (0.9 * viewportHeight) / viewportWidth);

    if (locs.camera)
      gl.uniform3f(
        locs.camera,
        (-2 * fade + x * 0.12) * zoom,
        (-9.35 * fade - y * 0.08) * zoom,
        (10.99 - ease * 4.79) * zoom
      );
    if (locs.target) gl.uniform3f(locs.target, 0, -0.2 * fade, 0.1 * fade);
    if (locs.rotation)
      gl.uniform3f(
        locs.rotation,
        0.07 * fade,
        (-0.594 +
          Math.sin((state.offset * Math.PI * 2) / projects.length) * 0.081) *
          fade,
        -0.28 * fade
      );
    if (locs.rig) gl.uniform3f(locs.rig, -y * 0.075, x * 0.1, 0);
    if (locs.translation)
      gl.uniform3f(
        locs.translation,
        x * 0.075,
        y * 0.03 +
          Math.sin((state.offset * Math.PI * 4) / projects.length) * 0.02 -
          0.04 -
          ease * 0.06,
        0
      );
    if (locs.offset) gl.uniform1f(locs.offset, state.offset);
    if (locs.picking) gl.uniform1f(locs.picking, picking ? 1 : 0);

    if (picking) gl.disable(gl.DITHER);
    else gl.enable(gl.DITHER);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, geometry.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  return {
    draw,
    resize(width: number, height: number) {
      if (!gl) return;
      viewportWidth = width;
      viewportHeight = height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (locs.aspect) gl.uniform1f(locs.aspect, width / height);
    },
    pick(x: number, y: number, state: MotionState) {
      if (!gl) return -1;
      draw(state, true);
      gl.readPixels(
        Math.min(
          canvas.width - 1,
          Math.max(0, Math.floor((x / viewportWidth) * canvas.width))
        ),
        Math.min(
          canvas.height - 1,
          Math.max(0, Math.floor((1 - y / viewportHeight) * canvas.height))
        ),
        1,
        1,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        pixel
      );
      draw(state);
      return pixel[3] === 255 && pixel[0] > 0 && pixel[0] <= projects.length
        ? pixel[0] - 1
        : -1;
    },
    dispose() {
      if (!gl) return;
      gl.deleteBuffer(vertexBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
    },
  };
}

const ProjectConveyor = forwardRef<ProjectConveyorHandle, ProjectConveyorProps>(
  function ProjectConveyor({ initialPresent = 0, className = "" }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const targetPresentRef = useRef(initialPresent);
    const scrollOffsetRef = useRef<number | null>(null);
    const conveyorInstanceRef = useRef<ReturnType<typeof createConveyor> | null>(null);

    useImperativeHandle(ref, () => ({
      setPresent(val: number) {
        targetPresentRef.current = Math.max(0, Math.min(1, val));
      },
      setScrollOffset(val: number | null) {
        scrollOffsetRef.current = val;
      },
      resize(width?: number, height?: number) {
        if (!containerRef.current || !conveyorInstanceRef.current) return;
        const w = width ?? containerRef.current.clientWidth;
        const h = height ?? containerRef.current.clientHeight;
        if (w > 0 && h > 0) {
          conveyorInstanceRef.current.resize(w, h);
        }
      },
      getCanvas() {
        return canvasRef.current;
      },
    }));

    useEffect(() => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      let conveyor: ReturnType<typeof createConveyor> | null = null;
      let animId = 0;
      let prevTime = 0;
      let inView = true;

      const motion: MotionState = {
        offset: 0,
        velocity: 0.006,
        present: initialPresent,
        targetPresent: targetPresentRef.current,
        pointerX: 0,
        pointerY: 0,
        parallaxX: 0,
        parallaxY: 0,
      };

      const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Load all slides from the single reelSlides source
      const imagePromises = reelSlides.map(
        (slide) =>
          new Promise<HTMLImageElement | null>((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = slide.image;
          })
      );

      Promise.all(imagePromises).then((loadedImages) => {
        try {
          conveyor = createConveyor(canvas, loadedImages, reelSlides);
          conveyorInstanceRef.current = conveyor;
          if (container && conveyor && container.clientWidth > 0 && container.clientHeight > 0) {
            conveyor.resize(container.clientWidth, container.clientHeight);
          }
        } catch (err) {
          console.warn("WebGL Conveyor init notice:", err);
        }
      });

      const handleResize = () => {
        if (!container || !conveyor) return;
        conveyor.resize(container.clientWidth, container.clientHeight);
      };

      window.addEventListener("resize", handleResize);

      // WebGL context guard
      const handleContextLost = (e: Event) => {
        e.preventDefault();
        console.warn("WebGL context lost. Suspending conveyor rendering.");
      };
      const handleContextRestored = () => {
        console.info("WebGL context restored. Rebuilding conveyor.");
        if (canvas) {
          Promise.all(imagePromises).then((loadedImages) => {
            conveyor = createConveyor(canvas, loadedImages, reelSlides);
            conveyorInstanceRef.current = conveyor;
            if (container && conveyor) conveyor.resize(container.clientWidth, container.clientHeight);
          });
        }
      };

      canvas.addEventListener("webglcontextlost", handleContextLost);
      canvas.addEventListener("webglcontextrestored", handleContextRestored);

      // Free Pointer Dragging (Without blocking vertical page scroll!)
      let touch: {
        id: number;
        y: number;
        startX: number;
        startY: number;
      } | null = null;
      let dragged = false;

      const onPointerDown = (e: PointerEvent) => {
        // If external scroll offset is actively driven, let scroll rule
        if (scrollOffsetRef.current !== null) return;
        dragged = false;
        touch = {
          id: e.pointerId,
          y: e.clientY,
          startX: e.clientX,
          startY: e.clientY,
        };
        try {
          container.setPointerCapture(e.pointerId);
        } catch {}
      };

      const onPointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;

        if (touch && touch.id === e.pointerId) {
          const delta = touch.y - e.clientY;
          touch.y = e.clientY;
          if (scrollOffsetRef.current === null) {
            motion.velocity += delta * 0.0018;
          }
          if (Math.hypot(touch.startX - e.clientX, touch.startY - e.clientY) > 8) {
            dragged = true;
          }
        } else {
          motion.pointerX = (localX / rect.width) * 2 - 1;
          motion.pointerY = (localY / rect.height) * 2 - 1;
        }
      };

      const onPointerUp = () => {
        touch = null;
      };

      const onClick = (e: MouseEvent) => {
        if (dragged || !conveyor) return;
        const rect = container.getBoundingClientRect();
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;
        const slot = conveyor.pick(localX, localY, motion);
        if (slot >= 0 && slot < reelSlides.length) {
          const url = reelSlides[slot].url;
          if (url && url !== "#") {
            window.open(url, "_blank", "noopener,noreferrer");
          }
        }
      };

      container.addEventListener("pointerdown", onPointerDown);
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerup", onPointerUp);
      container.addEventListener("pointercancel", onPointerUp);
      container.addEventListener("click", onClick);

      // Viewport Intersection Observer (0% idle GPU when off-screen)
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            inView = entry.isIntersecting;
            // Extra Rule: set pointer-events to auto only while in viewport
            canvas.style.pointerEvents = inView ? "auto" : "none";
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(container);

      const render = (time: number) => {
        animId = requestAnimationFrame(render);
        if (!inView) return;

        const frames = prevTime
          ? Math.min((time - prevTime) / (1000 / 60), 3)
          : 1;
        prevTime = time;

        motion.targetPresent = targetPresentRef.current;

        // If GSAP ScrollTrigger is driving the offset during pinned stage:
        if (scrollOffsetRef.current !== null) {
          motion.offset = scrollOffsetRef.current;
          motion.velocity = 0;
          motion.present +=
            (motion.targetPresent - motion.present) * (reducedMotion ? 1 : 0.15);
        } else {
          // Subtle baseline momentum when free
          if (Math.abs(motion.velocity) < 0.001 && !touch) {
            motion.velocity = 0.004;
          }
          advanceMotion(motion, frames, reelSlides.length, reducedMotion);
        }

        conveyor?.draw(motion);
      };

      animId = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", handleResize);
        observer.disconnect();

        canvas.removeEventListener("webglcontextlost", handleContextLost);
        canvas.removeEventListener("webglcontextrestored", handleContextRestored);

        container.removeEventListener("pointerdown", onPointerDown);
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerup", onPointerUp);
        container.removeEventListener("pointercancel", onPointerUp);
        container.removeEventListener("click", onClick);

        conveyor?.dispose();
      };
    }, [initialPresent]);

    return (
      <div
        ref={containerRef}
        className={`relative w-full h-full bg-transparent select-none touch-pan-y ${className}`}
        aria-label="3D Work Reel Showcase"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-grab active:cursor-grabbing transition-opacity duration-300"
        />
      </div>
    );
  }
);

export default ProjectConveyor;
