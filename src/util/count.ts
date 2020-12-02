const count = (haystack: string, needle: string): number => {
  let score = 0;

  haystack.split("").forEach((step) => {
    score += step === needle ? 1 : 0;
  });
  return score;
};

export default count;
