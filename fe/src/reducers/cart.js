import { constants as c } from "../constants";
let cartInfo = localStorage.getItem("cartInfo");
const initialState = {
  cartInfo: cartInfo
    ? JSON.parse(cartInfo)
    : {
        status: c.LOADING,
        items: [],
      },
  status: c.LOADING,
  shipmentMethod: {
    status: c.LOADING,
    list: [],
  },
  paymentMethod: {
    status: c.LOADING,
    list: [],
  },
  ordersList: {
    status: c.LOADING,
    list: [],
  },
  orderInfo: {
    status: c.LOADING,
    info: {},
  },
};
export function cart(state = initialState, action) {
  switch (action.type) {
    case c.ADD_CART_SUCCESS:
      return {
        ...state,
        cartInfo: action.cartInfo,
        status: c.LOADING,
      };
    case c.GET_CART_SUCCESS:
    case c.APPLY_VOUCHER_SUCCESS:
      return {
        ...state,
        status: c.SUCCESS,
        cartInfo: {
          ...action.cartInfo,
          status: c.SUCCESS,
        },
      };
    case c.GET_CART_FAILURE:
      return {
        ...state,
        status: c.FAILURE,
        cartInfo: { status: c.FAILURE, items: [] },
      };
    case c.GET_SHIPMENT_FEE_SUCCESS:
      return {
        ...state,
        shipmentMethod: {
          status: c.SUCCESS,
          list: action.shipmentMethods,
        },
      };
    case c.GET_SHIPMENT_FEE_FAILURE:
      return {
        ...state,
        shipmentFee: {
          status: c.FAILURE,
          list: [],
        },
      };
    case c.GET_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        paymentMethod: {
          status: c.SUCCESS,
          list: action.paymentMethod,
        },
      };
    case c.GET_PAYMENT_METHODS_FAILURE:
      return {
        ...state,
        paymentMethod: {
          status: c.FAILURE,
          list: [],
        },
      };
    case c.GET_ORDERS_LIST_SUCCESS:
      return {
        ...state,
        ordersList: {
          status: c.SUCCESS,
          list: action.ordersList,
          totalPage: action.totalPage,
          currentPage: action.currentPage,
        },
      };
    case c.GET_ORDERS_LIST_FAILURE:
      return {
        ...state,
        ordersList: {
          status: c.FAILURE,
        },
      };
    case c.GET_ORDER_INFO_SUCCESS:
      return {
        ...state,
        orderInfo: {
          ...action.orderInfo,
          status: c.SUCCESS,
          order_status: action.orderInfo.status,
        },
      };
    case c.GET_ORDER_INFO_FAILURE:
      return {
        ...state,
        orderInfo: {
          status: c.FAILURE,
        },
      };
    case c.CHANGE_NUMBER_SUCCESS: {
      let newState = { ...state };
      newState.cartInfo.line_items = [null];
      return newState;
    }
    default:
      return state;
  }
}
