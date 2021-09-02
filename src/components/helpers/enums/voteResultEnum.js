/* const VoteResult = {
  Positive: 1,
  Negative: 2,
  Absent: 3,
  Abstention: 4
}; */

const VoteResult = {
  Positive: "Positivo",
  Negative: "Negativo",
  Absent: "Ausente",
  Abstention: "Abstencion"
};

export const mapOpinionToEnum = opinion => {
  switch (opinion) {
    case "AFFIRMATIVE":
      return VoteResult.Positive;
    case "NEGATIVE":
      return VoteResult.Negative;
    case "ABSENT":
      return VoteResult.Absent;
    case "ABSTENTION":
      return VoteResult.Abstention;
    default:
      return null;
  }
};

export const mapEnumToColor = voteResult => {
  switch (voteResult) {
    case VoteResult.Positive:
      return "success";
    case VoteResult.Negative:
      return "danger";
    case VoteResult.Absent:
      return "warning";
    case VoteResult.Abstention:
      return "secondary";
    default:
      return null;
  }
};

export const listVoteResultsEnum = () => {
  return [
    VoteResult.Positive,
    VoteResult.Negative,
    VoteResult.Abstention,
    VoteResult.Absent
  ];
};

export default VoteResult;
