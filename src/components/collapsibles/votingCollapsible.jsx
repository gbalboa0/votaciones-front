import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { getOpinionColor } from "../helpers/colorHelper";

class VotingCollapsible extends Component {
  state = {};

  render() {
    const { currentVoting, userResults } = this.props;
    if (currentVoting) {
      console.log("currentVoting - Collapsible", currentVoting);
      const header = currentVoting.voting.title;
      const abstract = currentVoting.voting.abstract;
      return (
        <Card
          border={getOpinionColor(currentVoting.voting, userResults)}
          style={{ borderWidth: 5, display: "flex" }}
        >
          {/* Aca va el tag */}
          <Card.Header>{abstract ? abstract : "Tag de la Ley"}</Card.Header>
          <Card.Body>
            {/* Aca va el title */}
            <Card.Title>{header}</Card.Title>
            {/* Aca va la descripcion de la ley */}
            <Card.Text>Descripcion</Card.Text>
          </Card.Body>
        </Card>
      );
    } else return null;
  }
}

export default VotingCollapsible;
