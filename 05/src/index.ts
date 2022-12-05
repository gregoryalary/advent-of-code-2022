import { readFile } from 'fs';
import { resolve as resolvePath } from 'path';

import {
  CrateStack,
  CrateStacks,
  QuantityDecreaser,
  RearrangementApplier,
  RearrangementProcedure,
} from './types/supply-stack.type';
import {
  applyRearrangementForStep1,
  applyRearrangementForStep2,
  decreaseQuantityForStep1,
  decreaseQuantityForStep2,
} from './utils/supply-stack.util';

const getStacksAndProcedure = (): Promise<
  readonly [CrateStacks, RearrangementProcedure]
> =>
  new Promise((resolve) =>
    readFile(resolvePath('in/input.txt'), 'utf8', (_err, data) => {
      const [stackLines, procedureLines] = data.split(/\n\n/);

      resolve([
        stackLines
          .replace(/ {4}/g, '*')
          .replace(/ |\[|\]/g, '')
          .split(/\n/g)
          .slice(0, -1)
          .reduce<CrateStacks>(
            (stacks, stackLine) =>
              stackLine
                .split('')
                .map(
                  (crate, index): CrateStack =>
                    crate === '*'
                      ? typeof stacks[index] === 'undefined'
                        ? []
                        : stacks[index]
                      : typeof stacks[index] === 'undefined'
                      ? [crate]
                      : [crate, ...stacks[index]]
                ),
            []
          ),

        procedureLines.split(/\n/g).map((procedureLine) => {
          const [, quantityAsString, fromAsString, toAsString] =
            procedureLine.split(/move|from|to/g);
          return {
            quantity: Number.parseInt(quantityAsString, 10),
            from: Number.parseInt(fromAsString, 10) - 1,
            to: Number.parseInt(toAsString, 10) - 1,
          };
        }),
      ]);
    })
  );

const applyProcedureToStacks = (
  stacks: CrateStacks,
  procedure: RearrangementProcedure,
  rearrangementApplier: RearrangementApplier,
  quantityDecreaser: QuantityDecreaser
): CrateStacks =>
  procedure.length <= 0
    ? stacks
    : procedure[0].quantity <= 0
    ? applyProcedureToStacks(
        stacks,
        procedure.slice(1),
        rearrangementApplier,
        quantityDecreaser
      )
    : applyProcedureToStacks(
        rearrangementApplier(procedure[0], stacks),
        [quantityDecreaser(procedure[0]), ...procedure.slice(1)],
        rearrangementApplier,
        quantityDecreaser
      );

const buildResult = (
  rearrangementApplier: RearrangementApplier,
  quantityDecreaser: QuantityDecreaser
) =>
  getStacksAndProcedure()
    .then(([stacks, procedure]) =>
      applyProcedureToStacks(
        stacks,
        procedure,
        rearrangementApplier,
        quantityDecreaser
      )
    )
    .then((stacks) =>
      stacks.reduce((result, stack) => result + stack.slice(-1)[0], '')
    );

const part1 = () =>
  buildResult(applyRearrangementForStep1, decreaseQuantityForStep1);

const part2 = () =>
  buildResult(applyRearrangementForStep2, decreaseQuantityForStep2);

Promise.all([part1(), part2()]).then(([part1Answer, part2Answer]) => {
  console.log(`Part 1 => ${part1Answer}`);
  console.log(`Part 2 => ${part2Answer}`);
});
