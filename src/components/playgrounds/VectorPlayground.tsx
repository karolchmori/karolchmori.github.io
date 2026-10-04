import React, { useRef, useEffect, useState } from 'react';

const PAD = 10;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export default function VectorPlayground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragging = useRef(false);

  const [size, setSize] = useState({ w: 0, h: 0 });
  // Normalized vector: -1..1 relative to half the canvas (screen coords, y down)
  const [vec, setVec] = useState({ x: 0.6, y: -0.5 });

  // Track container width, derive height from it
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.floor(entry.contentRect.width);
      const h = Math.round(clamp(w * 0.75, 220, 420));
      setSize({ w, h });
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size.w) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size.w * dpr;   // resets the canvas, so redraw everything
    canvas.height = size.h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels from here on

    const cx = size.w / 2;
    const cy = size.h / 2;
    const px = cx + vec.x * (cx - PAD);
    const py = cy + vec.y * (cy - PAD);

    // Axes
    ctx.strokeStyle = 'rgba(128,128,128,0.7)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(size.w, cy);
    ctx.moveTo(cx, 0); ctx.lineTo(cx, size.h);
    ctx.stroke();

    // Vector
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Handle
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fill();
  }, [size, vec]);

  const updateFromPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const halfW = rect.width / 2;
    const halfH = rect.height / 2;
    const x = (e.clientX - rect.left - halfW) / (halfW - PAD);
    const y = (e.clientY - rect.top - halfH) / (halfH - PAD);
    setVec({ x: clamp(x, -1, 1), y: clamp(y, -1, 1) });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId); // keeps events even if the pointer leaves
    updateFromPointer(e);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragging.current) updateFromPointer(e);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      style={{
        border: '1px solid rgba(128,128,128,0.4)',
        borderRadius: 12,
        padding: 16,
        margin: '1.5rem 0',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
        <strong>Vector Playground</strong>
        <span style={{ opacity: 0.7 }}>
          X: {Math.round(vec.x * 100)}, Y: {Math.round(-vec.y * 100)}
        </span>
      </div>

      <div ref={wrapRef} style={{ width: '100%' }}>
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: size.w || '100%',
            height: size.h || 300,
            touchAction: 'none', // stops the page scrolling while dragging on mobile
            cursor: 'crosshair',
            borderRadius: 8,
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      </div>

      <p style={{ fontSize: 12, opacity: 0.7, textAlign: 'center', margin: '8px 0 0' }}>
        Click and drag inside the box to move the vector.
      </p>
    </div>
  );
}