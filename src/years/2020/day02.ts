import count from "util/count";
import { Day } from "util/Day";
import day2data from "./data/day02";

type PasswordRecord = {
  lo: number;
  hi: number;
  char: string;
  password: string;
};

const re = /(?<lo>\d+)-(?<hi>\d+) (?<char>\w): (?<pw>\w+)/;

const makeData = (data: string) =>
  data.split("\n").map((line) => {
    const match = re.exec(line)?.groups;
    return {
      lo: Number(match?.lo),
      hi: Number(match?.hi),
      char: match?.char || "",
      password: match?.pw || "",
    };
  });

const countChars = (record: PasswordRecord): boolean => {
  const charCount = count(record.password, record.char);
  return Number(record.lo) <= charCount && charCount <= Number(record.hi);
};

const countAtPos = (record: PasswordRecord): boolean => {
  return (
    (record.password[record.lo - 1] === record.char) !==
    (record.password[record.hi - 1] === record.char)
  );
};

const testdata = [
  { lo: 1, hi: 3, char: "a", password: "abcde" },
  { lo: 1, hi: 3, char: "b", password: "cdefg" },
  { lo: 2, hi: 9, char: "c", password: "ccccccccc" },
]
  .map((row) => `${row.lo}-${row.hi} ${row.char}: ${row.password}`)
  .join("\n");

const day2: Day<PasswordRecord[]> = {
  title: "Password Philosophy",
  description: `
The shopkeeper at the North Pole Toboggan Rental Shop is having a bad day. 
"Something's wrong with our computers; we can't log in!" 

They have created a list of passwords and the policy for that password.
  `,
  data: day2data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `
* The first two numbers indicate the lowest and highest number of times a given letter may appear
* Count the number of valid passwords
    `,
      func: (data) => data.filter((pw) => countChars(pw)).length,
      tests: [{ data: testdata, result: 2 }],
    },
    {
      title: "Part 2",
      description: `
* Actually, that's not how the password policy works
* Each policy actually describes two positions in the password
* Exactly one of these positions must contain the given letter
* Count the new number of valid passwords
`,
      func: (data) => data.filter((pw) => countAtPos(pw)).length,
      tests: [{ data: testdata, result: 1 }],
    },
  ],
};

export default day2;
