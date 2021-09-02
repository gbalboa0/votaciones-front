import React, { Component, useState, useEffect, useMemo } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { useTable, usePagination, useSortBy } from "react-table";
import { CalculateMatchBarColor } from "../../helpers/tableColumnHelper";
import { Row, Progress } from "reactstrap";
import { Button } from "reactstrap";
import "./reactTable.css";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TextField from "@material-ui/core/TextField";

const RankingTable = props => {
  /* const [data, setData] = useState(props.data);
  useEffect(() => {
    setData(props.data);
  }, []); */
  const { onClose, data, requestRankings, onMinVotesChange } = props;
  const [fetchData, setfetchData] = useState(data);
  /* function fetchData() {
    return data;
  } */
  const mockData = [
    { Party: { Name: "Todos", Id: 1 }, matchPercentage: 90, rank: 1 },
    { Party: { Name: "Cambiemos", Id: 2 }, matchPercentage: 50, rank: 2 }
  ];
  const mockData2 = [
    {
      party: {
        id: 133,
        name: "Coalición Cívica - ARI - GEN - UPT",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 2,
      total: 2,
      matchPercentage: 100
    },
    {
      party: {
        id: 171,
        name: "Coalición Cívica",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 8,
      total: 8,
      matchPercentage: 100
    },
    {
      party: {
        id: 234,
        name: "Partido por la Justicia Social",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 1,
      total: 1,
      matchPercentage: 100
    },
    {
      party: {
        id: 111,
        name: "Propuesta Republicana",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 1,
      total: 1,
      matchPercentage: 100
    },
    {
      party: {
        id: 232,
        name: "PRO",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 48,
      total: 53,
      matchPercentage: 90.57
    },
    {
      party: {
        id: 6,
        name: "Unión Cívica Radical",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 31,
      total: 40,
      matchPercentage: 77.5
    },
    {
      party: {
        id: 18,
        name: "Renovador de Salta",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 0,
      total: 1,
      matchPercentage: 0
    },
    {
      party: {
        id: 237,
        name: "Elijo Catamarca",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 0,
      total: 2,
      matchPercentage: 0
    },
    {
      party: {
        id: 1,
        name: "Frente para la Victoria - PJ",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 0,
      total: 69,
      matchPercentage: 0
    },
    {
      party: {
        id: 226,
        name: "Frente de la Concordia Misionero",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 0,
      total: 5,
      matchPercentage: 0
    },
    {
      party: {
        id: 2,
        name: "Justicialista",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 0,
      total: 16,
      matchPercentage: 0
    },
    {
      party: {
        id: 225,
        name: "Peronismo para la Victoria",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 0,
      total: 4,
      matchPercentage: 0
    },
    {
      party: {
        id: 236,
        name: "Somos Mendoza",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 0,
      total: 1,
      matchPercentage: 0
    },
    {
      party: {
        id: 136,
        name: "Encuentro Popular y Social",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 0,
      total: 1,
      matchPercentage: 0
    },
    {
      party: {
        id: 215,
        name: "Fte. de Izquierda y de los Trabajadores",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 0,
      total: 1,
      matchPercentage: 0
    },
    {
      party: {
        id: 177,
        name: "Córdoba Federal",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 0,
      total: 4,
      matchPercentage: 0
    },
    {
      party: {
        id: 224,
        name: "Federal Unidos por una Nueva Argentina",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 0,
      total: 16,
      matchPercentage: 0
    },
    {
      party: {
        id: 119,
        name: "Frente Cívico por Santiago",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 0,
      total: 6,
      matchPercentage: 0
    },
    {
      party: {
        id: 213,
        name: "PTS - Frente de Izquierda",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 0,
      total: 1,
      matchPercentage: 0
    },
    {
      party: {
        id: 132,
        name: "Frente Justicia Unión y Libertad",
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      },
      matchQuantity: 0,
      total: 1,
      matchPercentage: 0
    }
  ];
  const pages = 5;
  let loading;
  const columns = React.useMemo(() => [
    {
      Header: "Rank",
      Cell: row => {
        return <div>{row.row.index}</div>;
      }
    },
    {
      Header: "Partido",
      accessor: "party.name"
    },
    {
      Header: "Match",
      accessor: "matchPercentage",
      style: { whiteSpace: "unset" },
      Cell: row => {
        console.log("row", row);
        const color = CalculateMatchBarColor(row.row.values.matchPercentage);
        return (
          <React.Fragment>
            <div>
              <Progress color={color} value={row.row.values.matchPercentage}>
                {row.row.values.matchPercentage}%
              </Progress>
            </div>
          </React.Fragment>
        );
      }
    },
    {
      Header: "Total",
      accessor: "total"
    }
  ]);
  function Table({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      footerGroups,
      rows,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize }
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 5 }
      },
      useSortBy,
      usePagination
    );

    const [page1, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangeRowsPerPage = event => {
      setPageSize(parseInt(event.target.value, 10));
      setPage(0);
    };
    const useStyles1 = makeStyles(theme => ({
      root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5)
      }
    }));

    function TablePaginationActions(props) {
      const classes = useStyles1();
      const theme = useTheme();
      const { count, page, rowsPerPage, onChangePage } = props;

      const handleFirstPageButtonClick = event => {
        gotoPage(0);
      };

      const handleBackButtonClick = event => {
        gotoPage(page - 1);
      };

      const handleNextButtonClick = event => {
        gotoPage(page + 1);
      };

      const handleLastPageButtonClick = event => {
        gotoPage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
      };

      const handleChangeRowsPerPage = async event => {
        const minVotes = parseInt(event.target.value, 10);
        const res = await onMinVotesChange();
        setfetchData(res);
      };

      return (
        <div className={classes.root}>
          <TextField
            id="standard-number"
            label="Min Votes"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            defaultValue={pageIndex + 1}
            onChange={e => {
              handleChangeRowsPerPage(e);
            }}
            style={{ marginLeft: 10 }}
          />
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
          >
            {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="previous page"
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </IconButton>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </IconButton>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
          >
            {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
          <TextField
            id="standard-number"
            label="Go to page"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ marginLeft: 10 }}
          />
        </div>
      );
    }
    const theme = useTheme();
    return (
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={4}
              count={rows.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true
              }}
              onChangePage={pageIndex => gotoPage(pageIndex)}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    );
  }
  return <Table columns={columns} data={data} />;
  /* return (
    <React.Fragment>
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={5}
        className="-striped -highlight mb-2 table"
        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
        pages={pages} // Display the total number of pages
        loading={loading} // Display the loading overlay when we need it
        defaultSorted={[
          {
            id: "Rank",
            desc: false
          }
        ]}
        //onFetchData={() => setData(props.data)} // Request new data when things change
        //filterable
        //expanded={this.state.expanded}
        //resized={this.state.resized}
        //onExpandedChange={expanded => this.setState({ expanded })}
        //onResizedChange={resized => this.setState({ resized })}
      />
    </React.Fragment>
  ); */
};

export default RankingTable;
