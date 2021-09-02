import React from "react";
import { ListGroupItem } from "reactstrap";
import MatchIcon from "../commons/matchIcon";
import { getTickColor } from "../helpers/colorHelper";

export function PartyTab(props) {
  const {
    legislatorName,
    legislatorId,
    res,
    currentVoting,
    userResults,
    onToggleLawTab
  } = props;

  const isActive = (res, currentVoting) => {
    return currentVoting
      ? res.votingId === currentVoting.voting.votingId
      : false;
  };

  return (
    <ListGroupItem
      onClick={() => onToggleLawTab(legislatorName, res)}
      action
      key={res.title}
      active={isActive(res, currentVoting)}
      style={
        isActive(res, currentVoting) ? { backgroundColor: "#73818f87" } : {}
      }
    >
      {res.title}
      <div className="pull-right">
        <MatchIcon
          didMatch={res.didMatch}
          color={getTickColor(res, userResults)}
          userResult={userResults.filter(r => r.VotingId === res.votingId)[0]}
          targetId={"Leg" + legislatorId + res.votingId}
        />
      </div>
    </ListGroupItem>
  );
}

export default PartyTab;
