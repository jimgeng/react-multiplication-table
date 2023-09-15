import React from 'react'

// Cell component props
//  * Could be refactored into two separate cell components with
//    separate required props instead of optional props, but idk
//    if theres "inheritance" within functional react.
interface CellProps { 
  children?: false | number | string,
  header?: boolean,
  row?: number,
  col?: number,
  clickFn?: (row: number, col: number) => void,
}

// Cell component which represents one of the cells on the table.
export default function Cell({ children, header = false, row, col, clickFn }: CellProps) {
  function handleClick() {
    if (!header && clickFn !== undefined && row !== undefined && col !== undefined) {
      clickFn(row, col);
    }
  }
  
  return (
    <div onClick={handleClick} className={`flex justify-center items-center h-12 w-12 flex-shrink-0 bg-gray-200 dark:bg-gray-800  transition-colors ${header ? "" : "dark:hover:bg-gray-900 hover:bg-slate-300 cursor-pointer"}`}>
      <p className={`${header ? "text-emerald-500" : "dark:text-gray-200" } text-xl font-bold`}>{children}</p>
    </div>
  );
}
