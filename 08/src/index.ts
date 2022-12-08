import { readFile } from 'fs';
import { resolve as resolvePath } from 'path';

import { TreeHeightGrid } from './types/tree-grid';
import {
  getScenicScore,
  mapGrid,
  treeIsVisibleFromOutside,
} from './utils/tree-grid.util';

const getGrid = (): Promise<TreeHeightGrid> =>
  new Promise((resolve) =>
    readFile(resolvePath('in/input.txt'), 'utf8', (_err, data) =>
      resolve(
        data
          .replace(/ /g, '')
          .split(/\n/g)
          .map((line) =>
            line
              .split('')
              .map((heightAsString) => Number.parseInt(heightAsString, 10))
          )
      )
    )
  );

const part1 = () =>
  getGrid()
    .then((grid) => mapGrid(grid, treeIsVisibleFromOutside))
    .then((grid) =>
      grid.reduce(
        (countVisible, row) =>
          countVisible +
          row.reduce(
            (countVisible, isVisible) => countVisible + (isVisible ? 1 : 0),
            0
          ),
        0
      )
    );

const part2 = () =>
  getGrid()
    .then((grid) => mapGrid(grid, getScenicScore))
    .then((grid) =>
      grid.reduce(
        (maxScore, row) =>
          Math.max(
            maxScore,
            row.reduce((maxScore, score) => Math.max(maxScore, score), 0)
          ),
        0
      )
    );

Promise.all([part1(), part2()]).then(([part1Answer, part2Answer]) => {
  console.log(`Part 1 => ${part1Answer}`);
  console.log(`Part 2 => ${part2Answer}`);
});
