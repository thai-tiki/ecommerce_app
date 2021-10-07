import { constants as c } from "../constants";
import { appServices } from "./appServices";
const store_code = appServices.store_code;
function getAllCombos() {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`${c.API_URL}/customer/${store_code}/combos`, requestOptions)
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
export const comboServices = {
  getAllCombos,
};
