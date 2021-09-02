import React, { Component } from "react";

import { Row, Col, Collapse, ListGroup, Button } from "reactstrap";
import LegislatorListGroup from "./legislatorListGroup";

class LegislatorCollapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: [false, false]
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(i) {
    const newArray = this.state.tooltipOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      tooltipOpen: newArray
    });
  }

  render() {
    const {
      onToggleLegislatorTab,
      legislator,
      legislatorId,
      selectedVoteResult,
      isOpen,
      results
    } = this.props;
    return (
      <React.Fragment>
        <div>
          <Button
            className="m-0 p-0"
            color="link"
            onClick={() => onToggleLegislatorTab()}
            aria-expanded={isOpen}
            aria-controls={"voteInfo" + legislator}
          >
            {legislator}
          </Button>
        </div>
        <Collapse
          isOpen={isOpen}
          //data-parent={"#voteInfo" + legislator}
          id={"voteInfo" + legislator}
        >
          <Row>
            <Col lg="12">
              <ListGroup id="list-tab" role="tablist">
                <LegislatorListGroup
                  legislatorName={legislator}
                  legislatorId={legislatorId}
                  results={results}
                  selectedVoteResult={selectedVoteResult}
                  onToggleTab={this.props.onToggleTab}
                ></LegislatorListGroup>
                {/* <ListGroupItem
                  onClick={() =>
                    this.props.onToggleTab(legislator, VoteResult.Positive)
                  }
                  action
                  //active={selectedVoteResult === legislator + "-Positivos"}
                  color={
                    selectedVoteResult === VoteResult.Positive ? "success" : ""
                  }
                  key={legislator + "-Positivos"}
                >
                  Positivos
                  <TooltipItem
                    targetId={"-Positivos" + legislatorId}
                    result={results.positiveMatch + "/" + results.totalPositive}
                    badgeClasses={"badge badge-success pull-right"}
                  />
                </ListGroupItem>
                <ListGroupItem
                  onClick={() =>
                    this.props.onToggleTab(legislator, VoteResult.Negative)
                  }
                  action
                  //active={selectedVoteResult === legislator + "-Negativos"}
                  color={
                    selectedVoteResult === VoteResult.Negative ? "danger" : ""
                  }
                  key={legislator + "-Negativos"}
                >
                  Negativos
                  <TooltipItem
                    targetId={"-Negativos" + legislatorId}
                    result={results.negativeMatch + "/" + results.totalNegative}
                    badgeClasses={"badge badge-danger pull-right"}
                  />
                </ListGroupItem>
                <ListGroupItem
                  onClick={() =>
                    this.props.onToggleTab(legislator, VoteResult.Absent)
                  }
                  action
                  //active={selectedVoteResult === legislator + "-Ausencias"}
                  color={
                    selectedVoteResult === VoteResult.Absent ? "warning" : ""
                  }
                  key={legislator + "-Ausencias"}
                >
                  Ausencias
                  <TooltipItem
                    targetId={"-Ausencias" + legislatorId}
                    result={results.absentMatch + "/" + results.totalAbsent}
                    badgeClasses={"badge badge-warning pull-right"}
                  />
                </ListGroupItem>
                <ListGroupItem
                  onClick={() =>
                    this.props.onToggleTab(legislator, VoteResult.Abstention)
                  }
                  action
                  //active={selectedVoteResult === legislator + "-Abstinencias"}
                  color={
                    selectedVoteResult === VoteResult.Abstention
                      ? "secondary"
                      : ""
                  }
                  key={legislator + "-Abstinencias"}
                >
                  Abstinencias
                  <TooltipItem
                    targetId={"-Abstinencias" + legislatorId}
                    result={results.absentMatch + "/" + results.totalAbstention}
                    badgeClasses={"badge badge-secondary pull-right"}
                  />
                </ListGroupItem> */}
              </ListGroup>
            </Col>
          </Row>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default LegislatorCollapsible;
