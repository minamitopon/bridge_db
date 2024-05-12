export const proxyToArray = (proxy) => {
  return JSON.parse(JSON.stringify(proxy));
};

export const snakeToPascal = (word) => {
  return word
    .split("_")
    .map((l) => l.charAt(0).toUpperCase() + l.slice(1))
    .join();
};

export const isBetweenRange = (x, min, max) => {
  return min <= x && x <= max;
};
