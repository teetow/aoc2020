import { Day } from "util/Day";
import day12data, { test1data } from "./data/day12";

type Point = { x: number; y: number };

const pt = (x: number, y: number) => ({ x, y } as Point);

const Directions = ["N", "E", "S", "W"] as const;
type Direction = typeof Directions[number];

const Turns = ["L", "R"] as const;
type Turn = typeof Turns[number];

type Movement = Direction | Turn | "F";

const DirectionMoves: Record<Direction, Point> = {
  N: pt(0, -1),
  E: pt(1, 0),
  S: pt(0, 1),
  W: pt(-1, 0),
};

type Instruction = {
  move: Movement;
  steps: number;
};

class Ferry {
  location: Point;
  heading: Direction;

  constructor(location: Point = pt(0, 0), heading: Direction = "E") {
    this.location = location;
    this.heading = heading;
  }

  Move = (instruction: Instruction) => {
    const { move, steps } = instruction;
    if (Directions.includes(move as Direction)) {
      this.location.x += DirectionMoves[move as Direction].x * steps;
      this.location.y += DirectionMoves[move as Direction].y * steps;
    } else if (Turns.includes(move as Turn)) {
      const turnMultiplier = move === "R" ? 1 : -1;
      this.heading =
        Directions[
          (Directions.indexOf(this.heading) +
            4 +
            turnMultiplier * (steps / 90)) %
            4
        ];
    } else {
      this.location.x += DirectionMoves[this.heading].x * steps;
      this.location.y += DirectionMoves[this.heading].y * steps;
    }
  };

  getManhattanDistFrom = (origin: Point): number => {
    return (
      Math.abs(this.location.x - origin.x) +
      Math.abs(this.location.y - origin.y)
    );
  };
}

const makeData = (data: string): Instruction[] => {
  return data.split("\n").map((line) => ({
    move: line.substr(0, 1) as Movement,
    steps: Number(line.substr(1)),
  }));
};

const part1 = (data: Instruction[]): number => {
  const f = new Ferry(pt(0, 0), "E");
  data.forEach((step) => {
    f.Move(step);
  });
  return f.getManhattanDistFrom(pt(0, 0));
};

const day12: Day<Instruction[]> = {
  title: "Rain Risk",
  description: `
  Your ferry made decent progress toward the island, but the storm came in faster than anyone expected. 
  
  The ferry needs to take evasive actions!
`,
  data: day12data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `
* The ship starts by facing east
* Follow the navigation instructions
* What is the Manhattan distance (height + width) between the ship's starting and final position?
`,
      func: (data) => part1(data),
      tests: [
        {
          data: test1data,
          result: 17 + 8,
        },
      ],
    },
  ],
};

export default day12;
