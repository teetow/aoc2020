import { Day } from "util/Day";
import day12data, { test1data } from "./data/day12";

type Point = { x: number; y: number };

const pt = (x: number, y: number) => ({ x, y } as Point);

const Directions = ["N", "E", "S", "W"] as const;
type Direction = typeof Directions[number];

const Turns = ["L", "R"] as const;
type Turn = typeof Turns[number];

const TurnTransforms = {
  0: (p: Point) => p,
  1: (p: Point) => pt(-p.y, p.x),
  2: (p: Point) => pt(-p.x, -p.y),
  3: (p: Point) => pt(p.y, -p.x),
};

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
  waypoint: Point;

  constructor(
    location: Point = pt(0, 0),
    heading: Direction = "E",
    waypoint: Point = pt(10, -1)
  ) {
    this.location = location;
    this.heading = heading;
    this.waypoint = waypoint;
  }

  Move = (vector: Point, steps: number) => {
    this.location.x += vector.x * steps;
    this.location.y += vector.y * steps;
  };

  Turn = (turn: Turn, steps: number) => {
    const turnSteps = (turn === "R" ? 1 : -1) * (steps / 90);
    const currentIndex = Directions.indexOf(this.heading) + 4;
    this.heading = Directions[(currentIndex + turnSteps) % 4];
  };

  MoveWaypoint = (vector: Point, steps: number) => {
    this.waypoint.x += vector.x * steps;
    this.waypoint.y += vector.y * steps;
  };

  Do = (instruction: Instruction) => {
    const { move, steps } = instruction;
    if (Directions.includes(move as Direction)) {
      this.Move(DirectionMoves[move as Direction], steps);
    } else if (Turns.includes(move as Turn)) {
      this.Turn(move as Turn, steps);
    } else {
      this.Move(DirectionMoves[this.heading], steps);
    }
  };

  DoWithWaypoint = (instruction: Instruction) => {
    const { move, steps } = instruction;

    if (Directions.includes(move as Direction)) {
      this.MoveWaypoint(DirectionMoves[move as Direction], steps);
    }
    if (Turns.includes(move as Turn)) {
      const turnSteps = ((move === "R" ? 1 : -1) * (steps / 90) + 4) % 4;
      const transform =
        TurnTransforms[turnSteps as keyof typeof TurnTransforms];
      this.waypoint = transform(this.waypoint);
    }
    if (move === "F") {
      this.Move(this.waypoint, steps);
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
    f.Do(step);
  });
  return f.getManhattanDistFrom(pt(0, 0));
};

const part2 = (data: Instruction[]): number => {
  const f = new Ferry(pt(0, 0), "E", pt(10, -1));
  data.forEach((step) => {
    f.DoWithWaypoint(step);
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
    {
      title: "Part 2",
      description: `
* All of the actions indicate how to move a waypoint which is relative to the ship's position
* Move the ship according to the updated instructions
* What is the Manhattan distance between the ship's starting and final position?
`,
      func: (data) => part2(data),
      tests: [
        {
          data: test1data,
          result: 214 + 72,
        },
      ],
    },
  ],
};

export default day12;
