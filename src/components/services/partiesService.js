import Axios from "axios";
import { getToken, getLocalEndpoint } from "../services/tokenService";
const apiEndpoint = "https://" + getLocalEndpoint() + "/partido";
const token = getToken();

export async function addParty(data) {
  await Axios.post(apiEndpoint, data, {
    headers: { Authorization: token }
  });
}

export async function getParties() {
  const { data } = await Axios.get(apiEndpoint);
  return data;
}

export async function getPartyById(_id) {
  const { data: Party } = await Axios.get(
    apiEndpoint + "/GetPartiesById?Id=" + _id + "",
    {
      headers: { Authorization: token }
    }
  );

  return Party;
}

export async function getPartyByName(name) {
  const { data: Party } = await Axios.get(apiEndpoint + "/" + name + "", {
    headers: { Authorization: token }
  });

  return Party;
}

export async function putParty(_id, data) {
  await Axios.put(apiEndpoint + "/" + _id + "", data, {
    headers: { Authorization: token }
  });
}

export async function deleteParty(_id) {
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

  const url = apiEndpoint + "/search";
  let result = await Axios.post(url, data, {
    headers: { Authorization: token }
  });
  return result;
}
