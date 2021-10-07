import { constants as c } from "../constants";
const store_code =
  getMeta("store_code") === ""
    ? window.location.hostname.split(".")[0]
    : getMeta("store_code");
function getMeta(metaName) {
  const metas = document.getElementsByTagName("meta");
  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("name") === metaName) {
      return metas[i].getAttribute("content");
    }
  }
  return "";
}
function getHomeInfo() {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`${c.API_URL}/customer/${store_code}/home_app`, requestOptions)
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
function getProvincesList() {
  const requestOptions = {
    mehod: "GET",
  };
  return fetch(`${c.API_URL}/place/vn/province`, requestOptions)
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
function getDistrictsList(provinceID) {
  const requestOptions = {
    mehod: "GET",
  };
  return fetch(`${c.API_URL}/place/vn/district/${provinceID}`, requestOptions)
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
function getWardsList(districtID) {
  const requestOptions = {
    mehod: "GET",
  };
  return fetch(`${c.API_URL}/place/vn/wards/${districtID}`, requestOptions)
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
function getWebTheme() {
  const web_theme = JSON.parse(getMeta("web_theme"));
  console.log(web_theme);
  return web_theme;
}
function getInfoStore() {
  const info_store = JSON.parse(getMeta("info_store"));
  console.log(info_store);
  return info_store;
}
export const appServices = {
  store_code,
  getHomeInfo,
  getProvincesList,
  getDistrictsList,
  getWardsList,
  getWebTheme,
  getMeta,
  getInfoStore,
};
