'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BackgroundCellsProps {
  children?: React.ReactNode
  className?: string
}

export const BackgroundCells = ({ children, className }: BackgroundCellsProps) => {
  return (
    <div className={cn('relative flex h-screen justify-center overflow-hidden', className)}>
      <BackgroundCellCore />
      {children && <div className="pointer-events-auto relative z-50 mt-0">{children}</div>}
    </div>
  )
}

const BackgroundCellCore = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const maskRef = useRef<HTMLDivElement>(null)
  const size = 1200

  useEffect(() => {
    let rafId: number | null = null
    let lastX = window.innerWidth / 2
    let lastY = window.innerHeight / 2

    const updatePosition = () => {
      if (maskRef.current) {
        maskRef.current.style.webkitMaskPosition = `${lastX - size / 2}px ${lastY - size / 2}px`
        maskRef.current.style.maskPosition = `${lastX - size / 2}px ${lastY - size / 2}px`
        setMousePosition({ x: lastX, y: lastY })
      }
      rafId = null
    }

    const handleMouseMove = (event: MouseEvent) => {
      lastX = event.clientX
      lastY = event.clientY

      if (rafId === null) {
        rafId = requestAnimationFrame(updatePosition)
      }
    }

    updatePosition()
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 h-full">
      <div className="absolute inset-0 h-screen w-screen overflow-hidden">
        <div className="pointer-events-none absolute -bottom-2 z-40 h-full w-full bg-slate-950 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        <div className="pointer-events-none absolute bottom-0 z-[45] h-1/3 w-full bg-gradient-to-t from-black via-black/80 to-transparent" />

        {/* Only show the pattern under the cursor */}
        <div
          ref={maskRef}
          className="absolute inset-0 z-20 bg-transparent"
          style={{
            maskImage: `radial-gradient(${size / 2}px circle at center, white, transparent)`,
            WebkitMaskImage: `radial-gradient(${size / 2}px circle at center, white, transparent)`,
            WebkitMaskPosition: `${mousePosition.x - size / 2}px ${mousePosition.y - size / 2}px`,
            maskPosition: `${mousePosition.x - size / 2}px ${mousePosition.y - size / 2}px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
            pointerEvents: 'none',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            willChange: 'mask-position, -webkit-mask-position',
          }}
        >
          <Pattern cellClassName="border-blue-600 relative z-[100]" />
        </div>
      </div>
    </div>
  )
}

interface PatternProps {
  className?: string
  cellClassName?: string
}

const Cell = ({ rowIdx, colIdx, clickedCell }: { rowIdx: number; colIdx: number; clickedCell: [number, number] | null }) => {
  const cellRef = React.useRef([rowIdx, colIdx])
  const controls = useAnimation()

  useEffect(() => {
    if (clickedCell) {
      const distance = Math.sqrt(
        Math.pow(clickedCell[0] - cellRef.current[0], 2) +
          Math.pow(clickedCell[1] - cellRef.current[1], 2)
      )
      controls.start({
        opacity: [0, 1 - distance * 0.1, 0],
        transition: { duration: distance * 0.2 },
      })
    }
  }, [clickedCell, controls])

  return (
    <div
      className="border-b border-l border-neutral-600 bg-transparent relative z-[100] border-blue-600"
      onClick={() => {}}
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
          ease: 'backOut',
        }}
        animate={controls}
        className="h-12 w-12 bg-[rgba(14,165,233,0.3)]"
      />
    </div>
  )
}

const Pattern = ({ className, cellClassName }: PatternProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [clickedCell, setClickedCell] = useState<[number, number] | null>(null)

  useEffect(() => {
    // Only access window in the browser
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  // Default to a small grid during server-side rendering
  const x = new Array(Math.ceil(dimensions.width / 24) || 10).fill(0)
  const y = new Array(Math.ceil(dimensions.height / 24) || 10).fill(0)
  const matrix = x.map((_, i) => y.map((_, j) => [i, j]))

  const handleCellClick = (rowIdx: number, colIdx: number) => {
    setClickedCell([rowIdx, colIdx])
  }

  return (
    <div className={cn('z-80 relative flex flex-row', className)}>
      {matrix.map((row, rowIdx) => (
        <div key={`matrix-row-${rowIdx}`} className="z-80 relative flex flex-col border-b">
          {row.map((column, colIdx) => (
            <div 
              key={`matrix-col-${colIdx}`}
              className={cn('border-b border-l border-neutral-600 bg-transparent', cellClassName)}
              onClick={() => handleCellClick(rowIdx, colIdx)}
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
                  ease: 'backOut',
                }}
                className="h-12 w-12 bg-[rgba(14,165,233,0.3)]"
              />
            </div>
          ))}

          </div>
        </div>
      )}
    </div>
  )
}
