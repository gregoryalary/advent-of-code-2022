export type Player1Option = 'A' | 'B' | 'C';

export type Player2Option = 'X' | 'Y' | 'Z';

export type Round = {
  readonly p1: Player1Option;
  readonly p2: Player2Option;
};

export type Strategy = {
  readonly [key in Player1Option]: Player2Option;
};
