import { Day } from "util/Day";
import { data as day3data, testdata } from "./data/day3";

const makeData = (data: string) => data.split("\n").map((row) => row.split(""));

type Slope = {
  stepX: number;
  stepY: number;
};

const traverseSlope = (data: string[][], { stepX, stepY }: Slope): number => {
  let trees = 0;
  let x = 0;

  for (let y = 0; y < data.length; y += stepY) {
    if (data[y][x] === "#") trees += 1;
    x = (x + stepX) % data[0].length;
  }
  return trees;
};

const traverseSlopes = (data: string[][], slopes: Slope[]) => {
  const results = slopes.map((slope) => traverseSlope(data, slope));
  return results.reduce((a, b) => {
    return a * b;
  });
};

const part2slopes = [
  { stepX: 1, stepY: 1 },
  { stepX: 3, stepY: 1 },
  { stepX: 5, stepY: 1 },
  { stepX: 7, stepY: 1 },
  { stepX: 1, stepY: 2 },
];

const day3: Day<string[][]> = {
  title: "Day 3",
  data: day3data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      func: (data) => {
        return traverseSlope(data, { stepX: 3, stepY: 1 });
      },
      tests: [{ data: testdata, result: 7 }],
    },
    {
      title: "Part 2",
      func: (data) => traverseSlopes(data, part2slopes),
      tests: [{ data: testdata, result: 2 * 7 * 3 * 4 * 2 }],
    },
  ],
};

export default day3;
