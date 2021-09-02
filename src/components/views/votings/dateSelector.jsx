import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DateSelector(props) {
  const { startDate, endDate, setStartDate, setEndDate } = props;
  //const [startDate, setStartDate] = useState(new Date("2019/01/01"));
  //const [endDate, setEndDate] = useState(new Date("2020/01/01"));

  /* useEffect(() => {
    onDateChange(startDate, endDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]); */

  return (
    <React.Fragment>
      <div className="row">
        <div className="mt-2 col-sm">
          <label>Desde: </label>
          <div style={{ justifyContent: "center" }}>
            <DatePicker
              selected={startDate}
              onChange={date => {
                setStartDate(date);
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </div>
        <div className="mt-2 col-sm">
          <label>Hasta: </label>
          <div style={{ justifyContent: "center" }}>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
        </div>
      </div>
      <div className="mt-4" style={{ justifyContent: "center" }}></div>
    </React.Fragment>
  );
}

export default DateSelector;
