import { Day } from "util/Day";
import day17data, { test1data } from "./data/day17";

type Point3D = {
  x: number;
  y: number;
  z: number;
};

const point3d = (
  x?: string | number,
  y?: string | number,
  z?: string | number
): Point3D => ({
  x: Number(x) || 0,
  y: Number(y) || 0,
  z: Number(z) || 0,
});

const pointEquals = (pt1: Point3D, pt2: Point3D) =>
  pt1.x === pt2.x && pt1.y === pt2.y && pt1.z === pt2.z;

const checkMatrix: Point3D[] = [
  point3d(-1, -1, -1),
  point3d(0, -1, -1),
  point3d(1, -1, -1),
  point3d(-1, 0, -1),
  point3d(0, 0, -1),
  point3d(1, 0, -1),
  point3d(-1, 1, -1),
  point3d(0, 1, -1),
  point3d(1, 1, -1),

  point3d(-1, -1, 0),
  point3d(0, -1, 0),
  point3d(1, -1, 0),
  point3d(-1, 0, 0),
  point3d(1, 0, 0),
  point3d(-1, 1, 0),
  point3d(0, 1, 0),
  point3d(1, 1, 0),

  point3d(-1, -1, 1),
  point3d(0, -1, 1),
  point3d(1, -1, 1),
  point3d(-1, 0, 1),
  point3d(0, 0, 1),
  point3d(1, 0, 1),
  point3d(-1, 1, 1),
  point3d(0, 1, 1),
  point3d(1, 1, 1),
];

function* getNeighborPoints(origin: Point3D) {
  for (let x = -1; x <= 1; x += 1) {
    for (let y = -1; y <= 1; y += 1) {
      for (let z = -1; z <= 1; z += 1) {
        if (!pointEquals(point3d(x, y, z), point3d(0, 0, 0)))
          yield point3d(origin.x + x, origin.y + y, origin.z + z);
      }
    }
  }
}

type Cube = {
  active: boolean;
  location: Point3D;
};

type DataType = Cube;

class Conway {
  cubes: Cube[];

  constructor(seed: Cube[]) {
    this.cubes = seed;
  }

  findOrAddAt = (location: Point3D): Cube => {
    const found = this.cubes.find((cube) => cube.location === location);
    return found || { active: false, location };
  };

  iterateCube = (cube: Cube): Cube => {
    const newCube = {
      active: cube.active,
      location: cube.location,
    };

    const borderPoints = Array.from(getNeighborPoints(cube.location));

    const activeNeighbors = this.activeCubes.filter((c) => {
      return borderPoints.find((p) => {
        return pointEquals(p, c.location);
      });
    });

    if (cube.active) {
      newCube.active = [2, 3].includes(activeNeighbors.length);
    } else {
      newCube.active = activeNeighbors.length === 3;
    }

    return newCube;
  };

  get bounds() {
    const xVals = this.activeCubes.map((c) => c.location.x);
    const yVals = this.activeCubes.map((c) => c.location.y);
    const zVals = this.activeCubes.map((c) => c.location.z);

    return {
      x: [Math.min(...xVals), Math.max(...xVals)],
      y: [Math.min(...yVals), Math.max(...yVals)],
      z: [Math.min(...zVals), Math.max(...zVals)],
    };
  }

  get activeCubes() {
    return this.cubes.filter((cube) => cube.active);
  }

  checkLocation = (location: Point3D): Cube => {
    return this.iterateCube(this.findOrAddAt(location));
  };

  iterate = (steps: number) => {
    for (let i = 0; i < steps; i += 1) {
      const bounds = { ...this.bounds };
      const newMap = Array<Cube>();

      for (let x = bounds.x[0] - 1; x <= bounds.x[1]; x += 1) {
        for (let y = bounds.y[0] - 1; y <= bounds.y[1]; y += 1) {
          for (let z = bounds.z[0] - 1; z <= bounds.z[1]; z += 1) {
            newMap.push(this.checkLocation(point3d(x, y, z)));
          }
        }
      }
      this.cubes = newMap;
    }
  };
}

function* makePoints(data: string) {
  const rows = data.split("\n");
  for (let x = 0; x < rows[0].length; x += 1) {
    for (let y = 0; y < rows.length; y += 1) {
      yield {
        active: rows[y][x] === "#",
        location: point3d(x, y),
      } as Cube;
    }
  }
}

const makeData = (data: string): DataType[] => {
  return Array.from(makePoints(data));
};

const part1 = (data: DataType[]) => {
  const conway = new Conway(data);
  conway.iterate(6);
  return conway.activeCubes.length;
};

const day16: Day<DataType[]> = {
  title: "Conway Cubes",
  description: `
  The Elves at the North Pole contact you. They'd like some help debugging a malfunctioning experimental 
  energy source aboard one of their super-secret imaging satellites.
  `,
  data: day17data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `
* **How many cubes are left in the active state after the sixth cycle?**
`,
      func: (data) => Number(part1(data)),

      tests: [{ data: test1data, result: 112 }],
    },
  ],
};

export default day16;
