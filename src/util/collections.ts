export const count = (haystack: string, needle: string): number => {
  let score = 0;

  haystack.split("").forEach((step) => {
    score += step === needle ? 1 : 0;
  });
  return score;
};

export const range = (start: number, end: number) =>
  Array.from(Array(end + 1).keys()).slice(start);

export const findTwo = (data: number[], target: number): number => {
  let second = -1;

  const first = data.find((a) =>
    data.find((b) => {
      if (a + b === target) {
        second = b;
        return true;
      }
      return false;
    })
  );
  return first !== undefined ? first * second : -1;
};
