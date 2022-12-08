import { TreeHeight, TreeHeightGrid } from '../types/tree-grid';

const treeIsHighest = (tree: TreeHeight, trees: readonly TreeHeight[]) =>
  trees.every((candidate) => candidate < tree);

const treeIsVisibleInLine = (
  index: number,
  line: readonly TreeHeight[]
): boolean => (
    treeIsHighest(line[index], line.slice(0, index)) ||
    treeIsHighest(line[index], line.slice(index + 1))
  )

export const treeIsVisibleFromOutside = (
  rowIndex: number,
  columnIndex: number,
  grid: TreeHeightGrid
) =>
  treeIsVisibleInLine(columnIndex, grid[rowIndex]) ||
  treeIsVisibleInLine(
    rowIndex,
    grid.map((row) => row[columnIndex])
  );

const countVisibleTrees = (
  tree: TreeHeight,
  trees: readonly TreeHeight[]
): number => {
  const firstHigherTree = trees.findIndex((candidate) => candidate >= tree);
  return firstHigherTree >= 0 ? firstHigherTree + 1 : trees.length;
};

const lineScenicScore = (index: number, line: readonly TreeHeight[]): number =>
  countVisibleTrees(line[index], line.slice(0, index).reverse()) *
  countVisibleTrees(line[index], line.slice(index + 1));

export const getScenicScore = (
  rowIndex: number,
  columnIndex: number,
  grid: TreeHeightGrid
) =>
  lineScenicScore(columnIndex, grid[rowIndex]) *
  lineScenicScore(
    rowIndex,
    grid.map((row) => row[columnIndex])
  );

export const mapGrid = <T>(
  grid: TreeHeightGrid,
  mapper: (rowIndex: number, columnIndex: number, grid: TreeHeightGrid) => T
): readonly (readonly T[])[] =>
  grid.map((row, rowIndex) =>
    row.map((_tree, columnIndex) => mapper(rowIndex, columnIndex, grid))
  );
