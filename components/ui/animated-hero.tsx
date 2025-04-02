import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MoveRight, Image as ImageIcon, Youtube, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { GradientButton } from '@/components/ui/gradient-button'

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => ['AI-Powered', 'Creative', 'Professional', 'Stunning', 'Customizable'],
    []
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <div className="container relative z-10 mx-auto flex items-center justify-center">
      <div className="relative mt-20 flex flex-col items-center justify-center gap-8 px-8 py-16 md:px-16 lg:py-24">
        {/* Radial black dimmer behind the box */}
        <div className="absolute -inset-20 -z-20 rounded-[50%] bg-black/40 blur-xl"></div>

        {/* Black box with white stroke */}
        <div className="absolute inset-0 -z-10 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-sm"></div>

        <div className="flex flex-col gap-4">
          <h1 className="font-regular max-w-2xl text-center text-5xl tracking-tighter md:text-7xl">
            <span className="relative flex h-[60px] w-full justify-center overflow-hidden text-center md:mb-1 md:h-[80px]">
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute z-10 font-montserrat text-3xl font-semibold text-white md:text-5xl"
                  style={{ textShadow: '0 0 10px rgba(0,0,0,0.5)' }}
                  initial={{ opacity: 0, y: '-100px' }}
                  transition={{ type: 'spring', stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? {
                          y: 0,
                          opacity: 1,
                        }
                      : {
                          y: titleNumber > index ? '-150px' : '150px',
                          opacity: 0,
                        }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
            <span className="mt-4 block font-montserrat text-blue-400 md:mt-6">
              Photo Transformations
            </span>
          </h1>

          <p className="max-w-2xl text-center font-montserrat text-lg leading-relaxed tracking-tight text-gray-300 md:mt-8 md:text-xl">
            Transform your ordinary photos into extraordinary visuals with our AI-powered tools.
            Create eye-catching YouTube thumbnails, hilarious memes, and professional-quality images
            with just a few clicks.
          </p>
        </div>

        <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <Youtube className="mb-2 h-8 w-8 text-red-500" />
            <h3 className="text-lg font-semibold text-white">YouTube Thumbnails</h3>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <MessageSquare className="mb-2 h-8 w-8 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">Meme Generator</h3>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <ImageIcon className="mb-2 h-8 w-8 text-green-500" />
            <h3 className="text-lg font-semibold text-white">Professional Images</h3>
          </div>
        </div>

        <div className="flex flex-row gap-6">
          <Link href="/dashboard">
            <GradientButton className="group gap-2">
              Get Started
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </GradientButton>
          </Link>
          <Link href="/pricing">
            <GradientButton variant="variant" className="group gap-2">
              View Pricing
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </GradientButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

export { Hero }
