const prettyPerfTimer = (time: number) => {
  let delta = time / 1000.0;
  let unit = "s";

  if (delta < 1) {
    delta *= 1000;
    unit = "ms";
  }

  if (delta < 1) {
    delta *= 1000;
    unit = "µs";
  }
  console.log(`writing ${time} as ${delta.toPrecision(3)}${unit}`);
  return `${delta.toPrecision(3)}${unit}`;
};

export default prettyPerfTimer;
