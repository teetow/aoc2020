import days2015 from "./2015";
import days2020 from "./2020";

const years = new Map<number, Map<number, unknown>>();

years.set(2015, days2015);
years.set(2020, days2020);

export default years;
