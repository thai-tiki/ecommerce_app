import { constants as c } from "../constants";
let categories = JSON.parse(localStorage.getItem("categories"));
const initialState = {
  categories: categories ? categories : [],
  status: c.LOADING,
};
export function category(state = initialState, action) {
  switch (action.type) {
    case c.GET_CATEGORY_SUCCESS: {
      return {
        ...state,
        categories: action.data,
        status: c.SUCCESS,
      };
    }
    case c.GET_CATEGORY_FAILURE:
      return {
        ...state,
        status: c.FAILURE,
      };
    default:
      return state;
  }
}
