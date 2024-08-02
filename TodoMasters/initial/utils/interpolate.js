export function interpolate(string, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  return new Function(...keys, `return \`${string}\``)(...values);
}
