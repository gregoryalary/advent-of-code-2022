import { readFile } from 'fs';
import { resolve as resolvePath } from 'path';

import {
  Player1Option,
  Player2Option,
  Round,
} from './types/rock-paper-scissors.type';
import {
  getRoundScoreForPart1,
  getRoundScoreForPart2,
} from './utils/rock-paper-scissors.util';

const getRounds = (): Promise<readonly Round[]> =>
  new Promise((resolve) =>
    readFile(resolvePath('in/input.txt'), 'utf8', (_err, data) =>
      resolve(
        data.split(/\r?\n/).reduce(
          (result, current) => [
            ...result,
            {
              p1: current.split(' ')[0] as Player1Option,
              p2: current.split(' ')[1] as Player2Option,
            },
          ],
          []
        )
      )
    )
  );

const getRoundsScore = (
  rounds: readonly Round[],
  getScore: (round: Round) => number
): number => rounds.reduce((total, round) => total + getScore(round), 0);

const part1 = () =>
  getRounds().then((rounds) => getRoundsScore(rounds, getRoundScoreForPart1));

const part2 = () =>
  getRounds().then((rounds) => getRoundsScore(rounds, getRoundScoreForPart2));

Promise.all([part1, part2]).then(([part1Answer, part2Answer]) => {
  console.log(`Part 1 => ${part1Answer}`);
  console.log(`Part 2 => ${part2Answer}`);
});
