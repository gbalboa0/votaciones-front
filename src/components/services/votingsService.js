import Axios from "axios";
import { getToken, getLocalEndpoint } from "./tokenService";
const apiEndpoint = "https://" + getLocalEndpoint() + "/votacion";
const token = getToken();
const qs = require("qs");
const all = 10000;

export async function addVoting(data) {
  await Axios.post(apiEndpoint, data, {
    headers: { Authorization: token }
  });
}

export async function getVotings() {
  const { data } = await Axios.get(apiEndpoint, {
    params: { pageSize: all }
  });
  return data;
}

export async function getVotingsByDate(begin, end) {
  const { data } = await Axios.get(apiEndpoint + `/GetByDate`, {
    params: { pageSize: all, begin: begin, end: end }
  });
  return data;
}

export async function getFilteredVotings(begin, end, filters) {
  const { data } = await Axios.get(apiEndpoint + `/GetFiltered`, {
    params: { pageSize: all, begin: begin, end: end, filters: filters },
    paramsSerializer: params => {
      return qs.stringify(params);
    }
  });
  return data;
}

export async function getVotingWithExpedients(votingIds) {
  const votingsIds = { votingIds };
  const { data } = await Axios.get(apiEndpoint + "/GetVotingWithExpedients", {
    params: votingsIds,
    paramsSerializer: params => {
      return qs.stringify(params);
    }
  });
  return data;
}

export async function getVotingById(_id) {
  const { data: Voting } = await Axios.get(
    apiEndpoint + "/GetVotingsById?Id=" + _id + "",
    {
      headers: { Authorization: token }
    }
  );

  return Voting;
}

export async function getVotingsByLegislators(legislatorIds) {
  const param = { legislatorIds, pageSize: all };

  const { data: Votings } = await Axios.get(
    apiEndpoint + "/GetByLegislators",
    {
      params: param,
      paramsSerializer: params => {
        return qs.stringify(params);
      }
    },
    {
      headers: { Authorization: token }
    }
  );
  return Votings;
}

export async function getVotingByName(name) {
  const { data: Voting } = await Axios.get(apiEndpoint + "/" + name + "", {
    headers: { Authorization: token }
  });

  return Voting;
}

export async function putVoting(_id, data) {
  await Axios.put(apiEndpoint + "/" + _id + "", data, {
    headers: { Authorization: token }
  });
}

export async function deleteVoting(_id) {
  await Axios.delete(apiEndpoint + "/" + _id + "", {
    headers: { Authorization: token }
  });
}

export async function requestData(pageSize, page, sorted, filtered) {
  const data = {
    pageSize,
    page,
    sorted,
    filtered
  };
  console.log("requestData", data);

  const url = apiEndpoint + "/search";
  let result = await Axios.post(url, data, {
    headers: { Authorization: token }
  });
  return result;
}
