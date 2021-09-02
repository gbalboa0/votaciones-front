import React, { Component } from "react";
import { getParties } from "../../services/partiesService";
import {
  getLegislators,
  getLegislatorsByParties
} from "../../services/legislatorsServices";
import SelectMultiple from "../../commons/select";
import VotingsTable from "../../commons/votingsTable";
import { requestData } from "../../services/votesService";
import { getVotingsByLegislators, getVotings } from "../../services/votingsService";

const columns = [
  {
    Header: "Diputado",
    Cell: row => {
      return (
        <div>
          <img
            alt="Not found"
            height={50}
            width={50}
            src={row.original.photoUrl}
          />{" "}
          {row.original.legislator}
        </div>
      );
    },
    accesor: "Diputado",
    id: "nombre"
  },
  {
    Header: "Ley",
    accessor: "votacionTitulo"
  },
  {
    Header: "Fecha",
    accessor: "fechaVotacion"
  },
  {
    Header: "¿Cómo voto?",
    Cell: row => {
      return (
        <span className={getBadgeClasses(row.original.resultado)}>
          {row.original.resultado}
        </span>
      );
    },
    id: "Result"
  },
  {
    Header: "Partido",
    accessor: "partido.nombre"
  },
  {
    Header: "Provincia",
    accessor: "provincia.nombre"
  }
];

function getBadgeClasses(vote) {
  let badge = "badge badge-pill badge-";
  if (vote === "AFIRMATIVO") badge += "success";
  else if (vote === "NEGATIVO") badge += "danger";
  else if (vote === "AUSENTE") badge += "warning";
  else if (vote === "ABSTENCION") badge += "secondary";
  return badge;
}

class DeputiesDashboard extends Component {
  state = {
    inputValue: "",
    partiesOptions: [],
    legislatorOptions: [],
    votingsOptions: [],
    selectedParties: [],
    selectedLegislators: [],
    selectedVotings: []
  };

  async componentDidMount() {
    const paginatedLegislators = await getLegislators();
    const paginatedParties = await getParties();
    const paginatedVotings = await getVotings();
    //const paginatedVotings = await getVotingsByLegislators();
    const legislatorOptions = paginatedLegislators;
    const partiesOptions = paginatedParties;
    const votingsOptions = paginatedVotings;
    this.setState({ legislatorOptions, partiesOptions, votingsOptions });
  }

  mapToSelectMultiple = options => {
    const formatedOptions = options
      ? options.map(option => {
          return {
            value: option.id,
            label: option.nombre
              ? option.nombre + " " + (option.apellido ? option.apellido : "")
              : option.titulo
          };
        })
      : [];
    return formatedOptions;
  };

  async filterLegislators(partiesIds) {
    const res = await getLegislatorsByParties(partiesIds);
    const legislatorOptions = res.items;
    this.setState({ legislatorOptions });
  }

  onPartiesChange = parties => {
    const partiesIds = parties ? parties.map(p => p.value) : [];
    this.setState({ selectedParties: partiesIds });
    this.filterLegislators(partiesIds);
  };

  onLegislatorsChange = legislators => {
    const legislatorsIds = legislators ? legislators.map(l => l.value) : [];
    getVotingsByLegislators(legislatorsIds).then(res => {
      this.setState({
        selectedLegislators: legislatorsIds,
        votingsOptions: res.items
      });
    });
  };

  onVotingsChange = votings => {
    const votingsIds = votings ? votings.map(l => l.value) : [];
    this.setState({ selectedVotings: votingsIds });
  };

  render() {
    const {
      legislatorOptions,
      partiesOptions,
      votingsOptions,
      selectedLegislators,
      selectedParties,
      selectedVotings
    } = this.state;
    const legislatorsFormatedOptions = this.mapToSelectMultiple(
      legislatorOptions
    );
    const partiesFormatedOptions = this.mapToSelectMultiple(partiesOptions);
    const votingFormatedOptions = this.mapToSelectMultiple(votingsOptions);
    return (
      <React.Fragment>
        <div>
          <label />
          <SelectMultiple
            placeholder="Partidos"
            options={partiesFormatedOptions}
            //onChange={parties => this.onPartiesChange(parties)}
          />
        </div>
        <div>
          <SelectMultiple
            placeholder="Legisladores"
            options={legislatorsFormatedOptions}
            //onChange={legislators => this.onLegislatorsChange(legislators)}
          />
        </div>
        <div>
          <SelectMultiple
            placeholder="Leyes"
            options={votingFormatedOptions}
            onChange={votings => this.onVotingsChange(votings)}
          />
        </div>
         <div>
          <VotingsTable
            columns={columns}
            requestData={requestData}
            selectedLegislators={selectedLegislators}
            selectedParties={selectedParties}
            selectedVotings={selectedVotings}
          />
        </div> 
      </React.Fragment>
    );
  }
}

export default DeputiesDashboard;
