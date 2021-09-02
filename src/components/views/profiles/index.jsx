import React, { Component } from "react";
import { getFilteredVotings } from "../../services/votingsService";
import { mapVotingsToSelect } from "../../helpers/formatHelper";
import Select from "react-select";
import VotingCard from "../../commons/votingCard";
import { isNullOrUndefined } from "util";
import Chips from "../../commons/chips";
import MatcherTable from "../../commons/matcherTable";
import { calculateMatch } from "../../services/matcherServices";
import { Filters } from "../votings/filters";
import myPdf from "../../../assets/pdfs/CD155_19PL.pdf";
import "@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css";
import PdfViewer from "../expedients/pdfViewer";
import { getExpedient } from "../../services/votesService";
import { Row, Col, Collapse, ListGroup, Button } from "reactstrap";
import RankingTable from "./ranking";


class ProfileMatcher extends Component {
  state = {
    votingsOptions: [],
    selectedVotings: [],
    currentVoting: {},
    currentOpinion: {},
    matcherData: {},
    expPdf: {},
    expPdfLink: null,
    viewPdf: false,
    viewPdf2: true,
    showRanking: false
  };

  /* async componentDidMount() {
    const paginatedVotings = await getVotings();
    const votingsOptions = paginatedVotings.items;
    this.setState({ votingsOptions });
  } */

  /*onVotingsChange = votings => {
    const votingsIds = votings ? votings.map(l => l.value) : [];
    const currentVoting = votings[votings.length - 1];
    this.setState({ currentVoting });
    this.setState({ selectedVotings: votingsIds, currentVoting });
  };*/

  /* handleDateChange = async (startDate, endDate) => {
    console.log("handleDateChange", startDate, endDate);
    const { filters } = this.state;
    const activeFilters = Object.keys(filters).filter(
      key => filters[key] === true
    );
    console.log("activeFilters", activeFilters);
    const paginatedVotings = await getFilteredVotings(
      startDate,
      endDate,
      activeFilters
    );
    const votingsOptions = paginatedVotings.items;
    this.setState({ votingsOptions });
  }; */

  handleFilterChange = async (startDate, endDate, filters) => {
    console.log("handleDateChange", startDate, endDate);
    const activeFilters = Object.keys(filters).filter(
      key => filters[key] === true
    );
    console.log("activeFilters", activeFilters);
    const paginatedVotings = await getFilteredVotings(
      startDate,
      endDate,
      activeFilters
    );
    const votingsOptions = paginatedVotings ? paginatedVotings.items : null;
    this.setState({ votingsOptions });
  };

  /* handleFilterChange = filter => {
    const { filters } = this.state;
    filters[filter] = !filters[filter];
    this.setState({ filters });
  }; */

  handleRankingClose = () => {
    const { showRanking } = this.state;
    this.setState({ showRanking: !showRanking });
  };

  handleVotingsChange = currentVoting => {
    const { selectedVotings } = this.state;
    const index = this.findCurrentVoting(currentVoting.value);
    let voting;
    if (!isNullOrUndefined(index)) {
      voting = selectedVotings[index];
    } else {
      voting = currentVoting;
    }
    this.setState({ currentVoting: voting });
  };

  findCurrentVoting = id => {
    const { selectedVotings } = this.state;
    let index;
    selectedVotings.forEach(element => {
      if (element.value === id) {
        index = selectedVotings.indexOf(element);
      }
    });
    return index;
  };

  handleOpinionChange = async opinion => {
    let { currentVoting, selectedVotings, showRanking } = this.state;
    currentVoting.opinion = opinion;
    const currentVotingIndex = this.findCurrentVoting(currentVoting.value);

    if (!isNullOrUndefined(currentVotingIndex)) {
      selectedVotings[currentVotingIndex] = currentVoting;
    } else {
      selectedVotings.push(currentVoting);
    }

    const matcherData = await calculateMatch(selectedVotings);

    const userResults = selectedVotings.map(v => {
      return { VotingId: v.value, VotingResult: v.opinion };
    });

    showRanking = true;

    this.setState({
      currentVoting,
      selectedVotings: selectedVotings,
      matcherData,
      userResults,
      showRanking
    });
  };

