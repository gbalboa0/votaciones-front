import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Collapse } from "reactstrap";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import { ExpedientInfo } from "./expedientInfo";

export function ExpedientCollapsible(props) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { expedients, onPdfShow } = props;
  const [expedientsOpen, setExpedientsOpen] = useState(
    expedients.map(exp => {
      return false;
    })
  );
  console.log("expedients", expedients);

  const showExpedient = exp => {
    expedientsOpen[exp] = !expedientsOpen[exp];
    console.log("showExpedient", exp);
    console.log("showExpedient", expedientsOpen);
    setExpedientsOpen(expedientsOpen);
  };

  return (
    <React.Fragment>
      <Button
        className="mb-10"
        color="primary"
        variant="contained"
        onClick={() => setFiltersOpen(!filtersOpen)}
        aria-controls="showExpedients"
      >
        Ver Expedientes
      </Button>
      <Collapse
        isOpen={filtersOpen}
        data-parent="#showExpedients"
        id="showExpedients"
      >
        <FormControl component="fieldset" fullWidth={true}>
          {/* <FormLabel component="legend">
            <p>Expedientes sobre la votación</p>
          </FormLabel> */}
          <FormGroup aria-label="position" row>
            {expedients.map(exp => {
              return (
                <ExpedientInfo
                  key={exp.number}
                  exp={exp}
                  onPdfShow={onPdfShow}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </Collapse>
    </React.Fragment>
  );
}

export default ExpedientCollapsible;
