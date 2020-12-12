import { count, range } from "util/collections";
import { Day } from "util/Day";
import day11data, { test1dataA } from "./data/day11";

const makeData = (data: string) => {
  return data.split("\n");
};

type Coords = [number, number];

const isWithin = (height: number, width: number, pos: Coords) => {
  return pos[0] >= 0 && pos[0] < height && pos[1] >= 0 && pos[1] < width;
};

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
          !isWithin(data.length, data[0].length, [ty, tx])
        ) {
          return ".";
        }
        return data[ty][tx];
      })
      .join("")
  );
  return neighbors.join("").split("");
};

const updateFromAdjacent = (data: string[], pos: Coords) => {
  const currentSymbol = getSeatAt(data, pos);
  const occupiedSeats = getNeighborsAt(data, pos).filter((s) => s === "#");
  if (currentSymbol === "L" && occupiedSeats.length === 0) {
    return "#";
  }
  if (currentSymbol === "#" && occupiedSeats.length >= 4) {
    return "L";
  }

  return currentSymbol;
};

const isEqual = (a: string[], b: string[]) => {
  return a.map((row, index) => row === b[index]).every((row) => row === true);
};

const trace = (data: string[], pos: Coords, direction: Coords) => {
  let y = pos[0];
  let x = pos[1];
  const done = false;

  while (!done) {
    y += direction[0];
    x += direction[1];

    if (isWithin(data.length, data[0].length, [y, x])) {
      const seat = getSeatAt(data, [y, x]);
      if (seat !== ".") {
        return seat;
      }
    } else {
      return ".";
    }
  }
  return ".";
};

const sweep = (data: string[], pos: Coords) => {
  return [-1, 0, 1]
    .map((row) =>
      [-1, 0, 1]
        .map((col) => {
          if (row === 0 && col === 0) {
            return ".";
          }
          return trace(data, pos, [row, col]);
        })
        .join("")
    )
    .join("")
    .split("");
};

const updateFromVisible = (data: string[], pos: Coords) => {
  const currentSymbol = getSeatAt(data, pos);
  const occupiedSeats = sweep(data, pos).filter((s) => s === "#");
  if (currentSymbol === "L" && occupiedSeats.length === 0) {
    return "#";
  }
  if (currentSymbol === "#" && occupiedSeats.length >= 5) {
    return "L";
  }
  return currentSymbol;
};

const simulate = (
  data: string[],
  func: (data: string[], pos: Coords) => string
) => {
  const createFrame = (frame: string[]) => {
    return range(0, frame.length - 1).map((y) => {
      return range(0, frame[0].length - 1)
        .map((x) => {
          return func(frame, [y, x]);
        })
        .join("");
    });
  };

  let currentFrame = data;
  let ctr = 0;
  while (ctr < 99) {
    const nextFrame = createFrame(currentFrame);
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
* The seat layout fits neatly on a grid
* All decisions are based on the number of occupied adjacent seats
* How many seats end up occupied?
`,
      func: (data) => simulate(data, updateFromAdjacent),
      tests: [
        {
          data: test1dataA,
          result: 37,
        },
      ],
    },
    {
      title: "Part 2",
      description: `
* People only care about the first seat they can see in each of the eight directions
* it now takes **five or more** visible occupied seats for an occupied seat to become empty
* how many seats end up occupied?

`,
      func: (data) => simulate(data, updateFromVisible),
      tests: [
        {
          data: test1dataA,
          result: 26,
        },
      ],
    },
  ],
};

export default day11;
