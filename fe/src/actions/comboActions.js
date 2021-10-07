import { constants as c } from "../constants";
import { comboServices } from "../services/comboServices";
function getAllCombos() {
  return (dispatch) => {
    comboServices.getAllCombos().then((res) => {
      if (res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.code, res.msg));
      }
    });
  };
  function success(data) {
    return { type: c.GET_ALL_COMBO_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_ALL_COMBO_FAILURE, code, message };
  }
}
export const comboActions = {
  getAllCombos,
};
