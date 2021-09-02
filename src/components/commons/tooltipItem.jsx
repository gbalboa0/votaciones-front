import React from "react";
import { Tooltip } from "reactstrap";

class TooltipItem extends React.Component {
  state = {};

  toggle = target => {
    // console.log(typeof target) // make sure this is a string
    this.setState({
      ...this.state,
      [target]: !this.state[target]
    });
  };

  render() {
    const { targetId, result, badgeClasses } = this.props;
    //console.log("badges", badgeClasses);
    return (
      <React.Fragment>
        <span className={badgeClasses} id={targetId}>
          {result}
        </span>
        <Tooltip
          placement="top"
          isOpen={this.state[`${targetId}`]}
          target={targetId}
          toggle={() => this.toggle(`${targetId}`)}
        >
          Coinciden en
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default TooltipItem;
