import React, { Component } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import SweetAlert from "react-bootstrap-sweetalert";
import { deleteParty, requestData } from "../../services/partiesService";
import { Link } from "react-router-dom";

const makeDefaultState = () => ({
  data: [],
  sorted: [],
  expanded: {},
  resized: [],
  filtered: [],
  alert: null
});

class PartiesTable extends Component {
  constructor() {
    super();
    this.state = makeDefaultState();
    this.resetState = this.resetState.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }
  resetState() {
    this.setState(makeDefaultState());
  }

  handleDelete = id => {
    deleteParty(id).then(res => {
      const parties = [...this.state.data];
      const index = parties.findIndex(party => party._id === id);
      parties.splice(index, 1);
      this.setState({ data: parties, alert: null });
    });
  };

  hideAlert = () => {
    const alert = null;
    this.setState({ alert });
  };

  onDelete = id => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Are you sure?"
        onConfirm={() => this.handleDelete(id)}
        onCancel={this.hideAlert}
      >
        You will not be able to recover this file!
      </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  };

  async fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    const data = await requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    );
    console.log(data);
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    requestData(state.pageSize, state.page, state.sorted, state.filtered).then(
      res => {
        console.log(res.data);
        // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
        this.setState({
          data: res.data.rows,
          pages: res.data.pages,
          loading: false
        });
      }
    );
  }

  render() {
    const { data, pages, loading } = this.state;
    return (
      <div>
        {this.state.alert}
        <div className="card">
          <div className="card-header">
            <h1 className="float-left text-lg">
              <strong>Parties</strong>
            </h1>
            <Link
              to="/parties/Create"
              className="btn btn-primary mb-2 float-right"
            >
              Create party
            </Link>
          </div>
          <div className="card-body">
            <ReactTable
              data={data}
              columns={[
                {
                  Header: "Nombre",
                  accessor: "Name"
                }
              ]}
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

export default PartiesTable;
