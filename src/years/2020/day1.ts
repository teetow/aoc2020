import { Day } from "util/Day";
import day1data from "./data/day1";

const makeData = (data: string) => {
  return data.split("\n").map((raw: string) => Number(raw));
};

const findTwo = (data: number[]): number => {
  let second = -1;

  const first = data.find((a) =>
    data.find((b) => {
      if (a + b === 2020) {
        second = b;
        return true;
      }
      return false;
    })
  );
  return first !== undefined ? first * second : -1;
};

const findThree = (data: number[]): number => {
  let second = -1;
  let third = -1;

  const first = data.find((apple) =>
    data.find((orange) =>
      data.find((pear) => {
        if (apple + orange + pear === 2020) {
          second = orange;
          third = pear;
          return true;
        }
        return false;
      })
    )
  );
  return first !== undefined ? first * second * third : -1;
};

const day1: Day<number[]> = {
  title: "Day 1 -- Report Repair",
  description: `Before you leave for vacation, the Elves in accounting need you to fix your expense report.
  [Read full story](https://adventofcode.com/2020/day/1)
  `,
  data: day1data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `
* Find the two values in a list that add up to 2020
* Return the product of those two values
`,
      func: (data) => findTwo(data),
      tests: [{ data: "1721\n979\n366\n299\n675\n1456", result: 1721 * 299 }],
    },
    {
      title: "Part 2",
      description: `
* Find the **three** values in a list that add up to 2020
* Return the product of those three values
`,
      func: (data) => findThree(data),
      tests: [
        { data: "1721\n979\n366\n299\n675\n1456", result: 979 * 366 * 675 },
      ],
    },
  ],
};

export default day1;
