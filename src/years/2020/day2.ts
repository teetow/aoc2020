import count from "util/count";
import { Day } from "util/Day";
import day2data from "./data/day2";

type PasswordRecord = {
  lo: number;
  hi: number;
  char: string;
  password: string;
};

const re = /(?<lo>\d+)-(?<hi>\d+) (?<char>\w): (?<pw>\w+)/;

const makeData = (data: string) =>
  data.split("\n").map((line) => {
    const match = re.exec(line)?.groups;
    return {
      lo: Number(match?.lo),
      hi: Number(match?.hi),
      char: match?.char || "",
      password: match?.pw || "",
    };
  });

const countChars = (record: PasswordRecord): boolean => {
  const charCount = count(record.password, record.char);
  return Number(record.lo) <= charCount && charCount <= Number(record.hi);
};

const countAtPos = (record: PasswordRecord): boolean => {
  return (
    (record.password[record.lo - 1] === record.char) !==
    (record.password[record.hi - 1] === record.char)
  );
};

const testdata = [
  { lo: 1, hi: 3, char: "a", password: "abcde" },
  { lo: 1, hi: 3, char: "b", password: "cdefg" },
  { lo: 2, hi: 9, char: "c", password: "ccccccccc" },
]
  .map((row) => `${row.lo}-${row.hi} ${row.char}: ${row.password}`)
  .join("\n");

const day1: Day<PasswordRecord[]> = {
  title: "Day 1",
  data: day2data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      func: (data) => data.filter((pw) => countChars(pw)).length,
      tests: [{ data: testdata, result: 2 }],
    },
    {
      title: "Part 2",
      func: (data) => data.filter((pw) => countAtPos(pw)).length,
      tests: [{ data: testdata, result: 1 }],
    },
  ],
};

export default day1;
