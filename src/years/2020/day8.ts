import { Day } from "util/Day";
import day8data, { test1data } from "./data/day8";
import Handheld, { Instruction } from "./handheld";

const makeData = (data: string) => {
  return Handheld.parseImage(data);
};

const findHaltingValue = (data: Instruction[]) => {
  const h = new Handheld(data);
  h.runUntilHalt();
  return h.ax;
};

const debugProgram = (data: Instruction[]) => {
  const noopSlots = Array<number>();
  const jmpSlots = Array<number>();

  data.forEach((instr, index) => {
    if (instr.opcode === "nop") noopSlots.push(index);
    if (instr.opcode === "jmp") jmpSlots.push(index);
  });

  while (true) {
    const dataCandidate = JSON.parse(JSON.stringify(data)) as Instruction[];

    const changeIds = noopSlots.length > 0 ? noopSlots : jmpSlots;
    if (changeIds.length === 0) throw new Error("ran out of instructions!");
    const instPtr = changeIds[0];
    changeIds.splice(0, 1);

    if (dataCandidate[instPtr].opcode === "nop") {
      dataCandidate[instPtr].opcode = "jmp";
    } else {
      dataCandidate[instPtr].opcode = "nop";
    }

    const h = new Handheld(dataCandidate);
    const result = h.runUntilHalt();
    if (result) return h.ax;
  }
};

const day8: Day<Instruction[]> = {
  title: "Handheld Halting",
  description: `
  While you consider checking the in-flight menu for one of those drinks 
  that come with a little umbrella, you are interrupted by the kid sitting 
  next to you. Their handheld game console won't turn on!
`,
  data: day8data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `
* Find the value in the accumulator when the console goes into an endless loop
`,
      func: (image) => findHaltingValue(image),
      tests: [{ data: test1data, result: 5 }],
    },
    {
      title: "Part 2",
      description: `
* Fix the program so that it terminates normally
* Change exactly one jmp (to nop) or nop (to jmp)
`,
      func: (image) => debugProgram(image),
      tests: [{ data: test1data, result: 8 }],
    },
  ],
};

export default day8;
