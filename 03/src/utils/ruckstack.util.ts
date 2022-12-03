import { Item, Rucksack, RucksackGroup } from '../types/rucksack.type';

export const getItemPriority = (item: Item): number =>
  item.charCodeAt(0) - (item.charCodeAt(0) <= 96 ? 38 : 96);

export const getRucksackError = (rucksack: Rucksack): Item =>
  rucksack.c1.find((item) => ~rucksack.c2.indexOf(item));

export const getRucksackGroupCommonItem = (
  rucksackGroup: RucksackGroup
): Item =>
  rucksackGroup[0].c1
    .concat(rucksackGroup[0].c2)
    .find(
      (item) =>
        (~rucksackGroup[1].c1.indexOf(item) ||
          ~rucksackGroup[1].c2.indexOf(item)) &&
        (~rucksackGroup[2].c1.indexOf(item) ||
          ~rucksackGroup[2].c2.indexOf(item))
    );
