import React from 'react'

interface CellProps { 
  children?: false | number | string,
  header?: boolean,
  row?: number,
  col?: number,
  clickFn?: (row: number, col: number) => void,
}

export default function Cell({ children, header = false, row, col, clickFn }: CellProps) {
  function handleClick() {
    if (!header && clickFn !== undefined && row !== undefined && col !== undefined) {
      clickFn(row, col);
    }
  }
  
  return (
    <div onClick={handleClick} className={`flex justify-center items-center h-12 w-12 flex-shrink-0 bg-gray-300 hover:bg-slate-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors cursor-pointer`}>
      <p className={`${header ? "text-emerald-500" : "dark:text-gray-200" } lg:text-xl font-bold`}>{children}</p>
    </div>
  );
}
