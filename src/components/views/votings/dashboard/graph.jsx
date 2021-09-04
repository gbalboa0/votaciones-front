import { Bar, Pie } from "react-chartjs-2";

  const getBarData = (data, voteType) => {
    const dataSet = {
      labels: Object.keys(data),
      datasets: [
        {
          label: "Votos por partido",
          backgroundColor: colorPicker(voteType, true, false),
          borderColor: colorPicker(voteType, false, false),
          borderWidth: 1,
          hoverBackgroundColor: colorPicker(voteType, true, true),
          hoverBorderColor: colorPicker(voteType, false, false),
          data: Object.values(data)
        }
      ]
    };
    return dataSet;
  };

  const getPieData = (data, colorsByParty) => {
    let colors = [];
    for(var i = 0; i < Object.keys(data).length; i++) {
        var partido = Object.keys(data)[i]
        var c = colorsByParty.filter(a => a.partido == partido)[0].color
        //var c = colorsByParty.filter(a => a[0] == partido)[0][1]
        if (c != null) {
            colors.push(c)
        } else {
            colors.push(dynamicColors())
        }
    }
    const dataSet = {
      labels: Object.keys(data),
      datasets: [
        {
          label: "Votos por partido",
          backgroundColor: colors,
          borderColor: 'rgba(200, 200, 200, 0.75)',
          //hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
          hoverBorderColor: 'rgba(200, 200, 200, 1)',
          data: Object.values(data)
        }
      ]
    };
    return dataSet;
  };


  const dynamicColors = () => {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };

  const colorPicker = (voteType, background, hover) => {
    if (voteType === "AFIRMATIVOS" && background === true && hover === false)
      return "rgba(112, 227, 95, 0.27)";
    if (voteType === "AFIRMATIVOS" && background === false && hover === false)
      return "rgba(112, 227, 95, 1)";
    if (voteType === "AFIRMATIVOS" && background === false && hover === true)
      return "rgba(112, 227, 95, 0.4)";

    if (voteType === "NEGATIVOS" && background === true && hover === false)
      return "rgba(255,99,132,0.2)";
    if (voteType === "NEGATIVOS" && background === false && hover === false)
      return "rgba(255,99,132,1)";
    if (voteType === "NEGATIVOS" && background === false && hover === true)
      return "rgba(255,99,132,0.4)";

    if (voteType === "AUSENCIAS" && background === true && hover === false)
      return "rgba(244,209,11,0.2)";
    if (voteType === "AUSENCIAS" && background === false && hover === false)
      return "rgba(244,209,11,1)";
    if (voteType === "AUSENCIAS" && background === false && hover === true)
      return "rgba(244,209,11,0.4)";

    if (voteType === "ABSTENCIONES" && background === true && hover === false)
      return "rgba(59,58,53,0.2)";
    if (voteType === "ABSTENCIONES" && background === false && hover === false)
      return "rgba(59,58,53,0.6)";
    if (voteType === "ABSTENCIONES" && background === false && hover === true)
      return "rgba(59,58,53,0.4)";
  };

  const arrayToObject = (array, key) => {
      if (array == undefined) return {}
    const defaultValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, defaultValue);
  };

export function Graph(props) {
    let {
        bar,
        text,
        options,
        data,
        colors, 
        filterLowVotes
      } = props;

    if(filterLowVotes !== 0 && data && Object.values(data).length !== 0) {
        console.log("data1", data)
        var filtered = Object.entries(data).filter(v => v[1] > filterLowVotes)
        window.filtered = filtered;
        var res = {};
        for(var i = 0; i < filtered.length; i++ ) {
            var key = filtered[i][0]
            var value = filtered[i][1]
            Object.assign(res, {[key]: value})
        }
        console.log("filterres", res)
        if(filtered && filtered.length !== 0){ 
            console.log("filterdata")
            data = res
        }
        console.log("data4", data)
    }

    

    var graph = bar ? <Bar
        data={
            data
            ? getBarData(
                data,
                text
              )
            : {}
        }
        options={options}
      /> : 
        <Pie
            data={
            data
                ? getPieData(
                    data,
                    colors
                )
                : {}
            }
            options={options}
            id={"pie" + text}
        />
    return graph;
  }

 
  
  export default Graph;