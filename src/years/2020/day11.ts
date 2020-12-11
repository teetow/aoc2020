import { count } from "util/collections";
import { Day } from "util/Day";
import day11data, { test1dataA } from "./data/day11";

const makeData = (data: string) => {
  return data.split("\n");
};

type Coords = [number, number];

const getSeatAt = (data: string[], pos: Coords) => {
  const [y, x] = pos;
  return data[y][x];
};

const getNeighborsAt = (data: string[], pos: Coords) => {
  const [y, x] = pos;
  const neighbors = [-1, 0, 1].map((row) =>
    [-1, 0, 1]
      .map((col) => {
        const tx = x + col;
        const ty = y + row;
        if (
          (row === 0 && col === 0) ||
          tx < 0 ||
          tx >= data[0].length ||
          ty < 0 ||
          ty >= data.length
        ) {
          return ".";
        }
        return data[ty][tx];
      })
      .join("")
  );
  return neighbors.join("").split("");
};

const calcSeatAt = (data: string[], pos: Coords) => {
  const currentSymbol = getSeatAt(data, pos);
  const neighbors = getNeighborsAt(data, pos);
  if (
    currentSymbol === "L" &&
    neighbors.filter((seat) => seat === "#").length === 0
  ) {
    return "#";
  }
  if (
    currentSymbol === "#" &&
    neighbors.filter((seat) => seat === "#").length >= 4
  ) {
    return "L";
  }

  return currentSymbol;
};

const tick = (data: string[]): string[] => {
  const frame = data.map((row, y) =>
    row
      .split("")
      .map((seat, x) => calcSeatAt(data, [y, x]))
      .join("")
  );
  return frame;
};

const isEqual = (a: string[], b: string[]) => {
  return a.map((row, index) => row === b[index]).every((row) => row === true);
};

const runUntilHalt = (data: string[]) => {
  let currentFrame = data;
  let ctr = 0;
  while (ctr < 99) {
    const nextFrame = tick(currentFrame);
    if (isEqual(currentFrame, nextFrame)) {
      return nextFrame.reduce((acc, row) => acc + count(row, "#"), 0);
    }
    currentFrame = nextFrame;
    ctr += 1;
  }
  throw new Error("ran more than 99 times.");
};

const day11: Day<string[]> = {
  title: "Seating System",
  description: `
  Your plane lands with plenty of time to spare.  As you reach the waiting 
  area to board the ferry, you realize you're so early, nobody else has even 
  arrived yet!

  By modeling the process people use to choose (or abandon) their seat in the 
  waiting area, you're pretty sure you can predict the best place to sit.
`,
  data: day11data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `
* The charging outlet near your seat produces the wrong number of jolts
* Each of your joltage adapters is rated for a specific output joltage
* Any given adapter can take an input 1-3 jolts lower than its rating
* your device has a built-in joltage adapter rated for 3 jolts higher than the highest-rated adapter in your bag
* What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?
`,
      func: (data) => runUntilHalt(data),
      tests: [
        {
          data: test1dataA,
          result: 37,
        },
      ],
    },
  ],
};

export default day11;
