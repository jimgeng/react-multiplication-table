import { ReactElement, useEffect, useState } from "react";

interface TableProps {
  size: number;
  addToOperationHistory: (operation: string) => void;
}

function makeHeader(size: number) {
  let table: ReactElement[] = [];
  table[0] = (
    <th className="flex-1 border text-center font-bold text-emerald-600">
      <p className="relative top-1/2 -translate-y-1/2 ">&times;</p>
    </th>
  );
  for (let i = 1; i <= size; i++) {
    table[i] = (
      <th className="flex-1 border text-center font-bold text-emerald-600">
        <p className="relative top-1/2 -translate-y-1/2">{i}</p>
      </th>
    );
  }

  return table;
}

export default function Table({ size, addToOperationHistory }: TableProps) {
  const [activeSquare, setActiveSquare] = useState([0, 0]);

  function makeTable(size: number) {
    let table: ReactElement[][] = [];
    for (let i = 1; i <= size; i++) {
      table[i - 1] = [];
      for (let j = 1; j <= size; j++) {
        table[i - 1][j - 1] = (
          <td
            className="flex-1 border text-center font-bold transition-all dark:text-gray-100 dark:hover:bg-gray-700"
            key={(i - 1) * 8 + (j - 1)}
          >
            <button
              className="inline-table h-full w-full"
              onClick={() => {
                setActiveSquare([i, j]);
                addToOperationHistory(`${i} \u00D7 ${j} = ${i * j}`);
              }}
            >
              {i == activeSquare[0] && j == activeSquare[1] && i * j}
            </button>
          </td>
        );
      }
    }
    return table;
  }

  return (
    <div className="lg:h-full lg:w-1/2">
      <table className="flex h-full w-full table-fixed flex-col border">
        <tr className="flex flex-1">{makeHeader(size)}</tr>
        {makeTable(size).map((row, rowIndex) => {
          return (
            <tr className="flex flex-1">
              <td className="flex-1 border text-center font-bold text-emerald-600">
                <p className="relative top-1/2 -translate-y-1/2">
                  {rowIndex + 1}
                </p>
              </td>
              {row}
            </tr>
          );
        })}
      </table>
    </div>
  );
}
