import { Day } from "util/Day";
import day1 from "./2020/day1";
import day2 from "./2020/day2";
import day3 from "./2020/day3";
import day4 from "./2020/day4";

const days = new Map<number, Day<any>>();

days.set(1, { ...day1 });
days.set(2, { ...day2 });
days.set(3, { ...day3 });
days.set(4, { ...day4 });

export default days;
