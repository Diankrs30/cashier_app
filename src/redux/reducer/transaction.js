import ACTION_STRING from "../actions/actionString";

const intialState = {
  allTransactions: [],
  transactionByUser: [],
  isLoading: false,
  isError: false,
  isFulfilled: false,
  error: null,
};

const transactionReducer = (prevState = intialState, { type, payload }) => {
  const {
    createTransaction,
    getAllTransactions,
    getTransactionByUser,
    pending,
    rejected,
    fulfilled,
  } = ACTION_STRING;

  switch (type) {
    case createTransaction + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };

    case createTransaction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        error: payload.error.response.data.status,
      };

    case createTransaction + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
      };

    case getAllTransactions + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };

    case getAllTransactions + rejected:
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        error: payload.error.response.data,
      };

    case getAllTransactions + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        allTransactions: payload.data.data,
      };

    case getTransactionByUser + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };

    case getTransactionByUser + rejected:
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        error: payload.error.response.data,
      };

    case getTransactionByUser + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        transactionByUser: payload.data.data,
      };

    default:
      return prevState;
  }
};

export default transactionReducer;
