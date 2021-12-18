import { constants as c } from "../constants";
function getHomeInfo() {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`${c.API_URL}/home`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function getAdminInfo() {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`${c.API_URL}/admin`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
function getLocation() {
  const requestOptions = {
    mehod: "GET",
  };
  return fetch(`${c.API_URL}/location`, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
export const appServices = {
  getHomeInfo,
  getLocation,
  getAdminInfo,
};
