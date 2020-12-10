import { Day } from "util/Day";
import day5data from "./data/day05";

type BoardingPass = {
  row: number;
  seat: number;
};

const substMap = {
  row: [
    { char: "F", val: 0 },
    { char: "B", val: 1 },
  ],
  seat: [
    { char: "L", val: 0 },
    { char: "R", val: 1 },
  ],
};

const decodeRow = (data: string, decoder: keyof typeof substMap): number => {
  let decodedData = data;
  substMap[decoder].forEach(({ char, val }) => {
    decodedData = decodedData.replaceAll(char, val.toString());
  });
  return parseInt(decodedData, 2);
};

const makePass = (data: string) => {
  const row = data.slice(0, 7);
  const seat = data.slice(7);
  return {
    row: decodeRow(row, "row"),
    seat: decodeRow(seat, "seat"),
  };
};

const makeData = (data: string) => data.split("\n").map((row) => makePass(row));

const calcId = (pass: BoardingPass) => pass.row * 8 + pass.seat;

const getHighestSeatId = (passes: BoardingPass[]) => {
  const seatIds = passes.map(calcId);
  return Math.max(...seatIds);
};

const findSeatIdGap = (passes: BoardingPass[]): number => {
  const seatIds = passes.map(calcId).sort((a, b) => a - b);
  return (
    (seatIds.find((val, index, arr) => val - arr[index - 1] > 1) || -1) - 1
  );
};

const day5: Day<BoardingPass[]> = {
  title: "Binary Boarding",
  description: `You dropped your boarding pass! Find your seat through process of elimination.`,
  data: day5data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `* Find the boarding pass with the highest seat ID`,
      func: (passes: BoardingPass[]) => getHighestSeatId(passes),
      tests: [
        { data: "FBFBBFFRLR", result: 44 * 8 + 5 },
        { data: "BFFFBBFRRR", result: 70 * 8 + 7 },
        { data: "FFFBBBFRRR", result: 14 * 8 + 7 },
        { data: "BBFFBBFRLL", result: 102 * 8 + 4 },
      ],
    },
    {
      title: "Part 2",
      description: `* Find the ID of your seat
* The seats with IDs +1 and -1 from yours will be in your list
* Some of the seats at the very front and back of the plane don't exist on this aircraft
* Your seat wasn't at the very front or back
      `,
      func: (passes: BoardingPass[]) => findSeatIdGap(passes),
    },
  ],
};

export default day5;