  getPdf = async expNumber => {
    const pdf = await getExpedient(expNumber);
    var len = pdf.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = pdf.charCodeAt(i);
    }

    const renderPdf = bytes.buffer;
    this.setState({ expPdf: renderPdf });
  };

  handlePdfShow = link => {
    console.log("link!", link);
    this.setState({ expPdfLink: link, viewPdf: !this.state.viewPdf });
  };

  handlePdfClose = () => {
    this.setState({ viewPdf: !this.state.viewPdf });
  };

  showPdfIframe = exp => {
    const { originalTextLink, definitiveTextLink } = exp;
    let originalLink = originalTextLink;
    if (!originalTextLink.includes("www")) {
      originalLink = [
        originalTextLink.slice(0, originalTextLink.indexOf("://")),
        "www",
        originalTextLink.slice(originalTextLink.indexOf("://"))
      ].join("");
    }
    console.log("originalLink", originalLink);
    return (
      <iframe
        title={"pdf"}
        //src="http://docs.google.com/gview?url=https://www.senado.gov.ar/parlamentario/parlamentaria/421274/downloadPdfDefinitivo&embedded=true"
        src="https://www.senado.gov.ar/parlamentario/parlamentaria/421274/downloadPdfDefinitivo"
        style={{ width: 600, height: 500 }}
      />
    );
  };

  async fetchData(state, instance) {
    const { selectedVotings } = this.props;
    console.log("fetchDataState", state);
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    const res = await this.props.requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered,
      selectedVotings
    );
    console.log("res", res);
    this.setState({
      data: res.data.rows,
      pages: res.data.pages,
      details: res.data.details,
      loading: false
    });
  }

  render() {
    const {
      votingsOptions,
      currentVoting,
      selectedVotings,
      matcherData,
      userResults,
      expPdf,
      expPdfLink,
      viewPdf,
      showRanking
    } = this.state;
    const votingFormatedOptions = mapVotingsToSelect(votingsOptions);
    console.log("expPdf", expPdf);
    return (
      <React.Fragment>
        {/* <Document
          file={pdf}
          onLoadError={console.error}
           onLoadSuccess={this.onDocumentLoadSuccess} 
        >
          {<Page pageNumber={pageNumber} />}
        </Document> */}
        <div className="row">
          <div className="col-sm-12">
            <Chips chips={selectedVotings} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Select
              placeholder="Leyes"
              cacheOptions
              defaultOptions
              options={votingFormatedOptions}
              onChange={votings => this.handleVotingsChange(votings)}
            />
            <Filters handleFilterChange={this.handleFilterChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <VotingCard
              currentVoting={currentVoting}
              onChange={this.handleOpinionChange}
              onPdfShow={this.handlePdfShow}
            />
          </div>
          <div className="col-md-6">
            {viewPdf ? (
              <PdfViewer
                link={expPdfLink}
                onClose={() => this.handlePdfClose()}
              />
            ) : (
              ""
            )}
          </div>
          <div className="col-md-12">
            <Button
              className="btn-info"
              onClick={() => this.handleRankingClose()}
            >
              Mostrar Ranking
            </Button>
            {showRanking ? (
              <RankingTable
                data={matcherData.partyResults}
                onClose={() => this.handleRankingClose()}
                requestRankings={this.fetchData}
                onMinVotesChange={() =>
                  calculateMatch(this.state.selectedVotings)
                }
              ></RankingTable>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="mt-5">
          <MatcherTable
            matcherData={matcherData}
            selectedVotings={selectedVotings}
            userResults={userResults}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileMatcher;
