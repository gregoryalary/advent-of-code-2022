import { readFile } from 'fs';
import { resolve as resolvePath } from 'path';

import { ElveCalories } from './types/elve-calories.type';

const getElvesCaloriesList = (): Promise<readonly ElveCalories[]> =>
  new Promise((resolve) =>
    readFile(resolvePath('in/input.txt'), 'utf8', (_err, data) =>
      resolve(
        data
          .split(/\r?\n/)
          .reduce<readonly ElveCalories[]>(
            (result, current) =>
              current.length === 0
                ? [...result, []]
                : [
                    ...result.slice(0, -1),
                    [
                      ...result[result.length - 1],
                      Number.parseInt(current, 10),
                    ],
                  ],
            [[]]
          )
      )
    )
  );

const findMaxCalories = (caloriesList: readonly ElveCalories[]): number =>
  caloriesList
    .map((calories) => calories.reduce((cal, sum) => sum + cal, 0))
    .reduce((calories, max) => Math.max(calories, max), 0);
const part1 = (): Promise<number> =>
  getElvesCaloriesList().then(findMaxCalories);

const findTopNMaxCalories = (
  caloriesList: readonly ElveCalories[],
  count: number
): number =>
  caloriesList
    .map((calories) => calories.reduce((cal, sum) => sum + cal, 0))
    .reduce<readonly number[]>(
      (topN, current) =>
        [...topN, current].sort((a, b) => b - a).slice(0, count),
      []
    )
    .reduce((cal, sum) => sum + cal, 0);

const part2 = (): Promise<number> =>
  getElvesCaloriesList().then((list) => findTopNMaxCalories(list, 3));

part1().then((answer) => console.log(`Part 1 => ${answer}`));
part2().then((answer) => console.log(`Part 2 => ${answer}`));
