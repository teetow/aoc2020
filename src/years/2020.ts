import { Day } from "util/Day";
import day1 from "./2020/day01";
import day2 from "./2020/day02";
import day3 from "./2020/day03";
import day4 from "./2020/day04";
import day5 from "./2020/day05";
import day6 from "./2020/day06";
import day7 from "./2020/day07";
import day8 from "./2020/day08";
import day9 from "./2020/day09";
import day10 from "./2020/day10";

const days = new Map<number, Day<unknown>>();

days.set(1, { ...(day1 as Day<unknown>) });
days.set(2, { ...(day2 as Day<unknown>) });
days.set(3, { ...(day3 as Day<unknown>) });
days.set(4, { ...(day4 as Day<unknown>) });
days.set(5, { ...(day5 as Day<unknown>) });
days.set(6, { ...(day6 as Day<unknown>) });
days.set(7, { ...(day7 as Day<unknown>) });
days.set(8, { ...(day8 as Day<unknown>) });
days.set(9, { ...(day9 as Day<unknown>) });
days.set(10, { ...(day10 as Day<unknown>) });

export default days;
