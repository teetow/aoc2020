import { Day } from "util/Day";
import { data as day4data, testdata, testdata2 } from "./data/day4";

const makeData = (data: string) => data.split("\n\n");

const isCompletePassport = (passport: string) => {
  const splits = passport.split(/[ \n]/);
  return (
    splits.length === 8 ||
    (splits.length === 7 && passport.indexOf("cid") === -1)
  );
};

const inRange = (val: number, min: number, max: number) =>
  val >= min && val <= max;

const validators: Record<string, (data: string) => boolean> = {
  byr: (data) => inRange(Number(data), 1920, 2002),
  iyr: (data) => inRange(Number(data), 2010, 2020),
  eyr: (data) => inRange(Number(data), 2020, 2030),

  hgt: (data) =>
    (data.indexOf("cm") > -1 &&
      inRange(Number(data.replace("cm", "")), 150, 193)) ||
    (data.indexOf("in") > -1 &&
      inRange(Number(data.replace("in", "")), 59, 76)),

  hcl: (data) => /^#[0-9a-f]{6}$/.exec(data) !== null,
  ecl: (data) =>
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(data),

  pid: (data) => data.length === 9 && !Number.isNaN(Number(data)),
  cid: () => true,
};

const validatePasswordFields = (data: string[]) => {
  const validPassports = data.filter((passport) => {
    const fields = passport.split(/[ \n]/);
    const validFields = fields.filter((field) => {
      const [name, value] = field.split(":");
      return validators[name](value);
    });
    return validFields.length === fields.length && isCompletePassport(passport);
  });
  return validPassports.length;
};

const day3: Day<string[]> = {
  title: "Day 4",
  description: `You arrive at the airport. A very long line has formed for 
the automatic passport scanners, because they're having trouble detecting 
which passports have all required fields.`,
  data: day4data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `* Count the number of passports that have all required fields 
* Treat cid as optional`,
      func: (data) => {
        return data.filter((passport: string) => isCompletePassport(passport))
          .length;
      },
      tests: [{ data: testdata, result: 2 }],
    },
    {
      title: "Part 2",
      description: `* Count the number passports that have all required fields **and valid values**
* Continue to treat cid as optional`,
      func: (data) => validatePasswordFields(data),
      tests: [
        { data: testdata2.split("\n\n")[0], result: 0 },
        { data: testdata2.split("\n\n")[1], result: 0 },
        { data: testdata2.split("\n\n")[2], result: 0 },
        { data: testdata2.split("\n\n")[3], result: 0 },
        { data: testdata2.split("\n\n")[4], result: 1 },
        { data: testdata2.split("\n\n")[5], result: 1 },
        { data: testdata2.split("\n\n")[6], result: 1 },
        { data: testdata2.split("\n\n")[7], result: 1 },
      ],
    },
  ],
};

export default day3;
