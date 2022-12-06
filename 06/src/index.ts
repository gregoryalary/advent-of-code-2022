import { readFile } from 'fs';
import { resolve as resolvePath } from 'path';

import { Stream } from './types/communication-stream.type';

const getStream = (): Promise<Stream> =>
  new Promise((resolve) =>
    readFile(resolvePath('in/input.txt'), 'utf8', (_err, data) =>
      resolve(data.split(''))
    )
  );

const findPositionOfFirstNDifferentCharacter = (
  stream: Stream,
  n: number,
  index = 0
): number =>
  stream.length < n + index
    ? -1
    : stream
        .slice(index, index + n)
        .every(
          (element, index, array) =>
            array.slice(0, index).indexOf(element) === -1
        )
    ? index + n
    : findPositionOfFirstNDifferentCharacter(stream, n, index + 1);

const part1 = () =>
  getStream().then((stream) =>
    findPositionOfFirstNDifferentCharacter(stream, 4)
  );

const part2 = () =>
  getStream().then((stream) =>
    findPositionOfFirstNDifferentCharacter(stream, 14)
  );

Promise.all([part1(), part2()]).then(([part1Answer, part2Answer]) => {
  console.log(`Part 1 => ${part1Answer}`);
  console.log(`Part 2 => ${part2Answer}`);
});
