export type Test<T> = {
  data: T;
  result: string | number;
};

export type TestRun<T> = Test<T> & {
  index: number;
  runResult: T;
};

export type DayPart<T> = {
  title: string;
  data?: T;
  func?: (data: T) => string | number;
  tests?: Test<T>[];
};

export type Day<T> = {
  title?: string;
  data: T;
  parts: DayPart<T>[];
};
