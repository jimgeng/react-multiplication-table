export default function History({ history }: { history: Set<string> }) {
  let historyArray = [...history];
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
    <ul className="overflow-y-scroll">
      {historyArray.map((operation) => {
        return (
          <li>
            <p className="font-lg dark:text-gray-100">{operation}</p>
          </li>
        );
      })}
    </ul>
  );
}
