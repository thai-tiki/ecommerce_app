import { constants as c } from "../constants";
const initialState = {
  list: {
    data: [],
    status: c.LOADING,
  },
  info: {
    status: c.LOADING,
  },
  categories: {
    list: [],
    status: c.LOADING,
  },
};
export function news(state = initialState, action) {
  switch (action.type) {
    case c.GET_ALL_NEWS_SUCCESS:
      return {
        ...state,
        list: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.RESET_NEWS_STATUS:
      return {
        ...state,
        info: {
          status: c.LOADING,
        },
      };
    case c.RESET_NEWS_LIST_STATUS:
      return {
        ...state,
        list: {
          status: c.LOADING,
        },
      };
    case c.GET_NEWS_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: {
          status: c.SUCCESS,
          list: action.data,
        },
      };
    case c.GET_NEWS_SUCCESS:
      return {
        ...state,
        info: {
          ...action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_NEWS_CATEGORY_FAILURE:
      return {
        ...state,
        categories: {
          status: c.FAILURE,
        },
      };
    case c.GET_ALL_NEWS_FAILURE:
      return {
        ...state,
        list: {
          status: c.FAILURE,
        },
      };
    case c.GET_NEWS_FAILURE:
      return {
        ...state,
        info: {
          status: c.FAILURE,
        },
      };
    default:
      return state;
  }
}
