import count from "util/count";
import { Day, Test } from "util/Day";
import day2data from "./data/day2";

/*
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
*/

type PasswordRecord = {
  lo: number;
  hi: number;
  char: string;
  password: string;
};

const testDataA: Array<Test<PasswordRecord[], number>> = [
  {
    data: [
      { lo: 1, hi: 3, char: "a", password: "abcde" },
      { lo: 1, hi: 3, char: "b", password: "cdefg" },
      { lo: 2, hi: 9, char: "c", password: "ccccccccc" },
    ],
    result: 2,
  },
];

const checkPassword = (record: PasswordRecord): boolean => {
  const charCount = count(record.password, record.char);
  return Number(record.lo) <= charCount && charCount <= Number(record.hi);
};

const run = (data: PasswordRecord[]): number => {
  let hits = 0;
  data.forEach((record) => {
    hits += checkPassword(record) ? 1 : 0;
  });
  return hits;
};

const runB = (data: PasswordRecord[]): number => {
  return -1;
};

const day1: Day<PasswordRecord[]> = {
  title: "Day 1",
  data: day2data as PasswordRecord[],
  parts: [
    {
      title: "Part 1",
      func: run,
      tests: testDataA,
    },
    {
      title: "Part 2",
      func: run,
      tests: testDataA,
    },
  ],
};

export default day1;
