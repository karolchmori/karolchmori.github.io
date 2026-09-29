import React, { useRef, useEffect, useState } from 'react';

export default function VectorPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [vector, setVector] = useState({ x: 120, y: -80 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY); ctx.lineTo(width, centerY); // X axis
    ctx.moveTo(centerX, 0); ctx.lineTo(centerX, height); // Y axis
    ctx.stroke();

    // Draw vector line from origin
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + vector.x, centerY + vector.y);
    ctx.stroke();

    // Draw endpoint handle
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(centerX + vector.x, centerY + vector.y, 6, 0, Math.PI * 2);
    ctx.fill();

  }, [vector]);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setVector({
      x: mouseX - centerX,
      y: mouseY - centerY
    });
  };

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
        className="w-full bg-slate-950 rounded-lg cursor-crosshair border border-slate-800"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      />
      <p className="text-xs text-slate-400 mt-2 text-center">Click and drag inside the box to move the vector.</p>
    </div>
  );
}