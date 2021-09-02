import React, { Component } from "react";
import { FaCheck, FaTimes } from "react-icons/all";
import { Tooltip } from "reactstrap";

class MatchIcon extends Component {
  state = {};

  toggle = target => {
    this.setState({
      ...this.state,
      [target]: !this.state[target]
    });
  };

  translateVotingOpinion = opinion => {
    if (opinion === "AFFIRMATIVE") return "A Favor";
    if (opinion === "NEGATIVE") return "En Contra";
    if (opinion === "ABSENT") return "Ausencia";
    if (opinion === "ABSTENTION") return "Abstencion";
    return "";
  };

  render() {
    const { didMatch, color, userResult, targetId } = this.props;
    let icon = didMatch ? (
      <FaCheck
        style={{
          color: color
        }}
        id={targetId}
      />
    ) : (
      <FaTimes
        style={{
          color: color
        }}
        id={targetId}
      />
    );
    return (
      <React.Fragment>
        {icon}
        <Tooltip
          placement="top"
          isOpen={this.state[`${targetId}`]}
          target={targetId}
          toggle={() => this.toggle(`${targetId}`)}
        >
          {"Votaste " + this.translateVotingOpinion(userResult.VotingResult)}
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default MatchIcon;
