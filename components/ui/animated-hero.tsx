import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { GradientButton } from '@/components/ui/gradient-button'

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(() => ['AI-Powered', 'Automated', 'Intelligent', 'Efficient', 'Scalable'], [])

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
    <div className="container mx-auto relative z-10 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-8 py-16 lg:py-24 relative px-8 md:px-16 mt-20">
          {/* Radial black dimmer behind the box */}
          <div className="absolute -inset-20 bg-black/40 rounded-[50%] blur-xl -z-20"></div>
          
          {/* Black box with white stroke */}
          <div className="absolute inset-0 bg-black/60 rounded-3xl backdrop-blur-sm -z-10 border border-white/10"></div>
          <div className="mb-8">
            <div className="w-[300px] h-auto">
              <Image 
                src="/998ee6ddf6e431d1de4cc3be0042e279_1200_80.webp" 
                alt="SaaSSystems.io" 
                width={1200} 
                height={80} 
                className="rounded-md w-full h-auto"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-regular max-w-2xl text-center text-5xl tracking-tighter md:text-7xl">
              <span className="relative flex w-full justify-center overflow-hidden text-center md:mb-1 h-[60px] md:h-[80px]">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-white font-montserrat z-10 text-3xl md:text-5xl"
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
              <span className="text-blue-400 font-montserrat mt-4 md:mt-6 block">A.I. First Micro SaaS</span>
            </h1>

            <p className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-gray-300 md:mt-8 md:text-xl font-montserrat">
              Launch your AI-powered Micro SaaS business with our cutting-edge platform. 
              Leverage artificial intelligence to automate workflows, gain insights, 
              and deliver exceptional value to your customers with minimal overhead.
            </p>
          </div>
          <div className="flex flex-row gap-6">
            <Link href="/auth">
              <GradientButton className="gap-2 group">
                Start Building 
                <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </GradientButton>
            </Link>
            <GradientButton variant="variant" className="gap-2 group">
              Learn More
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </GradientButton>
          </div>
        </div>
      </div>
  )
}

export { Hero }
