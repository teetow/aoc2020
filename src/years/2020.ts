import { Day } from "util/Day";
import day1 from "./2020/day1";

const days = new Map<number, Day<number[]>>();

days.set(1, { ...day1 });

export default days;
