import { Day } from "util/Day";
import day14data, { test1data } from "./data/day14";

type InstructionType = "mask" | "mem";

type Instruction = {
  type: InstructionType;
  value: string | bigint;
  address: number;
};

type DataType = Instruction;

const memRe = /mem\[(?<addr>\d+)\]/;

class VM {
  instructions: Instruction[] = [];
  mem: bigint[] = [];

  constructor(data?: Instruction[]) {
    if (data !== undefined) this.instructions = data;
  }

  static parse = (line: string) => {
    const [type, val] = line.split(" = ");
    if (type === "mask") {
      return {
        type: type as InstructionType,
        value: val,
        address: -1,
      };
    }

    return {
      type: "mem" as InstructionType,
      value: BigInt(val) || val,
      address: Number(memRe.exec(type)?.groups?.addr),
    };
  };

  static applyMask = (mask: string, value: bigint): bigint => {
    const maskBits = mask.split("");
    const ones = BigInt(
      `0b${maskBits.map((c) => (c === "1" ? "1" : "0")).join("")}`
    );
    const zeros = BigInt(
      `0b${maskBits.map((c) => (c === "0" ? "1" : "0")).join("")}`
    );
    // eslint-disable-next-line
    const result = (value | ones) ^ (value & zeros);
    return result;
  };

  run = () => {
    let currentMask = "";
    this.instructions.forEach((instr) => {
      if (instr.type === "mask") {
        currentMask = instr.value as string;
      }
      if (instr.type === "mem") {
        this.mem[instr.address] = VM.applyMask(
          currentMask,
          BigInt(instr.value)
        );
      }
    });
    return this.mem.reduce((acc, val) => acc + val, BigInt(0));
  };
}

const makeData = (data: string): DataType[] => {
  const lines = data.split("\n");
  return lines.map((line) => VM.parse(line));
};

const part1 = (data: DataType[]): bigint => {
  const vm = new VM(data);
  return vm.run();
};

const day14: Day<DataType[]> = {
  title: "Docking Data",
  description: `
  As your ferry approaches the sea port, the captain asks for your help again. 

  The computer system that runs this port isn't compatible with the docking program on the ferry.
  `,
  data: day14data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `
* Execute the initialization program
* **What is the sum of all values left in memory after it completes?**
`,
      func: (data) => Number(part1(data)),
      tests: [
        {
          data: test1data,
          result: 101 + 64,
        },
      ],
    },
  ],
};

export default day14;
