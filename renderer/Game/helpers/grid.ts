export const isSpaceFree = (walls, x, y) => {
  const str = `${x},${y}`;

  const isWallPresent = walls.has(str);
  return !isWallPresent;
};

export const gridCells = (n) => {
  return n * 16;
};
