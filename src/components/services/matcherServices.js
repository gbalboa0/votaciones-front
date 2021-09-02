import Axios from "axios";
import { getLocalEndpoint } from "../services/tokenService";
const apiEndpoint = "http://" + getLocalEndpoint() + "/matcher";
/* function authHeaders() {
  return {
    headers: { Authorization: "Bearer " + sessionStorage.getItem("userToken") }
  };
} */

/* export async function calculateMatch(pageSize, page, sorted, filtered, data) {
  if (!pageSize) pageSize = 5;
  const userPrefs = data.map(v => {
    return { VotingId: v.value, VotingResult: v.opinion };
  });
  const dataSend = {
    pageSize,
    page,
    sorted,
    filtered,
    userPrefs
  };
  const res = await Axios.post(apiEndpoint + "/Match", dataSend, {});
  return res.data;
} */

export async function calculateMatch(data) {
  const userPrefs = data.map(v => {
    return { VotingId: v.value, VotingResult: v.opinion };
  });
  const res = await Axios.post(apiEndpoint + "/Match", userPrefs, {});
  return res.data;
}

export async function getLegislators() {
  const { data } = await Axios.get(apiEndpoint);
  return data;
}

export async function requestData(
  pageSize,
  page,
  sorted,
  filtered,
  legislatorIds,
  partyIds,
  votingIds
) {
  if (!pageSize) pageSize = 5;
  const data = {
    pageSize,
    page,
    sorted,
    filtered,
    legislatorIds,
    partyIds,
    votingIds
  };

  const url = apiEndpoint + "/search";
  let result = await Axios.post(url, data);
  console.log("result", result);
  return result;
}
