import Axios from "axios";
import { getLocalEndpoint } from "../services/tokenService";
const apiEndpoint = getLocalEndpoint() + "/diputado";
const qs = require("qs");

export async function addLegislator(data) {
  await Axios.post(apiEndpoint, data, {});
}

export async function getLegislators() {
  const { data } = await Axios.get(apiEndpoint);
  return data;
}

export async function getLegislatorsByParties(partyIds) {
  const ptIds = { partyIds };
  const { data } = await Axios.get(apiEndpoint + "/GetByParties", {
    params: ptIds,
    paramsSerializer: params => {
      return qs.stringify(params);
    }
  });
  return data;
}

export async function getLegislatorById(_id) {
  const { data: Legislator } = await Axios.get(
    apiEndpoint + "/GetLegislatorsById?Id=" + _id + "",
    {}
  );

  return Legislator;
}

export async function getLegislatorByName(name) {
  const { data: Legislator } = await Axios.get(
    apiEndpoint + "/" + name + "",
    {}
  );

  return Legislator;
}

export async function putLegislator(_id, data) {
  await Axios.put(apiEndpoint + "/" + _id + "", data, {});
}

export async function deleteLegislator(_id) {
  await Axios.delete(apiEndpoint + "/" + _id + "", {});
}

export async function requestData(pageSize, page, sorted, filtered) {
  console.log("filtered", filtered)
  const data = {
    pageSize,
    page,
    sorted,
    filtered
  };

  const url = apiEndpoint + "/search";
  let result = await Axios.post(url, data, {});
  return result;
}
