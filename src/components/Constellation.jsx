import { useEffect, useRef } from 'react';

// A slowly turning constellation: stars joined by faint lines, with gentle mouse parallax.
export default function Constellation() {
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
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 8;

      const N = 150;
      const pts = Array.from({ length: N }, () => new THREE.Vector3((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 6));
      const verts = new Float32Array(N * 3), cols = new Float32Array(N * 3);
      const star = new THREE.Color('#f2f2f5'), hot = new THREE.Color('#ff7a1a');
      pts.forEach((p, i) => { p.toArray(verts, i * 3); (Math.random() < 0.12 ? hot : star).toArray(cols, i * 3); });

      const seg = [];
      pts.forEach((p, i) => {
        pts.map((q, j) => [j, p.distanceTo(q)]).filter(([j, d]) => j > i && d < 1.9)
          .sort((a, b) => a[1] - b[1]).slice(0, 2)
          .forEach(([j]) => seg.push(...p.toArray(), ...pts[j].toArray()));
      });

      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const g = c.getContext('2d');
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      const sprite = new THREE.CanvasTexture(c);

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.12, map: sprite, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(seg), 3));
      const lMat = new THREE.LineBasicMaterial({ color: '#8a8aa0', transparent: true, opacity: 0.22 });
      const group = new THREE.Group();
      group.add(new THREE.Points(pGeo, pMat), new THREE.LineSegments(lGeo, lMat));
      scene.add(group);

      const resize = () => {
        const w = el.clientWidth || 1, h = el.clientHeight || 1;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      resize();

      let mx = 0, my = 0, sx = 0, sy = 0, visible = true, frame = 0;
      const onMove = (e) => { mx = (e.clientX / window.innerWidth) * 2 - 1; my = (e.clientY / window.innerHeight) * 2 - 1; };
      window.addEventListener('pointermove', onMove);
      const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      io.observe(el);

      const clock = new THREE.Clock();
      const loop = () => {
        frame = requestAnimationFrame(loop);
        const t = clock.getElapsedTime();
        if (!visible) return;
        sx += (mx - sx) * 0.04; sy += (my - sy) * 0.04;
        group.rotation.y = t * 0.03 + sx * 0.2;
        group.rotation.x = sy * 0.12;
        pMat.size = 0.12 + Math.sin(t * 2) * 0.015;
        renderer.render(scene, camera);
      };
      loop();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('pointermove', onMove);
        ro.disconnect(); io.disconnect();
        pGeo.dispose(); lGeo.dispose(); pMat.dispose(); lMat.dispose(); sprite.dispose(); renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => { disposed = true; cleanup(); };
  }, []);

  return <div className="constellation" ref={mount} aria-hidden="true" />;
}
