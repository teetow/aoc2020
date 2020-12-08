import { Day } from "util/Day";
import day7data, { test1data, test2data } from "./data/day7";

type Bag = {
  mod: string;
  color: string;
  children?: SubBag[];
};

type SubBag = Bag & {
  quantity: number;
};

const makeData = (data: string) => {
  const bags = data.split("\n");
  const bagDescs: Bag[] = [];

  const findOrCreateBag = (bagdesc: string): Bag => {
    const [mod, color] = bagdesc.split(" ");
    return (
      bagDescs.find((desc) => desc.mod === mod && desc.color === color) || {
        mod,
        color,
        children: [],
      }
    );
  };

  bags.forEach((row) => {
    const [bagname, contents] = row.split(" bags contain ");
    const bag = findOrCreateBag(bagname);
    bagDescs.push(bag);

    contents.split(", ").forEach((childBagName) => {
      const [qty, mod, color] = childBagName.split(/[ .]/);
      if (!Number.isNaN(Number(qty))) {
        const subBag = findOrCreateBag(`${mod} ${color}`);
        bag.children?.push({ quantity: Number(qty), ...subBag });
      }
    });
  });

  return bagDescs;
};

const findBagParents = (bags: Bag[], bag: Bag): Bag[] => {
  const parents = new Set(
    bags.filter(
      (candidate) =>
        candidate.children?.find(
          (child) => child.mod === bag.mod && child.color === bag.color
        ) !== undefined
    )
  );
  parents.forEach((parent) =>
    findBagParents(bags, parent).forEach((found) => parents.add(found))
  );

  return Array.from(parents);
};

const findBagChildren = (bags: Bag[], bag: Bag): number => {
  const srcBag = bags.find((b) => b.mod === bag.mod && b.color === bag.color);

  const bagChildrenCount = srcBag?.children?.map((child) => {
    return child.quantity + findBagChildren(bags, child) * child.quantity;
  });
  const accum = bagChildrenCount?.reduce((acc, cur) => acc + cur, 0) || 0;
  return accum;
};

const day7: Day<Bag[]> = {
  title: "Handy Haversacks",
  description: `
  You land at the regional airport, but all flights are currently delayed due to issues in luggage processing.
`,
  data: day7data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `
* Bags must be color-coded and must contain specific quantities of other color-coded bags.
* Count the number of bag colors that can eventually contain at least one **shiny gold bag**
`,
      func: (bagDescs) =>
        findBagParents(bagDescs, { mod: "shiny", color: "gold" }).length,
      tests: [{ data: test1data, result: 4 }],
    },
    {
      title: "Part 2",
      description: `
* Count how many individual bags are required inside your single shiny gold bag
`,
      func: (bagDescs) =>
        findBagChildren(bagDescs, { mod: "shiny", color: "gold" }),
      tests: [{ data: test2data, result: 126 }],
    },
  ],
};

export default day7;
