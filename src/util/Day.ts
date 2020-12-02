export type Test<T, K extends number | string | boolean> = {
  data: T;
  result: K;
};

export type TestRun<T extends number | string | boolean> = Test<unknown, T> & {
  index: number;
  runResult?: T;
};

export type DayPart<T> = {
  title: string;
  func?: (data: T) => string | number;
  tests?: Test<unknown, number | string | boolean>[];
};

export type Day<T> = {
  title?: string;
  data: T;
  parts: DayPart<T>[];
};
