import React from "react";
import "bootstrap/dist/css/bootstrap.css";

export const matcherColumns = [
  {
    Header: "Legislador",
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
    accesor: "Partido",
    id: "party.name"
  },
  {
    Header: "Match",
    accessor: "voting.title"
  },
  {
    Header: "Resultados",
    accessor: "date",
    Cell: row => {
      return (
        <div className="btn-group-lg btn-block btn-group">
          <button className="btn btn-block btn-success">
            {row.count ? row.count : 0}
          </button>
          <button className="btn btn-block btn-secondary">
            {row.count ? row.count : 0}
          </button>
          <button className="btn btn-block btn-warning">
            {row.count ? row.count : 0}
          </button>
          <button className="btn btn-block btn-danger">
            {row.count ? row.count : 0}
          </button>
        </div>
      );
    }
  }
];

export function CalculateMatchBarColor(value) {
  if (value <= 25) return "danger";
  if (value <= 50) return "warning";
  if (value <= 75) return "info";
  if (value <= 90) return "success";
}
