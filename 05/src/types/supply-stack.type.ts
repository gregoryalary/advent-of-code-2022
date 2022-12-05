export type Crate = string;

export type CrateStack = readonly Crate[];

export type CrateStacks = readonly CrateStack[];

export type Rearrangement = {
  readonly quantity: number;
  readonly from: number;
  readonly to: number;
};

export type RearrangementProcedure = readonly Rearrangement[];

export type RearrangementApplier = (
  rearrangement: Rearrangement,
  stacks: CrateStacks
) => CrateStacks;

export type QuantityDecreaser = (rearrangement: Rearrangement) => Rearrangement;
