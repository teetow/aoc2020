import { Day, Test } from "util/Day";
import data from "./data/day1";
/*
(()) and ()() both result in floor 0.
((( and (()(()( both result in floor 3.
))((((( also results in floor 3.
()) and ))( both result in floor -1 (the first basement level).
))) and )())()) both result in floor -3.
*/

const testDataA: Array<Test<string>> = [
  { data: "(())", result: 0 },
  { data: "()()", result: 0 },
  { data: "(((", result: 3 },
  { data: "(()(()(", result: 3 },
  { data: "))(((((", result: 3 },
  { data: "())", result: -1 },
  { data: "))(", result: -1 },
  { data: ")))", result: -3 },
  { data: ")())())", result: -3 },
];

const testDataB: Array<Test<string>> = [
  { data: ")", result: 1 },
  { data: "()())", result: 5 },
];

const escape = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const count = (haystack: string, needle: string) => {
  const re = RegExp(`${escape(needle)}`, "g");
  return (haystack.match(re) || []).length;
};

const run = (data: string) => count(data, "(") - count(data, ")");

const runB = (data: string) => {
  let floor = 0;
  let lastFloor = 0;
  data.split("").some((char, index) => {
    floor += char === "(" ? 1 : -1;
    lastFloor = index;
    return floor === -1;
  });
  return lastFloor + 1;
};

const day1: Day<string> = {
  title: "Day 1",
  data: data,
  parts: [
    {
      title: "Part 1",
      func: (data) => run(data as string).toString(),
      tests: testDataA,
    },
    {
      title: "Part 2",
      func: (data) => runB(data as string).toString(),
      tests: testDataB,
    },
  ],
};

export default day1;
