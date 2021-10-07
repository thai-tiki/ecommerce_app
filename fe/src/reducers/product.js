import { constants as c } from "../constants";
const initialState = {
  list: {
    status: c.LOADING,
  },
  favorite: {
    status: c.LOADING,
  },
  info: {
    status: c.LOADING,
  },
  similar: {
    status: c.LOADING,
    list: [],
  },
  review: {
    status: c.LOADING,
    info: null,
    list: [],
  },
  purchased: {
    status: c.LOADING,
  },
  error_distribute: "",
  status: c.LOADING,
};
export function product(state = initialState, action) {
  switch (action.type) {
    case c.RESET_PRODUCT_STATUS:
      return {
        ...state,
        info: {
          status: c.LOADING,
        },
        similar: {
          status: c.LOADING,
          list: [],
        },
        review: {
          status: c.LOADING,
          info: null,
          list: [],
        },
      };
    case c.SET_ERROR_SELECT_DISTRIBUTE:
     return {
        ...state,
        error_distribute: action.data,
      };
    case c.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        info: {
          ...action.data,
          status: c.SUCCESS,
        },
        status: c.SUCCESS,
      };
    case c.RESET_PRODUCTS_LIST_STATUS:
      return {
        ...state,
        list: {
          status: c.LOADING,
        },
      };
    case c.GET_FAVORITE_PRODUCT_SUCCESS:
      return {
        ...state,
        favorite: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_PURCHASED_PRODUCTS_SUCCESS:
      return {
        ...state,
        purchased: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        list: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_SIMILAR_PRODUCTS_SUCCESS:
      return {
        ...state,
        similar: {
          status: c.SUCCESS,
          list: action.data,
        },
      };
    case c.GET_PRODUCT_FAILURE:
    case c.GET_PRODUCTS_FAILURE:
    case c.GET_FAVORITE_PRODUCT_FAILURE:
      return {
        ...state,
        status: c.FAILURE,
      };
    case c.GET_PURCHASED_PRODUCTS_FAILURE:
      return {
        ...state,
        status: c.FAILURE,
      };
    case c.GET_SIMILAR_PRODUCTS_FAILURE:
      return {
        ...state,
        similar: {
          status: c.FAILURE,
        },
      };
    case c.ADD_TO_WISHLIST_SUCCESS: {
      let newState = { ...state };
      newState.info.is_favorite = action.isLiked;
      return newState;
    }
    case c.GET_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        review: {
          status: c.SUCCESS,
          info: action.data,
          list: action.data.data,
        },
      };
    case c.GET_PRODUCT_REVIEW_FAILURE:
      return {
        ...state,
        review: {
          status: c.FAILURE,
          info: null,
          list: [],
        },
      };
    default:
      return state;
  }
}
