// def timestamp(start, msg=""):
//     delta = (time.time() - start)*1000
//     unit = "ms"
//     if delta < 1/1000:
//         delta = delta * 1000
//         unit = "µs"
//     print(f"{delta:8.2f} {unit}\t{msg}")

const prettyPerfTimer = (time: number) => {
  let delta = time;
  let unit = "ms";
  if (delta < 1 / 1000) {
    delta *= 1000;
    unit = "µs";
  }
  return `${delta.toPrecision(2)}${unit}`;
};

export default prettyPerfTimer;
