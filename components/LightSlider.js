"use client";
import { useState } from "react";
// Same room, cove lights dimmed vs. on. Drag to compare.
export default function LightSlider({ src }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="ls">
      <img src={src} alt="Hall with warm cove lighting and curtain wall" />
      <div className="ls-dim" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}><img src={src} alt="" /></div>
      <div className="ls-bar" style={{ left: `${pos}%` }}><span /></div>
      <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Compare lights dimmed and lights on" />
      <b className="ls-l">Lights dimmed</b><b className="ls-r">Cove lights on</b>
    </div>
  );
}
