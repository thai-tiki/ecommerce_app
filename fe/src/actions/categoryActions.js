import { constants as c } from "../constants";
import { categoryServices as s } from "../services/categoryServices";
import { appActions } from "./appActions";
function getCategories() {
  return (dispatch) => {
    s.getCategories().then((res) => {
      if (res.status === c.SUCCESS) {
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
function addCategory(info) {
  return (dispatch) => {
    s.addCategory(info).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(
          appActions.changePopup(
            c.MESSAGE_POPUP,
            "Thêm danh mục sản phẩm thành công!",
            { status: c.SUCCESS, willReloadAfterClose: true }
          )
        );
        return;
      }
      dispatch(
        appActions.changePopup(c.MESSAGE_POPUP, res.msg, {
          status: c.FAILURE,
          willReloadAfterClose: false,
        })
      );
    });
  };
}
function updateCategory(info) {
  return (dispatch) => {
    s.updateCategory(info).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(
          appActions.changePopup(
            c.MESSAGE_POPUP,
            "Cập nhật thông tin thành công!",
            { status: c.SUCCESS, willReloadAfterClose: true }
          )
        );
        return;
      }
      dispatch(
        appActions.changePopup(c.MESSAGE_POPUP, res.msg, {
          status: c.FAILURE,
          willReloadAfterClose: false,
        })
      );
    });
  };
}
export const categoryActions = {
  addCategory,
  getCategories,
  updateCategory,
};
