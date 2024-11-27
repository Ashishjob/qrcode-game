import React, { useState } from "react";
import { Terminal, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

const symbols = ["heart", "flower", "star", "car", "triangle", "circle"];

const SymbolButtons = ({
  onSymbolClick,
  onDoneClick,
}: {
  onSymbolClick: (symbol: string) => void;
  onDoneClick: () => void;
}) => {
  const [showRetry, setShowRetry] = useState(false);
  const router = useRouter();

  const handleDone = () => {
    onDoneClick();
    setShowRetry(true);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-wrap gap-3 mt-4 p-4 bg-black/90 rounded-lg border border-green-500/50 shadow-lg shadow-green-500/20">
      {!showRetry ? (
        <>
          {symbols.map((symbol) => (
            <button
              key={symbol}
              className="px-4 py-2 bg-black text-green-500 border border-green-500 rounded 
                         font-mono uppercase tracking-wider hover:bg-green-500/10 
                         hover:shadow-lg hover:shadow-green-500/20 transition-all
                         focus:outline-none focus:ring-2 focus:ring-green-500/50"
              onClick={() => onSymbolClick(symbol)}
            >
              <div className="flex items-center gap-2">
                <Terminal size={16} />
                {symbol}
              </div>
            </button>
          ))}
          <button
            className="px-4 py-2 bg-black text-red-500 border border-red-500 rounded
                       font-mono uppercase tracking-wider hover:bg-red-500/10
                       hover:shadow-lg hover:shadow-red-500/20 transition-all
                       focus:outline-none focus:ring-2 focus:ring-red-500/50"
            onClick={handleDone}
          >
            <div className="flex items-center gap-2">
              <Terminal size={16} />
              EXECUTE
            </div>
          </button>
        </>
      ) : (
        <button
          className="px-4 py-2 bg-black text-purple-500 border border-purple-500 rounded
             font-mono uppercase tracking-wider hover:bg-purple-500/10
             hover:shadow-lg hover:shadow-purple-500/20 transition-all
             focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          onClick={handleRetry}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm opacity-80">QR didn't work?</span>
            <div className="flex items-center gap-2">
              <RefreshCw size={16} />
              RETRY
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default SymbolButtons;
