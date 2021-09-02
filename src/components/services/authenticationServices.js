import Axios from "axios";
import { getLocalEndpoint } from "../services/tokenService";
const apiEndpoint = "https://" + getLocalEndpoint() + "/users";
//const userToken = sessionStorage.getItem("userToken");
function authHeaders() {
  return {
    headers: { Authorization: "Bearer " + sessionStorage.getItem("userToken") }
  };
}

export async function register(data) {
  const res = await Axios.post(apiEndpoint + "/register", data, {});
  return res;
}

export async function login(data) {
  const res = await Axios.post(apiEndpoint + "/login", data, {}).catch(
    error => {
      console.log(error.response);
      return error.response;
    }
  );
  if (res.status === 200) {
    const token = res.data;
    sessionStorage.setItem("userToken", token.token);
    sessionStorage.setItem("isLoggedIn", true);
  }
  return res.data;
}

export async function getProfileData() {
  const { data } = await Axios.get(apiEndpoint + "/profile", authHeaders());
  return data;
}

export async function getLegislators() {
  const { data } = await Axios.get(apiEndpoint);
  return data;
}
