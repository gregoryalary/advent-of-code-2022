export type Item = string;

export type Compartiment = readonly string[];

export type Rucksack = {
  readonly c1: Compartiment;
  readonly c2: Compartiment;
};

export type RucksackWithErrors = {
  readonly rucksack: Rucksack;
  readonly error: Item;
};

export type RucksackGroup = readonly [Rucksack, Rucksack, Rucksack];

export type RucksackGroupWithCommonItem = {
  readonly rucksackGroup: RucksackGroup;
  readonly commonItem: Item;
};
