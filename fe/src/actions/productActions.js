import { appActions } from "./appActions";
import { constants as c } from "../constants";
import { productServices as s } from "../services/productServices";
function getProductInfo(id) {
  return (dispatch) => {
    s.getProductInfo(id).then((res) => {
      if (res.status === c.SUCCESS) dispatch(success(res.data));
      else dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_PRODUCT_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_PRODUCT_FAILURE, code, message };
  }
}
function getAllProducts(params) {
  return (dispatch) => {
    s.getAllProducts(params).then((res) => {
      if (res.status === c.SUCCESS)
        dispatch(success(res.data, res.current_page, res.total_page));
      else dispatch(failure(res.code, res.msg));
    });
  };
  function success(productsList, currentPage, totalPage) {
    return {
      type: c.GET_PRODUCTS_SUCCESS,
      productsList,
      currentPage,
      totalPage,
    };
  }
  function failure(code, message) {
    return { type: c.GET_PRODUCTS_FAILURE, code, message };
  }
}
function updateProduct(product) {
  return (dispatch) => {
    s.updateProduct(product).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(success(res.data));
        dispatch({
          msg: "Cập nhật thông tin sản phẩm thành công!",
          additionalInfo: {
            status: c.SUCCESS,
            willReloadAfterClose: true,
          },
          type: c.CHANGE_POPUP,
          popupType: c.MESSAGE_POPUP,
        });
      } else {
        dispatch(failure(res.msg));
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
  function success(products) {
    return {
      type: c.UPDATE_PRODUCT_SUCCESS,
      products,
    };
  }
  function failure(message) {
    return { type: c.UPDATE_PRODUCT_FAILURE, message };
  }
}
function addProduct(product) {
  return (dispatch) => {
    s.addProduct(product).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(success(res.data));
        dispatch({
          msg: "Thêm sản phẩm thành công !",
          additionalInfo: {
            status: c.SUCCESS,
            willReloadAfterClose: true,
          },
          type: c.CHANGE_POPUP,
          popupType: c.MESSAGE_POPUP,
        });
      } else {
        dispatch(failure(res.msg));
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
  function success(products) {
    return {
      type: c.ADD_PRODUCT_SUCCESS,
      products,
    };
  }
  function failure(message) {
    return { type: c.ADD_PRODUCT_FAILURE, message };
  }
}
function getProductReview(id) {
  return (dispatch) => {
    s.getProductReview(id).then((res) => {
      if (res.status === c.SUCCESS) dispatch(success(res.data));
      else dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_PRODUCT_REVIEW_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_PRODUCT_REVIEW_FAILURE, code, message };
  }
}
function reviewProduct(reviewInfo) {
  return (dispatch) => {
    s.reviewProduct(reviewInfo).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(success());
        dispatch(
          appActions.changePopup(
            c.MESSAGE_POPUP,
            "Đánh giá sản phẩm thành công !",
            {
              status: c.SUCCESS,
              willReloadAfterClose: true,
            }
          )
        );
      } else {
        dispatch(failure());
        dispatch(
          appActions.changePopup(c.MESSAGE_POPUP, res.msg, {
            status: c.FAILURE,
            willReloadAfterClose: false,
          })
        );
      }
    });
  };
  function success() {
    return { type: c.REVIEW_PRODUCT_SUCCESS };
  }
  function failure() {
    return { type: c.REVIEW_PRODUCT_FAILURE };
  }
}
function getSimilarProducts(id) {
  return (dispatch) => {
    s.getSimilarProducts(id).then((res) => {
      if (res.status === c.SUCCESS) dispatch(success(res.data));
      else dispatch(failure());
    });
  };
  function success(data) {
    return { type: c.GET_SIMILAR_PRODUCTS_SUCCESS, data };
  }
  function failure() {
    return { type: c.GET_SIMILAR_PRODUCTS_FAILURE };
  }
}
function toggleWishList(id) {
  return (dispatch) => {
    s.toggleWishList(id).then((res) => {
      if (res.status === c.SUCCESS) {
        dispatch(success(res.data.isLiked));
        const msg = res.data.isLiked
          ? "Thêm sản phẩm yêu thích thành công"
          : "Xóa sản phẩm yêu thích thành công";
        dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, msg));
      } else {
        dispatch(failure());
        dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, res.msg));
      }
    });
  };
  function success(isLiked) {
    return { type: c.ADD_TO_WISHLIST_SUCCESS, isLiked };
  }
  function failure() {
    return { type: c.ADD_TO_WISHLIST_FAILURE };
  }
}
function getFavoriteProducts() {
  return (dispatch) => {
    s.getFavoriteProducts().then((res) => {
      if (res.status === c.SUCCESS) dispatch(success(res.data));
      else dispatch(failure(res.code, res.msg));
    });
  };
  function success(data) {
    return { type: c.GET_FAVORITE_PRODUCT_SUCCESS, data };
  }
  function failure(code, message) {
    return { type: c.GET_FAVORITE_PRODUCT_FAILURE, code, message };
  }
}
//OK
function getPurchasedProducts() {
  return (dispatch) => {
    s.getPurchasedProducts().then((res) => {
      if (res.code === 201 || res.code === 200) {
        dispatch(success(res.data));
      } else {
        dispatch(failure(res.code, res.msg));
      }
    });
  };
  function success(data) {
    return {
      type: c.GET_PURCHASED_PRODUCTS_SUCCESS,
      data,
    };
  }
  function failure(code, msg) {
    return { type: c.GET_PURCHASED_PRODUCTS_FAILURE, code, msg };
  }
}
export const productActions = {
  addProduct,
  getAllProducts,
  getProductInfo,
  updateProduct,
  reviewProduct,
  toggleWishList,
  getProductReview,
  getSimilarProducts,
  getFavoriteProducts,
  getPurchasedProducts,
};
