import { constants as c } from "../constants";
const initialState = {
  status: c.LOADING,
  list: [],
};
export function combo(state = initialState, action) {
  switch (action.type) {
    case c.GET_ALL_COMBO_SUCCESS:
      return {
        ...state,
        status: c.SUCCESS,
        list: action.data,
      };
    case c.GET_ALL_COMBO_FAILURE:
      return {
        ...state,
        status: c.FAILURE,
      };
    default:
      return state;
  }
}
