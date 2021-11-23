import { constants as c } from "../constants";
const initialState = {
  list: {
    data: [],
    status: c.LOADING,
  },
  info: {
    data: {},
    status: c.LOADING,
  },
  latest: {
    data: [],
    status: c.LOADING,
  },
  action: {
    create: {
      status: c.NONE,
      msg: "",
    },
  },
};
export function news(state = initialState, action) {
  switch (action.type) {
    case c.GET_ALL_NEWS_SUCCESS:
      return {
        ...state,
        list: {
          data: action.data,
          status: c.SUCCESS,
          total_page: action.total_page,
          current_page: action.current_page,
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
    case c.GET_NEWS_SUCCESS:
      return {
        ...state,
        info: {
          data: action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_LATEST_NEWS_SUCCESS:
      return {
        ...state,
        latest: {
          data: action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_LATEST_NEWS_FAILURE:
      return {
        ...state,
        latest: {
          data: [],
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
    case c.CREATE_NEWS:
      return {
        ...state,
        action: {
          ...state.action,
          create: {
            status: c.LOADING,
            msg: "",
          },
        },
      };
    case c.CREATE_NEWS_SUCCESS: {
      //setTimeout(() => window.location.reload(), 1000);
      return {
        ...state,
        action: {
          ...state.action,
          create: {
            status: c.SUCCESS,
            msg: "Thêm bài viết thành công",
          },
        },
      };
    }
    case c.CREATE_NEWS_FAILURE:
      return {
        ...state,
        action: {
          ...state.action,
          create: {
            status: c.FAILURE,
            msg: action.message,
          },
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
