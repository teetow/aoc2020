import { Day } from "util/Day";

const day15data = `0,20,7,16,1,18,15`;

type DataType = number;

const makeData = (data: string): DataType[] => {
  return data.split(",").map((num) => Number(num));
};

const part1 = (startingNumbers: DataType[], stopAt: number): number => {
  const table = Array<Array<number>>();

  const addNum = (num: number, index: number) => {
    if (table[num] === undefined) table[num] = Array<number>();
    table[num].push(index);
  };

  startingNumbers.forEach(addNum);

  let lastNum = startingNumbers[startingNumbers.length - 1];
  for (let i = startingNumbers.length; i <= stopAt - 1; i += 1) {
    const entry = table[lastNum];

    if (entry && entry.length >= 2) {
      lastNum = entry[entry.length - 1] - entry[entry.length - 2];
    } else {
      lastNum = 0;
    }
    addNum(lastNum, i);
  }
  return lastNum;
};

const day14: Day<number[]> = {
  title: "Rambunctious Recitation",
  description: `
  While you wait for your flight, you decide to check in with the Elves back at the North Pole. 
  
  They're playing a memory game and are ever so excited to explain the rules!
  `,
  data: day15data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `
* **what will be the 2020th number spoken?**
`,
      func: (data) => Number(part1(data, 2020)),

      tests: [
        { data: "0,3,6", result: 436 },
        { data: "1,3,2", result: 1 },
        { data: "2,1,3", result: 10 },
        { data: "1,2,3", result: 27 },
        { data: "2,3,1", result: 78 },
        { data: "3,2,1", result: 438 },
        { data: "3,1,2", result: 1836 },
      ],
    },
    {
      title: "Part 2",
      description: `
* **what will be the 30,000,000th number spoken?**
    `,
      func: (data) => Number(part1(data, 30 * 1000 * 1000)),
    },
  ],
};

export default day14;
