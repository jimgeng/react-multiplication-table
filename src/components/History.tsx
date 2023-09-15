// History panel component
export default function History({ history }: { history: Set<string> }) {
  let historyArray = [...history];

  // This sort works by parsing the two integers apart of the equation string
  // and returns the comparison of those integers.
  historyArray.sort((a, b) => {
    const aSplit = a.split(" ");
    const bSplit = b.split(" ");
    const aFirst = parseInt(aSplit[0]);
    const bFirst = parseInt(bSplit[0]);
    const aSecond = parseInt(aSplit[2]);
    const bSecond = parseInt(bSplit[2]);
    if (aFirst > bFirst) {
      return 1;
    } else if (aFirst < bFirst) {
      return -1;
    } else {
      if (aSecond > bSecond) {
        return 1;
      } else {
        return -1;
      }
    }
  });
  
  return (
    <ul className="mt-4 overflow-y-auto lg:h-full">
      {historyArray.map((operation) => {
        return (
          <li key={operation}>
            <p className="font-xl dark:text-gray-100">{operation}</p>
          </li>
        );
      })}
    </ul>
  );
}
