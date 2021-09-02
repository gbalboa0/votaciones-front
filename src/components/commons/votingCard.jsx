import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { getVotingWithExpedients } from "../services/votingsService";
import { ExpedientCollapsible } from "../views/expedients/expedientCollapsible";
var _ = require("lodash");

class VotingCard extends Component {
  state = {
    opinion: {},
    currentVoting: {},
    votingWithExpedients: {}
  };

  getBorder = opinion => {
    if (opinion === "AFFIRMATIVE") return "success";
    if (opinion === "ABSTENTION") return "secondary";
    if (opinion === "NEGATIVE") return "danger";
  };

  async componentDidUpdate() {
    let { currentVoting } = this.props;

    if (currentVoting.value !== this.state.currentVoting.value) {
      let voting = await getVotingWithExpedients([currentVoting.value]);
      const votingWithExpedients = voting.items[0];
      //console.log("Fetch voting", votingWithExpedients.items[0]);
      this.setState({ votingWithExpedients, currentVoting });
    }
  }

  render() {
    const { currentVoting, onPdfShow } = this.props;
    let { votingWithExpedients } = this.state;
    console.log("votingWithExpedients", votingWithExpedients);
    if (currentVoting.label) {
      const header = currentVoting.title;
      const abstract = currentVoting.abstract;
      const border = this.getBorder(currentVoting.opinion);
      return (
        <Card border={border} style={{ width: "30rem", borderWidth: 5 }}>
          {/* Aca va el tag */}
          <Card.Header>{abstract ? abstract : "Tag de la Ley"}</Card.Header>
          <Card.Body>
            {/* Aca va el title */}
            <Card.Title>{header}</Card.Title>
            {/* Aca va la descripcion de la ley */}
            <div className="mb-2">
              {!_.isEmpty(votingWithExpedients) ? (
                <ExpedientCollapsible
                  expedients={votingWithExpedients.expedients}
                  onPdfShow={onPdfShow}
                />
              ) : (
                ""
              )}
            </div>
            <div className="align-items-center row">
              <div className="col-6 mb-3 col-sm">
                <button
                  className="btn btn-success btn-block"
                  onClick={() => this.props.onChange("AFFIRMATIVE")}
                >
                  A Favor
                </button>
              </div>
              <div className="col-6 mb-3 col-sm">
                <button
                  className="btn btn-secondary btn-block"
                  onClick={() => this.props.onChange("ABSTENTION")}
                >
                  Abstención
                </button>
              </div>
              <div className="col-6 mb-3 col-sm">
                <button
                  className="btn btn-danger btn-block"
                  onClick={() => this.props.onChange("NEGATIVE")}
                >
                  En Contra
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
      );
    } else {
      return null;
    }
  }
}

export default VotingCard;
