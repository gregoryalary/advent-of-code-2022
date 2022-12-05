import {
  QuantityDecreaser,
  RearrangementApplier,
} from '../types/supply-stack.type';

export const applyRearrangementForStep1: RearrangementApplier = (
  rearrangement,
  stacks
) =>
  stacks.map((stack, index) => {
    if (index === rearrangement.from) {
      return stack.slice(0, -1);
    } else if (index === rearrangement.to) {
      return [...stack, stacks[rearrangement.from].slice(-1)[0]];
    } else {
      return stack;
    }
  });

export const decreaseQuantityForStep1: QuantityDecreaser = (rearrangement) => ({
  ...rearrangement,
  quantity: rearrangement.quantity - 1,
});

export const applyRearrangementForStep2: RearrangementApplier = (
  rearrangement,
  stacks
) =>
  stacks.map((stack, index) => {
    if (index === rearrangement.from) {
      return stack.slice(0, -rearrangement.quantity);
    } else if (index === rearrangement.to) {
      return [
        ...stack,
        ...stacks[rearrangement.from].slice(-rearrangement.quantity),
      ];
    } else {
      return stack;
    }
  });

export const decreaseQuantityForStep2: QuantityDecreaser = (rearrangement) => ({
  ...rearrangement,
  quantity: 0,
});
