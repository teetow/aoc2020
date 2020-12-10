import { Day } from "util/Day";
import day10data, { test1dataA, test1dataB } from "./data/day10";

const makeData = (data: string) => {
  return data.split("\n").map((row) => Number(row));
};

const findDeviceRating = (data: number[]): number => {
  const sorted = data.sort((a, b) => a - b);
  const diffs = sorted.map((val, index, arr) => {
    return val - (index > 0 ? arr[index - 1] : 0);
  });

  diffs.push(3);

  return (
    diffs.filter((diff) => diff === 1).length *
    diffs.filter((diff) => diff === 3).length
  );
};

const isValid = (data: number[]) => {
  return (
    data.find(
      (val, index, arr) => (index > 0 ? val - arr[index - 1] : 0) > 3
    ) === undefined
  );
};

const findOptionalIndices = (data: number[]) => {
  return data.filter((val, index, arr) => {
    if (index > 0 && index < data.length - 1) {
      return val - arr[index - 1] === 1 && arr[index + 1] - val === 1;
    }
    return false;
  });
};

const getDiffs = (data: number[]): number[] => {
  return data.map((val, index, arr) => {
    return val - (index > 0 ? arr[index - 1] : 0);
  });
};

const findPermutations = (data: number[]): number => {
  const sorted = data.sort((a, b) => a - b);
  const optionals = findOptionalIndices(sorted);

  const upperBound = 2 ** optionals.length;

  const diffs = getDiffs(sorted);

  diffs.push(3);

  return (
    diffs.filter((diff) => diff === 1).length *
    diffs.filter((diff) => diff === 3).length
  );
};

const day9: Day<number[]> = {
  title: "Adapter Array",
  description: `
  You discover weather forecasts of a massive tropical storm. Before you can figure 
  out whether it will impact your vacation plans, your device suddenly turns off!

  Its battery is dead.
`,
  data: day10data,
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
      func: (data) => findDeviceRating(data),
      tests: [
        {
          data: test1dataA,
          result: 7 * 5,
        },
        {
          data: test1dataB,
          result: 22 * 10,
        },
      ],
    },
    {
      title: "Part 2",
      description: `
* Count the ways you can arrange the adapters
`,
      func: (data) => findPermutations(data),
      tests: [
        {
          data: test1dataA,
          result: 8,
        },
        {
          data: test1dataB,
          result: 19208,
        },
      ],
    },
  ],
};

export default day9;
