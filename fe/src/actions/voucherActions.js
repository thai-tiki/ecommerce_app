import { appActions } from "./appActions";
import { constants as c } from "../constants";
import { voucherServices } from "../services/voucherServices";
function getAllVoucher() {
  return (dispatch) => {
    voucherServices.getAllVoucher().then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.code, res.msg));
      }
    });
  };
  function success(data) {
    return { type: c.GET_ALL_VOUCHERS_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_ALL_VOUCHERS_FAILURE, code, message };
  }
}
function addVoucher(info) {
  return (dispatch) => {
    voucherServices.addVoucher(info).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(
          appActions.changePopup(
            c.MESSAGE_POPUP,
            "Thêm mã giảm giá thành công!",
            { status: c.SUCCESS, willReloadAfterClose: true }
          )
        );
        return;
      }
      dispatch(
        appActions.changePopup(c.MESSAGE_POPUP, res.msg, { status: c.FAILURE })
      );
    });
  };
}
function updateVoucher(info) {
  return (dispatch) => {
    voucherServices.updateVoucher(info).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(
          appActions.changePopup(
            c.MESSAGE_POPUP,
            "Cập nhật thông tin mã giảm giá thành công!",
            { status: c.SUCCESS, willReloadAfterClose: true }
          )
        );
        return;
      }
      dispatch(
        appActions.changePopup(c.MESSAGE_POPUP, res.msg, { status: c.FAILURE })
      );
    });
  };
}
export const voucherActions = {
  addVoucher,
  getAllVoucher,
  updateVoucher,
};
