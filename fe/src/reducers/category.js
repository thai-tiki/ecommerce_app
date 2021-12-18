import { constants as c } from "../constants";
let categories = JSON.parse(localStorage.getItem("categories"));
const initialState = {
  list: {
    status: c.LOADING,
    data: categories ? categories : [],
  },
};
export function category(state = initialState, action) {
  switch (action.type) {
    case c.GET_CATEGORY_SUCCESS: {
      return {
        ...state,
        list: {
          status: c.SUCCESS,
          data: action.data,
        },
      };
    }
    case c.GET_CATEGORY_FAILURE:
      return {
        ...state,
        list: {
          status: c.FAILURE,
          data: [],
        },
      };
    default:
      return state;
  }
}
