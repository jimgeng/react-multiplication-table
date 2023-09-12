import { ReactElement, useEffect, useRef, useState } from "react";
import Cell from "./Cell";
import "./table.css";

interface TableProps {
  size: number;
  addToOperationHistory: (operation: string) => void;
}

export default function Table({ size, addToOperationHistory }: TableProps) {
  const [activeSquare, setActiveSquare] = useState([0, 0]);
  const horizontalHeaderRef = useRef<HTMLDivElement | null>(null);
  const verticalHeaderRef = useRef<HTMLDivElement | null>(null);

  function squareClicked(row: number, col: number) {
    setActiveSquare([row, col])
    addToOperationHistory(`${row} \u00D7 ${col} = ${row * col}`)
  }

  function makeHeader(size: number) {
    let table: ReactElement[] = [];
    for (let i = 1; i <= size; i++) {
      table[i] = <Cell header>{i}</Cell>;
    }
    return table;
  }

  function makeTableRow(size: number, row: number) {
    let tableRow: ReactElement[] = [];
    for (let i = 1; i <= size; i++) {
      tableRow.push(<Cell row={row} col={i} clickFn={squareClicked}>{row === activeSquare[0] && i === activeSquare[1] && row * i}</Cell>);
    }
    return tableRow;
  }

  function makeTable(size: number) {
    let table: ReactElement[] = [];
    for (let i = 1; i <= size; i++) {
      table.push(
        <div key={i} className="flex gap-1">
          {makeTableRow(size, i)}
        </div>
      );
    }
    return table;
  }

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const table = e.target as HTMLDivElement;
    if (horizontalHeaderRef.current !== null) {
      horizontalHeaderRef.current.scrollLeft = table.scrollLeft;
    }
    if (verticalHeaderRef.current !== null) {
      verticalHeaderRef.current.scrollTop = table.scrollTop;
    }
  }

  return (
    <div className="my-grid h-1/2 w-full lg:h-full lg:w-1/2">
      <div className="">
        <Cell header>×</Cell>
      </div>
      <div
        ref={horizontalHeaderRef}
        className="table-header flex gap-1 overflow-hidden"
      >
        {makeHeader(size)}
      </div>
      <div
        ref={verticalHeaderRef}
        className="table-header-vert flex flex-col gap-1 overflow-hidden"
      >
        {makeHeader(size)}
      </div>
      <div
        className="table-body flex max-w-full flex-col gap-1 overflow-auto"
        onScroll={handleScroll}
      >
        {makeTable(size)}
      </div>
    </div>
  );
}
