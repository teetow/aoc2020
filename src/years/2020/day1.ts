import { Day } from "util/Day";
import day1data from "./data/day1";

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
  title: "Day 1",
  data: day1data,
  parts: [
    {
      title: "Part 1",
      func: (data) => findTwo(data),
      tests: [{ data: [1721, 979, 366, 299, 675, 1456], result: 1721 * 299 }],
    },
    {
      title: "Part 2",
      func: (data) => findThree(data),
      tests: [
        { data: [1721, 979, 366, 299, 675, 1456], result: 979 * 366 * 675 },
      ],
    },
  ],
};

export default day1;
