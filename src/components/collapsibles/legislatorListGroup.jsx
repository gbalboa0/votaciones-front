import React from "react";
import { listVoteResultsEnum } from "../helpers/enums/voteResultEnum";
import LegislatorTab from "./legislatorTab";

export function LegislatorListGroup(props) {
  const {
    legislatorName,
    legislatorId,
    results,
    selectedVoteResult,
    onToggleTab
  } = props;
  const votes = listVoteResultsEnum();
  var tabs = [];
  for (const voteResult in votes) {
    tabs.push(
      <LegislatorTab
        legislatorName={legislatorName}
        legislatorId={legislatorId}
        results={results}
        selectedVoteResult={selectedVoteResult}
        voteResult={votes[voteResult]}
        onToggleTab={onToggleTab}
      ></LegislatorTab>
    );
  }
  return tabs;
}

export default LegislatorListGroup;
