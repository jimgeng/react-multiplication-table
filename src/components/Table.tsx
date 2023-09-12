import { ReactElement, useEffect, useState } from "react";

interface TableProps {
  size: number;
  addToOperationHistory: (operation: string) => void;
}

function makeHeader(size: number) {
  let table: ReactElement[] = [];
  table[0] = (
    <th className="border-2 text-emerald-500 dark:border-gray-700">
      <p className="lg:text-xl ">&times;</p>
    </th>
  );
  for (let i = 1; i <= size; i++) {
    table[i] = (
      <th className="border-2 text-emerald-500 dark:border-gray-700">
        <p className="lg:text-xl ">{i}</p>
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
            className="border-2 dark:border-gray-700"
            key={(i - 1) * 8 + (j - 1)}
          >
            <div
              className="flex h-full w-full items-center justify-center text-center transition-all hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => {
                setActiveSquare([i, j]);
                addToOperationHistory(`${i} \u00D7 ${j} = ${i * j}`);
              }}
            >
              <p className=" dark:text-gray-100 lg:text-xl">
                {i == activeSquare[0] && j == activeSquare[1] && i * j}
              </p>
            </div>
          </td>
        );
      }
    }
    return table;
  }

  return (
    <table className="h-min w-full table-fixed overflow-auto lg:h-full">
      <tr className="">{makeHeader(size)}</tr>
      {makeTable(size).map((row, rowIndex) => {
        return (
          <tr className="">
            <td className="border-2 dark:border-gray-700">
              <p className="text-center font-bold text-emerald-500 lg:text-xl">
                {rowIndex + 1}
              </p>
            </td>
            {row}
          </tr>
        );
      })}
    </table>
  );
}
