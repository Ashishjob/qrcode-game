"use client";
import React, { useEffect, useState } from "react";

type Cell = {
  id: number;
  type: string;
  active: boolean;
};

const QR_MATRIX = [
    [1,1,1,1,1,1,1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,1,0,1,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,1,0,1,0,1,0,0,1,1,1,0,1,0,0,0,1,1,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,0,0,0,1,0,1,1,0,0,0,1,0,1,0,0,1,1,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,1,1,1,0,1,0,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,0,1,1,1,0,1,0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,1,0,1,0,0,0,1,1,1,1,0,0,0,1,0,1,1,1,1,0,1,1,0,1,0],
    [0,1,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,1,1],
    [1,0,1,1,0,1,0,1,1,1,1,0,0,1,0,1,1,1,0,0,1,1,1,1,0,1,0,1,1,0,0,0,1],
    [0,1,0,0,0,0,1,1,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,1,1,0,1,0,0,1,1,0,0],
    [0,1,1,0,1,0,1,1,0,1,0,0,0,1,0,1,1,1,0,0,0,1,0,1,1,0,1,1,0,0,1,0,1],
    [1,0,0,1,0,0,0,1,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,1,0,0,0,1,0,1,0,1,0],
    [0,1,0,1,1,1,0,0,1,0,0,1,0,1,1,1,1,1,1,0,1,0,0,1,0,1,1,0,1,0,1,1,1],
    [1,0,1,0,0,0,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,1,1,0,0,1,0,1,0,0,0],
    [0,1,0,1,1,1,0,0,1,0,1,0,0,1,1,1,1,1,1,0,0,1,0,1,0,1,1,0,1,0,1,1,1],
    [0,1,1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,1,1,0,0,1,0,1,0],
    [1,0,1,1,0,1,1,1,1,0,0,1,0,1,1,1,1,1,1,0,1,0,0,1,1,1,1,0,1,1,0,0,1],
    [0,1,0,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,1,0,0,1,1,0],
    [1,0,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,1,0,0,0,1],
    [0,1,0,0,0,0,1,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,1,1,0,0,1,1,0,0],
    [0,1,1,0,1,0,1,1,0,0,0,1,0,1,1,1,1,1,1,0,1,0,0,1,1,0,1,1,0,0,1,0,1],
    [1,0,0,1,0,0,0,1,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1,1,0,0,0,1,0,1,0,1,0],
    [0,1,0,1,1,1,0,0,1,0,0,1,0,1,1,1,1,1,1,0,1,0,0,1,0,1,1,0,1,0,1,1,1],
    [1,0,1,0,0,0,1,1,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1,1,1,0,0,1,0,1,0,0,0],
    [0,1,0,1,1,1,0,0,1,0,0,1,0,1,1,1,1,1,1,0,1,0,0,1,0,1,1,0,1,0,1,1,1],
    [0,1,1,0,0,0,0,0,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,1,1,0,0,1,0,1,0],
    [1,0,1,1,0,1,1,1,1,0,0,1,0,1,1,1,1,1,1,0,1,0,0,1,1,1,1,0,1,1,0,0,1],
    [0,1,0,0,1,0,0,0,0,1,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,1,0,0,1,1,0],
    [1,0,1,1,0,1,0,1,1,0,0,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,1,0,0,0,1],
    [0,1,0,0,0,0,1,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,1,1,0,0,1,1,0,0],
    [1,1,1,1,1,1,1,0,1,0,0,1,0,1,1,1,1,1,1,0,1,0,0,1,0,0,1,1,1,1,1,1,1]
  ];

const correctSymbols = ["star", "triangle", "heart"];
const otherSymbols = ["flower", "car", "circle"];
const GRID_SIZE = QR_MATRIX.length;

const generateGrid = (): Cell[] => {
    const correctSymbols = ["star", "triangle", "heart"];
    const otherSymbols = ["flower", "car", "circle"];
    const cells: Cell[] = [];
    
    QR_MATRIX.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          cells.push({
            id: y * GRID_SIZE + x,
            type: correctSymbols[Math.floor(Math.random() * correctSymbols.length)],
            active: false,
          });
        } else {
          cells.push({
            id: y * GRID_SIZE + x,
            type: otherSymbols[Math.floor(Math.random() * otherSymbols.length)],
            active: false,
          });
        }
      });
    });
    return cells;
  };

  const GameBoard = ({
    activeSymbols,
    isDone,
  }: {
    activeSymbols: string[];
    isDone: boolean;
  }) => {
    const [grid, setGrid] = useState<Cell[] | null>(null);
  
    useEffect(() => {
      const cells: Cell[] = [];
      QR_MATRIX.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell === 1) {
            cells.push({
              id: y * GRID_SIZE + x,
              type: correctSymbols[Math.floor(Math.random() * correctSymbols.length)],
              active: false,
            });
          } else {
            cells.push({
              id: y * GRID_SIZE + x,
              type: otherSymbols[Math.floor(Math.random() * otherSymbols.length)],
              active: false,
            });
          }
        });
      });
      setGrid(cells);
    }, []);
  
    if (!grid) return <div>Loading...</div>;
  
    return (
      <div
        className="grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {grid.map((cell) => {
          const isCellActive = activeSymbols.includes(cell.type);
          const cellStyle = isCellActive || cell.active 
            ? "bg-green-500" 
            : cell.type 
              ? "bg-black" 
              : "bg-white";
  
          return (
            <div
              key={cell.id}
              className={`w-6 h-6 flex items-center justify-center border border-green-500 ${cellStyle}`}
            >
              {!isDone && !cell.active && !isCellActive && cell.type ? getEmoji(cell.type) : null}
            </div>
          );
        })}
      </div>
    );
  };

const getEmoji = (type: string) => {
  switch (type) {
    case "heart":
      return "❤️";
    case "flower":
      return "🌸";
    case "star":
      return "⭐";
    case "car":
      return "🚗";
    case "triangle":
      return "🔺";
    case "circle":
      return "⚪";
    default:
      return "❓";
  }
};

export default GameBoard;