import { useEffect, useRef } from 'react';

// Interactive particle sculpture. ~26k points morph between a sphere, a torus knot and a cube
// (click, or wait). Particles part around your cursor and glow orange near it. three.js (MIT).
const VERT = `
uniform float uTime, uMix, uSize; uniform vec2 uMouse;
attribute vec3 aB; attribute float aRand;
varying float vHeat; varying float vShade;
void main(){
  float m = smoothstep(0.0, 1.0, uMix);
  vec3 p = mix(position, aB, m);
  p += normalize(position + aB + 1e-4) * sin(3.14159 * m) * (0.6 + aRand) * 0.9; // burst while morphing
  float c = cos(uTime*0.12), s = sin(uTime*0.12);
  p.xz = mat2(c, -s, s, c) * p.xz;
  p += 0.035 * vec3(sin(p.y*4.0 + uTime + aRand*6.0), sin(p.z*4.0 + uTime*1.1), sin(p.x*4.0 + uTime*0.9));
  vec2 d = p.xy - uMouse;
  float f = exp(-dot(d, d) / 0.55);
  p.xy += normalize(d + 1e-4) * f * 0.8;
  p.z += f * 0.5 * sin(aRand * 20.0);
  vHeat = f;
  vShade = 0.5 + 0.5 * (p.z / 2.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uSize * (0.6 + aRand * 0.8) * (6.5 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;
const FRAG = `
varying float vHeat; varying float vShade;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.0, d);
  vec3 base = mix(vec3(0.55, 0.57, 0.68), vec3(0.95, 0.95, 0.98), vShade);
  vec3 col = mix(base, vec3(1.0, 0.48, 0.10), clamp(vHeat * 1.6, 0.0, 1.0));
  gl_FragColor = vec4(col, a * (0.55 + 0.45 * vShade));
}`;

const N = 65000;
const sphere = () => {
  const a = new Float32Array(N * 3), g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = g * i, s = 1.7 * (0.97 + Math.random() * 0.06);
    a[i * 3] = Math.cos(th) * r * s; a[i * 3 + 1] = y * s; a[i * 3 + 2] = Math.sin(th) * r * s;
  }
  return a;
};
const knot = () => {
  const a = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const t = Math.random() * Math.PI * 2, k = 2 + Math.cos(3 * t);
    a[i * 3] = k * Math.cos(2 * t) * 0.55 + (Math.random() - 0.5) * 0.28;
    a[i * 3 + 1] = k * Math.sin(2 * t) * 0.55 + (Math.random() - 0.5) * 0.28;
    a[i * 3 + 2] = Math.sin(3 * t) * 0.66 + (Math.random() - 0.5) * 0.28;
  }
  return a;
};
const cube = () => {
  const a = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const f = Math.floor(Math.random() * 6), ax = f >> 1;
    a[i * 3 + ax] = f % 2 ? 1.2 : -1.2;
    a[i * 3 + (ax + 1) % 3] = (Math.random() * 2 - 1) * 1.2;
    a[i * 3 + (ax + 2) % 3] = (Math.random() * 2 - 1) * 1.2;
  }
  return a;
};

export default function Particles({ onReady }) {
  const mount = useRef(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => { };

    import('three').then((THREE) => {
      if (disposed || !mount.current) return;
      const el = mount.current;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.z = 7;
      const halfH = Math.tan(THREE.MathUtils.degToRad(20)) * 7;

      const shapes = [sphere(), knot(), cube()];
      const rand = new Float32Array(N).map(() => Math.random());
      const geo = new THREE.BufferGeometry();
      const posA = new THREE.BufferAttribute(shapes[0].slice(), 3);
      const posB = new THREE.BufferAttribute(shapes[1].slice(), 3);
      geo.setAttribute('position', posA);
      geo.setAttribute('aB', posB);
      geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));
      const uniforms = { uTime: { value: 0 }, uMix: { value: 0 }, uSize: { value: 1.5 * dpr }, uMouse: { value: new THREE.Vector2(9, 9) } };
      const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
      const points = new THREE.Points(geo, mat);
      points.frustumCulled = false;
      scene.add(points);

      let aspect = 1;
      const resize = () => {
        const w = el.clientWidth || 1, h = el.clientHeight || 1;
        renderer.setSize(w, h);
        aspect = w / h;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      resize();

      let cur = 0, morphing = false, t0 = 0, lastEnd = 0, now = 0;
      const startMorph = () => {
        if (morphing) return;
        const nxt = (cur + 1) % 3;
        posA.array.set(shapes[cur]); posB.array.set(shapes[nxt]);
        posA.needsUpdate = true; posB.needsUpdate = true;
        uniforms.uMix.value = 0; morphing = true; t0 = now; cur = nxt;
      };

      let nx = 0, ny = 0, last = -1e9, visible = true, frame = 0;
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        ny = -(e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        last = performance.now();
      };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerdown', startMorph);
      const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      io.observe(el);

      const clock = new THREE.Clock();
      const loop = () => {
        frame = requestAnimationFrame(loop);
        now = clock.getElapsedTime();
        if (!visible) return;
        uniforms.uTime.value = now;
        const active = performance.now() - last < 3000;
        const tx = (active ? nx : Math.sin(now * 0.4) * 0.7) * halfH * aspect;
        const ty = (active ? ny : Math.cos(now * 0.3) * 0.5) * halfH;
        uniforms.uMouse.value.x += (tx - uniforms.uMouse.value.x) * 0.12;
        uniforms.uMouse.value.y += (ty - uniforms.uMouse.value.y) * 0.12;
        if (morphing) {
          const x = (now - t0) / 1.6;
          uniforms.uMix.value = Math.min(x, 1);
          if (x >= 1) { morphing = false; lastEnd = now; }
        } else if (now - lastEnd > 8) startMorph();
        renderer.render(scene, camera);
      };
      loop();
      onReady && onReady();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerdown', startMorph);
        ro.disconnect(); io.disconnect();
        geo.dispose(); mat.dispose(); renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => { disposed = true; cleanup(); };
  }, [onReady]);

  return <div className="particles" ref={mount} />;
}
