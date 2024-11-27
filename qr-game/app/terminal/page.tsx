"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TerminalScreen = () => {
  const [text, setText] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const router = useRouter();
  
  const terminalText = [
    'SYSTEM COMPROMISED...',
    'INITIATING OVERRIDE SEQUENCE...',
    'ACCESSING MAINFRAME...',
    'DECRYPTING DATA...',
    'REVEALING QR PUZZLE...'
  ];

  useEffect(() => {
    let currentLineIdx = 0;
    let currentCharIdx = 0;
    const currentLine = new Array(terminalText.length).fill('');

    const typingInterval = setInterval(() => {
      if (currentLineIdx < terminalText.length) {
        if (currentCharIdx < terminalText[currentLineIdx].length) {
          currentLine[currentLineIdx] += terminalText[currentLineIdx][currentCharIdx];
          setText([...currentLine]);
          currentCharIdx++;
        } else {
          currentLineIdx++;
          currentCharIdx = 0;
        }
      } else {
        clearInterval(typingInterval);
        setTimeout(() => router.push('/game'), 2000);
      }
    }, 50);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen p-8 font-mono">
      <div className="text-green-500 text-lg">
        {text.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
        {showCursor && <span className="animate-pulse">▊</span>}
      </div>
    </div>
  );
};

export default TerminalScreen;