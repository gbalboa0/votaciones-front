import React, { Component } from "react";
import { Button, Collapse } from "reactstrap";

class MatcherCollapsible extends Component {
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
    const { title, activeTab } = this.props;
    //console.log("props", this.props)
    this.setState({ title, activeTab });
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

  render() {
    const { title, body } = this.state;

    //console.log("body", body);
    return (
      <div>
        <Button
          className="m-0 p-0"
          color="link"
          onClick={() => this.toggleCustom(1)}
          aria-expanded={this.state.custom[0]}
          aria-controls="exampleAccordion1"
        >
          {title}
        </Button>
        <Collapse
          isOpen={this.state.custom[1]}
          data-parent="#exampleAccordion"
          id="exampleAccordion1"
        >
          <Button
            className="btn btn-square btn-outline-success btn-lg btn-block"
            x
            onClick={() => this.toggleCustom(1)}
            aria-expanded={this.state.custom[0]}
            aria-controls="exampleAccordion2"
          >
            A Favor
          </Button>
          {/* <button className="btn btn-square btn-outline-success btn-lg btn-block">
            A Favor
          </button>
          <button className="btn btn-square btn-outline-secondary btn-lg btn-block">
            Abstenciones
          </button>
          <button className="btn btn-square btn-outline-warning btn-lg btn-block">
            Ausencias
          </button>
          <button className="btn btn-square btn-outline-danger btn-lg btn-block">
            En Contra
          </button> */}
        </Collapse>
      </div>
    );
  }
}

export default MatcherCollapsible;
