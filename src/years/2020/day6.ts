import { Day } from "util/Day";
import { data as day6data, testdata1a, testdata1b } from "./data/day6";

const makeData = (data: string) => data.split("\n\n");

const countUniqueAnswers = (group: string): number => {
  const people = group.split("\n");
  const groupAnswers = new Set<string>();
  people.forEach((person) =>
    person.split("").forEach((answer) => groupAnswers.add(answer))
  );
  return groupAnswers.size;
};

const countCommonAnswers = (group: string): number => {
  const people = group.split("\n");
  const commonGroupAnswers = people.reduce((acc, person) => {
    const groupAnswers = acc
      .split("")
      .map((answer) => (person.split("").includes(answer) ? answer : ""))
      .join("");
    return groupAnswers;
  });
  return commonGroupAnswers.length;
};

const day6: Day<string[]> = {
  title: "Custom Customs",
  description: `
As your flight approaches the airport, customs declaration forms are distributed to the passengers.
`,
  data: day6data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `
* For each group, count the number of questions to which anyone answered "yes"
* Calculate the sum of those counts
`,
      func: (data) =>
        data.map(countUniqueAnswers).reduce((acc, value) => acc + value),
      tests: [
        { data: testdata1a, result: 6 },
        { data: testdata1b, result: 11 },
      ],
    },
    {
      title: "Part 2",
      description: `
* For each group, count the number of questions to which *everyone* answered "yes"
* Calculate the sum of those counts
`,
      func: (data) =>
        data.map(countCommonAnswers).reduce((acc, value) => acc + value),
      tests: [{ data: testdata1b, result: 6 }],
    },
  ],
};

export default day6;
