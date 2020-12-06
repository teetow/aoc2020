import { Day } from "util/Day";
import day1 from "./2020/day1";
import day2 from "./2020/day2";
import day3 from "./2020/day3";
import day4 from "./2020/day4";
import day5 from "./2020/day5";
import day6 from "./2020/day6";

const days = new Map<number, Day<unknown>>();

days.set(1, { ...(day1 as Day<unknown>) });
days.set(2, { ...(day2 as Day<unknown>) });
days.set(3, { ...(day3 as Day<unknown>) });
days.set(4, { ...(day4 as Day<unknown>) });
days.set(5, { ...(day5 as Day<unknown>) });
days.set(6, { ...(day6 as Day<unknown>) });

export default days;
