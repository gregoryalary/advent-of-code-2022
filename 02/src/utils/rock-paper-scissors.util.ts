import {
  Player1Option,
  Player2Option,
  Round,
} from '../types/rock-paper-scissors.type';

const scoreForPlayer2Option: { readonly [key in Player2Option]: number } = {
  X: 1,
  Y: 2,
  Z: 3,
};

const winTable: {
  readonly [key in Player1Option]: {
    readonly win: Player2Option;
    readonly draw: Player2Option;
    readonly lose: Player2Option;
  };
} = {
  A: {
    win: 'Z',
    draw: 'X',
    lose: 'Y',
  },
  B: {
    win: 'X',
    draw: 'Y',
    lose: 'Z',
  },
  C: {
    win: 'Y',
    draw: 'Z',
    lose: 'X',
  },
};

export const getRoundScoreForPart1 = (round: Round): number =>
  scoreForPlayer2Option[round.p2] +
  {
    [winTable[round.p1].win]: 0,
    [winTable[round.p1].lose]: 6,
    [winTable[round.p1].draw]: 3,
  }[round.p2];

export const getRoundScoreForPart2 = (round: Round): number =>
  getRoundScoreForPart1({
    ...round,
    p2: {
      X: winTable[round.p1].win,
      Y: winTable[round.p1].draw,
      Z: winTable[round.p1].lose,
    }[round.p2],
  });
