import React, { useRef, useEffect, useState } from 'react';

export default function VectorPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [vector, setVector] = useState({ x: 120, y: -80 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Redraw loop
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY); ctx.lineTo(width, centerY); // X axis
    ctx.moveTo(centerX, 0); ctx.lineTo(centerX, height); // Y axis
    ctx.stroke();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + vector.x, centerY + vector.y);
    ctx.stroke();

    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(centerX + vector.x, centerY + vector.y, 6, 0, Math.PI * 2);
    ctx.fill();
  }, [vector]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isDragging = false;

    const updatePos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      let newX = (clientX - rect.left) - centerX;
      let newY = (clientY - rect.top) - centerY;

      // Clamp values so the handle stays safely within canvas bounds (with 10px padding)
      const maxX = centerX - 10;
      const maxY = centerY - 10;

      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxY, Math.min(maxY, newY));

      setVector({ x: newX, y: newY });
    };

    const onStart = () => { isDragging = true; };
    const onEnd = () => { isDragging = false; };
    
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault(); 
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      updatePos(clientX, clientY);
    };

    canvas.addEventListener('mousedown', onStart);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('mousemove', onMove);

    canvas.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchmove', onMove, { passive: false });

    return () => {
      canvas.removeEventListener('mousedown', onStart);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('touchmove', onMove);
    };
  }, []);

  return (
    <div className="border border-slate-700 bg-slate-900 rounded-xl p-4 my-6 text-slate-200">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-sm">Vector Playground</span>
        <span className="text-xs text-slate-400">X: {Math.round(vector.x)}, Y: {Math.round(-vector.y)}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="w-full bg-slate-950 rounded-lg cursor-crosshair border border-slate-800 touch-none"
      />
      <p className="text-xs text-slate-400 mt-2 text-center">Click and drag inside the box to move the vector.</p>
    </div>
  );
}