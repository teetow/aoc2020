import { Day } from "util/Day";
import day16data, { test1data } from "./data/day16";

type FieldName =
  | "departureLocation"
  | "departureStation"
  | "departurePlatform"
  | "departureTrack"
  | "departureDate"
  | "departureTime"
  | "arrivalLocation"
  | "arrivalStation"
  | "arrivalPlatform"
  | "arrivalTrack"
  | "class"
  | "duration"
  | "price"
  | "route"
  | "row"
  | "seat"
  | "train"
  | "type"
  | "wagon"
  | "zone";

const FieldNames: Record<string, FieldName> = {
  "departure location": "departureLocation",
  "departure station": "departureStation",
  "departure platform": "departurePlatform",
  "departure track": "departureTrack",
  "departure date": "departureDate",
  "departure time": "departureTime",
  "arrival location": "arrivalLocation",
  "arrival station": "arrivalStation",
  "arrival platform": "arrivalPlatform",
  "arrival track": "arrivalTrack",
  class: "class",
  duration: "duration",
  price: "price",
  route: "route",
  row: "row",
  seat: "seat",
  train: "train",
  type: "type",
  wagon: "wagon",
  zone: "zone",
};

type Ticket = Record<FieldName, number>;

type Range = { min: number; max: number };
const inRange = (val: number, range: Range) =>
  val >= range.min && val <= range.max;

type TicketSchema = {
  fieldName: FieldName;
  ranges: Range[];
};

class Validator {
  schemas: TicketSchema[];

  constructor(schemas: TicketSchema[]) {
    this.schemas = schemas;
  }

  static parseSchema = (data: string) => {
    const schemas = data.split("\n").map((line) => {
      const [field, rangeDescs] = line.split(":");

      const ranges = rangeDescs.split(" or ").map((rangeDesc) => {
        const [min, max] = rangeDesc.split("-").map((val) => Number(val));
        return { min, max } as Range;
      });
      return {
        fieldName: FieldNames[field],
        ranges,
      } as TicketSchema;
    });
    return schemas;
  };

  static parseTicket = (data: string) =>
    data.split(",").map((val) => Number(val));

  validate = (value: number): TicketSchema[] => {
    return this.schemas.filter((schema) =>
      schema.ranges.some((range) => inRange(value, range))
    );
  };

  getInvalidFields = (ticket: number[]): number[] => {
    return ticket.filter((num) => {
      const validFor = this.validate(num);
      return validFor.length === 0;
    });
  };
}

type DataSet = {
  schema: TicketSchema[];
  yourTicket: number[];
  nearbyTickets: number[][];
};

type DataType = DataSet;

const makeData = (data: string): DataType => {
  const [schemaDesc, yourTicketDesc, nearbyTicketsDesc] = data.split("\n\n");
  const schema = Validator.parseSchema(schemaDesc);
  const yourTicket = Validator.parseTicket(
    yourTicketDesc.split("your ticket:\n")[1]
  );
  const nearbyTickets = nearbyTicketsDesc
    .split("nearby tickets:\n")[1]
    .split("\n")
    .map((row) => Validator.parseTicket(row));

  return {
    schema,
    yourTicket,
    nearbyTickets,
  };
};

const part1 = (data: DataType) => {
  const v = new Validator(data.schema);
  const invalidTickets = data.nearbyTickets.map((ticket) =>
    v.getInvalidFields(ticket)
  );
  const errorSum = invalidTickets.reduce(
    (acc, ticket) =>
      acc + ticket.reduce((ticketAcc, num) => ticketAcc + num, 0),
    0
  );
  return errorSum;
};

const day16: Day<DataType> = {
  title: "Rambunctious Recitation",
  description: `
  The train ticket you were given is in a language you don't understand.
  `,
  data: day16data,
  dataConv: makeData,
  parts: [
    {
      title: "Part 1",
      description: `
* **What is your ticket scanning error rate?**
`,
      func: (data) => Number(part1(data)),

      tests: [{ data: test1data, result: 4 + 55 + 12 }],
    },
  ],
};

export default day16;
