import { useEffect, useRef } from 'react';

// Free, open-source 3D particle galaxy built with three.js (MIT license).
export default function Particles({ onReady }) {
  const mount = useRef(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    import('three').then((THREE) => {
      if (disposed || !mount.current) return;
      const el = mount.current;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 6;

      // Soft round sprite so particles render as glowing dots, not squares
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const g = c.getContext('2d');
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.4, 'rgba(255,255,255,0.6)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      const sprite = new THREE.CanvasTexture(c);

      // Spiral galaxy: dense orange core fading to soft white and grey arms
      const COUNT = 9000;
      const pos = new Float32Array(COUNT * 3);
      const col = new Float32Array(COUNT * 3);
      const accent = new THREE.Color('#ff7a1a');
      const soft = new THREE.Color('#f2f2f5');
      const dim = new THREE.Color('#6a6a7a');
      const tmp = new THREE.Color();
      for (let i = 0; i < COUNT; i++) {
        const r = Math.pow(Math.random(), 1.6) * 2.6;
        const a = ((i % 3) / 3) * Math.PI * 2 + r * 1.7 + (Math.random() - 0.5) * 0.55;
        pos[i * 3] = Math.cos(a) * r;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5 * Math.exp(-r);
        pos[i * 3 + 2] = Math.sin(a) * r;
        tmp.copy(accent).lerp(soft, Math.min(1, r / 1.3)).lerp(dim, Math.max(0, (r - 1.3) / 1.3));
        col[i * 3] = tmp.r; col[i * 3 + 1] = tmp.g; col[i * 3 + 2] = tmp.b;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({
        size: 0.05, map: sprite, vertexColors: true, transparent: true,
        depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
      });
      const galaxy = new THREE.Points(geo, mat);
      galaxy.rotation.x = 0.9;
      scene.add(galaxy);

      const resize = () => {
        const w = el.clientWidth || 1, h = el.clientHeight || 1;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      resize();

      let mx = 0, my = 0, visible = true, frame = 0;
      const onMove = (e) => { mx = (e.clientX / window.innerWidth) * 2 - 1; my = (e.clientY / window.innerHeight) * 2 - 1; };
      window.addEventListener('pointermove', onMove);
      const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      io.observe(el);

      const clock = new THREE.Clock();
      const loop = () => {
        frame = requestAnimationFrame(loop);
        if (!visible) return;
        galaxy.rotation.y += clock.getDelta() * 0.08;
        galaxy.rotation.x += (0.9 + my * 0.25 - galaxy.rotation.x) * 0.04;
        galaxy.rotation.z += (-mx * 0.2 - galaxy.rotation.z) * 0.04;
        renderer.render(scene, camera);
      };
      loop();
      onReady && onReady();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('pointermove', onMove);
        ro.disconnect(); io.disconnect();
        geo.dispose(); mat.dispose(); sprite.dispose(); renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => { disposed = true; cleanup(); };
  }, [onReady]);

  return <div className="particles" ref={mount} />;
}
