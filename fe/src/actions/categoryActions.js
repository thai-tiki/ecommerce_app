import { constants as c } from "../constants";
import { categoryServices as s } from "../services/categoryServices";
function getCategories() {
  return (dispatch) => {
    s.getCategories().then((res) => {
      if (res.code === 200) {
        localStorage.setItem("categories", JSON.stringify(res.data));
        dispatch(success(res.data));
      } else dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_CATEGORY_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_CATEGORY_FAILURE, code, message };
  }
}
export const categoryActions = {
  getCategories,
};
