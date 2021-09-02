import React from "react";
import { TabPane, ListGroup } from "reactstrap";
import { mapOpinionToEnum } from "../helpers/enums/voteResultEnum";
import { PartyTab } from "./partyTab";

const generateVoteResultKey = (legislator, voteResult) => {
  return legislator + "-" + voteResult;
};

export function PartyTabPane(props) {
  const {
    legislator,
    legislatorId,
    results,
    onToggleLawTab,
    currentVoting,
    userResults
  } = props;
  var tabs = [];
  for (const voteResult in results) {
    //console.log("voteResult map", voteResult, mapOpinionToEnum(voteResult));
    tabs.push(
      <TabPane
        tabId={generateVoteResultKey(legislator, mapOpinionToEnum(voteResult))}
        key={generateVoteResultKey(legislator, mapOpinionToEnum(voteResult))}
      >
        <ListGroup>
          {// eslint-disable-next-line no-loop-func
          results[voteResult].map(res => {
            return (
              <PartyTab
                key={voteResult + legislatorId + res.votingId}
                legislatorName={legislator}
                legislatorId={legislatorId}
                res={res}
                currentVoting={currentVoting}
                userResults={userResults}
                onToggleLawTab={onToggleLawTab}
              />
            );
          })}
        </ListGroup>
      </TabPane>
    );
  }
  return tabs;
}

export default PartyTabPane;
