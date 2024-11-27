const symbols = ["heart", "flower", "star", "car", "triangle", "circle"];

const SymbolButtons = ({
  onSymbolClick,
  onDoneClick,
}: {
  onSymbolClick: (symbol: string) => void;
  onDoneClick: () => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {symbols.map((symbol) => (
        <button
          key={symbol}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700"
          onClick={() => onSymbolClick(symbol)}
        >
          {symbol}
        </button>
      ))}
      <button
        className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-700"
        onClick={onDoneClick}
      >
        I&apos;m Done
      </button>
    </div>
  );
};

export default SymbolButtons;
