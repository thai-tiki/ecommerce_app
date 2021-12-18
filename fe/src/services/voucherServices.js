import { constants as c } from "../constants";
function getAllVoucher() {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`${c.API_URL}/voucher`, requestOptions)
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
function addVoucher(info) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "POST",
    headers: {
      token: token ? token : "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  return fetch(`${c.API_URL}/voucher`, requestOptions)
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
function updateVoucher(info) {
  const token = JSON.parse(localStorage.getItem("token"));
  const requestOptions = {
    method: "PUT",
    headers: {
      token: token ? token : "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
  return fetch(`${c.API_URL}/voucher/${info._id}`, requestOptions)
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
export const voucherServices = {
  addVoucher,
  getAllVoucher,
  updateVoucher,
};
