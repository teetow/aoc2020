import { Day } from "util/Day";
import day1data from "./data/day1";

const count = (haystack: string, needle: string) => {
  let score = 0;

  haystack.split("").forEach((step) => {
    score += step === needle ? 1 : 0;
  });
  return score;
};

const moveToBasement = (data: string) => {
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
  data: day1data,
  parts: [
    {
      title: "Part 1",
      func: (data) => count(data, "(") - count(data, ")"),
      tests: [
        { data: "(())", result: 0 },
        { data: "()()", result: 0 },
        { data: "(((", result: 3 },
        { data: "(()(()(", result: 3 },
        { data: "))(((((", result: 3 },
        { data: "())", result: -1 },
        { data: "))(", result: -1 },
        { data: ")))", result: -3 },
        { data: ")())())", result: -3 },
      ],
    },
    {
      title: "Part 2",
      func: (data) => moveToBasement(data),
      tests: [
        { data: ")", result: 1 },
        { data: "()())", result: 5 },
      ],
    },
  ],
};

export default day1;
