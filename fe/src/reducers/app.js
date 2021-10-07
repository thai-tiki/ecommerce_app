import { constants as c } from "../constants";
import { isHexColor, isImageUrl, isNullText } from "../helper";
const provinces = localStorage.getItem("provinces");
const initialState = {
  home: {
    status: c.LOADING,
  },
  currentPopup: c.NO_POPUP,
  messagePopup: {
    message: "",
    status: c.LOADING,
    willReload: false,
  },
  rattingPopup: {
    id: "",
    name: "",
    orderCode: "",
    status: c.LOADING,
  },
  appTheme: {
    headerBackgroudColor: c.DEFAULT_HEADER_BACKGROUND_COLOR,
    headerTextColor: c.DEFAULT_HEADER_TEXT_COLOR,
    home_title: c.DEFAULT_HOME_TITLE,
    favicon_url: c.DEFAULT_SHORTCUT,
    color_main_1: c.DEFAULT_COLOR,
    shortcut: c.DEFAULT_SHORTCUT,
    address: c.DEFAULT_ADDRESS,
    logo_url: c.DEFAULT_LOGO,
    title: c.DEFAULT_TITLE,
    phone: c.DEFAULT_PHONE,
    mail: c.DEFAULT_MAIL,
    post_id_support_policy: null,
    post_id_privacy_policy: null,
    post_id_return_policy: null,
    post_id_contact: null,
    post_id_about: null,
    post_id_terms: null,
    post_id_help: null,
    status: c.NONE,
  },
  infoStore: {
    status: c.NONE,
  },
  message: "",
  addressData: {
    status: c.LOADING,
    provinces: provinces ? JSON.parse(provinces) : [],
    districts: [],
    wards: [],
  },
  chatStatus: "",
  orderPopup: {},
};
export function app(state = initialState, action) {
  switch (action.type) {
    case c.GET_WEB_THEME_SUCCESS: {
      let newTheme = { ...action.data };
      newTheme.logo_url = isImageUrl(newTheme.logo_url)
        ? newTheme.logo_url
        : c.DEFAULT_LOGO;
      newTheme.color_main_1 = isHexColor(newTheme.color_main_1)
        ? newTheme.color_main_1
        : c.DEFAULT_COLOR;
      newTheme.contact_address = !isNullText(newTheme.contact_address)
        ? newTheme.contact_address
        : c.DEFAULT_ADDRESS;
      newTheme.contact_email = !isNullText(newTheme.contact_email)
        ? newTheme.contact_email
        : c.DEFAULT_MAIL;
      newTheme.contact_phone_number = !isNullText(newTheme.contact_phone_number)
        ? newTheme.contact_phone_number
        : c.DEFAULT_PHONE;
      newTheme.favicon_url = !isNullText(newTheme.favicon_url)
        ? newTheme.favicon_url
        : c.DEFAULT_SHORTCUT;
      newTheme.home_title = !isNullText(newTheme.home_title)
        ? newTheme.home_title
        : c.DEFAULT_HOME_TITLE;
      sessionStorage.setItem("appTheme", JSON.stringify(newTheme));
      return {
        ...state,
        appTheme: newTheme,
      };
    }
    case c.GETTING_WEB_THEME:
      return {
        ...state,
        status: c.LOADING,
      };
    case c.GET_WEB_THEME_FAILURE:
      return {
        ...state,
        appTheme: state.appTheme,
      };
    case c.GETTING_INFO_STORE:
      return {
        ...state,
        status: c.LOADING,
      };
    case c.GET_INFO_STORE_SUCCESS: {
      let infoStore = { ...action.data };
      return {
        ...state,
        infoStore: infoStore,
      };
    }
    case c.GET_INFO_STORE_FAILURE:
      return {
        ...state,
        infoStore: state.infoStore,
      };
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
        currentPopup: action.popupType,
        message: action.messageInfo ? action.messageInfo : "",
        rattingPopup: { ...action.rattingInfo },
        orderPopup: { ...action.paymentMethod, ...action.orderPopupTitle },
      };
    case c.PHONE_REGISTERED:
      return {
        ...state,
        currentPopup: c.LOGIN_POPUP,
      };
    case c.PHONE_NOT_REGISTERED:
      return {
        ...state,
        currentPopup: c.REGIS_POPUP,
      };
    case c.LOGIN_SUCCESS:
      return {
        ...state,
        currentPopup: c.NO_POPUP,
      };
    case c.GET_DISTRICTS_LIST_SUCCESS: {
      let newState = { ...state };
      newState.addressData.districts = action.districts;
      return newState;
    }
    case c.GET_WARDS_LIST_SUCCESS: {
      let newState = { ...state };
      newState.addressData.wards = action.wards;
      return newState;
    }
    case c.ADD_USER_ADDRESS_SUCCESS:
    case c.UPDATE_USER_ADDRESS_SUCCESS:
    case c.DELETE_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        messagePopup: {
          message: action.message,
          status: c.SUCCESS,
          willReload: true,
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
    case c.GET_NEWS_CATEGORY_FAILURE:
    case c.GET_ORDERS_LIST_FAILURE:
    case c.GET_ORDER_INFO_FAILURE:
    case c.GET_ALL_NEWS_FAILURE:
    case c.GET_PRODUCTS_FAILURE:
    case c.GET_PRODUCT_FAILURE:
    case c.GET_NEWS_FAILURE:
    case c.GET_PROFILE_FAILURE:
    case c.GET_PURCHASED_PRODUCTS_FAILURE:
    case c.GET_COLLABORATOR_INFO_FAILURE:
    case c.GET_FAVORITE_PRODUCT_FAILURE: {
      window.location.href = `/${action.code}?code=${action.code}&message=${action.message}`;
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
