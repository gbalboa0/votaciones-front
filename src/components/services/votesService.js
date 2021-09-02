import Axios from "axios";
import { getToken, getLocalEndpoint } from "./tokenService";
const qs = require("qs");
const apiEndpoint = "http://" + getLocalEndpoint() + "/voto";
const token = getToken();
const all = 10000;


export async function addLegislator(data) {
  await Axios.post(apiEndpoint, data, {
    headers: { Authorization: token }
  });
}

export async function getExpedient(expNumber) {
  const { data } = await Axios.get(
    "http://localhost:5000/expedients/getExpedientPdf?url=https://www.senado.gov.ar/parlamentario/parlamentaria/421274/downloadPdfDefinitivo"
  );
  console.log("dats", data);
  return data;
}

export async function getVotes() {
  const { data } = await Axios.post(apiEndpoint + "/TempGetAll");
  return data;
}

export async function getVotingVotesDeputiesByParties(ids) {
  const ptIds = { ids };
  const { data } = await Axios.post(
    apiEndpoint + "/GetVotingVotesDeputiesByParties",
    ptIds
  );
  return data;
}

export async function getLegislatorById(_id) {
  const { data: Legislator } = await Axios.get(
    apiEndpoint + "/GetVotingVotesDeputiesById?Id=" + _id + "",
    {
      headers: { Authorization: token }
    }
  );

  return Legislator;
}

export async function getLegislatorByName(name) {
  const { data: Legislator } = await Axios.get(apiEndpoint + "/" + name + "", {
    headers: { Authorization: token }
  });

  return Legislator;
}

export async function putLegislator(_id, data) {
  await Axios.put(apiEndpoint + "/" + _id + "", data, {
    headers: { Authorization: token }
  });
}

export async function deleteLegislator(_id) {
  await Axios.delete(apiEndpoint + "/" + _id + "", {
    headers: { Authorization: token }
  });
}

export async function requestData(
  pageSize,
  page,
  sorted,
  filtered,
  legislatorIds,
  partyIds,
  votacionesIds
) {
  //pageSize = all;
  if (!pageSize) pageSize = 5;
  const data = {
    pageSize,
    pageNumber: page,
    sorted,
    filtered,
    legislatorIds,
    partyIds,
    votacionesIds
  };

  const url = apiEndpoint + "/search";
  let result = await Axios.get(url, {
    params: data,
    paramsSerializer: params => {
      return qs.stringify(params);
    }
  }, {
    headers: { Authorization: token }
  });
  console.log("result", result);
  return result;
}
