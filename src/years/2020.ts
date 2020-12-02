import { Day } from "util/Day";
import day1 from "./2020/day1";
import day2 from "./2020/day2";

const days = new Map<number, Day<any>>();

days.set(1, { ...day1 });
days.set(2, { ...day2 });

export default days;
