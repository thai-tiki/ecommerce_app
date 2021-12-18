import { constants as c } from "../constants";
function getCategories() {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`${c.API_URL}/category`, requestOptions)
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
function addCategory(info) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  return fetch(`${c.API_URL}/category`, requestOptions)
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
function updateCategory(info) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  return fetch(`${c.API_URL}/category/${info._id}`, requestOptions)
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
export const categoryServices = {
  getCategories,
  addCategory,
  updateCategory,
};
