import React, { Component } from "react";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Col,
  Collapse,
  Row,
  TabContent,
  TabPane
} from "reactstrap";

class MatcherVotingsCollapsible extends Component {
  state = {
    activeTab: 0
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

  componentDidMount() {
    const { title } = this.props;
    //console.log("props", this.props)
    this.setState({ title });
    //console.log("state", this.state)
  }

  /* componentDidUpdate() {
        const { body } = this.props;
        console.log("props", this.props)
        this.setState({ body });
        console.log("state", this.state)
    } */

  componentDidUpdate(previousProps) {
    const { body } = this.props;
    if (previousProps.body !== this.props.body) {
      this.setState({ body });
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

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state
    });
  }

  toggleCustom(tab) {
    const prevState = this.state.custom;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      custom: state
    });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  getCardBody = body => {
    //console.log("getCardBody", body);
    /* const options = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: true
    }; */
    return (
      <div>
        <div>
          <Button
            className="m-0 p-0"
            color="link"
            onClick={() => this.toggleCustom(0)}
            aria-expanded={this.state.custom[0]}
            aria-controls="exampleAccordion1"
          >
            Toggle item
          </Button>
          <Collapse
            isOpen={this.state.custom[0]}
            data-parent="#exampleAccordion"
            id="exampleAccordion1"
          >
            <p className="mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              pretium lorem non vestibulum scelerisque. Proin a vestibulum sem,
              eget tristique massa. Aliquam lacinia rhoncus nibh quis ornare.
            </p>
          </Collapse>
        </div>
      </div>
    );
  };

  getBarData = (data, voteType) => {
    //console.log("enter getBarData", data);
    const dataSet = {
      labels: Object.keys(data),
      datasets: [
        {
          label: "Votos por partido",
          backgroundColor: this.colorPicker(voteType, true, false),
          borderColor: this.colorPicker(voteType, false, false),
          borderWidth: 1,
          hoverBackgroundColor: this.colorPicker(voteType, true, true),
          hoverBorderColor: this.colorPicker(voteType, false, false),
          data: Object.values(data)
        }
      ]
    };
    return dataSet;
  };

  colorPicker = (voteType, background, hover) => {
    if (voteType === "AFIRMATIVOS" && background === true && hover === false)
      return "rgba(112, 227, 95, 0.27)";
    if (voteType === "AFIRMATIVOS" && background === false && hover === false)
      return "rgba(112, 227, 95, 1)";
    if (voteType === "AFIRMATIVOS" && background === false && hover === true)
      return "rgba(112, 227, 95, 0.4)";

    if (voteType === "NEGATIVOS" && background === true && hover === false)
      return "rgba(255,99,132,0.2)";
    if (voteType === "NEGATIVOS" && background === false && hover === false)
      return "rgba(255,99,132,1)";
    if (voteType === "NEGATIVOS" && background === false && hover === true)
      return "rgba(255,99,132,0.4)";

    if (voteType === "AUSENCIAS" && background === true && hover === false)
      return "rgba(244,209,11,0.2)";
    if (voteType === "AUSENCIAS" && background === false && hover === false)
      return "rgba(244,209,11,1)";
    if (voteType === "AUSENCIAS" && background === false && hover === true)
      return "rgba(244,209,11,0.4)";

    if (voteType === "ABSTENCIONES" && background === true && hover === false)
      return "rgba(59,58,53,0.2)";
    if (voteType === "ABSTENCIONES" && background === false && hover === false)
      return "rgba(59,58,53,0.6)";
    if (voteType === "ABSTENCIONES" && background === false && hover === true)
      return "rgba(59,58,53,0.4)";
  };

  render() {
    const { body } = this.props;

    //console.log("body", body);
    return (
      /* <div>
        {body.map(element => {
          return (
            <div>
              <Row>{element}</Row>
            </div>
          );
        })}
      </div> */
      <div>
        <Row>
          <Col>
            <ListGroup id="list-tab" role="tablist">
              {body.map(element => {
                return (
                  <div>
                    <ListGroupItem
                      onClick={() => this.toggleTab(body.indexOf(element))}
                      action
                      active={this.state.activeTab === body.indexOf(element)}
                    >
                      {element}
                      {/* <span className="badge badge-success pull-right">
                        {body ? body.TotalPositiveVotes : 0}
                      </span> */}
                    </ListGroupItem>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId={body.indexOf(element)}>{element}</TabPane>
                    </TabContent>
                  </div>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MatcherVotingsCollapsible;
