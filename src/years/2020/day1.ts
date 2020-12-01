import { Day, Test } from "util/Day";
import day1data from "./data/day1";

const testDataA: Array<Test<number[]>> = [
  { data: [1721, 979, 366, 299, 675, 1456], result: 1721 * 299 },
];

const testDataB: Array<Test<number[]>> = [
  { data: [1721, 979, 366, 299, 675, 1456], result: 0 },
];

const run = (data: number[]): number => {
  return 0;
};

const runB = (data: number[]): number => {
  return -1;
};

const day1: Day<number[]> = {
  title: "Day 1",
  data: day1data,
  parts: [
    {
      title: "Part 1",
      func: (data: number[]): string => run(data).toString(),
      tests: testDataA,
    },
    {
      title: "Part 2",
      func: (data: number[]): string => runB(data).toString(),
      tests: testDataB,
    },
  ],
};

export default day1;
