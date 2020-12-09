type Opcode = typeof Opcodes[number];
const Opcodes = ["nop", "acc", "jmp"] as const;

export type Instruction = {
  opcode: Opcode;
  value: number;
};

const MakeInstruction = (opcode: string, value: string) => {
  if (Opcodes.includes(opcode as Opcode)) {
    return { opcode: opcode as Opcode, value: Number(value) };
  }
  throw new Error(`${opcode} is an invalid opcode.`);
};

class Handheld {
  InstSet: Record<Opcode, (value: number) => void> = {
    nop: (value) => {},
    acc: (value) => {
      this.ax += value;
    },
    jmp: (value) => {
      this.pc += value - 1 || 0;
    },
  };

  mem: Instruction[];
  pc = 0;
  ax = 0;

  constructor(rom: Instruction[]) {
    this.mem = rom;
  }

  step = () => {
    const inst = this.mem[this.pc];
    this.pc += 1;
    this.exec(inst);
  };

  static parseImage = (image: string): Instruction[] => {
    return image.split("\n").map((line) => {
      const [opcode, value] = line.split(" ");
      return MakeInstruction(opcode, value);
    });
  };

  exec = (inst: Instruction) => {
    const cmd = this.InstSet[inst.opcode];
    cmd(inst.value);
  };

  runUntilHalt = (): boolean => {
    const trace = new Array<number>(this.mem.length).fill(0);
    while (trace[this.pc] < 1) {
      trace[this.pc] += 1;
      this.step();
      if (this.pc === this.mem.length) {
        return true;
      }
    }
    return false;
  };
}

export default Handheld;
