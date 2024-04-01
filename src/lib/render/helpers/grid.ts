export const gridCells = (n: number) => {
  return n * 32;
};

export const isSpaceFree = (walls: Set<string>, x: number, y: number) => {
  const isWallPresent = walls.has(`${x},${y}`);
  return !isWallPresent;
};
