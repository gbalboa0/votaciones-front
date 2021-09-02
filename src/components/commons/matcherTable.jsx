import React, { Component } from "react";
import { Row, Progress } from "reactstrap";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { CalculateMatchBarColor } from "../helpers/tableColumnHelper";
import "bootstrap/dist/css/bootstrap.css";
import "../../css/listGroupLegislatorVotes.css";
import LegislatorCollapsible from "../collapsibles/legislatorCollapsible";
import PartyCollapsible from "../collapsibles/partyCollapsible";
import VotingCollapsible from "../collapsibles/votingCollapsible";
var _ = require("lodash");

class MatcherTable extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.handleToggleVoteResultTab.bind(this);
    this.toggleCustom = this.handleToggleLegislatorTab.bind(this);
    this.state = {
      status: "Closed",
      fadeIn: true,
      timeout: 300,
      data: [],
      selectedVoteResultTabs: [],
      selectedLawTabs: [],
      expandedLegislatorTabs: [],
      mockData2: props.matcherData,
      dataLength: 0,
      mockData: [
        {
          legislator: {
            name: "Cristina Fernandez",
            id: 1
          },
          party: {
            name: "Todos"
          },
          match: 90,
          results: {
            AFFIRMATIVE: [
              { abstract: "Ley 1", title: "Ley 1", id: 1, didMatch: true },
              { abstract: "Ley 2", title: "Ley 2", id: 2, didMatch: true },
              { abstract: "Ley 3", title: "Ley 3", id: 3, didMatch: true },
              { abstract: "Ley 7", title: "Ley 7", id: 7, didMatch: false }
            ],
            ABSTENTION: [
              { abstract: "Ley 9", title: "Ley 9", id: 9, didMatch: true },
              { abstract: "Ley 11", title: "Ley 11", id: 11, didMatch: true }
            ],
            NEGATIVE: [
              { abstract: "Ley 4", title: "Ley 4", id: 4, didMatch: true },
              { abstract: "Ley 15", title: "Ley 15", id: 15, didMatch: true },
              { abstract: "Ley 6", title: "Ley 6", id: 6, didMatch: true }
            ],
            ABSENT: [
              { abstract: "Ley 5", title: "Ley 5", id: 5, didMatch: true },
              { abstract: "Ley 8", title: "Ley 8", id: 8, didMatch: true },
              { abstract: "Ley 10", title: "Ley 10", id: 10, didMatch: true }
            ]
          }
        },
        {
          legislator: { name: "Martin Lusteau", id: 2 },
          party: {
            name: "Queseyo"
          },
          match: 70,
          results: {
            AFFIRMATIVE: [
              { abstract: "Ley 1", title: "Ley 1", id: 1, didMatch: true },
              { abstract: "Ley 2", title: "Ley 2", id: 2, didMatch: true }
            ],
            ABSTENTION: [
              { abstract: "Ley 3", title: "Ley 3", id: 3, didMatch: false },
              { abstract: "Ley 7", title: "Ley 7", id: 7, didMatch: false },
              { abstract: "Ley 9", title: "Ley 9", id: 9, didMatch: true }
            ],
            NEGATIVE: [
              { abstract: "Ley 11", title: "Ley 11", id: 11, didMatch: false },
              { abstract: "Ley 4", title: "Ley 4", id: 4, didMatch: true },
              { abstract: "Ley 15", title: "Ley 15", id: 15, didMatch: true },
              { abstract: "Ley 6", title: "Ley 6", id: 6, didMatch: true }
            ],
            ABSENT: [
              { abstract: "Ley 5", title: "Ley 5", id: 5, didMatch: true },
              { abstract: "Ley 8", title: "Ley 8", id: 8, didMatch: true },
              { abstract: "Ley 10", title: "Ley 10", id: 10, didMatch: true }
            ]
          }
        },
        {
          legislator: { name: "Margarita Stolbizer", id: 3 },
          party: {
            name: "Yoyagane"
          },
          match: 50,
          results: {
            AFFIRMATIVE: [
              { abstract: "Ley 1", title: "Ley 1", id: 1, didMatch: true },
              { abstract: "Ley 2", title: "Ley 2", id: 2, didMatch: true },
              { abstract: "Ley 3", title: "Ley 3", id: 3, didMatch: true },
              { abstract: "Ley 7", title: "Ley 7", id: 7, didMatch: false },
              { abstract: "Ley 9", title: "Ley 9", id: 9, didMatch: false }
            ],
            ABSTENTION: [
              { abstract: "Ley 11", title: "Ley 11", id: 11, didMatch: true }
            ],
            NEGATIVE: [
              { abstract: "Ley 4", title: "Ley 4", id: 4, didMatch: true },
              { abstract: "Ley 5", title: "Ley 5", id: 5, didMatch: false },
              { abstract: "Ley 6", title: "Ley 6", id: 6, didMatch: true },
              { abstract: "Ley 10", title: "Ley 10", id: 10, didMatch: false }
            ],
            ABSENT: [
              { abstract: "Ley 8", title: "Ley 8", id: 8, didMatch: true },
              { abstract: "Ley 15", title: "Ley 15", id: 15, didMatch: false }
            ]
          }
        },
        {
          legislator: { name: "Sergio Massa", id: 4 },
          party: {
            name: "Panqueque"
          },
          match: 20,
          results: {
            AFFIRMATIVE: [
              { abstract: "Ley 1", title: "Ley 1", id: 1, didMatch: true },
              { abstract: "Ley 2", title: "Ley 2", id: 2, didMatch: true }
            ],
            ABSTENTION: [
              { abstract: "Ley 3", title: "Ley 3", id: 3, didMatch: false },
              { abstract: "Ley 7", title: "Ley 7", id: 7, didMatch: false },
              { abstract: "Ley 8", title: "Ley 8", id: 8, didMatch: false },
              { abstract: "Ley 10", title: "Ley 10", id: 10, didMatch: false },
              { abstract: "Ley 15", title: "Ley 15", id: 15, didMatch: false }
            ],
            NEGATIVE: [
              { abstract: "Ley 4", title: "Ley 4", id: 4, didMatch: true },
              { abstract: "Ley 6", title: "Ley 6", id: 6, didMatch: true },
              { abstract: "Ley 9", title: "Ley 9", id: 9, didMatch: false },
              { abstract: "Ley 11", title: "Ley 11", id: 11, didMatch: false }
            ],
            ABSENT: [
              { abstract: "Ley 5", title: "Ley 5", id: 5, didMatch: true }
            ]
          }
        }
      ],
      userResults: {
        AFFIRMATIVE: [
          { abstract: "Ley 1", title: "Ley 1", id: 1, result: "AFFIRMATIVE" },
          { abstract: "Ley 2", title: "Ley 2", id: 2, result: "AFFIRMATIVE" },
          { abstract: "Ley 3", title: "Ley 3", id: 3, result: "AFFIRMATIVE" }
        ],
        ABSTENTION: [
          { abstract: "Ley 9", title: "Ley 9", id: 9, result: "ABSTENTION" },
          { abstract: "Ley 11", title: "Ley 11", id: 11, result: "ABSTENTION" }
        ],
        NEGATIVE: [
          { abstract: "Ley 4", title: "Ley 4", id: 4, result: "NEGATIVE" },
          { abstract: "Ley 6", title: "Ley 6", id: 6, result: "NEGATIVE" },
          { abstract: "Ley 7", title: "Ley 7", id: 7, result: "NEGATIVE" },
          { abstract: "Ley 15", title: "Ley 15", id: 15, result: "NEGATIVE" }
        ],
        ABSENT: [
          { abstract: "Ley 5", title: "Ley 5", id: 5, result: "ABSENT" },
          { abstract: "Ley 8", title: "Ley 8", id: 8, result: "ABSENT" },
          { abstract: "Ley 10", title: "Ley 10", id: 10, result: "ABSENT" }
        ]
      },
      userResults2: [
        { abstract: "Ley 1", title: "Ley 1", id: 1, result: "AFFIRMATIVE" },
        { abstract: "Ley 2", title: "Ley 2", id: 2, result: "AFFIRMATIVE" },
        { abstract: "Ley 3", title: "Ley 3", id: 3, result: "AFFIRMATIVE" },
        { abstract: "Ley 9", title: "Ley 9", id: 9, result: "ABSTENTION" },
        { abstract: "Ley 11", title: "Ley 11", id: 11, result: "ABSTENTION" },
        { abstract: "Ley 4", title: "Ley 4", id: 4, result: "NEGATIVE" },
        { abstract: "Ley 6", title: "Ley 6", id: 6, result: "NEGATIVE" },
        { abstract: "Ley 7", title: "Ley 7", id: 7, result: "NEGATIVE" },
        { abstract: "Ley 15", title: "Ley 15", id: 15, result: "NEGATIVE" },
        { abstract: "Ley 5", title: "Ley 5", id: 5, result: "ABSENT" },
        { abstract: "Ley 8", title: "Ley 8", id: 8, result: "ABSENT" },
        { abstract: "Ley 10", title: "Ley 10", id: 10, result: "ABSENT" }
      ]
    };
  }

  componentDidMount() {
    const dataLength = this.state.mockData2.length;
    const { expandedLegislatorTabs } = this.state;
    for (var i = 0; i < dataLength; i++) {
      expandedLegislatorTabs[i] = false;
    }
    this.setState({ expandedLegislatorTabs });
    /* const columns = matcherColumns;
    //console.log("votingsTable comp did mount")
    this.setState({ columns }); */
  }

  componentDidUpdate() {
    const prevDataLength = this.state.dataLength;
    const newDataLength = this.props.matcherData.results
      ? this.props.matcherData.results.length
      : 0;
    if (prevDataLength !== newDataLength) {
      const { expandedLegislatorTabs } = this.state;
      for (var i = 0; i < newDataLength; i++) {
        expandedLegislatorTabs[i] = false;
      }
      this.setState({ expandedLegislatorTabs, dataLength: newDataLength });
    }
  }

  getTabIndex(legislator, tabs) {
    return tabs.map(t => t.legislator).indexOf(legislator);
  }

  getSelectedVoteResultLegRow(legislator, selectedVoteResultTabs) {
    const selectedLegislatorVoteResult = selectedVoteResultTabs.find(
      t => t.legislator === legislator
    );
    if (
      selectedLegislatorVoteResult &&
      selectedLegislatorVoteResult.isSelected
    ) {
      return selectedLegislatorVoteResult.voteResult;
    }
    console.log("isActive", selectedLegislatorVoteResult);
    return undefined;
  }

  getSelectedVoteResultPartyRow(legislator, selectedVoteResultTabs) {
    const selectedLegislatorVoteResult = selectedVoteResultTabs.find(
      t => t.legislator === legislator && t.isExpanded
    );
    let activeVoteResultTabId;
    if (selectedLegislatorVoteResult) {
      activeVoteResultTabId = this.generateVoteResultKey(
        selectedLegislatorVoteResult.legislator,
        selectedLegislatorVoteResult.voteResult
      );
    }
    return activeVoteResultTabId;
  }

  getSelectedLawRow(legislator, selectedLawTabs) {
    return selectedLawTabs.find(
      t => t.legislator === legislator && t.isExpanded
    );
  }

  handleToggleLegislatorTab(tab, legislator) {
    const { selectedVoteResultTabs, selectedLawTabs } = this.state;

    const prevState = this.state.expandedLegislatorTabs;
    const state = prevState.map((x, index) => (tab === index ? !x : x));
    const isTabExpanded = state[tab];
    const tabIndex = this.getTabIndex(legislator, selectedVoteResultTabs);

    if (tabIndex !== -1) {
      selectedVoteResultTabs[tabIndex].isExpanded =
        isTabExpanded === false ? false : true;
      if (selectedLawTabs[tabIndex])
        selectedLawTabs[tabIndex].isExpanded =
          isTabExpanded === false ? false : true;
    }
    this.setState({
      expandedLegislatorTabs: state,
      selectedVoteResultTabs,
      selectedLawTabs
    });
  }

  generateVoteResultKey = (legislator, voteResult) => {
    return legislator + "-" + voteResult;
  };

  getSelectedVoteResultTabs = (legislator, compTab) => {
    const { selectedVoteResultTabs } = this.state;
    //TODO: matchear por id de leg
    const index = this.getTabIndex(legislator, selectedVoteResultTabs);
    if (index === -1) {
      //compTab.isExpanded = true;
      selectedVoteResultTabs.push(compTab);
    } else {
      //compTab.isExpanded = !selectedVoteResultTabs[index].isExpanded;
      selectedVoteResultTabs[index] = compTab;
    }
    return selectedVoteResultTabs;
  };

  handleToggleVoteResultTab = (legislator, vote) => {
    const compTab = {
      legislator: legislator,
      voteResult: vote,
      isSelected: true,
      isExpanded: true
    };

    this.setState({
      selectedVoteResultTabs: this.getSelectedVoteResultTabs(
        legislator,
        compTab
      )
    });
  };

  handleToggleLawTab = (legislator, voting) => {
    const lawTab = {
      legislator: legislator,
      isSelected: true,
      isExpanded: true,
      voting: voting
    };
    this.setState({
      selectedLawTabs: this.getSelectedLawTabs(legislator, lawTab)
    });
  };

  getSelectedLawTabs = (legislator, lawTab) => {
    const { selectedLawTabs } = this.state;
    //TODO: matchear por id de leg
    const index = this.getTabIndex(legislator, selectedLawTabs);
    if (index === -1) {
      //compTab.isExpanded = true;
      selectedLawTabs.push(lawTab);
    } else {
      //compTab.isExpanded = !selectedVoteResultTabs[index].isExpanded;
      selectedLawTabs[index] = lawTab;
    }
    return selectedLawTabs;
  };

  getResultsCount = results => {
    return {
      positiveMatch: results.AFFIRMATIVE
        ? results.AFFIRMATIVE.filter(x => x.didMatch).length
        : 0,
      negativeMatch: results.NEGATIVE
        ? results.NEGATIVE.filter(x => x.didMatch).length
        : 0,
      absentMatch: results.ABSENT
        ? results.ABSENT.filter(x => x.didMatch).length
        : 0,
      abstentionMatch: results.ABSTENTION
        ? results.ABSTENTION.filter(x => x.didMatch).length
        : 0,
      totalPositive: results.AFFIRMATIVE ? results.AFFIRMATIVE.length : 0,
      totalNegative: results.NEGATIVE ? results.NEGATIVE.length : 0,
      totalAbsent: results.ABSENT ? results.ABSENT.length : 0,
      totalAbstention: results.ABSTENTION ? results.ABSTENTION.length : 0
    };
  };

  /* getColumnWidth = (rows, accessor, headerText) => {
    const maxWidth = 4000;
    const magicSpacing = 10;
    const cellLength = Math.max(
      ...rows.map(row => (`${row[accessor]}` || "").length),
      headerText.length
    );
    console.log("cell length", cellLength);
    return Math.min(maxWidth, cellLength * magicSpacing);
  }; */

  render() {
    const {
      data,
      pages,
      loading,
      selectedVoteResultTabs,
      expandedLegislatorTabs
    } = this.state;

    const mockData2 = this.props.matcherData;
    const userResults2 = this.props.userResults;
    //console.log("matcher table state render", this.state);

    const matcherColumns = [
      {
        Header: "Legislador",
        accesor: "legislator.name",
        width: 200,
        /* width: this.getColumnWidth(
          mockData2.results ? mockData2.results : [],
          "legislator.name",
          "Legislador"
        ), */
        Cell: row => {
          const legislator = row.original.legislator.name;
          const legislatorId = row.original.legislator.id;
          const results = this.getResultsCount(row.original.matchesMap);
          let selectedVoteResult = this.getSelectedVoteResultLegRow(
            legislator,
            selectedVoteResultTabs
          );
          return (
            <LegislatorCollapsible
              onToggleLegislatorTab={() =>
                this.handleToggleLegislatorTab(row.viewIndex, legislator)
              }
              onToggleTab={this.handleToggleVoteResultTab}
              legislator={legislator}
              legislatorId={legislatorId}
              selectedVoteResult={selectedVoteResult}
              row={row}
              expandedLegislatorTabs={expandedLegislatorTabs}
              isOpen={expandedLegislatorTabs[row.viewIndex]}
              results={results}
            />
          );
        }
      },
      {
        Header: "Partido",
        accessor: "party.name",
        width: 400,
        style: { whiteSpace: "unset" },
        /* width: this.getColumnWidth(
          mockData2.results ? mockData2.results : [],
          "party.name",
          "Partido"
        ), */
        Cell: row => {
          const legislator = row.original.legislator;
          const results = row.original.matchesMap;
          let activeVoteResultTabId = this.getSelectedVoteResultPartyRow(
            legislator.name,
            selectedVoteResultTabs
          );
          const currentVoting = this.getSelectedLawRow(
            row.original.legislator.name,
            this.state.selectedLawTabs
          );
          return (
            <React.Fragment>
              <div>{row.original.party.name}</div>
              <div>
                <PartyCollapsible
                  results={results}
                  legislator={legislator.name}
                  legislatorId={legislator.id}
                  activeVoteResultTabId={activeVoteResultTabId}
                  onToggleLawTab={this.handleToggleLawTab}
                  currentVoting={currentVoting}
                  userResults={userResults2}
                />
              </div>
            </React.Fragment>
          );
        }
      },
      {
        Header: "Match",
        accessor: "match",
        width: 850,
        style: { whiteSpace: "unset" },
        Cell: row => {
          const color = CalculateMatchBarColor(row.original.matchPercentage);
          const currentVoting = this.getSelectedLawRow(
            row.original.legislator.name,
            this.state.selectedLawTabs
          );
          return (
            <React.Fragment>
              <div>
                <Progress color={color} value={row.original.matchPercentage}>
                  {row.original.matchPercentage}%
                </Progress>
              </div>
              <div style={{ marginTop: "10px" }}>
                <VotingCollapsible
                  currentVoting={currentVoting}
                  userResults={userResults2}
                />
              </div>
            </React.Fragment>
          );
        }
      }
      /* {
        Header: "Resultados",
        accessor: "results",
        Cell: row => {
          const results = row.original.results;
          const body = [1, 2, 3];
          return (
            <div>
              <Row>
                <div className="btn-group-lg btn-group">
                  <button className="btn btn-lg btn-success">
                    {results.AFFIRMATIVE ? results.AFFIRMATIVE.length : 0}
                  </button>
                  <button className="btn btn-lg btn-secondary">
                    {results.ABSTENTION ? results.ABSTENTION.length : 0}
                  </button>
                  <button className="btn btn-lg btn-warning">
                    {results.ABSENT ? results.ABSENT.length : 0}
                  </button>
                  <button className="btn btn-lg btn-danger">
                    {results.NEGATIVE ? results.NEGATIVE.length : 0}
                  </button>
                </div>
              </Row>
            </div>
          );
        }
      } */
    ];
    return (
      <div>
        <div className="card">
          <div className="card-header">
            <Row>
              <h1 className="float-left text-lg">
                <strong>Votings</strong>
              </h1>
            </Row>
          </div>
          <div>
            <span>Mostrando {data.length} registros</span>
          </div>
          <div className="card-body">
            {!_.isEmpty(mockData2) ? (
              <ReactTable
                data={mockData2.results}
                columns={matcherColumns}
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
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MatcherTable;
