"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// Warm cove-light glow that follows the cursor, drawn over the hero video.
export default function Glow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const u = { t: { value: 0 }, m: { value: new THREE.Vector2(0.5, 0.5) }, r: { value: new THREE.Vector2(1, 1) } };
    const mat = new THREE.ShaderMaterial({
      uniforms: u, transparent: true, blending: THREE.AdditiveBlending, depthTest: false,
      vertexShader: "varying vec2 v;void main(){v=uv;gl_Position=vec4(position,1.);}",
      fragmentShader: `varying vec2 v;uniform float t;uniform vec2 m,r;
        float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}
        void main(){
          vec2 p=v*vec2(r.x/r.y,1.),c=m*vec2(r.x/r.y,1.);
          float g=exp(-length(p-c)*3.2)*.55;
          float strip=exp(-abs(v.y-.86)*38.)*(.55+.1*sin(t*.8));
          float strip2=exp(-abs(v.x-.08-.02*sin(t*.5))*60.)*.22;
          vec2 q=floor(p*70.);float d=step(.9965,h(q+floor(t*.4)))*exp(-length(p-c)*1.6);
          vec3 amber=vec3(1.,.66,.28);
          gl_FragColor=vec4(amber*(g+strip*.8+strip2)+vec3(1.,.9,.7)*d,1.);
        }`,
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
    const size = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h); u.r.value.set(w, h); };
    size();
    const target = new THREE.Vector2(0.5, 0.5);
    const move = (e) => { const b = el.getBoundingClientRect(); target.set((e.clientX - b.left) / b.width, 1 - (e.clientY - b.top) / b.height); };
    window.addEventListener("pointermove", move); window.addEventListener("resize", size);
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf; const clock = new THREE.Clock();
    const loop = () => { u.t.value = clock.getElapsedTime(); if (!still) u.m.value.lerp(target, 0.06); renderer.render(scene, cam); raf = requestAnimationFrame(loop); };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); window.removeEventListener("resize", size); renderer.dispose(); el.removeChild(renderer.domElement); };
  }, []);
  return <div ref={ref} className="glow" aria-hidden="true" />;
}
