import React, { Component } from "react";

class MatcherVotingRowCollapsible extends Component {
  state = {
    activeTab: 1
  };

  constructor(props) {
    super(props);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      collapse: false,
      accordion: [true, false, false],
      custom: [true, false],
      status: "Closed",
      fadeIn: true,
      timeout: 300
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onEntering() {
    this.setState({ status: "Opening..." });
  }

  onEntered() {
    this.setState({ status: "Opened" });
  }

  onExiting() {
    this.setState({ status: "Closing..." });
  }

  onExited() {
    this.setState({ status: "Closed" });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { body } = this.props;
    return (
      <div>
        <Row>
          <Col xs="4">
            <ListGroup id="list-tab" role="tablist">
              <ListGroupItem
                onClick={() => this.toggleTab(0)}
                action
                active={this.state.activeTab === 0}
              >
                Positivos{" "}
                <span className="badge badge-success pull-right">
                  {body ? body.TotalPositiveVotes : 0}
                </span>
              </ListGroupItem>
              <ListGroupItem
                onClick={() => this.toggleTab(1)}
                action
                active={this.state.activeTab === 1}
              >
                Negativos{" "}
                <span className="badge badge-danger pull-right">
                  {body ? body.TotalNegativeVotes : 0}
                </span>
              </ListGroupItem>
              <ListGroupItem
                onClick={() => this.toggleTab(2)}
                action
                active={this.state.activeTab === 2}
              >
                Ausencias{" "}
                <span className="badge badge-warning pull-right">
                  {body ? body.TotalAbsentVotes : 0}
                </span>
              </ListGroupItem>
              <ListGroupItem
                onClick={() => this.toggleTab(3)}
                action
                active={this.state.activeTab === 3}
              >
                Abstinencias{" "}
                <span className="badge badge-secondary pull-right">
                  {body ? body.TotalAbstentionVotes : 0}
                </span>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col xs="8">
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={3}>
                <Bar
                  data={
                    body
                      ? this.getBarData(
                          body.totalAbstentionVotesByParty,
                          "ABSTENCIONES"
                        )
                      : {}
                  }
                  options={options}
                />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MatcherVotingRowCollapsible;
