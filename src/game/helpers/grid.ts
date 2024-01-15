export const isSpaceFree = (walls: Set<string>, x: number, y: number) => {
  const str = `${x},${y}`;

  const isWallPresent = walls.has(str);
  return !isWallPresent;
};

export const gridCells = (n: number) => {
  return n * 16;
};
