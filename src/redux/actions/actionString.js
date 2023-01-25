import { ActionType } from "redux-promise-middleware";

const ACTION_STRING = {
  getAllUsers: "GET_ALL_USERS",
  createTransaction: "CREATE_TRANSACTION",
  getAllTransactions: "GET_ALL_TRANSACTIONS",
  getTransactionByUser: "GET_TRANSACTION_BY_USER",

  pending: `_${ActionType.Pending}`,
  fulfilled: `_${ActionType.Fulfilled}`,
  rejected: `_${ActionType.Rejected}`,
};

export default ACTION_STRING;