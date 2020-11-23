import { Day } from "util/Day";
import day1 from "./2015/day1";
import day2 from "./2015/day2";
import day3 from "./2015/day3";

const days: Map<number, Day<any>> = new Map();

days.set(0, {
  title: "Day 0 (test)",
  parts: [
    { title: "Part A", func: () => 42 },
    { title: "Part B", func: () => 1722 },
  ],
  data: "",
});

days.set(1, { ...day1 });
days.set(2, { ...day2 });
days.set(3, { ...day3 });

export default days;
