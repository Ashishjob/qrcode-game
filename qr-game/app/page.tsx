"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isHacked, setIsHacked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) {
          clearInterval(interval);
          setTimeout(() => {
            setIsHacked(true);
            setTimeout(() => router.push('/terminal'), 1000);
          }, 500);
          return 99;
        }
        return prev + 1;
      });
    }, 50);
  
    return () => clearInterval(interval);
  }, [router]);

  if (isHacked) {
    return <div className="fixed inset-0 bg-black w-full h-full z-50" />;
  }

  return (
    <div className="h-screen bg-cover bg-center flex flex-col items-center justify-center relative" style={{ backgroundImage: 'url(/qrcode-background.svg)' }}>
      <h1 className="text-4xl font-mono mb-20 [image-rendering:pixelated] text-black">
        WAIT TO CLAIM YOUR GIFT!
      </h1>
      
      <div className="relative w-full max-w-4xl flex items-center">
        <div className="absolute -left-16">
          <img src="/pixelated-heart.svg" alt="Pixelated Heart" className="w-32 h-32 [image-rendering:pixelated]" />
        </div>
        <div className="w-full bg-white rounded-xl h-12 shadow-[3px_3px_0_rgba(0,0,0,0.2)] [image-rendering:pixelated]">
          <div 
            className="h-full rounded-lg bg-pink-400 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="ml-4 font-mono text-3xl text-black">{progress}%</span>
      </div>
      
      <div className="absolute bottom-32 left-20">
        <div className="w-8 h-8 bg-green-700 [image-rendering:pixelated]" />
      </div>
      <div className="absolute bottom-32 right-20">
        <div className="w-8 h-8 bg-green-700 [image-rendering:pixelated]" />
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div 
          key={i} 
          className="absolute bottom-32"
          style={{ right: `${64 + i * 16}px` }}
        >
       </div>
      ))}
    </div>
  );
}