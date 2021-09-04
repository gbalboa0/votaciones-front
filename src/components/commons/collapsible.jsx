import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardHeader,
  Col,
  Collapse,
  Row,
  TabContent,
  TabPane,
  Input
} from "reactstrap";
import { Bar, Pie } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import Graph from "../views/votings/dashboard/graph";

class Collapses extends Component {
  state = {
    activeTab: 1,
    bar: true,
    filterLowVotes: 0
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

  componentDidUpdate(previousProps, previousState) {
    const { body } = this.props;
    if (previousProps.body !== this.props.body) {
      console.log("props", this.props);
      this.setState({ body });
      console.log("state", this.state);
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

  handleFilterChange = ({ currentTarget: input }) => {
    this.setState({filterLowVotes: input.value})
  };

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
    console.log("getCardBody", body);
    const options = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: true,
      responsive: true
    };
    const {bar, filterLowVotes} = this.state
  

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
                  {body ? body.totalPositiveVotes : 0}
                </span>
              </ListGroupItem>
              <ListGroupItem
                onClick={() => this.toggleTab(1)}
                action
                active={this.state.activeTab === 1}
              >
                Negativos{" "}
                <span className="badge badge-danger pull-right">
                  {body ? body.totalNegativeVotes : 0}
                </span>
              </ListGroupItem>
              <ListGroupItem
                onClick={() => this.toggleTab(2)}
                action
                active={this.state.activeTab === 2}
              >
                Ausencias{" "}
                <span className="badge badge-warning pull-right">
                  {body ? body.totalAbsentVotes : 0}
                </span>
              </ListGroupItem>
              <ListGroupItem
                onClick={() => this.toggleTab(3)}
                action
                active={this.state.activeTab === 3}
              >
                Abstenciones{" "}
                <span className="badge badge-secondary pull-right">
                  {body ? body.totalAbstentionVotes : 0}
                </span>
              </ListGroupItem>
            </ListGroup>
            <div className="mt-5">
            <Row>
            <Col>
              <Button color="primary" onClick= {() => this.setState({bar:!bar})}>{bar ? "Pie" : "Bar"}</Button>
            </Col>
            <Col lg="8">
              <Input
                label={'Filtrar menores a '}
                onChange={this.handleFilterChange}
                type={'text'}
                placeholder='Filtrar menores a '
                label={'Filtrar menores a '}
              ></Input>
            </Col>
            </Row>
          </div>
          </Col>
          <Col xs="8">
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={0}>
                <Graph
                  text="AFIRMATIVOS"
                  data={body?body.positiveVotesByParty:{}}
                  colors={body?body.colorsByParty:{}}
                  options={options}
                  bar={bar}
                  filterLowVotes={filterLowVotes}
                />
              </TabPane>
              <TabPane tabId={1}>
                <Graph
                  text="NEGATIVOS"
                  data={body?body.negativeVotesByParty:{}}
                  colors={body?body.colorsByParty:{}}
                  options={options}
                  bar={bar}
                  filterLowVotes={filterLowVotes}
                />
              </TabPane>
              <TabPane tabId={2}>
                <Graph
                  text="AUSENCIAS"
                  data={body?body.absentVotesByParty:{}}
                  colors={body?body.colorsByParty:{}}
                  options={options}
                  bar={bar}
                  filterLowVotes={filterLowVotes}
                />
              </TabPane>
              <TabPane tabId={3}>
                <Graph
                  text="ABSTENCIONES"
                  data={body?body.abstentionVotesByParty:{}}
                  colors={body?body.colorsByParty:{}}
                  options={options}
                  bar={bar}
                  filterLowVotes={filterLowVotes}
                />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  };

  getBarData = (data, voteType) => {
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

  getPieData = (data, voteType) => {
    let colors = [];
    for (let i in data) {
      colors.push(this.dynamicColors())
    }
    const dataSet = {
      labels: Object.keys(data),
      datasets: [
        {
          label: "Votos por partido",
          backgroundColor: colors,
          borderColor: 'rgba(200, 200, 200, 0.75)',
          //hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
          hoverBorderColor: 'rgba(200, 200, 200, 1)',
          data: Object.values(data)
        }
      ]
    };
    return dataSet;
  };

  dynamicColors = () => {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
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
    const { title, body } = this.state;

    console.log("body", body);
    return (
      <Card className="mb-0">
        <CardHeader id="headingOne">
          <Button
            block
            color="link"
            className="text-left m-0 p-0"
            onClick={() => this.toggleAccordion(0)}
            aria-expanded={this.state.accordion[0]}
            aria-controls="collapseOne"
          >
            <h5 className="m-0 p-0">{title}</h5>
          </Button>
        </CardHeader>
        <Collapse
          isOpen={this.state.accordion[0]}
          data-parent="#accordion"
          id="collapseOne"
          aria-labelledby="headingOne"
        >
          <CardBody>{this.getCardBody(body)}</CardBody>
        </Collapse>
      </Card>
    );
  }
}

export default Collapses;
