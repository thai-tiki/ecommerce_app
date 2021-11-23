import { constants as c } from "../constants";
const initialState = {
  list: {
    status: c.LOADING,
    list: [],
  },
  favorite: {
    data: [],
    status: c.LOADING,
  },
  info: {
    data: {},
    status: c.LOADING,
  },
  similar: {
    status: c.LOADING,
    list: [],
  },
  rating: {
    status: c.LOADING,
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
        rating: {
          status: c.LOADING,
          info: null,
          list: [],
        },
      };
    case c.RESET_PRODUCTS_LIST_STATUS:
      return {
        ...state,
        list: {
          status: c.LOADING,
        },
      };
    case c.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        info: {
          data: action.data,
          status: c.SUCCESS,
        },
        status: c.SUCCESS,
      };
    case c.GET_FAVORITE_PRODUCT_SUCCESS:
      return {
        ...state,
        favorite: {
          data: action.data,
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
          list: action.productsList,
          status: c.SUCCESS,
          totalPage: action.totalPage,
          currentPage: action.currentPage,
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
    case c.ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        info: {
          data: {
            ...state.info.data,
            isLiked: action.isLiked,
          },
        },
      };
    case c.GET_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        rating: {
          status: c.SUCCESS,
          list: action.data,
        },
      };
    case c.GET_PRODUCT_REVIEW_FAILURE:
      return {
        ...state,
        rating: {
          status: c.FAILURE,
          list: [],
        },
      };
    default:
      return state;
  }
}
