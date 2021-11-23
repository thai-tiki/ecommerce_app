import { constants as c } from "../constants";
const location = localStorage.getItem("location");
const initialState = {
  home: {
    status: c.LOADING,
  },
  popup: {
    msg: "",
    type: c.NO_POPUP,
    additionalInfo: {},
  },
  rattingPopup: {
    id: "",
    name: "",
    orderCode: "",
    status: c.LOADING,
  },
  location: {
    status: c.LOADING,
    data: location ? JSON.parse(location) : [],
  },
  chatStatus: "",
  orderPopup: {},
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
    case c.ADD_USER_ADDRESS_FAILURE:
    case c.UPDATE_USER_ADDRESS_FAILURE:
    case c.DELETE_USER_ADDRESS_FAILURE:
    case c.ORDER_FAILURE:
      return {
        ...state,
        messagePopup: {
          message: action.message,
          status: c.FAILURE,
          willReload: false,
        },
      };
    case c.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        message: action.msg,
      };
    //case c.GET_ORDERS_LIST_FAILURE:
    //case c.GET_ALL_NEWS_FAILURE:
    case c.GET_CART_FAILURE:
    case c.GET_NEWS_FAILURE:
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
    case c.TOGGLE_CHAT_STATUS:
      return {
        ...state,
        chatStatus: action.status,
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
