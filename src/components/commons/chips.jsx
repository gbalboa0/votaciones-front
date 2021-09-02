import React, { Component } from "react";
import Chip from "@material-ui/core/Chip";
import "../../css/chip.css";

class Chips extends Component {
  state = {};

  getChipColor = opinion => {
    if (opinion === "AFFIRMATIVE") return "#4dbd74";
    if (opinion === "ABSTENTION") return "#c8ced3";
    if (opinion === "NEGATIVE") return "#f86c6b";
  };

  render() {
    return (
      <div>
        {this.props.chips.map(chip => (
          <Chip
            style={{ borderColor: this.getChipColor(chip.opinion) }}
            key={chip.value}
            //label={"Tag id: " + chip.value}
            label={chip.abstract}
            onClick={this.props.handleClick}
            onDelete={this.props.handleDelete}
            variant="outlined"
          />
        ))}
      </div>
    );
  }
}

export default Chips;
