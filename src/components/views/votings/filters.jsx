import React, { useState, useEffect } from "react";
import DateSelector from "./dateSelector";
import FilterVotings from "../votings/filterVotings";

const defaultFilters = {
  VOTACION_GENERAL: true,
  ARTICULO: false,
  APARTAMIENTO: false,
  RATIFICACION: false,
  DIA_NACIONAL: false,
  PATRIMONIO: false,
  REGIMEN: false
};

export function Filters(props) {
  const { handleFilterChange } = props;
  const [startDate, setStartDate] = useState(new Date("2019/01/01"));
  const [endDate, setEndDate] = useState(new Date("2020/01/01"));
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    handleFilterChange(startDate, endDate, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, filters]);

  return (
    <React.Fragment>
      <DateSelector
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate} /* onDateChange={this.handleDateChange} */
      />
      <FilterVotings
        handleChange={handleFilterChange}
        filters={filters}
        setFilters={setFilters}
      />
    </React.Fragment>
  );
}

export default Filters;
