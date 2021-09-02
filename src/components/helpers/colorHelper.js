export function getTickColor(res, userResults) {
  if (
    userResults.find(
      r => r.VotingId === res.votingId && r.VotingResult === "AFFIRMATIVE"
    )
  )
    return "green";
  if (
    userResults.find(
      r => r.VotingId === res.votingId && r.VotingResult === "NEGATIVE"
    )
  )
    return "red";
  if (
    userResults.find(
      r => r.VotingId === res.votingId && r.VotingResult === "ABSENT"
    )
  )
    return "orange";
  if (
    userResults.find(
      r => r.VotingId === res.votingId && r.VotingResult === "ABSTENTION"
    )
  )
    return "grey";
  else return "";
}

export function getOpinionColor(res, userResults) {
  if (
    userResults.find(
      r => r.VotingId === res.votingId && r.VotingResult === "AFFIRMATIVE"
    )
  )
    return "success";
  if (
    userResults.find(
      r => r.VotingId === res.votingId && r.VotingResult === "NEGATIVE"
    )
  )
    return "danger";
  if (
    userResults.find(
      r => r.VotingId === res.votingId && r.VotingResult === "ABSENT"
    )
  )
    return "warning";
  if (
    userResults.find(
      r => r.VotingId === res.votingId && r.VotingResult === "ABSTENTION"
    )
  )
    return "secondary";
  else return "";
}
