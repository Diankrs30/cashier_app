import ACTION_STRING from "./actionString";
import {
  createTransaction,
  getAllTransactions,
  getTransactionByUser,
} from "../../utils/api";

const createTransactionPending = () => ({
  type: ACTION_STRING.createTransaction.concat(ACTION_STRING.pending),
});

const createTransactionRejected = (error) => ({
  type: ACTION_STRING.createTransaction.concat(ACTION_STRING.rejected),
  payload: { error },
});

const createTransactionFulfilled = (data) => ({
  type: ACTION_STRING.createTransaction.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const getAllTransactionsPending = () => ({
  type: ACTION_STRING.getAllTransactions.concat(ACTION_STRING.pending),
});

const getAllTransactionsRejected = (error) => ({
  type: ACTION_STRING.getAllTransactions.concat(ACTION_STRING.rejected),
  payload: { error },
});

const getAllTransactionsFulfilled = (data) => ({
  type: ACTION_STRING.getAllTransactions.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const getTransactionByUserPending = () => ({
  type: ACTION_STRING.getTransactionByUser.concat(ACTION_STRING.pending),
});

const getTransactionByUserRejected = (error) => ({
  type: ACTION_STRING.getTransactionByUser.concat(ACTION_STRING.rejected),
  payload: { error },
});

const getTransactionByUserFulfilled = (data) => ({
  type: ACTION_STRING.getTransactionByUser.concat(ACTION_STRING.fulfilled),
  payload: { data },
});

const createTransactionThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(createTransactionPending());
      const result = await createTransaction(body);
      dispatch(createTransactionFulfilled(result.data));
      if (typeof cbSuccess === "function") cbSuccess();
    } catch (error) {
      console.log(error);
      dispatch(createTransactionRejected(error));
      if (typeof cbDenied === 'function') cbDenied();
    }
  };
};

const getAllTransactionsThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(getAllTransactionsPending());
      const result = await getAllTransactions();
      dispatch(getAllTransactionsFulfilled(result.data));
    } catch (error) {
      console.log(error);
      dispatch(getAllTransactionsRejected(error));
    }
  };
};

const getTransactionByUserThunk = (userid) => {
  return async (dispatch) => {
    try {
      dispatch(getTransactionByUserPending());
      const result = await getTransactionByUser(userid);
      dispatch(getTransactionByUserFulfilled(result.data));
    } catch (error) {
      console.log(error);
      dispatch(getTransactionByUserRejected(error));
    }
  };
};

const transactionAction = {
  createTransactionThunk,
  getAllTransactionsThunk,
  getTransactionByUserThunk,
};

export default transactionAction;
