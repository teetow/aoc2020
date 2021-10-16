import { Day } from "util/Day";
import day3data from "./data/day3";

const makeData = (data: string) => {
  return data.split("");
};

class Pt {
  x_pos: number;
  y_pos: number;
  constructor(x: number, y: number) {
    this.x_pos = x;
    this.y_pos = y;
  }

  get x() {
    return this.x_pos;
  }

  get y() {
    return this.y_pos;
  }

  get key() {
    return Symbol.for(`Pt[${this.x}:${this.y}]`);
  }
}

const Moves: Record<string, Pt> = {
  "<": new Pt(-1, 0),
  v: new Pt(0, 1),
  ">": new Pt(1, 0),
  "^": new Pt(0, -1),
};

const sumPoints = (one: Pt, other: Pt): Pt => {
  return new Pt(one.x + other.x, one.y + other.y);
};

const makeRun = (
  map: Map<symbol, number>,
  run: string[]
): Map<symbol, number> => {
  let currentPos = new Pt(0, 0);
  map.set(currentPos.key, 1);
  run.forEach((step) => {
    currentPos = sumPoints(currentPos, Moves[step]);
    map.set(currentPos.key, (map.get(currentPos.key) || 0) + 1);
  });

  return map;
};

const runA = (data: string[]): number => {
  const map = new Map<symbol, number>();
  makeRun(map, data);
  return map.size;
};

const runB = (data: string[]): number => {
  const map = new Map<symbol, number>();
  const santaMoves: string[] = [];
  const roboMoves: string[] = [];

  data.forEach((step, i) => {
    if (i % 2 === 0) {
      santaMoves.push(step);
    } else {
      roboMoves.push(step);
    }
  });
  makeRun(map, santaMoves);
  makeRun(map, roboMoves);
  return map.size;
};

const day3: Day<string[]> = {
  title: "Day 3",
  data: day3data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      func: runA,
      tests: [
        { data: ">", result: 2 },
        { data: "^>v<", result: 4 },
        { data: "^v^v^v^v^v", result: 2 },
      ],
    },
    {
      title: "Part 2",
      func: runB,
      tests: [
        { data: "^v", result: 3 },
        { data: "^>v<", result: 3 },
        { data: "^v^v^v^v^v", result: 11 },
      ],
    },
  ],
};

export default day3;
