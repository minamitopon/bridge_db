export const proxyToArray = (proxy) => {
  return JSON.parse(JSON.stringify(proxy));
};
