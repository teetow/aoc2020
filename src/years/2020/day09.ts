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
  title: "Handheld Halting",
  description: `
  While you consider checking the in-flight menu for one of those drinks 
  that come with a little umbrella, you are interrupted by the kid sitting 
  next to you. Their handheld game console won't turn on!
`,
  data: day9data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `
* Find the value in the accumulator when the console goes into an endless loop
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
* Fix the program so that it terminates normally
* Change exactly one jmp (to nop) or nop (to jmp)
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
