import { SectionAssignmentPair } from '../types/section-assignment.type';

export const sectionAssignmentPairIncludes = (
  pair: SectionAssignmentPair
): boolean =>
  (pair[0].from <= pair[1].from && pair[0].to >= pair[1].to) ||
  (pair[1].from <= pair[0].from && pair[1].to >= pair[0].to);

export const sectionAssignmentPairOverlaps = (
  pair: SectionAssignmentPair
): boolean =>
  Math.sign(pair[0].from - pair[1].to) !==
    Math.sign(pair[0].to - pair[1].from) ||
  pair[0].from === pair[1].from ||
  pair[0].to === pair[1].to;
