import { constants as c } from "../constants";
function addNews(info) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  return fetch(`${c.API_URL}/news`, requestOptions)
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
function getAllNews(queryString) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(
    `${c.API_URL}/news${queryString ? queryString : ""}`,
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
  return fetch(`${c.API_URL}/news/${id}`, requestOptions)
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
function getLatestNews() {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`${c.API_URL}/news/latest`, requestOptions)
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
//OK
export const newsServices = {
  addNews,
  getAllNews,
  getNewsInfo,
  getLatestNews,
};
