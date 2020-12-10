import { Day } from "util/Day";
import { data as day3data, testdata } from "./data/day03";

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
  title: "Toboggan Trajectory",
  description: `
While travel by toboggan might be easy, it's certainly not safe: 
there's very minimal steering and the area is covered in trees. 
You'll need to see which angles will take you near the fewest trees.
`,
  data: day3data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `
* Start at the top-left corner of your map
* Follow a slope of right 3 and down 1
* Count the number of trees you encounter
      `,
      func: (data) => {
        return traverseSlope(data, { stepX: 3, stepY: 1 });
      },
      tests: [{ data: testdata, result: 7 }],
    },
    {
      title: "Part 2",
      description: `
* Try several slopes
* Count the number of trees for each slope
* Multiply those counts together`,
      func: (data) => traverseSlopes(data, part2slopes),
      tests: [{ data: testdata, result: 2 * 7 * 3 * 4 * 2 }],
    },
  ],
};

export default day3;
