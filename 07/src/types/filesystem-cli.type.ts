export type File = {
  name: string;
  size: number;
};

export type Directory = {
  name: string;
  size: number;
  children: (Directory | File)[];
};

export type LsCommand = {
  program: 'ls';
  result: File[];
};

export type CdComand = {
  program: 'cd';
  arg: '..' | '/' | Directory;
};

export type Command = LsCommand | CdComand;
