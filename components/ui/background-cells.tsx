"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundCellsProps {
  children?: React.ReactNode;
  className?: string;
}

export const BackgroundCells = ({ children, className }: BackgroundCellsProps) => {
  return (
    <div className={cn("relative h-screen flex justify-center overflow-hidden", className)}>
      <BackgroundCellCore />
      {children && (
        <div className="relative z-50 mt-0 pointer-events-auto">
          {children}
        </div>
      )}
    </div>
  );
};

const BackgroundCellCore = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const maskRef = useRef<HTMLDivElement>(null);
  const size = 800;

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let rafId: number | null = null;
    
    const updatePosition = () => {
      if (maskRef.current) {
        // Apply a vertical offset to compensate for the 2-inch difference
        const maskPos = `${lastX - size / 2}px ${lastY - size / 2 - 100}px`;
        maskRef.current.style.webkitMaskPosition = maskPos;
        maskRef.current.style.maskPosition = maskPos;
        
        // Update state for any components that need it
        setMousePosition({
          x: lastX,
          y: lastY,
        });
      }
      rafId = null;
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      lastX = event.clientX;
      lastY = event.clientY;
      
      if (rafId === null) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };
    
    // Set initial position
    lastX = window.innerWidth / 2;
    lastY = window.innerHeight / 2;
    updatePosition();
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className="h-full absolute inset-0">
      <div className="absolute h-screen w-screen inset-0 overflow-hidden">
        <div className="absolute h-full w-full pointer-events-none -bottom-2 z-40 bg-slate-950 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        <div className="absolute h-1/3 w-full pointer-events-none bottom-0 z-[45] bg-gradient-to-t from-black via-black/80 to-transparent" />
        
        {/* Only show the pattern under the cursor */}
        <div
          ref={maskRef}
          className="absolute inset-0 z-20 bg-transparent"
          style={{
            maskImage: `radial-gradient(${size / 2}px circle at center, white, transparent)`,
            WebkitMaskImage: `radial-gradient(${size / 2}px circle at center, white, transparent)`,
            WebkitMaskPosition: `${mousePosition.x - size / 2}px ${mousePosition.y - size / 2 - 100}px`,
            maskPosition: `${mousePosition.x - size / 2}px ${mousePosition.y - size / 2 - 100}px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
            pointerEvents: "none",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <Pattern cellClassName="border-blue-600 relative z-[100]" />
        </div>
      </div>
    </div>
  );
};

interface PatternProps {
  className?: string;
  cellClassName?: string;
}

const Pattern = ({ className, cellClassName }: PatternProps) => {
  const x = new Array(47).fill(0);
  const y = new Array(30).fill(0);
  const matrix = x.map((_, i) => y.map((_, j) => [i, j]));
  const [clickedCell, setClickedCell] = useState<[number, number] | null>(null);

  return (
    <div className={cn("flex flex-row relative z-30", className)}>
      {matrix.map((row, rowIdx) => (
        <div
          key={`matrix-row-${rowIdx}`}
          className="flex flex-col relative z-20 border-b"
        >
          {row.map((column, colIdx) => {
            const controls = useAnimation();

            useEffect(() => {
              if (clickedCell) {
                const distance = Math.sqrt(
                  Math.pow(clickedCell[0] - rowIdx, 2) +
                    Math.pow(clickedCell[1] - colIdx, 2)
                );
                controls.start({
                  opacity: [0, 1 - distance * 0.1, 0],
                  transition: { duration: distance * 0.2 },
                });
              }
            }, [clickedCell]);

            return (
              <div
                key={`matrix-col-${colIdx}`}
                className={cn(
                  "bg-transparent border-l border-b border-neutral-600",
                  cellClassName
                )}
                onClick={() => setClickedCell([rowIdx, colIdx])}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  whileHover={{
                    opacity: [0, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "backOut",
                  }}
                  animate={controls}
                  className="bg-[rgba(14,165,233,0.3)] h-12 w-12"
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
