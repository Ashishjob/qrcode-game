"use client";
import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import SymbolButtons from "./components/SymbolButtons";

const Home = () => {
  const [activeSymbols, setActiveSymbols] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const handleSymbolClick = (symbol: string) => {
    setActiveSymbols((prev) =>
      prev.includes(symbol) ? prev : [...prev, symbol]
    );
  };

  const handleDoneClick = () => {
    setIsDone(true);
    console.log("Grid finalized!");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <GameBoard activeSymbols={activeSymbols} isDone={isDone} />
      <SymbolButtons
        onSymbolClick={handleSymbolClick}
        onDoneClick={handleDoneClick}
      />
    </div>
  );
};

export default Home;
