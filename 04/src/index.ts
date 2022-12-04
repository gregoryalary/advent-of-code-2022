import { readFile } from 'fs';
import { resolve as resolvePath } from 'path';

import { SectionAssignmentPair } from './types/section-assignment.type';
import {
  sectionAssignmentPairIncludes,
  sectionAssignmentPairOverlaps,
} from './utils/section-assignment.util';

const getSectionAssignmentPairs = (): Promise<
  readonly SectionAssignmentPair[]
> =>
  new Promise((resolve) =>
    readFile(resolvePath('in/input.txt'), 'utf8', (_err, data) =>
      resolve(
        data.split(/\r?\n/).map((line) => {
          const splitted = line.split(/,|-/g);
          return [
            {
              from: Number.parseInt(splitted[0], 10),
              to: Number.parseInt(splitted[1], 10),
            },
            {
              from: Number.parseInt(splitted[2], 10),
              to: Number.parseInt(splitted[3], 10),
            },
          ];
        })
      )
    )
  );

const part1 = () =>
  getSectionAssignmentPairs()
    .then((sectionAssignmentPairs) =>
      sectionAssignmentPairs.filter(sectionAssignmentPairIncludes)
    )
    .then((sectionAssignmentPairs) => sectionAssignmentPairs.length);

const part2 = () =>
  getSectionAssignmentPairs()
    .then((sectionAssignmentPairs) =>
      sectionAssignmentPairs.filter(sectionAssignmentPairOverlaps)
    )
    .then((sectionAssignmentPairs) => sectionAssignmentPairs.length);

Promise.all([part1(), part2()]).then(([part1Answer, part2Answer]) => {
  console.log(`Part 1 => ${part1Answer}`);
  console.log(`Part 2 => ${part2Answer}`);
});
