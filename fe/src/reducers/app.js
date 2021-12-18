import { constants as c } from "../constants";
const location = localStorage.getItem("location");
const initialState = {
  home: {
    status: c.LOADING,
  },
  admin: {
    status: c.LOADING,
  },
  popup: {
    msg: "",
    type: c.NO_POPUP,
    additionalInfo: {},
  },
  location: {
    status: c.LOADING,
    data: location ? JSON.parse(location) : [],
  },
};
export function app(state = initialState, action) {
  switch (action.type) {
    case c.GET_HOME_SUCCESS:
      return {
        ...state,
        status: c.SUCCESS,
        home: { ...action.data, status: c.SUCCESS },
      };
    case c.GET_HOME_FAILURE:
      return {
        ...state,
        home: { status: c.FAILURE },
      };
    case c.CHANGE_POPUP:
      return {
        ...state,
        popup: {
          msg: action.msg,
          type: action.popupType,
          additionalInfo: action.additionalInfo,
        },
      };
    //case c.GET_ORDERS_LIST_FAILURE:
    //case c.GET_ALL_NEWS_FAILURE:
    case c.GET_CART_FAILURE:
    case c.GET_NEWS_FAILURE:
    case c.GET_ADMIN_FAILURE:
    case c.GET_PRODUCT_FAILURE:
    case c.GET_PROFILE_FAILURE:
    case c.GET_PRODUCTS_FAILURE:
    case c.GET_ORDER_INFO_FAILURE:
    case c.GET_NEWS_CATEGORY_FAILURE:
    case c.GET_FAVORITE_PRODUCT_FAILURE:
    case c.GET_COLLABORATOR_INFO_FAILURE:
    case c.GET_PURCHASED_PRODUCTS_FAILURE: {
      //window.location.href = `/${action.code}?code=${action.code}&message=${action.msg}`;
      break;
    }
    case c.GET_ADMIN_SUCCESS:
      return {
        ...state,
        admin: {
          status: c.SUCCESS,
          overall: action.data,
        },
      };
    case c.LOGIN_FAILURE:
      return {
        ...state,
        message: action.msg,
      };
    default:
      return state;
  }
}
