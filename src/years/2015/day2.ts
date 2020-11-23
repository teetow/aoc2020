import { Day } from "util/Day";
import data from "./data/day2";

type Box = { length: number; width: number; height: number };
type Sides = { top: number; front: number; side: number };

const makeData = (raw: string): Box[] => {
  const rawLines = raw.split("\n").map((line) => line);
  return rawLines.map((line) => {
    const [l, w, h] = line.split("x");
    return {
      length: parseInt(l),
      width: parseInt(w),
      height: parseInt(h),
    };
  });
};

const getSides = (box: Box): Sides => {
  return {
    top: box.length * box.width,
    front: box.width * box.height,
    side: box.height * box.length,
  };
};

const getSmallestSide = (box: Box) => {
  const sides = getSides(box);
  return Math.min(...Object.values(sides));
};

const calcArea = (box: Box) => {
  return (
    box.length * box.width * 2 +
    box.width * box.height * 2 +
    box.height * box.length * 2
  );
};

const calcPaper = (box: Box) => {
  return calcArea(box) + getSmallestSide(box);
};

const calcVolume = (box: Box) => {
  return box.length * box.width * box.height;
};

const calcRibbon = (box: Box) => {
  const ribbonSides = Object.values(box)
    .sort((a, b) => a - b)
    .slice(0, 2);
  const baseRibbon = ribbonSides.reduce((prev, cur) => prev + cur) * 2;
  const extraRibbon = calcVolume(box);

  return baseRibbon + extraRibbon;
};

const runA = (data: Box[]) => {
  let total = 0;
  data.forEach((item) => {
    total += calcPaper(item);
  });
  return total.toString();
};

const runB = (data: Box[]) => {
  let total = 0;
  data.forEach((item) => {
    total += calcRibbon(item);
  });

  return total.toString();
};

const day2: Day<Box[]> = {
  title: "Day 2",
  data: makeData(data),
  parts: [
    {
      title: "Part A",
      func: runA,
      tests: [
        { data: [{ length: 2, width: 3, height: 4 }], result: 52 + 6 },
        { data: [{ length: 1, width: 1, height: 10 }], result: 42 + 1 },
      ],
    },
    {
      title: "Part B",
      func: runB,
      tests: [
        { data: [{ length: 2, width: 3, height: 4 }], result: 10 + 24 },
        { data: [{ length: 1, width: 1, height: 10 }], result: 4 + 10 },
      ],
    },
  ],
};

export default day2;
