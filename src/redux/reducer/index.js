import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import transactionReducer from "./transaction"

export default combineReducers({
  user: userReducer,
  transaction: transactionReducer,
});
