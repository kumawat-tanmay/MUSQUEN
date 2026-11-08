"use client";

import React, { useEffect, useRef, useState } from "react";

interface Project {
  order: number;
  id: string;
  title: string;
  url: string;
  image: string;
}

const defaultProjects: Project[] = [
  {
    order: 3,
    id: "25156786",
    title: "Monarch",
    url: "https://dribbble.com/shots/25156786",
    image:
      "https://cdn.dribbble.com/userupload/17469058/file/original-3281c9a5cba68bd522aaa911e9848297.png?format=webp&resize=1200x900",
  },
  {
    order: 5,
    id: "27274598",
    title: "Spektral",
    url: "https://dribbble.com/shots/27274598",
    image:
      "https://cdn.dribbble.com/userupload/47373040/file/457ad343977ccf420ab30658f9b71531.png?format=webp&resize=1200x900",
  },
  {
    order: 9,
    id: "27340771",
    title: "Owari",
    url: "https://dribbble.com/shots/27340771",
    image:
      "https://cdn.dribbble.com/userupload/47603638/file/7c3cd868135a7ddc2c38e06d1194f78b.png?format=webp&resize=1200x900",
  },
  {
    order: 11,
    id: "27601386",
    title: "Trading Dashboard",
    url: "https://dribbble.com/shots/27601386-Trading-Dashboard-for-Market-Data-Analysis-and-Execution",
    image:
      "https://cdn.dribbble.com/userupload/48539267/file/a2b4e384fbb94b1f96dc7a19ae138092.png?format=webp&resize=1200x900",
  },
  {
    order: 12,
    id: "25900599",
    title: "Crypto Exchange",
    url: "https://dribbble.com/shots/25900599-Crypto-Exchange-Web-Platform",
    image:
      "https://cdn.dribbble.com/userupload/42920999/file/original-93660321e8852132642b3824614bc32f.png?format=webp&resize=1200x900",
  },
  {
    order: 17,
    id: "26530423",
    title: "TraderTale",
    url: "https://dribbble.com/shots/26530423-UI-UX-Design-for-TraderTale-Social-Platform-for-Traders",
    image:
      "https://cdn.dribbble.com/userupload/44924480/file/still-439f1b3427d2c6053c9bbfdc5debdbb2.png?format=webp&resize=1200x900",
  },
  {
    order: 19,
    id: "26249804",
    title: "AJP",
    url: "https://dribbble.com/shots/26249804-Website-Design-for-AJP-Jiu-Jitsu-Tournament-Platform",
    image:
      "https://cdn.dribbble.com/userupload/44022519/file/still-91d6c4bfcf4accc97a75553bafe66b23.png?format=webp&resize=1200x900",
  },
  {
    order: 20,
    id: "25764275",
    title: "Developer Community",
    url: "https://dribbble.com/shots/25764275-Social-Media-Platform-for-Developers",
    image:
      "https://cdn.dribbble.com/userupload/41572827/file/original-ca56285eb604f6a12fe3e3c0e020bbd6.png?format=webp&resize=1200x900",
  },
];

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
  const width = (((11.6 + Math.PI * 2.04) / count) * 4) / 3;
  const vertices = new Float32Array((segments + 1) * 2 * 7);
  const indices = new Uint16Array(segments * 6);
  for (let i = 0; i <= segments; i++) {
    const point = conveyorPoint(i / segments);
    for (let side = 0; side < 2; side++) {
      vertices.set(
        [
          (side - 0.5) * width,
          point.y,
          point.z,
          side,
          i / segments,
          point.ny,
          point.nz,
        ],
        (i * 2 + side) * 7
      );
    }
    if (i < segments) {
      const a = i * 2;
      indices.set([a, a + 2, a + 1, a + 1, a + 2, a + 3], i * 6);
    }
  }
  return { vertices, indices };
}

