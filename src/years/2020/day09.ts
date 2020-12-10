import { findTwo } from "util/collections";
import { Day } from "util/Day";
import day9data, { test1data } from "./data/day09";

const makeData = (data: string) => {
  return data.split("\n").map((row) => Number(row));
};

const findWeakNumber = (numbers: number[], preamble: number): number => {
  const weak = numbers.slice(preamble + 1).find((n, index) => {
    const slice = numbers.slice(index);
    return findTwo(slice, n) === -1;
  });

  return weak || -1;
};

const findSumsTo = (numbers: number[], target: number) => {
  let start = 0;
  let end = 1;
  while (true) {
    const slice = numbers.slice(start, end);
    const num = slice.reduce((acc, val) => acc + val);
    if (num === target) {
      return Math.min(...slice) + Math.max(...slice);
    }
    if (num < target) {
      end += 1;
    }
    if (num > target) {
      start += 1;
    }
    if (start === numbers.length || end === numbers.length) {
      throw new Error("Ran out of numbers!");
    }
  }
};

const findWeakRange = (numbers: number[], preamble: number): number => {
  const weak = findWeakNumber(numbers, preamble);

  return findSumsTo(numbers, weak);
};

const day9: Day<number[]> = {
  title: "Encoding Error",
  description: `
  With your neighbor happily enjoying their video game, you turn your attention to 
  an open data port on the little screen in the seat in front of you.
`,
  data: day9data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `
* Find the first number in the list (after the preamble) which is not the sum of two of the 25 numbers before it
`,
      func: (data) => findWeakNumber(data, 25),
      tests: [
        {
          data: test1data,
          func: (data) => findWeakNumber(data as number[], 5),
          result: 127,
        },
      ],
    },
    {
      title: "Part 2",
      description: `
* find a contiguous set of at least two numbers in your list which sum to the invalid number from step 1
`,
      func: (data) => findWeakRange(data, 25),
      tests: [
        {
          data: test1data,
          func: (data) => findWeakRange(data as number[], 5),
          result: 15 + 47,
        },
      ],
    },
  ],
};

export default day9;
