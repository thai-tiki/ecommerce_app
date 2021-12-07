import { constants as c } from "../constants";
import { cartServices as s } from "../services/cartServices";
import { toast } from "react-toastify";
import { appActions } from "./appActions";
function addCart(product, willShowPopup) {
  return (dispatch) => {
    s.addCart(product).then((res) => {
      if (res.status === c.SUCCESS) {
        localStorage.setItem("cartInfo", JSON.stringify(res.data));
        dispatch(success(res.data));
        if (product.quantity) {
          if (willShowPopup) {
            toast.success(" Đã thêm vào giỏ hàng", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          dispatch(
            appActions.changePopup(
              c.AUTOHIDE_POPUP,
              "Xóa sản phẩm khỏi giở hàng thành công!"
            )
          );
        }
      } else {
        dispatch(failure());
        dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, res.msg));
      }
    });
  };
  function success(cartInfo) {
    return { type: c.ADD_CART_SUCCESS, cartInfo };
  }
  function failure() {
    return { type: c.ADD_CART_FAILURE };
  }
}
function getCartInfo() {
  return (dispatch) => {
    s.getCartInfo().then((res) => {
      if (res.status === c.SUCCESS) {
        localStorage.setItem("cartInfo", JSON.stringify(res.data));
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(cartInfo) {
    return {
      type: c.GET_CART_SUCCESS,
      cartInfo,
    };
  }
  function failure() {
    return { type: c.GET_CART_FAILURE };
  }
}
function getPaymentMethods() {
  return (dispatch) => {
    s.getPaymentMethods().then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(paymentMethod) {
    return {
      type: c.GET_PAYMENT_METHODS_SUCCESS,
      paymentMethod,
    };
  }
  function failure() {
    return { type: c.GET_PAYMENT_METHODS_FAILURE };
  }
}
function getShipmentMethods() {
  return (dispatch) => {
    s.getShipmentMethods().then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(success(res.data));
      } else {
        dispatch(failure());
      }
    });
  };
  function success(shipmentMethods) {
    return {
      type: c.GET_SHIPMENT_FEE_SUCCESS,
      shipmentMethods,
    };
  }
  function failure() {
    return { type: c.GET_SHIPMENT_FEE_FAILURE };
  }
}
function applyDiscount(type, value) {
  const msg = {
    apply_voucher: "Áp dụng voucher thành công !",
    cancel_voucher: "Hủy voucher thành công !",
  };
  return (dispatch) => {
    s.applyDiscount(type, value).then((res) => {
      if (res.status === c.SUCCESS) {
        localStorage.setItem("cartInfo", JSON.stringify(res.data));
        dispatch(success(res.data));
        dispatch(
          appActions.changePopup(
            c.AUTOHIDE_POPUP,
            value ? msg["apply_voucher"] : msg["cancel_voucher"]
          )
        );
      } else {
        dispatch(failure(res.code, res.msg));
        dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, res.msg));
      }
    });
  };
  function success(cartInfo) {
    return {
      type: c.APPLY_VOUCHER_SUCCESS,
      cartInfo,
    };
  }
  function failure(code, message) {
    return { type: c.APPLY_VOUCHER_FAILURE, code, message };
  }
}
function order(orderInfo) {
  return (dispatch) => {
    s.order(orderInfo).then((res) => {
      if (res.status === c.SUCCESS) {
        window.localStorage.removeItem("cartInfo");
        dispatch(success());
        dispatch(appActions.changePopup(c.ORDER_POPUP));
      } else {
        dispatch(failure(res.msg));
        dispatch(
          appActions.changePopup(c.MESSAGE_POPUP, res.msg, {
            status: c.FAILURE,
          })
        );
      }
    });
  };
  function success() {
    return {
      type: c.ORDER_SUCCESS,
    };
  }
  function failure(message) {
    return {
      type: c.ORDER_FAILURE,
      message,
    };
  }
}
function changeNumberInCart(id, quantity) {
  return (dispatch) => {
    s.changeNumberInCart(id, quantity).then((res) => {
      if (res.status === c.SUCCESS) {
        if (quantity === 0)
          dispatch(
            appActions.changePopup(
              c.AUTOHIDE_POPUP,
              "Xóa sản phẩm khỏi giỏ hàng thành công !"
            )
          );
        dispatch(getCartInfo());
      } else {
        dispatch(
          appActions.changePopup(
            c.AUTOHIDE_POPUP,
            "Có lỗi xảy ra vui lòng thử lại sau !"
          )
        );
      }
    });
  };
}
function getOrdersList(query, isAdmin) {
  return (dispatch) => {
    s.getOrdersList(query, isAdmin).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(success(res.data, res.current_page, res.total_page));
      } else {
        dispatch(failure(res.code, res.msg));
      }
    });
  };
  function success(ordersList, currentPage, totalPage) {
    return {
      totalPage,
      ordersList,
      currentPage,
      type: c.GET_ORDERS_LIST_SUCCESS,
    };
  }
  function failure(code, message) {
    return {
      type: c.GET_ORDERS_LIST_FAILURE,
      code,
      message,
    };
  }
}
function getOrderInfo(id) {
  return (dispatch) => {
    s.getOrderInfo(id).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.code, res.msg));
      }
    });
  };
  function success(orderInfo) {
    return {
      type: c.GET_ORDER_INFO_SUCCESS,
      orderInfo,
    };
  }
  function failure(code, message) {
    return {
      type: c.GET_ORDER_INFO_FAILURE,
      code,
      message,
    };
  }
}
function updateOrder(orderInfo) {
  return (dispatch) => {
    s.updateOrder(orderInfo).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch({
          msg: "Cập nhật thông tin đơn hàng thành công !",
          additionalInfo: {
            status: c.SUCCESS,
            willReloadAfterClose: true,
          },
          type: c.CHANGE_POPUP,
          popupType: c.MESSAGE_POPUP,
        });
      } else {
        dispatch({
          msg: res.msg,
          additionalInfo: {
            status: c.FAILURE,
            willReloadAfterClose: false,
          },
          type: c.CHANGE_POPUP,
          popupType: c.MESSAGE_POPUP,
        });
      }
    });
  };
}
//OK
function changePaymentMethod(info) {
  return (dispatch) => {
    s.changePaymentMethod(info).then((res) => {
      if (res.code === 201 || res.code === 200) {
        dispatch(success());
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.ORDER_POPUP,
          orderPopupTitle: {
            title: "Cập nhật thông tin thanh toán thành công !",
            subTitle:
              "Bạn đã cập nhật thông tin thanh toán thành công vui lòng đợi xác nhận từ cửa hàng.",
          },
          paymentMethod: {
            payment_method_name: info.paymentMethodName,
            payment_method_id: info.paymentMethodId,
            order_code: info.orderCode,
          },
        });
      } else {
        dispatch(failure(res.msg));
      }
    });
  };
  function success() {
    return {
      type: c.CHANGE_PAYMENT_METHOD_SUCCESS,
    };
  }
  function failure(message) {
    return {
      type: c.CHANGE_PAYMENT_METHOD_FAILURE,
      message,
    };
  }
}
function cancelOrder(info) {
  return (dispatch) => {
    s.cancelOrder(info).then((res) => {
      if (res.code === 200) {
        dispatch(success());
        window.location.reload();
      } else {
        dispatch(failure(res.code, res.msg));
        dispatch({
          type: c.CHANGE_POPUP,
          popupType: c.AUTOHIDE_POPUP,
          messageInfo: res.msg,
        });
      }
    });
  };
  function success() {
    return { type: c.CANCEL_ORDER_SUCCESS };
  }
  function failure(code, message) {
    return { type: c.CANCEL_ORDER_FAILURE, code, message };
  }
}
export const cartActions = {
  order,
  addCart,
  getCartInfo,
  updateOrder,
  getShipmentMethods,
  getPaymentMethods,
  changeNumberInCart,
  changePaymentMethod,
  getOrdersList,
  getOrderInfo,
  applyDiscount,
  cancelOrder,
};
