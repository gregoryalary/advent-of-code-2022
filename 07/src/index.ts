import { readFile } from 'fs';
import { resolve as resolvePath } from 'path';

import { Directory } from './types/filesystem-cli.type';

const getDirectoryFromPath = (
  directory: Directory,
  path: string[]
): Directory => {
  if (path.length <= 0) {
    return directory;
  } else {
    return getDirectoryFromPath(
      directory.children.find((child) => child.name === path[0]) as Directory,
      path.slice(1, path.length)
    );
  }
};

const extrapolateFileSystemFromCommandsLog = (): Promise<Directory> =>
  new Promise((resolve) =>
    readFile(resolvePath('in/input.txt'), 'utf8', (_err, data) => {
      const root: Directory = {
        name: '/',
        children: [],
        size: 0,
      };

      let path: string[] = [];

      data.split(/\r?\n/).forEach((line) => {
        const splittedLine = line.split(' ');
        const currentDirectory = getDirectoryFromPath(root, path);

        if (splittedLine[0] === '$' && splittedLine[1] === 'cd') {
          path = ((arg: string) => {
            switch (arg) {
              case '/':
                return [];
              case '..':
                return path.slice(0, -1);
              default:
                return [...path, arg];
            }
          })(splittedLine[2]);
        } else if (splittedLine[0] === '$' && splittedLine[1] === 'ls') {
          // we don't care
        } else if (splittedLine[0] === 'dir') {
          currentDirectory.children.push({
            name: splittedLine[1],
            children: [],
            size: 0,
          });
        } else {
          const size = Number.parseInt(splittedLine[0], 10);

          // increments all sizes
          for (let index = 0; index <= path.length; index = index + 1) {
            const directoryToAddSizeTo = getDirectoryFromPath(
              root,
              path.slice(0, index)
            );
            directoryToAddSizeTo.size = directoryToAddSizeTo.size + size;
          }

          currentDirectory.children.push({
            name: splittedLine[1],
            size,
          });
        }
      });

      resolve(root);
    })
  );

const findDirectoriesSatisfyingPredicates = (
  dir: Directory,
  predicate: (dir: Directory) => boolean
): Directory[] => {
  return [
    ...dir.children
      .filter((child): child is Directory => 'children' in child)
      .flatMap((child) =>
        findDirectoriesSatisfyingPredicates(child, predicate)
      ),
    ...(predicate(dir) ? [dir] : []),
  ];
};

extrapolateFileSystemFromCommandsLog()
  .then((root) =>
    findDirectoriesSatisfyingPredicates(
      root,
      (dir) => root.size - dir.size >= 30000000
    )
  )
  .then((directories) => directories.map((dir) => `${dir.name} / ${dir.size}`))
  .then(console.log);

const part1 = () =>
  extrapolateFileSystemFromCommandsLog()
    .then((dir) =>
      findDirectoriesSatisfyingPredicates(dir, (dir) => dir.size <= 100000)
    )
    .then((directories) =>
      directories.reduce((sum, directory) => sum + directory.size, 0)
    );

const part2 = () =>
  extrapolateFileSystemFromCommandsLog()
    .then((root) =>
      findDirectoriesSatisfyingPredicates(
        root,
        (dir) => 70000000 - root.size + dir.size >= 30000000
      )
    )
    .then((directories) =>
      directories.reduce(
        (smallestSize, directory) => Math.min(smallestSize, directory.size),
        directories[0].size
      )
    );

Promise.all([part1(), part2()]).then(([part1result, part2result]) => {
  console.log(`Part 1 => ${part1result}`);
  console.log(`Part 2 => ${part2result}`);
});
