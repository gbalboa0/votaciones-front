import React from "react";
import { ListGroupItem } from "reactstrap";
import TooltipItem from "../commons/tooltipItem";
import { mapEnumToColor } from "../helpers/enums/voteResultEnum";
import VoteResult from "../helpers/enums/voteResultEnum";
var _ = require("lodash");

const getResult = (voteResult, results) => {
  //console.log("switch", voteResult, results);
  switch (voteResult) {
    case VoteResult.Positive:
      return `${results.positiveMatch}  / ${results.totalPositive}`;
    case VoteResult.Negative:
      return `${results.negativeMatch}  / ${results.totalNegative}`;
    case VoteResult.Absent:
      return `${results.absentMatch}  / ${results.totalAbsent}`;
    case VoteResult.Abstention:
      return `${results.abstentionMatch}  / ${results.totalAbstention}`;
    default:
      return null;
  }
};

export function LegislatorTab(props) {
  const {
    legislatorName,
    legislatorId,
    results,
    selectedVoteResult,
    voteResult,
    onToggleTab
  } = props;
  //console.log("voteEnum Result", voteResult);
  return (
    <ListGroupItem
      onClick={() => onToggleTab(legislatorName, voteResult)}
      action
      //active={selectedVoteResult === legislatorName + "-Positivos"}
      color={selectedVoteResult === voteResult ? "success" : ""}
      key={`${legislatorName} - ${voteResult}`}
    >
      {voteResult}
      <TooltipItem
        //targetId={"-Positivos" + legislatorId}
        targetId={`A${legislatorId}-${voteResult}`}
        result={getResult(voteResult, results)}
        badgeClasses={`badge badge-${mapEnumToColor(voteResult)} pull-right`}
      />
    </ListGroupItem>
  );
}

export default LegislatorTab;
