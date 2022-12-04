export type SectionAssignment = {
  readonly from: number;
  readonly to: number;
};

export type SectionAssignmentPair = readonly [
  SectionAssignment,
  SectionAssignment
];
