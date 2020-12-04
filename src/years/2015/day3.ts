import { Day } from "util/Day";
import day3data from "./data/day3";

const makeData = (data: string) => {
  return data.split("");
};

type Point = {
  x: number;
  y: number;
};
const pt = (x: number, y: number): Point => ({ x, y });

const Moves: Record<string, Point> = {
  "<": pt(-1, 0),
  v: pt(0, 1),
  ">": pt(1, 0),
  "^": pt(0, -1),
};

const addPoints = (one: Point, other: Point): Point => {
  return pt(one.x + other.x, one.y + other.y);
};

const getMove = (raw: string) => Moves[raw];

const runA = (data: string[]): number => {
  const map = new Map<Point, number>();
  const coord = pt(0, 0);
  map.set(coord, 1);
  data.forEach((step) => {
    const newCoord = addPoints(coord, getMove(step));
    map.set(newCoord, (map.get(newCoord) || 0) + 1);
  });
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
  ],
};

export default day3;
