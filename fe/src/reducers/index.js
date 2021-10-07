import { combineReducers } from "redux";
import { app } from "./app";
import { product } from "./product";
import { category } from "./category";
import { news } from "./news";
import { user } from "./user";
import { cart } from "./cart";
import { combo } from "./combo";
import { voucher } from "./voucher";
import { collaborator } from "./collaborator";
const rootReducer = combineReducers({
  app,
  news,
  user,
  cart,
  combo,
  product,
  voucher,
  category,
  collaborator,
});

export default rootReducer;
