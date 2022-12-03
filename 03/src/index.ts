import { readFile } from 'fs';
import { resolve as resolvePath } from 'path';

import {
  Item,
  Rucksack,
  RucksackGroup,
  RucksackGroupWithCommonItem,
  RucksackWithErrors,
} from './types/rucksack.type';
import { getItemPriority, getRucksackError, getRucksackGroupCommonItem } from './utils/ruckstack.util';

const getRucksacks = (): Promise<readonly Rucksack[]> =>
  new Promise((resolve) =>
    readFile(resolvePath('in/input.txt'), 'utf8', (_err, data) =>
      resolve(
        data.split(/\r?\n/).map((line) => ({
          c1: line.slice(0, line.length / 2).split(''),
          c2: line.slice(line.length / 2).split(''),
        }))
      )
    )
  );

const getRuckstacksGroups = (
  rucksacks: readonly Rucksack[]
): readonly RucksackGroup[] =>
  rucksacks.reduce(
    (groups, rucksack, index, array) =>
      (index + 1) % 3 === 0 && index >= 2
        ? [...groups, [array[index - 2], array[index - 1], rucksack]]
        : groups,
    []
  );

const findRucksacksErrors = (
  rucksacks: readonly Rucksack[]
): readonly RucksackWithErrors[] =>
  rucksacks.map((rucksack) => ({
    rucksack,
    error: getRucksackError(rucksack),
  }));

const findRucksackGroupsCommonItems = (
  rucksackGroups: readonly RucksackGroup[]
): readonly RucksackGroupWithCommonItem[] =>
  rucksackGroups.map((rucksackGroup) => ({
    rucksackGroup: rucksackGroup,
    commonItem: getRucksackGroupCommonItem(rucksackGroup),
  }));

const findPrioritySum = <T>(
  list: readonly T[],
  getItem: (elt: T) => Item
): number => list.reduce((sum, elt) => sum + getItemPriority(getItem(elt)), 0);

const part1 = () =>
  getRucksacks()
    .then(findRucksacksErrors)
    .then((list) =>
      findPrioritySum(list, (ruckstackWithError) => ruckstackWithError.error)
    );

const part2 = () =>
  getRucksacks()
    .then(getRuckstacksGroups)
    .then(findRucksackGroupsCommonItems)
    .then((list) =>
      findPrioritySum(
        list,
        (rucksackGroupsWithCommonItem) =>
          rucksackGroupsWithCommonItem.commonItem
      )
    );

Promise.all([part1(), part2()]).then(([part1Answer, part2Answer]) => {
  console.log(`Part 1 => ${part1Answer}`);
  console.log(`Part 2 => ${part2Answer}`);
});
