import React, { Component } from "react";
import ReactTable from "react-table-6";
import Collapses from "../commons/collapsible";
import { Row, Col } from "reactstrap";
import "react-table-6/react-table.css";

class VotingsTable extends Component {
  state = {
    data: [],
    sorted: [],
    expanded: {},
    resized: [],
    filtered: [],
    columns: [],
    selectedLegislators: [],
    selectedParties: [],
    selectedVotings: [],
    details: [],
    alert: null
  };

  componentDidMount() {
    const { columns } = this.props;
    //console.log("votingsTable comp did mount")
    this.setState({ columns });
  }

  componentDidUpdate() {
    const {
      selectedLegislators,
      selectedParties,
      selectedVotings
    } = this.props;
    //console.log("votings table comp did update state legs", this.state.selectedLegislators)
    if (
      selectedLegislators.length !== this.state.selectedLegislators.length ||
      selectedParties.length !== this.state.selectedParties.length ||
      selectedVotings.length !== this.state.selectedVotings.length
    ) {
      //console.log("votings table set state", this.state)
      this.setState({ selectedLegislators, selectedParties, selectedVotings });
      this.fetchData(this.state);
    }
  }

  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData(state, instance) {
    const {
      selectedLegislators,
      selectedParties,
      selectedVotings
    } = this.props;
    console.log("fetchDataState", state);
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    const res = await this.props.requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered,
      selectedLegislators,
      selectedParties,
      selectedVotings
    );
    console.log("res", res);
    this.setState({
      data: res.data.votos,
      pages: res.data.pages,
      details: res.data.votosPorPartido,
      loading: false
    });
  }

  render() {
    const { data, pages, loading, columns, details } = this.state;
    console.log("votingsTable render", this.state);
    return (
      <div>
        <div className="card">
          <div className="card-header">
            <Row>
              <h1 className="float-left text-lg">
                <strong>Votings</strong>
              </h1>
            </Row>
            <Row>
              <Col lg="12">
                <Collapses title="Details" body={details} />
              </Col>
            </Row>
          </div>
          <div>
            <span>Mostrando {data.length} registros</span>
          </div>
          <div className="card-body">
            <ReactTable
              data={data}
              columns={columns}
              //   filterable
              defaultPageSize={5}
              className="-striped -highlight mb-2 table"
              manual // Forces table not to paginate or sort automatically, so we can handle it server-side
              pages={pages} // Display the total number of pages
              loading={loading} // Display the loading overlay when we need it
              onFetchData={this.fetchData} // Request new data when things change
              filterable
              expanded={this.state.expanded}
              resized={this.state.resized}
              onExpandedChange={expanded => this.setState({ expanded })}
              onResizedChange={resized => this.setState({ resized })}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default VotingsTable;
