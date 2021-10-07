import { constants as c } from "../constants";
const initialState = {
  list: {
    status: c.LOADING,
    data: [],
  },
};
export function voucher(state = initialState, action) {
  switch (action.type) {
    case c.GET_ALL_VOUCHERS_SUCCESS:
      return {
        ...state,
        list: {
          data: [...action.data],
          status: c.SUCCESS,
        },
      };
    case c.GET_ALL_VOUCHERS_FAILURE:
      return {
        ...state,
        list: {
          data: [],
          status: c.FAILURE,
        },
      };
    default:
      return state;
  }
}
