"use client";

import { SignIn, SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { BorderBeam } from '@/components/ui/border-beam';

export default function AuthPage() {
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  
  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto relative z-10 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center gap-8 py-12 px-8 md:px-16 relative w-full max-w-md mx-auto">
          {/* Radial black dimmer behind the box */}
          <div className="absolute -inset-20 bg-black/40 rounded-[50%] blur-xl -z-20"></div>
          
          {/* Black box with white stroke and border beam */}
          <div className="absolute inset-0 bg-black/60 rounded-3xl backdrop-blur-sm -z-10 border border-white/10 overflow-hidden">
            <BorderBeam 
              size={100} 
              colorFrom="#ffffff" 
              colorTo="#3b82f6" 
              duration={8}
              initialOffset={25}
            />
            <BorderBeam 
              size={100} 
              colorFrom="#3b82f6" 
              colorTo="#ffffff" 
              duration={8}
              reverse={true}
              initialOffset={75}
            />
          </div>
          
          <div className="w-full flex justify-between items-center mb-4">
            <Link href="/" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
              <ArrowLeft size={16} />
              <span>Back</span>
            </Link>
            <div className="flex gap-4">
              <button 
                onClick={() => setMode('signIn')} 
                className={`text-sm ${mode === 'signIn' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
              >
                Sign In
              </button>
              <span className="text-gray-500">|</span>
              <button 
                onClick={() => setMode('signUp')} 
                className={`text-sm ${mode === 'signUp' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
              >
                Sign Up
              </button>
            </div>
          </div>
          
          <div className="w-full">
            {mode === 'signIn' ? (
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none",
                    headerTitle: "text-white",
                    headerSubtitle: "text-gray-300",
                    formButtonPrimary: "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600",
                    formFieldLabel: "text-gray-300",
                    formFieldInput: "bg-slate-800/50 border border-slate-700 text-white",
                    footerActionLink: "text-blue-400 hover:text-blue-300",
                    identityPreview: "bg-slate-800/50 border border-slate-700",
                    identityPreviewText: "text-white",
                    identityPreviewEditButton: "text-blue-400 hover:text-blue-300",
                  }
                }}
                routing="hash"
              />
            ) : (
              <SignUp 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none",
                    headerTitle: "text-white",
                    headerSubtitle: "text-gray-300",
                    formButtonPrimary: "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600",
                    formFieldLabel: "text-gray-300",
                    formFieldInput: "bg-slate-800/50 border border-slate-700 text-white",
                    footerActionLink: "text-blue-400 hover:text-blue-300",
                    identityPreview: "bg-slate-800/50 border border-slate-700",
                    identityPreviewText: "text-white",
                    identityPreviewEditButton: "text-blue-400 hover:text-blue-300",
                  }
                }}
                routing="hash"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