function createConveyor(
  canvas: HTMLCanvasElement,
  images: (HTMLImageElement | null)[],
  projects: Project[]
) {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    premultipliedAlpha: false,
  });
  if (!gl) throw new Error("WebGL is unavailable.");

  const vertexSource = `
    attribute vec3 position;
    attribute vec2 uv;
    attribute vec2 normalYZ;
    uniform vec3 rotation, rig, camera, target;
    uniform vec3 translation;
    uniform float aspect;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition, vView, vLight;
    vec3 rotate(vec3 p, vec3 r) {
      vec3 c = cos(r), s = sin(r);
      p.xy = mat2(c.z, s.z, -s.z, c.z) * p.xy;
      p.xz = mat2(c.y, -s.y, s.y, c.y) * p.xz;
      p.yz = mat2(c.x, s.x, -s.x, c.x) * p.yz;
      return p;
    }
    vec3 unrotate(vec3 p, vec3 r) {
      vec3 c = cos(r), s = sin(r);
      p.yz = mat2(c.x, -s.x, s.x, c.x) * p.yz;
      p.xz = mat2(c.y, s.y, -s.y, c.y) * p.xz;
      p.xy = mat2(c.z, -s.z, s.z, c.z) * p.xy;
      return p;
    }
    void main() {
      vUv = uv;
      vNormal = rotate(rotate(vec3(0.0, normalYZ), rotation), rig);
      vPosition = position;
      vLight = unrotate(unrotate(normalize(vec3(-0.45, 1.1, 0.8)), rig), rotation);
      vec3 world = rotate(rotate(position * 0.79, rotation), rig) + translation;
      vView = camera - world;
      vec3 forward = normalize(target - camera);
      vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
      vec3 up = cross(right, forward);
      vec3 delta = world - camera;
      vec3 view = vec3(dot(delta, right), dot(delta, up), -dot(delta, forward));
      view.xy *= 1.122;
      gl_Position = vec4(view.x * 3.2708526 / aspect, view.y * 3.2708526, -1.002002 * view.z - 0.2002002, -view.z);
      gl_Position.y += gl_Position.w * 0.18;
    }
  `;

  const fragmentSource = `
    precision highp float;
    uniform sampler2D atlas;
    uniform float offset, count, picking;
    uniform vec2 grid, atlasSize;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition, vView, vLight;

    float edgeShadow(vec3 origin, vec3 ray, float distance) {
      if (distance < 0.025) return 0.0;
      float halfWidth = (11.6 + 6.408849) / count * 0.666667;
      float edge = halfWidth - abs(origin.x + ray.x * distance);
      return smoothstep(-0.06, 0.06 + distance * 0.12, edge);
    }

    float rayShadow(vec3 origin, vec3 ray) {
      float shadow = 0.0;
      if (abs(ray.z) > 0.0001) {
        for (int side = 0; side < 2; side++) {
          float z = side == 0 ? -1.02 : 1.02;
          float distance = (z - origin.z) / ray.z;
          if (abs(origin.y + ray.y * distance) <= 2.9)
            shadow = max(shadow, edgeShadow(origin, ray, distance));
        }
      }
      float a = dot(ray.yz, ray.yz);
      for (int end = 0; end < 2; end++) {
        float signY = end == 0 ? -1.0 : 1.0;
        vec2 delta = origin.yz - vec2(signY * 2.9, 0.0);
        float b = dot(delta, ray.yz);
        float discriminant = b * b - a * (dot(delta, delta) - 1.0404);
        if (discriminant >= 0.0 && a > 0.0001) {
          for (int root = 0; root < 2; root++) {
            float distance = (-b + (root == 0 ? -1.0 : 1.0) * sqrt(discriminant)) / a;
            if (signY * (origin.y + ray.y * distance) >= 2.9)
              shadow = max(shadow, edgeShadow(origin, ray, distance));
          }
        }
      }
      return shadow;
    }

    float visibility(vec3 normal) {
      vec3 light = normalize(vLight);
      vec3 tangent = normalize(cross(light, vec3(0.0, 1.0, 0.0)));
      vec3 bitangent = cross(light, tangent);
      vec3 origin = vPosition + normal * 0.018;
      float shadow = rayShadow(origin, light) * 2.0;
      shadow += rayShadow(origin, normalize(light + tangent * 0.12));
      shadow += rayShadow(origin, normalize(light - tangent * 0.12));
      shadow += rayShadow(origin, normalize(light + bitangent * 0.12));
      shadow += rayShadow(origin, normalize(light - bitangent * 0.12));
      return 1.0 - shadow / 6.0;
    }

    void main() {
      float phase = mod(vUv.y * count + offset, count);
      float tile = floor(phase);
      if (picking > 0.5) {
        gl_FragColor = vec4((tile + 1.0) / 255.0, 0.0, 0.0, 1.0);
        return;
      }
      vec2 cell = vec2(mod(tile, grid.x), floor(tile / grid.x));
      vec2 local = vec2(vUv.x, 1.0 - fract(phase));
      vec2 inset = 0.5 * grid / atlasSize;
      vec2 sampleUv = (cell + mix(inset, 1.0 - inset, local)) / grid;
      vec3 color = texture2D(atlas, sampleUv).rgb;
      vec3 normal = normalize(vNormal);
      float side = dot(normal, vView) >= 0.0 ? 1.0 : -1.0;
      normal *= side;
      vec3 localNormal = vec3(0.0, normalize(vec2(vPosition.y - clamp(vPosition.y, -2.9, 2.9), vPosition.z))) * side;
      float visible = visibility(localNormal);
      vec3 light = normalize(vec3(-0.45, 1.1, 0.8));
      float diffuse = max(0.0, dot(normal, light)) * visible;
      float ambient = side > 0.0 ? 0.38 : 0.16;
      float fold = smoothstep(2.35, 3.92, abs(vPosition.y));
      ambient *= 1.0 - (side < 0.0 ? 0.35 : 0.12) * fold;
      float highlight = pow(max(0.0, dot(normal, normalize(light + normalize(vView)))), 28.0) * visible * 0.035;
      float luma = dot(color, vec3(0.299, 0.587, 0.114));
      color = max(vec3(0.0), mix(vec3(luma), color, 1.04));
      vec3 lit = pow(color, vec3(2.2)) * (ambient * vec3(0.94, 0.97, 1.0) + diffuse * 0.9 + highlight);
      gl_FragColor = vec4(pow(clamp(lit, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);
    }
  `;

  const program = gl.createProgram();
  if (!program) throw new Error("Could not create WebGL program");

  const compileShader = (type: number, src: string) => {
    const s = gl.createShader(type);
    if (!s) throw new Error("Shader creation failed");
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      const err = gl.getShaderInfoLog(s);
      gl.deleteShader(s);
      throw new Error(err || "Shader compile error");
    }
    return s;
  };

  const vs = compileShader(gl.VERTEX_SHADER, vertexSource);
  const fs = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || "Program link error");
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
    ctx.fillStyle = "#0d1416";
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
        ctx.fillStyle = "#1e292b";
        ctx.fillRect(x + 10, y + 10, tileWidth - 20, tileHeight - 20);
        ctx.fillStyle = "#7ECBA9";
        ctx.font = `bold ${tileWidth / 22}px sans-serif`;
        ctx.fillText(projects[index].title, x + 30, y + tileHeight / 2);
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

  const anisotropy =
    gl.getExtension("EXT_texture_filter_anisotropic") ||
    gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
    gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
  if (anisotropy) {
    const maxAniso = gl.getParameter(anisotropy.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    gl.texParameterf(
      gl.TEXTURE_2D,
      anisotropy.TEXTURE_MAX_ANISOTROPY_EXT,
      Math.min(8, maxAniso)
    );
  }

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
    const x = state.parallaxX * fade,
      y = state.parallaxY * fade;
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
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
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

export default function ProjectConveyor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTitle, setActiveTitle] = useState<string>("");

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
      velocity: 0.008, // Subtle resting drift keeps the conveyor alive
      present: 0,
      targetPresent: 0,
      pointerX: 0,
      pointerY: 0,
      parallaxX: 0,
      parallaxY: 0,
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Load Project Images
    const imagePromises = defaultProjects.map(
      (proj) =>
        new Promise<HTMLImageElement | null>((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = proj.image;
        })
    );

    Promise.all(imagePromises).then((loadedImages) => {
      try {
        conveyor = createConveyor(canvas, loadedImages, defaultProjects);
        if (container) {
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

    // Pointer Dragging and Hover Interactions
    let touch: {
      id: number;
      y: number;
      startX: number;
      startY: number;
    } | null = null;
    let dragged = false;

    const onPointerDown = (e: PointerEvent) => {
      dragged = false;
      touch = {
        id: e.pointerId,
        y: e.clientY,
        startX: e.clientX,
        startY: e.clientY,
      };
      container.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      if (touch && touch.id === e.pointerId) {
        const delta = touch.y - e.clientY;
        touch.y = e.clientY;
        motion.velocity += delta * 0.0018;
        if (
          Math.hypot(touch.startX - e.clientX, touch.startY - e.clientY) > 6
        ) {
          dragged = true;
        }
      } else {
        motion.pointerX = (localX / rect.width) * 2 - 1;
        motion.pointerY = (localY / rect.height) * 2 - 1;
        if (conveyor && Math.abs(motion.velocity) < 0.004) {
          const slot = conveyor.pick(localX, localY, motion);
          if (slot >= 0 && slot < defaultProjects.length) {
            canvas.style.cursor = "pointer";
            setActiveTitle(defaultProjects[slot].title);
          } else {
            canvas.style.cursor = "grab";
            setActiveTitle("");
          }
        }
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
      if (slot >= 0 && slot < defaultProjects.length) {
        window.open(defaultProjects[slot].url, "_blank", "noopener,noreferrer");
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Localized wheel scroll - spins the belt without hijacking the full page Lenis scroll unless fast
      motion.velocity += e.deltaY * 0.0003;
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("click", onClick);
    container.addEventListener("wheel", onWheel, { passive: true });

    // Viewport Intersection Observer (0% idle GPU when scrolled away)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inView = entry.isIntersecting;
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

      // Small baseline momentum if idle
      if (Math.abs(motion.velocity) < 0.001 && !touch) {
        motion.velocity = 0.004;
      }

      advanceMotion(motion, frames, defaultProjects.length, reducedMotion);
      conveyor?.draw(motion);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("click", onClick);
      container.removeEventListener("wheel", onWheel);

      conveyor?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[620px] lg:h-[680px] rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.04] to-black/60 border border-white/[0.08] shadow-2xl touch-none select-none group"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing transition-opacity duration-300"
      />

      {/* Ambient Radial Glass Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.7)_100%)]" />

      {/* Subtle Top & Bottom Shadow Gradients */}
      <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none bg-gradient-to-b from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Floating Interactive Badge */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[var(--emerald-light)] animate-pulse" />
        <span className="text-[11px] font-mono tracking-wider text-[#f2ede6]/75 uppercase">
          Interactive 3D Work Reel
        </span>
      </div>

      {/* Active Project Title Pill On Hover */}
      {activeTitle && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none px-4 py-2 rounded-full bg-[#f2ede6] text-[#0b0705] font-semibold text-xs tracking-wider uppercase shadow-xl animate-fade-in">
          <span>{activeTitle}</span>
          <span className="ml-1.5 text-[10px] opacity-60">↗</span>
        </div>
      )}

      {/* Bottom Hint */}
      {!activeTitle && (
        <div className="absolute bottom-4 right-4 z-10 pointer-events-none text-[10px] font-mono tracking-widest text-[#f2ede6]/40 uppercase">
          Drag • Scroll • Click
        </div>
      )}
    </div>
  );
}
