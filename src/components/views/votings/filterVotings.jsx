import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Collapse } from "reactstrap";
import Button from "@material-ui/core/Button";
import VotingType from "../../helpers/enums/votingTypeEnum";

export function FilterVotings(props) {
  const { filters, setFilters } = props;
  const [filtersOpen, setFiltersOpen] = useState(false);

  const addFilter = filter => {
    const newFilters = { ...filters };
    newFilters[filter] = !newFilters[filter];
    setFilters(newFilters);
  };

  return (
    <React.Fragment>
      <div className="item">
        <Button
          //className="m-0 p-0"
          color="primary"
          variant="contained"
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-controls="exampleAccordion2"
        >
          Filtros
        </Button>
        <div className="mt-2">
          <Collapse
            isOpen={filtersOpen}
            data-parent="#exampleAccordion"
            id="exampleAccordion2"
          >
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Filtros sobre las votaciones
              </FormLabel>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        addFilter(VotingType.VOTACION_GENERAL);
                      }}
                      name="checkedB"
                      color="primary"
                      defaultChecked={true}
                    />
                  }
                  label="Generales"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        addFilter(VotingType.ARTICULO);
                      }}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Artículo"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        addFilter(VotingType.DIA_NACIONAL);
                      }}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Día Nacional"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        addFilter(VotingType.PATRIMONIO);
                      }}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Patrimonio"
                  labelPlacement="start"
                />
              </FormGroup>
            </FormControl>
          </Collapse>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FilterVotings;
