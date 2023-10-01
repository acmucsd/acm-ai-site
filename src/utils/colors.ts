export const colors = [
  '#D0DDD7',
  '#A5AE9E',
  '#EDFBC1',
  '#F3D861',
  '#3454D1',
  '#D1345B',
  '#77567A',
  '#E39EC1',
  '#D7CEB2',
  '#F87060',
  '#A7D49B',
  '#F7583C',
  '#567568',
  '#61DCCF',
  '#565857',
  '#F5D3C8',
  '#FFD97D',
  '#7D8EFF',
];
export const stringHash = (str: string) => {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i) * 2;
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
export const genColor = (seed: string) => {
  const p = Math.abs(stringHash(seed));
  return colors[p % colors.length];
};
