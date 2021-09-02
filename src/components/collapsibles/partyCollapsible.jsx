import React, { Component } from "react";
import { Row, Col, TabContent } from "reactstrap";
import PartyTabPane from "./partyTabPane";

class PartyCollapsible extends Component {
  state = {};

  findInUserResults = (res, userResults) => {
    if (userResults) {
      for (const opinion in userResults) {
        const index = opinion.find(r => r.VotingId === res.votingId);
        if (index) return index;
      }
    }
    return undefined;
  };

  isActive = (res, currentVoting) => {
    return currentVoting
      ? res.votingId === currentVoting.voting.votingId
      : false;
  };

  render() {
    const {
      activeVoteResultTabId,
      legislator,
      legislatorId,
      results,
      onToggleLawTab,
      currentVoting,
      userResults
    } = this.props;
    //console.log("render results", results);
    return (
      <React.Fragment>
        <Row>
          <Col lg="12">
            <TabContent activeTab={activeVoteResultTabId}>
              <PartyTabPane
                legislator={legislator}
                legislatorId={legislatorId}
                results={results}
                currentVoting={currentVoting}
                userResults={userResults}
                onToggleLawTab={onToggleLawTab}
              />
            </TabContent>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default PartyCollapsible;
