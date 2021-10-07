import { constants as c } from "../constants";
import { appServices } from "./appServices";
const store_code = appServices.store_code;
function getAllNews(queryString) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/posts${queryString}`,
    requestOptions
  )
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
function getNewsCategory() {
  const requestOptions = {
    method: "GET",
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/post_categories`,
    requestOptions
  )
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
function getNewsInfo(id) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(
    `${c.API_URL}/customer/${store_code}/posts/${id}`,
    requestOptions
  )
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
export const newsServices = {
  getAllNews,
  getNewsCategory,
  getNewsInfo,
};
