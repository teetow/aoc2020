import { Day } from "util/Day";
import days2015 from "./2015";

const years = new Map<number, Map<number, Day<string | number>>>();

years.set(2015, days2015);

export default years;
