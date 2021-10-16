import { Day } from "util/Day";
import md5 from "md5";

const day4data = "ckczppom";

const runA = (data: string, limit = 500000): string => {
  let i = 0;

  while (i < limit) {
    const id = `${i}`.padStart(5, "0");
    const hash = `${md5(id)}`;

    if (hash.indexOf("00000") === 0) {
      return hash;
    }
    i += 1;
  }
  return "";
};

const runB = (data: string): string => {
  return "hej";
};

const day4: Day<string> = {
  title: "Day 4",
  data: day4data,
  dataConv: (data) => data,
  parts: [
    {
      title: "Part 1",
      func: runA,
      tests: [
        { data: "abcdef", result: "609043" },
        { data: "pqrstuv", result: "1048970" },
      ],
    },
    // {
    //   title: "Part 2",
    //   func: runB,
    //   tests: [
    //     { data: "^v", result: 3 },
    //     { data: "^>v<", result: 3 },
    //     { data: "^v^v^v^v^v", result: 11 },
    //   ],
    // },
  ],
};

export default day4;
