import { Day } from "util/Day";
import day13data, { test1data } from "./data/day13";

type Schedule = {
  departure: number;
  buses: number[];
};

type DataType = Schedule;

const calcNextBus = (bus: number, timestamp: number) => {
  const nextBus = Math.floor(timestamp / bus) * bus;
  return nextBus < timestamp ? nextBus + bus : nextBus;
};

const makeData = (data: string): DataType => {
  const lines = data.split("\n");
  const departure = lines[0];
  const buses = lines[1].split(",").filter((item) => item !== "x");
  return {
    departure: Number(departure),
    buses: buses.map((bus) => Number(bus) || -1),
  };
};

const part1 = (data: DataType): number => {
  const busDepartures = data.buses.map((bus) => ({
    bus,
    departure: calcNextBus(bus, data.departure),
  }));
  const nextBus = busDepartures.sort((a, b) => a.departure - b.departure)[0];
  return (nextBus.departure - data.departure) * nextBus.bus;
};

const part2 = (data: DataType): number => {
  return -1;
};

const day13: Day<DataType> = {
  title: "Shuttle Search",
  description: `
  Your ferry can make it safely to a nearby port, but you'll need to get a shuttle bus to the nearest airport.

  Each bus has an ID number that also indicates how often the bus leaves for the airport.
`,
  data: day13data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `
* Bus schedules are defined based on a timestamp
* At timestamp 0, every bus simultaneously departed from the sea port
* The ID number of a bus is also the time it takes to complete one loop
* Figure out the earliest bus you can take to the airport
* **Return ID of bus * number of minutes you have to wait**
`,
      func: (data) => part1(data),
      tests: [
        {
          data: test1data,
          result: 59 * 5,
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

export default day13;
