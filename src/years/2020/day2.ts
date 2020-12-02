import count from "util/count";
import { Day } from "util/Day";
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

const testdata = [
  { lo: 1, hi: 3, char: "a", password: "abcde" },
  { lo: 1, hi: 3, char: "b", password: "cdefg" },
  { lo: 2, hi: 9, char: "c", password: "ccccccccc" },
] as PasswordRecord[];

const countChars = (record: PasswordRecord): boolean => {
  const charCount = count(record.password, record.char);
  return Number(record.lo) <= charCount && charCount <= Number(record.hi);
};

const runOne = (data: PasswordRecord[]): number => {
  return data.filter((pw) => countChars(pw)).length;
};

const countAtPos = (record: PasswordRecord): boolean => {
  let hits = 0;
  if (record.password[record.lo - 1] === record.char) hits += 1;

  if (record.password[record.hi - 1] === record.char) hits += 1;

  return hits === 1;
};

const runTwo = (data: PasswordRecord[]): number => {
  return data.filter((pw) => countAtPos(pw)).length;
};

const day1: Day<PasswordRecord[]> = {
  title: "Day 1",
  data: day2data as PasswordRecord[],
  parts: [
    {
      title: "Part 1",
      func: runOne,
      tests: [{ data: testdata, result: 2 }],
    },
    {
      title: "Part 2",
      func: runTwo,
      tests: [{ data: testdata, result: 1 }],
    },
  ],
};

export default day1;
